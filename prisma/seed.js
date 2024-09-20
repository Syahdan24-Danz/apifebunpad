import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Untuk mengenkripsi password

const prisma = new PrismaClient();

// Data dummy untuk Admin
const admins = [
  {
    name: "Admin One",
    email: "admin1@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Two",
    email: "admin2@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Three",
    email: "admin3@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Four",
    email: "admin4@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Five",
    email: "admin5@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Six",
    email: "admin6@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Seven",
    email: "admin7@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Eight",
    email: "admin8@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Nine",
    email: "admin9@example.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Admin Ten",
    email: "admin10@example.com",
    password: "password123",
    role: "ADMIN",
  },
];

async function main() {
  // Mengenkripsi password
  const hashedAdmins = await Promise.all(
    admins.map(async (admin) => ({
      ...admin,
      password: await bcrypt.hash(admin.password, 10),
    }))
  );

  console.log("Data yang akan dimasukkan:", hashedAdmins);

  // Mengisi data dummy ke database menggunakan createMany
  try {
    await prisma.admin.createMany({
      data: hashedAdmins,
      skipDuplicates: true, // Jika ada data duplikat, lewati
    });
    console.log("10 admin dummy telah ditambahkan.");
  } catch (error) {
    if (error.code === "P2002") {
      console.error("Ada data dengan email yang sama. Data tidak ditambahkan.");
    } else {
      console.error("Error inserting data:", error);
    }
  }
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
