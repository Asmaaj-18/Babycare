import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create a sample user
  const user = await prisma.user.create({
    data: {
      email: 'parent@example.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      userType: 'PARENT',
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // Create a sample baby
  const baby = await prisma.baby.create({
    data: {
      firstName: 'Emma',
      lastName: 'Doe',
      birthDate: new Date('2024-01-15'),
      birthWeight: 3.2,
      birthHeight: 50.0,
      gender: 'FEMALE',
    },
  });

  console.log(`✅ Created baby: ${baby.firstName} ${baby.lastName}`);

  // Link user to baby
  await prisma.babyUser.create({
    data: {
      babyId: baby.id,
      userId: user.id,
      relationshipType: 'parent',
      accessLevel: 'FULL',
    },
  });

  console.log('✅ Linked user to baby');

  console.log('🌱 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });