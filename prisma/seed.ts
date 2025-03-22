import { prisma } from "./use-prisma";

async function main() {
  const coffees = [
    {
      name: "Espresso",
      price: 2.5,
      description:
        "A concentrated coffee brewed by forcing hot water under pressure through finely ground coffee beans. Strong, rich and aromatic.",
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=1.png",
    },
    {
      name: "Cappuccino",
      price: 3.5,
      description:
        "A classic Italian coffee drink prepared with equal parts espresso, steamed milk, and milk foam. Creamy and balanced.",
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=2.png",
    },
    {
      name: "Flat White",
      price: 3.8,
      description:
        "An espresso-based drink with steamed milk and a thin layer of microfoam. Stronger coffee flavor than a latte with a velvety texture.",
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=3.png",
    },
    {
      name: "Caffè Mocha",
      price: 4.2,
      description:
        "A chocolate-flavored variant of a latte, combining espresso, steamed milk, and chocolate syrup, often topped with whipped cream.",
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=4.png",
    },
    {
      name: "Americano",
      price: 3.0,
      description:
        "Espresso diluted with hot water, resulting in a coffee similar in strength but different in flavor from drip coffee.",
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=5.png",
    },
    {
      name: "Macchiato",
      price: 3.2,
      description:
        'An espresso "stained" or "marked" with a small amount of milk or milk foam. Bold espresso flavor with a hint of creaminess.',
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=5.png",
    },
    {
      name: "Latte",
      price: 3.9,
      description:
        "Coffee made with espresso and steamed milk, with a small layer of foam on top. Creamy and mild in flavor.",
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=5.png",
    },
    {
      name: "Affogato",
      price: 4.5,
      description:
        'A scoop of vanilla ice cream "drowned" with a shot of hot espresso. A perfect marriage of hot and cold, bitter and sweet.',
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=5.png",
    },
    {
      name: "Cold Brew",
      price: 4.0,
      description:
        "Coffee brewed with cold water over an extended time, resulting in a smooth, less acidic coffee concentrate served chilled.",
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=5.png",
    },
    {
      name: "Turkish Coffee",
      price: 3.7,
      description:
        "Very finely ground coffee beans boiled in a pot, often with sugar, and served unfiltered. Rich, strong and distinctive.",
      image:
        "https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets//Property%201=Coffee,%20Property%202=5.png",
    },
  ];

  for (const coffee of coffees) {
    await prisma.coffee.create({
      data: coffee,
    });
  }

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
