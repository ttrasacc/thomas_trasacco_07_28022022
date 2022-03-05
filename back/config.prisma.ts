import { PrismaClient } from '@prisma/client';

// Add prisma to the global type
declare global {
	var prisma: PrismaClient;
}
  
// Prevent multiple instances of Prisma Client in development
 const prisma = global.prisma || new PrismaClient()
  
global.prisma = prisma
  
export default prisma
