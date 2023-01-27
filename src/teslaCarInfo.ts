/** @format */

export interface carStats {
  range: number;
  seating: number;
  capacity: number;
  drive: string;
  acceleration: number;
  topSpeed: number;
}
export interface carData {
  id: number;
  title: string;
  backgroundImg: string;
  backgroundImg2: string;
  description: string;
  description2: string;
  description3: string;
  description4: string;
  stats: carStats;
  price: number;
  inStock: boolean;
  highlights: string[];
  quantity: number;
  ref: React.RefObject<HTMLDivElement> | null;
}

export const carsData: carData[] = [
  {
    id: 1,
    title: "Model 3",
    backgroundImg: "model-3.jpg",
    backgroundImg2: "model-3-2.jpg",
    description:
      "Model 3 comes with the option of dual motor all-wheel drive, 20” Überturbine Wheels and Performance Brakes for total control in all weather conditions. A carbon fiber spoiler improves stability at high speeds, all allowing Model 3 to accelerate from 0-60 mph* in as little as 3.1 seconds. Chat with a Tesla Advisor to learn more about Model 3 or schedule a demo drive today.",
    description2:
      "Tesla All-Wheel Drive has two independent motors for improved redundancy, each with only one moving part for minimal maintenance and maximum durability. Unlike traditional all-wheel drive systems, they digitally control torque to the front and rear wheels for far better handling and traction control.",
    description3:
      "Model 3 is fully electric, so you never need to visit a gas station again.If you charge overnight at home, you can wake up to a full battery every morning.And when you're on the road, it's easy to plug in along the way—at any public station or with the Tesla charging network.We currently have over 40, 000 Superchargers worldwide, with six new locations opening every week.Chat with a Tesla Advisor to learn more about Model 3 or schedule a demo drive today.",
    description4:
      "The inside of Model 3 is unlike any other car.You can use your smartphone as a key, and access all driver controls in the central 15-inch touchscreen.The all- glass roof extends from front to back, creating a sense of openness from every seat.",
    stats: {
      range: 272,
      seating: 5,
      capacity: 23,
      drive: "RWD",
      acceleration: 5.8,
      topSpeed: 140,
    },
    price: 43990,
    inStock: true,
    highlights: [
      "Auto Lane Change",
      "Autopark",
      "Summon",
      "Full Self-Driving Computer",
      "Traffic Light and Stop Sign Control",
    ],
    quantity: 1,
    ref: null,
  },
  {
    id: 2,
    title: "Model Y",
    inStock: true,
    backgroundImg: "model-y.jpg",
    backgroundImg2: "model-y-2.jpg",
    description:
      "Model Y provides maximum versatility—able to carry 7 passengers and their cargo. Each second row seat folds flat independently, creating flexible storage for skis, furniture, luggage and more. The liftgate opens to a low trunk floor that makes loading and unloading easy and quick.",
    description2:
      "Tesla All-Wheel Drive has two ultra-responsive, independent electric motors that digitally control torque to the front and rear wheels—for far better handling, traction and stability control. Model Y is capable in rain, snow, mud and off-road.",
    description3:
      "Model Y is fully electric, so you never need to visit a gas station again.If you charge overnight at home, you can wake up to a full battery every morning.And when you're on the road, it's easy to plug in along the way—at any public station or with the Tesla charging network.We currently have over 40, 000 Superchargers worldwide, with six new locations opening every week.Chat with a Tesla Advisor to learn more about Model Y or schedule a demo drive today.",
    description4:
      "With an elevated seating position and low dash, the driver has a commanding view of the road ahead.The interior of Model Y is simple and clean, with a 15-inch touch screen, immersive sound system and an expansive all- glass roof that creates extra headroom and provides a seamless view of the sky.",
    stats: {
      range: 330,
      seating: 7,
      capacity: 76,
      drive: "AWD",
      acceleration: 4.8,
      topSpeed: 135,
    },
    price: 53490,
    highlights: [
      "Auto Lane Change",
      "Autopark",
      "Summon",
      "Full Self-Driving Computer",
      "Traffic Light and Stop Sign Control",
    ],
    quantity: 1,
    ref: null,
  },
  {
    id: 3,
    title: "Model S",
    backgroundImg: "model-s.jpg",
    backgroundImg2: "model-s.jpg",
    description:
      "With a drag coefficient of just .208 Cd, the lowest on the planet, Model S is built for speed, endurance and range. Improved aerodynamics and a wider chassis offer more responsive performance so you can take corners quicker and with more confidence.",
    description2:
      "Model S platforms unite powertrain and battery technologies for unrivaled performance, range and efficiency.New module and pack thermal architecture allows faster charging and gives you more power and endurance in all conditions.",
    description3:
      "Model S Plaid has the quickest acceleration of any vehicle in production.Updated battery architecture for all Model S trims enables back- to - back track runs without performance degradation.Chat with a Tesla Advisor to learn more about Model S or schedule a demo drive today.",
    description4:
      "Model S is built from the ground up as an electric vehicle, with a high - strength architecture and floor - mounted battery pack for incredible occupant protection and low rollover risk.Every new Model S includes Tesla's latest active safety features, such as Automatic Emergency Braking, at no extra cost.",
    stats: {
      range: 405,
      seating: 5,
      capacity: 28,
      drive: "AWD",
      acceleration: 3.1,
      topSpeed: 149,
    },
    price: 94990,
    inStock: false,
    highlights: [
      "Navigate on Autopilot",
      "Auto Lane Change",
      "Autopark",
      "Summon",
      "Full Self-Driving Computer",
      "Traffic Light and Stop Sign Control",
    ],
    quantity: 1,
    ref: null,
  },
  {
    id: 4,
    title: "Model X",
    backgroundImg: "model-x-2.jpg",
    backgroundImg2: "model-x.jpg",
    description:
      "Model X platforms unite powertrain and battery technologies for an unrivaled combination of performance, range and efficiency. New module and pack thermal architecture allows for faster charging and gives you more power and endurance in all conditions.",
    description2:
      "With ample storage and 5,000 lbs of towing capacity, Model X is built for maximum utility. Front doors open and close automatically, Falcon Wing rear doors allow for easier loading and a trailer hitch comes standard, so you can bring your gear with you wherever you go.",
    description3:
      "With up to 348 miles of estimated range and access to the world’s largest and most powerful fast charging network, you’ll spend less time plugged in and more time on the road. Chat with a Tesla Advisor to learn more about Model X or schedule a demo drive today.",
    description4:
      "Model X has a drag coefficient of just .24 Cd, the lowest of any production SUV on the planet. Refined aerodynamic elements work together with new wheels and tires to help you travel farther, with sharper handling and better ride comfort.",
    stats: {
      range: 348,
      seating: 7,
      capacity: 88,
      drive: "AWD",
      acceleration: 3.8,
      topSpeed: 155,
    },
    price: 109990,
    inStock: true,
    highlights: [
      "Auto Lane Change",
      "Autopark",
      "Summon",
      "Full Self-Driving Computer",
      "Traffic Light and Stop Sign Control",
    ],
    quantity: 1,
    ref: null,
  },
];
