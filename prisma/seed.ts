import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Discord',
          content: 'https://pris.ly/discord',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
];

const deliveryData: Prisma.DeliveryCreateInput[] = [
  {
    hospital: 'City Hospital',
    deviceName: 'Heart Monitor',
    status: 'PENDING',
  },
  {
    hospital: 'General Hospital',
    deviceName: 'X-Ray Machine',
    status: 'IN_TRANSIT',
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 48 hours ago
  },
  {
    hospital: 'Central Clinic',
    deviceName: 'Ultrasound Device',
    status: 'DELIVERED',
  },
  {
    hospital: 'Downtown Medical Center',
    deviceName: 'MRI Scanner',
    status: 'PENDING',
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 48 hours ago
  },
  {
    hospital: 'Suburban Health Facility',
    deviceName: 'CT Scanner',
    status: 'IN_TRANSIT',
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.delivery.deleteMany();

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const d of deliveryData) {
    const delivery = await prisma.delivery.create({
      data: d,
    });
    console.log(`Created delivery with id: ${delivery.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
