import { Request, Response, NextFunction } from 'express';
import { Webhook } from 'svix';

interface ClerkRequest extends Request {
  rawBody?: Buffer | string;
  clerkEvent?: unknown;
}

export const clerkWebhookMiddleware = (req: ClerkRequest, res: Response, next: NextFunction) => {
  try {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error('CLERK_WEBHOOK_SECRET non configurato');
      return res.status(500).json({ error: 'Configurazione webhook mancante' });
    }

    const wh = new Webhook(secret);
    
    // Ottieni il payload raw dal body
    const payload = req.rawBody || req.body;
    
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
    const evt = wh.verify(payload, headers);
    
    // Aggiungi l'evento verificato alla richiesta
    req.clerkEvent = evt;
    
    next();
  } catch (err) {
    console.error('Errore nella verifica del webhook Clerk:', err);
    return res.status(401).json({ error: 'Firma webhook non valida' });
  }
}; 