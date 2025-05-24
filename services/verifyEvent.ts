import { Webhook } from "svix";
import { Request } from "express";

export default function verifyEvent(request: Request) {

  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("CLERK_WEBHOOK_SECRET non configurato");
  }
  const headers = {
    "svix-id": request.headers["svix-id"] as string,
    "svix-timestamp": request.headers["svix-timestamp"] as string,
    "svix-signature": request.headers["svix-signature"] as string,
  };
  
  // Verifica che tutti gli headers necessari siano presenti
  if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
    throw new Error("Headers webhook mancanti");
  }
  
  const payload = request.body
  const wh = new Webhook(secret);
  // Throws on error, returns the verified content on success
  if (!payload) {
    throw new Error("Payload mancante");
  }
  const verified = wh.verify(payload, headers);
  return verified;
}
