import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.job.deleteMany();

  await prisma.job.createMany({
    data: [
      {
        company: "Google",
        role: "Sr. UX Designer",
        location: "New York",
        employment: "Fulltime",
        experience: "3 years exp.",
        salaryPerMonth: 50000,
        colorHex: "#D6F94B",
        description:
          "UX designers are the synthesis of design and development. Partner with researchers and product teams to ship meaningful experiences.",
        requirements: [
          "3 years experience",
          "Degree in design, psychology, HCI or related",
          "Strong interaction and visual design skills"
        ]
      },
      {
        company: "Airbnb",
        role: "Project Manager",
        location: "Sydney",
        employment: "Part-time",
        experience: "1-5 years exp.",
        salaryPerMonth: 25000,
        colorHex: "#FF3E58",
        description:
          "Lead cross-functional workstreams and keep the delivery cycle healthy for distributed teams.",
        requirements: [
          "2+ years project delivery experience",
          "Excellent stakeholder communication",
          "Comfort with agile planning"
        ]
      },
      {
        company: "Spotify",
        role: "Graphic Designer",
        location: "Remote",
        employment: "Fulltime",
        experience: "Freshers",
        salaryPerMonth: 7000,
        colorHex: "#D6F94B",
        description:
          "Develop visual systems and campaign graphics for product and brand touchpoints.",
        requirements: [
          "Portfolio of design work",
          "Proficiency in Figma and Adobe suite",
          "Understanding of brand systems"
        ]
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
