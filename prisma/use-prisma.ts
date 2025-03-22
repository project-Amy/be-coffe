import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from "dotenv";
dotenv.config();

export const prisma = new PrismaClient().$extends(withAccelerate())