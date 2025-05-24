import { UserWebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";

export default function verifyEvent(event: UserWebhookEvent) {

  const secret = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";
  
  // These were all sent from the server
  const headers = {
    "svix-id": "msg_p5jXN8AQM9LWM0D4loKWxJek",
    "svix-timestamp": "1614265330",
    "svix-signature": "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",
  };
  const payload = '{"test": 2432232314}';
  
  const wh = new Webhook(secret);
  // Throws on error, returns the verified content on success
  const verified = wh.verify(payload, headers);
  return verified;
}
