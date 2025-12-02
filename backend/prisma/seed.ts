import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Current directory:', process.cwd());

  const filePath = path.join(process.cwd(), 'prisma', 'seed.json');

  if (!fs.existsSync(filePath)) {
    throw new Error(`Seed file not found at ${filePath}`);
  }

  const jsonData = fs.readFileSync(filePath, 'utf-8');
  let employees = JSON.parse(jsonData);

  employees = employees.map((emp: any) => ({
    ...emp,
    employed: new Date(emp.employed).toISOString(),
  }));

  await prisma.employee.deleteMany({});

  const result = await prisma.employee.createMany({
    data: employees,
    skipDuplicates: true,
  });

  console.log('Seeded employees:', result);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
