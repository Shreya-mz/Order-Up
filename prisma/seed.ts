import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Cleaning database...")
  // Order delete karna zaroori hai pehle kyunki wo baaki tables se linked hain
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.foodCourt.deleteMany()
  await prisma.campus.deleteMany()

  console.log("Seeding all 15 KIIT Campuses...")

  // Ek common menu define kar lete hain jo har jagah dikhega
  const commonMenu = [
    { name: "Chicken Biryani", price: 160, description: "Classic KIIT Special" },
    { name: "Masala Patties", price: 20, description: "Crunchy evening snack" },
    { name: "Paneer Butter Masala", price: 120, description: "Rich gravy" },
    { name: "Butter Naan", price: 30, description: "Soft and hot" },
    { name: "Cold Coffee", price: 50, description: "Best for summers" },
    { name: "Chicken Roll", price: 70, description: "Quick bite" }
  ]

  // Loop chalao 1 se 15 tak
  for (let i = 1; i <= 15; i++) {
    await prisma.campus.create({
      data: {
        campusNumber: i,
        foodCourts: {
          create: [
            {
              // Campus 6 aur 3 ke liye purane naam, baaki ke liye generic FC name
              name: i === 6 ? "FC-6 (Biotec)" : i === 3 ? "King's Palace (FC-3)" : `FC-Campus ${i}`,
              menuItems: {
                create: commonMenu
              }
            }
          ]
        }
      }
    })
  }

  // Ek Test User bhi bana lo taaki order fail na ho
  await prisma.user.create({
    data: {
      id: "test-user-id", // Is ID ko humne Cart page mein use kiya hai
      name: "Kiitian Student",
      email: "test@kiit.ac.in",
      password: "password123"
    }
  })

  console.log("Database seeded with 15 campuses! 🚀")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })