import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.deleteMany();
  await prisma.attendee.deleteMany();

  const eventsData = [
    {
      id: "8165554f-3765-48d2-995c-edce439b937b",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "An event for devs with a passion for code!",
      maximumAttendees: 80,
    },
    {
      id: "d43fc168-d7b8-42fe-a17f-37287d24992c",
      title: "Code Fest",
      slug: "code-fest",
      details: "Coding festival for technology enthusiasts!",
      maximumAttendees: 70,
    },
    {
      id: "692b89fd-51df-4f90-81f9-4760882dced8",
      title: "Dev Con",
      slug: "dev-con",
      details: "Conference for software developers!",
      maximumAttendees: 100,
    },
  ];

  // Creating events
  for (const eventData of eventsData) {
    await prisma.event.create({
      data: eventData,
    });
  }

  const attendeesToInsert: Prisma.AttendeeUncheckedCreateInput[] = [];

  // Generate participants for each event
  for (const event of eventsData) {
    for (let i = 0; i < event.maximumAttendees - 30; i++) {
      attendeesToInsert.push({
        id: faker.number.int({ min: 10000, max: 99999 }),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        eventId: event.id,
        createdAt: faker.date.recent({
          days: 30,
          refDate: dayjs().subtract(8, "days").toDate(),
        }),
        checkIn: faker.helpers.arrayElement<
          Prisma.CheckInUncheckedCreateNestedOneWithoutAttendeeInput | undefined
        >([
          undefined,
          {
            create: {
              createdAt: faker.date.recent({ days: 7 }),
            },
          },
        ]),
      });
    }
  }

  // Insert participants
  await Promise.all(
    attendeesToInsert.map((attendee) => {
      return prisma.attendee.create({
        data: attendee,
      });
    })
  );
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
