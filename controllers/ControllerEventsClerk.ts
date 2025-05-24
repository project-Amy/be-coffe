import { Request, Response } from "express";
import { UserWebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import { UserEventHandler } from "../services/userEventHandler";
import asyncWrapper from "../utils/asyncErrorHandler";

interface ClerkRequest extends Request {
  body: Buffer | any;
}

async function ControllerEventsClerk(req: ClerkRequest, res: Response) {
  console.log("🔗 Webhook ricevuto da Clerk");
  try {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      console.error("CLERK_WEBHOOK_SECRET non configurato");
      return res.status(500).json({ error: "Configurazione webhook mancante" });
    }
    const wh = new Webhook(secret);
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ error: "Payload mancante" });
    }
    const headers = {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    };
    // Verifica che tutti gli headers necessari siano presenti
    if (
      !headers["svix-id"] ||
      !headers["svix-timestamp"] ||
      !headers["svix-signature"]
    ) {
      console.error("Headers svix mancanti:", headers);
      return res.status(400).json({ error: "Headers webhook mancanti" });
    }
    // Verifica il webhook
    console.log("🔍 Inizio verifica webhook...");
    const verifiedEvent = wh.verify(payload, headers) as UserWebhookEvent;
    const userEventHandler = new UserEventHandler();
    const result = await userEventHandler.handleEvent(verifiedEvent);
    return res.status(200).json({
      message: "Evento processato con successo",
      eventType: verifiedEvent.type,
      result: result,
    });
  } catch (err) {
    return res.status(401).json({
      error: "Firma webhook non valida",
      details: err instanceof Error ? err.message : "Errore sconosciuto",
    });
  }
}

export default asyncWrapper(ControllerEventsClerk);
