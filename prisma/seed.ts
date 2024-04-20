import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { user_id: 1 },
    update: {},
    create: {
      user_id: 1,
      username: 'user_1',
      email: 'user1@gmail.com',
      password: 'hello123',
    },
  });

  console.log(user1);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
