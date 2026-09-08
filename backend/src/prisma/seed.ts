import { db } from "./db.js";

async function main() {
  await db.orm.public.User.create({
    id: "user-1",
    email: "user1@homeops.dev",
    name: "Konrad",
  });

  await db.orm.public.User.create({
    id: "user-2",
    email: "user2@homeops.dev",
    name: "User 2",
  });

  await db.orm.public.Household.create({
    id: "home-001",
    name: "Mieszkanie",
  });

  await db.orm.public.HouseholdMember.create({
    id: crypto.randomUUID(),
    householdId: "home-001",
    userId: "user-1",
    role: "OWNER",
  });

  await db.orm.public.HouseholdMember.create({
    id: crypto.randomUUID(),
    householdId: "home-001",
    userId: "user-2",
    role: "MEMBER",
  });

  await db.orm.public.HouseholdPoints.create({
    id: crypto.randomUUID(),
    householdId: "home-001",
    userId: "user-1",
    points: 125,
  });

  await db.orm.public.HouseholdPoints.create({
    id: crypto.randomUUID(),
    householdId: "home-001",
    userId: "user-2",
    points: 80,
  });

  console.log("Seed completed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});