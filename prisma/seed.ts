import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passwordUser1 = await bcrypt.hash('hello123', roundsOfHashing);
  const passwordUser2 = await bcrypt.hash('hello123', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { user_id: 1 },
    update: {
      password: passwordUser2,
    },
    create: {
      user_id: 1,
      username: 'user_1',
      email: 'user1@gmail.com',
      password: passwordUser1,
    },
  });
  const user2 = await prisma.user.upsert({
    where: { user_id: 2 },
    update: {
      password: passwordUser2,
    },
    create: {
      user_id: 1,
      username: 'user_2',
      email: 'user2@gmail.com',
      password: passwordUser2,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { user_id: 3 },
    update: {
      password: passwordUser2,
    },
    create: {
      user_id: 1,
      username: 'user_3',
      email: 'user3@gmail.com',
      password: passwordUser2,
    },
  });

  const document1 = await prisma.document.upsert({
    update: {},
    create: {
      document_id: 1,
      user_id: user1.user_id,
      title: 'Document 1',
      description: 'Description 1',
      file_path: 'http://google.com',
      upload_date: new Date(),
    },
    where: { document_id: 1 },
  });

  const sharedDocument1 = await prisma.sharing.upsert({
    where: { sharing_id: 1 },
    update: {},
    create: {
      sharing_id: 1,
      document_id: document1.document_id,
      shared_with_user_id: user2.user_id,
      shared_by_user_id: user1.user_id,
      permission_level: 'Read',
    },
  });

  console.log(user1, document1, sharedDocument1);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
