import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@kittunnitemple.com';
  const password = 'Temple@Admin123';

  console.log('🛕 Creating admin user...');

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Update to ensure it has ADMIN role
    await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
    console.log('✅ Existing user updated to ADMIN role!');
    console.log(`📧 Email: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      fullName: 'Temple Administrator',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Admin user created successfully!');
  console.log(`📧 Email   : ${email}`);
  console.log(`🔑 Password: ${password}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
