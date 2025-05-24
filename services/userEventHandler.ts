import { UserWebhookEvent } from '@clerk/backend';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserEventHandler {
  
  async handleUserCreated(event: UserWebhookEvent) {
    if (event.type !== 'user.created') {
      throw new Error('Event type is not user.created');
    }

    const { id, email_addresses } = event.data;

    try {
      // Cerca se l'utente esiste già tramite clerkId
      const existingUser = await prisma.user.findFirst({
        where: { clerkId: id }
      });

      if (existingUser) {
        console.log(`Utente già esistente: ${id}`);
        return existingUser;
      }

      // Crea nuovo utente
      const newUser = await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0]?.email_address || '',
        },
      });
      
      console.log(`Utente creato con successo: ${id}`);
      return newUser;
    } catch (error) {
      console.error('Errore nella creazione dell\'utente:', error);
      throw error;
    }
  }

  async handleEvent(event: UserWebhookEvent) {
    if (event.type === 'user.created') {
      return await this.handleUserCreated(event);
    } else {
      console.log(`Tipo di evento non gestito: ${event.type}`);
      throw new Error(`Evento non supportato: ${event.type}`);
    }
  }
} 