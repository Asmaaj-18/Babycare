import { PrismaClient, Role, VaccineStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  //////////////////////////////////////////////////////
  // 🔐 PASSWORDS
  //////////////////////////////////////////////////////
  const parentPassword = await bcrypt.hash("parent123", 10);
  const doctorPassword = await bcrypt.hash("doctor123", 10);

  //////////////////////////////////////////////////////
  // 👩‍👦 CREATE PARENTS
  //////////////////////////////////////////////////////
  const parent1 = await prisma.user.create({
    data: {
      name: "Asma Parent",
      email: "parent1@test.com",
      password: parentPassword,
      role: Role.PARENT,
    },
  });

  const parent2 = await prisma.user.create({
    data: {
      name: "Sara Parent",
      email: "parent2@test.com",
      password: parentPassword,
      role: Role.PARENT,
    },
  });

  //////////////////////////////////////////////////////
  // 👨‍⚕️ CREATE DOCTORS
  //////////////////////////////////////////////////////
  const doctor1 = await prisma.user.create({
    data: {
      name: "Dr Ahmed",
      email: "doctor1@test.com",
      password: doctorPassword,
      role: Role.DOCTOR,
    },
  });

  const doctor2 = await prisma.user.create({
    data: {
      name: "Dr Youssef",
      email: "doctor2@test.com",
      password: doctorPassword,
      role: Role.DOCTOR,
    },
  });

  //////////////////////////////////////////////////////
  // 👶 CREATE BABIES
  //////////////////////////////////////////////////////
  const baby1 = await prisma.baby.create({
    data: {
      name: "Adam",
      birthDate: new Date("2024-01-10"),
      gender: "Male",
      parentId: parent1.id,
    },
  });

  const baby2 = await prisma.baby.create({
    data: {
      name: "Lina",
      birthDate: new Date("2024-03-15"),
      gender: "Female",
      parentId: parent2.id,
    },
  });

  //////////////////////////////////////////////////////
  // 😴 SLEEP RECORDS
  //////////////////////////////////////////////////////
  await prisma.sleep.createMany({
    data: [
      {
        startTime: new Date("2025-02-10T20:00:00"),
        endTime: new Date("2025-02-11T06:00:00"),
        note: "Bonne nuit complète",
        babyId: baby1.id,
      },
      {
        startTime: new Date("2025-02-11T13:00:00"),
        endTime: new Date("2025-02-11T15:00:00"),
        note: "Sieste après-midi",
        babyId: baby2.id,
      },
    ],
  });

  //////////////////////////////////////////////////////
  // 📏 GROWTH RECORDS
  //////////////////////////////////////////////////////
  await prisma.growth.createMany({
    data: [
      {
        weight: 8.2,
        height: 70,
        headSize: 45,
        babyId: baby1.id,
      },
      {
        weight: 7.5,
        height: 67,
        headSize: 43,
        babyId: baby2.id,
      },
    ],
  });

  //////////////////////////////////////////////////////
  // 💉 VACCINES
  //////////////////////////////////////////////////////
  await prisma.vaccine.createMany({
    data: [
      {
        name: "BCG",
        date: new Date("2024-02-01"),
        status: VaccineStatus.DONE,
        babyId: baby1.id,
      },
      {
        name: "Polio",
        date: new Date("2024-03-01"),
        status: VaccineStatus.PENDING,
        babyId: baby1.id,
      },
      {
        name: "MMR",
        date: new Date("2024-05-01"),
        status: VaccineStatus.DONE,
        babyId: baby2.id,
      },
    ],
  });

  //////////////////////////////////////////////////////
  // 💬 COMMENTS (Doctor actions)
  //////////////////////////////////////////////////////
  await prisma.comment.createMany({
    data: [
      {
        content: "Le bébé est en excellente santé.",
        babyId: baby1.id,
        authorId: doctor1.id,
      },
      {
        content: "Courbe de croissance parfaite.",
        babyId: baby2.id,
        authorId: doctor2.id,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
