import { Request, Response } from "express";
import { UserWebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import { UserEventHandler } from "../services/userEventHandler";
import asyncWrapper from "../utils/asyncErrorHandler";

interface ClerkRequest extends Request {
  body: Buffer | any;
}

async function ControllerEventsClerk(req: ClerkRequest, res: Response) {
  console.log('🔗 Webhook ricevuto da Clerk');
  console.log('Headers ricevuti:', req.headers);
  console.log('Body type:', typeof req.body);
  console.log('Body length:', req.body?.length || 'N/A');
  console.log('Raw body preview:', req.body?.toString?.().substring(0, 200) || 'N/A');
  
  try {
    // Verifica del webhook Clerk
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error('❌ CLERK_WEBHOOK_SECRET non configurato');
      return res.status(500).json({ error: 'Configurazione webhook mancante' });
    }

    console.log('✅ Secret webhook trovato');

    const wh = new Webhook(secret);
    
    // Il payload è già raw grazie al middleware express.raw()
    const payload = req.body;
    
    if (!payload) {
      console.error('❌ Payload mancante nella richiesta webhook');
      return res.status(400).json({ error: 'Payload mancante' });
    }

    console.log('✅ Payload presente');

    // Estrai gli headers necessari per la verifica
    const headers = {
      'svix-id': req.headers['svix-id'] as string,
      'svix-timestamp': req.headers['svix-timestamp'] as string,
      'svix-signature': req.headers['svix-signature'] as string,
    };

    console.log('Headers svix estratti:', headers);

    // Verifica che tutti gli headers necessari siano presenti
    if (!headers['svix-id'] || !headers['svix-timestamp'] || !headers['svix-signature']) {
      console.error('❌ Headers svix mancanti:', headers);
      return res.status(400).json({ error: 'Headers webhook mancanti' });
    }

    console.log('✅ Headers svix presenti');

    // Verifica il webhook
    console.log('🔍 Inizio verifica webhook...');
    const verifiedEvent = wh.verify(payload, headers) as UserWebhookEvent;
    console.log('✅ Webhook verificato con successo');
    console.log('Evento ricevuto:', verifiedEvent.type);
    console.log('Dati evento:', JSON.stringify(verifiedEvent.data, null, 2));
    
    // Gestisci l'evento verificato
    const userEventHandler = new UserEventHandler();
    const result = await userEventHandler.handleEvent(verifiedEvent);
    
    console.log('✅ Evento processato con successo');
    console.log('Risultato:', result);
    return res.status(200).json({ 
      message: 'Evento processato con successo',
      eventType: verifiedEvent.type,
      result: result
    });
    
  } catch (err) {
    console.error('❌ Errore nella verifica del webhook Clerk:', err);
    console.error('Stack trace:', err instanceof Error ? err.stack : 'N/A');
    return res.status(401).json({ 
      error: 'Firma webhook non valida',
      details: err instanceof Error ? err.message : 'Errore sconosciuto'
    });
  }
}

export default asyncWrapper(ControllerEventsClerk);
