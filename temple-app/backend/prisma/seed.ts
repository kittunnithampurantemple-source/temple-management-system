import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // ---------------- Admin user ----------------
  const adminPasswordHash = await bcrypt.hash('ChangeMe@123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@yourtemple.org' },
    update: {},
    create: {
      email: 'admin@yourtemple.org',
      passwordHash: adminPasswordHash,
      fullName: 'Temple Admin',
      role: 'ADMIN',
    },
  });

  // ---------------- Poojas ----------------
  // Transcribed from the temple's notice board (Malayalam + English).
  // A few rows on the original board were unclear due to glare - those are
  // marked with `// CONFIRM` below; please verify name/price and edit before
  // going live.
  const poojas = [
    { name: 'പൂജ ദക്ഷിണ', nameEn: 'Pooja Dakshina', price: 20, sortOrder: 1 },
    { name: 'അർച്ചന', nameEn: 'Archana', price: 20, sortOrder: 2 },
    { name: 'രക്തപുഷ്പാഞ്ജലി', nameEn: 'Rakta Pushpanjali', price: 20, sortOrder: 3 },
    { name: 'ഭാഗ്യസൂക്തം', nameEn: 'Bhagyasooktham', price: 51, sortOrder: 4 },
    { name: 'ശത്രുദോഷ ശാന്തി', nameEn: 'Shatru Dosha Shanti', price: 250, sortOrder: 5 },
    { name: 'അമാവാസി പൂജ', nameEn: 'Amavasi Pooja', price: 1001, sortOrder: 6 },
    { name: 'പായസം നിവേദ്യം', nameEn: 'Payasam Nivedyam', price: 200, sortOrder: 7 },
    { name: 'ചോറൂണ്', nameEn: 'Choroonu', price: 201, sortOrder: 8 },
    { name: 'CONFIRM - unclear on board', nameEn: 'CONFIRM - unclear on board', price: 501, sortOrder: 9, isActive: false },
    { name: 'CONFIRM - unclear on board', nameEn: 'CONFIRM - unclear on board', price: 101, sortOrder: 10, isActive: false },
    { name: 'വീട്/തൊടിയിൽ വഴിപാട്', nameEn: 'Veedu/Thottil Vazhipadu', price: 101, sortOrder: 11 },
    { name: 'മൂട് അറക്കൽ', nameEn: 'Moodu Arakkal', price: 51, sortOrder: 12 },
    { name: 'ഒരു ദിവസ പൂജ', nameEn: 'Oru Divasa Pooja', price: 1250, sortOrder: 13 },
    { name: 'കൂട് ജപം', nameEn: 'Koodu Japam', price: 51, sortOrder: 14 },
    { name: 'CONFIRM - unclear on board', nameEn: 'CONFIRM - Koodu (second word unclear)', price: 101, sortOrder: 15, isActive: false },
    { name: 'സുദർശനം', nameEn: 'Sudarshanam', price: 301, sortOrder: 16 },
    { name: 'ഭഗവതിക്ക് പട്ട് സമർപ്പണം', nameEn: 'Bhagavathikku Pattu Samarpanam', price: 151, sortOrder: 17 },
    { name: 'CONFIRM - unclear on board', nameEn: 'CONFIRM - unclear on board', price: 10, sortOrder: 18, isActive: false },
  ];

  for (const p of poojas) {
    const existing = await prisma.pooja.findFirst({ where: { nameEn: p.nameEn, sortOrder: p.sortOrder } });
    if (!existing) {
      await prisma.pooja.create({
        data: {
          name: p.name,
          nameEn: p.nameEn,
          price: p.price,
          sortOrder: p.sortOrder,
          isActive: p.isActive ?? true,
          description: '',
        },
      });
    }
  }

  console.log('Seed complete. Admin login: admin@yourtemple.org / ChangeMe@123 (change immediately).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
