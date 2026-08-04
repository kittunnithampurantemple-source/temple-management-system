import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🛕 Seeding poojas...');

  // Delete existing poojas first to avoid duplicates
  await prisma.pooja.deleteMany({});
  console.log('🗑️  Cleared existing poojas.');

  const poojas = [
    {
      name: 'പൂജ രസീതി',
      nameEn: 'Pooja Receipt',
      description: 'അടിസ്ഥാന പൂജ രസീതി. Basic pooja registration receipt for the devotee.',
      price: 20.00,
      durationMinutes: 15,
      sortOrder: 1,
    },
    {
      name: 'അർഘ്യൻ / അർച്ചന',
      nameEn: 'Arghyan / Archana',
      description: 'ദേവതയ്ക്ക് പുഷ്പം കൊണ്ട് അർച്ചന. Offering of flowers and prayers to the deity with chanting of names.',
      price: 20.00,
      durationMinutes: 20,
      sortOrder: 2,
    },
    {
      name: 'രക്തപുഷ്പാഞ്ജലി',
      nameEn: 'Raktha Pushpanjali',
      description: 'ചുവന്ന പൂക്കൾ ഉപയോഗിച്ച് ദേവിക്ക് അഞ്ജലി. Offering of red flowers to the Goddess for blessings and prosperity.',
      price: 20.00,
      durationMinutes: 20,
      sortOrder: 3,
    },
    {
      name: 'ഭാഗ്യസൂക്തം',
      nameEn: 'Bhagya Suktham',
      description: 'ഭാഗ്യം, സമൃദ്ധി, ഐശ്വര്യം എന്നിവയ്ക്കായി ഭാഗ്യസൂക്തം ജപം. Chanting of Bhagya Suktham for good fortune, prosperity and abundance.',
      price: 51.00,
      durationMinutes: 30,
      sortOrder: 4,
    },
    {
      name: 'ശത്രുദോഷ നിവൃത്തി',
      nameEn: 'Shatrudosha Nivrutti',
      description: 'ശത്രുക്കളിൽ നിന്നുള്ള ദോഷം അകറ്റാൻ. Pooja performed to remove the evil effects of enemies and negative energies.',
      price: 250.00,
      durationMinutes: 45,
      sortOrder: 5,
    },
    {
      name: 'അഭിഷേകം (കൊടൂ പൂജ)',
      nameEn: 'Abhishekam (Special Pooja)',
      description: 'പ്രത്യേക അഭിഷേകം, ഉദ്ദിഷ്ടകാര്യ സിദ്ധിക്കായി. Special abhishekam performed for fulfilment of desired wishes and liberation from sins.',
      price: 1001.00,
      durationMinutes: 90,
      sortOrder: 6,
    },
    {
      name: 'പായസം (നിവേദ്യം)',
      nameEn: 'Payasam Naivedyam',
      description: 'ദേവന് പായസം നേദിക്കൽ. Sweet rice pudding offered as naivedyam to the deity for blessings.',
      price: 200.00,
      durationMinutes: 30,
      sortOrder: 7,
    },
    {
      name: 'ഊരൺ / ഗണ്ഡ',
      nameEn: 'Uran / Ganda',
      description: 'ദേവതയ്ക്ക് പ്രത്യേക നൈവേദ്യ പൂജ. Special naivedya pooja offered to the deity for blessing the household.',
      price: 201.00,
      durationMinutes: 30,
      sortOrder: 8,
    },
    {
      name: 'ഗണപതി ഹോമം',
      nameEn: 'Ganapathi Homam',
      description: 'ഗണേശഭഗവാന്റെ അനുഗ്രഹത്തിനായി ഹോമം. Homam performed for Lord Ganapathi to remove obstacles and bring auspiciousness.',
      price: 501.00,
      durationMinutes: 60,
      sortOrder: 9,
    },
    {
      name: 'ദ്വജ / ദ്ര്‍ക്ഷ്ടി',
      nameEn: 'Dvaja / Drishti',
      description: 'ദൃഷ്ടിദോഷം അകറ്റാൻ. Pooja performed to remove evil eye (drishti) and protect from negative influences.',
      price: 101.00,
      durationMinutes: 30,
      sortOrder: 10,
    },
    {
      name: 'വീട് / തൊട്ടിൽ വഷ്ടി',
      nameEn: 'Veedu / Thotil Pooja',
      description: 'വീടിന്റെ ഐശ്വര്യത്തിനും കുട്ടിയുടെ ആരോഗ്യത്തിനും. House blessing pooja or cradle ceremony pooja for prosperity and child\'s wellbeing.',
      price: 101.00,
      durationMinutes: 45,
      sortOrder: 11,
    },
    {
      name: 'ഭൂതബലി',
      nameEn: 'Bhoota Bali',
      description: 'ഭൂതദോഷ നിവൃത്തിക്ക്. Offering performed to appease spirits and remove their negative effects.',
      price: 51.00,
      durationMinutes: 30,
      sortOrder: 12,
    },
    {
      name: 'ഒരു ദിവസ പൂജ',
      nameEn: 'One Day Pooja',
      description: 'ഒരു ദിവസം മുഴുവൻ ദേവനെ ആരാധിക്കൽ. Full day pooja dedicated to the deity with all rituals performed throughout the day.',
      price: 1250.00,
      durationMinutes: 480,
      sortOrder: 13,
    },
    {
      name: 'കൂടി (ഒഴ)',
      nameEn: 'Koodi (Small)',
      description: 'ചെറിയ കൂടി. Small group pooja offering with devotees together.',
      price: 51.00,
      durationMinutes: 20,
      sortOrder: 14,
    },
    {
      name: 'കൂടി (വലിയ)',
      nameEn: 'Koodi (Large)',
      description: 'വലിയ കൂടി. Large group pooja offering with extended rituals and devotees.',
      price: 101.00,
      durationMinutes: 30,
      sortOrder: 15,
    },
    {
      name: 'സുദർശനം',
      nameEn: 'Sudarshana',
      description: 'ഭഗവാൻ വിഷ്ണുവിന്റെ സുദർശനചക്രത്തിനോടുള്ള ആരാധന. Worship of Lord Vishnu\'s Sudarshana Chakra for protection from evil.',
      price: 301.00,
      durationMinutes: 45,
      sortOrder: 16,
    },
    {
      name: 'ദേവദായ പ്രതിഷ്ഠ',
      nameEn: 'Devadaya Pratishtha',
      description: 'ഭക്തി പൂർവ്വം ദേവനു സമർപ്പിക്കൽ. Devotional offering made to the deity with full dedication on behalf of the family.',
      price: 151.00,
      durationMinutes: 30,
      sortOrder: 17,
    },
    {
      name: 'പൊടി / കണിര',
      nameEn: 'Podi / Kanira',
      description: 'ദേവതയ്ക്ക് ചുരുങ്ങിയ നൈവേദ്യം. Minimal offering made to the deity as a simple act of devotion.',
      price: 10.00,
      durationMinutes: 10,
      sortOrder: 18,
    },
  ];

  for (const pooja of poojas) {
    await prisma.pooja.create({ data: pooja });
    console.log(`✅ Added: ${pooja.nameEn} (₹${pooja.price})`);
  }

  console.log('\n🎉 All poojas seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
