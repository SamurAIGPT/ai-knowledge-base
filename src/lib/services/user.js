import { prisma } from "../prisma";

export const UserService = {
  async checkCredits(userId, amount) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User profile not found in database.");
    return user.credits >= amount;
  },

  async deductCredits(userId, amount) {
    if (amount <= 0) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User profile not found in database.");
      return user;
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User profile not found in database.");
    if (user.credits < amount) throw new Error(`Insufficient credits. Required: ${amount}, Remaining: ${user.credits}`);

    return await prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: amount } }
    });
  },

  async addCredits(userId, amount) {
    return await prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } }
    });
  }
};
