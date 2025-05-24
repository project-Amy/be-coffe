import { Request, Response } from "express";
import { UserWebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import { UserEventHandler } from "../services/userEventHandler";
import asyncWrapper from "../utils/asyncErrorHandler";

interface ClerkRequest extends Request {
  body: Buffer | any;
}

async function ControllerEventsClerk(req: ClerkRequest, res: Response) {
  try {
    // Verifica del webhook Clerk
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error('CLERK_WEBHOOK_SECRET non configurato');
      return res.status(500).json({ error: 'Configurazione webhook mancante' });
    }

    const wh = new Webhook(secret);
    
    // Il payload è già raw grazie al middleware express.raw()
    const payload = req.body;
    
    if (!payload) {
      console.error('Payload mancante nella richiesta webhook');
      return res.status(400).json({ error: 'Payload mancante' });
    }

    // Estrai gli headers necessari per la verifica
    const headers = {
      'svix-id': req.headers['svix-id'] as string,
      'svix-timestamp': req.headers['svix-timestamp'] as string,
      'svix-signature': req.headers['svix-signature'] as string,
    };

    // Verifica che tutti gli headers necessari siano presenti
    if (!headers['svix-id'] || !headers['svix-timestamp'] || !headers['svix-signature']) {
      console.error('Headers svix mancanti:', headers);
      return res.status(400).json({ error: 'Headers webhook mancanti' });
    }

    // Verifica il webhook
    const verifiedEvent = wh.verify(payload, headers) as UserWebhookEvent;
    
    // Gestisci l'evento verificato
    const userEventHandler = new UserEventHandler();
    await userEventHandler.handleEvent(verifiedEvent);
    
    return res.status(200).json({ 
      message: 'Evento processato con successo',
      eventType: verifiedEvent.type 
    });
    
  } catch (err) {
    console.error('Errore nella verifica del webhook Clerk:', err);
    return res.status(401).json({ error: 'Firma webhook non valida' });
  }
}

export default asyncWrapper(ControllerEventsClerk);
