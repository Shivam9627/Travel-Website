import mongoose from 'mongoose';

export const seedDestinations = [
  {
    _id: "64f0a1b2c3d4e5f678901201",
    name: "Bali, Indonesia",
    tag: "Island",
    rating: 4.9,
    country: "Indonesia",
    description: "Rice terraces, volcanic beaches, and vibrant culture — ideal for wellness retreats and surf breaks.",
    price: 189,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ca1?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Surfing", "Yoga", "Temple Tours", "Beach Clubs"],
    region: "Asia"
  },
  {
    _id: "64f0a1b2c3d4e5f678901202",
    name: "Kyoto, Japan",
    tag: "Culture",
    rating: 4.95,
    country: "Japan",
    description: "Ancient temples, bamboo groves, and seasonal cherry blossoms — Japan’s cultural heart.",
    price: 249,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490806678282-46289c1763ff?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Temple Hopping", "Tea Ceremony", "Arashiyama Bamboo Grove", "Gion District"],
    region: "Asia"
  },
  {
    _id: "64f0a1b2c3d4e5f678901203",
    name: "Santorini, Greece",
    tag: "Luxury",
    rating: 4.85,
    country: "Greece",
    description: "Whitewashed villages, caldera sunsets, and Aegean blues — the postcard-perfect Cyclades.",
    price: 329,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469796466635-455ede028ace?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Sunset Cruise", "Wine Tasting", "Oia Village Walk", "Beach Relaxation"],
    region: "Europe"
  },
  {
    _id: "64f0a1b2c3d4e5f678901204",
    name: "Banff, Canada",
    tag: "Nature",
    rating: 4.88,
    country: "Canada",
    description: "Turquoise lakes, Rocky peaks, and wildlife — adventure in a UNESCO World Heritage setting.",
    price: 279,
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Hiking", "Lake Louise Visit", "Hot Springs", "Skiing"],
    region: "Americas"
  },
  {
    _id: "64f0a1b2c3d4e5f678901205",
    name: "Marrakech, Morocco",
    tag: "City",
    rating: 4.7,
    country: "Morocco",
    description: "Souks, palaces, and desert gateways — sensory overload in the Red City.",
    price: 159,
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Medina Tour", "Camel Trek", "Majorelle Garden", "Cooking Class"],
    region: "Africa"
  },
  {
    _id: "64f0a1b2c3d4e5f678901206",
    name: "Reykjavik, Iceland",
    tag: "Adventure",
    rating: 4.82,
    country: "Iceland",
    description: "Northern lights, geothermal lagoons, and volcanic landscapes at the edge of the Arctic.",
    price: 299,
    image: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Northern Lights Hunt", "Blue Lagoon", "Golden Circle", "Glacier Hike"],
    region: "Europe"
  },
  {
    _id: "64f0a1b2c3d4e5f678901207",
    name: "Tokyo, Japan",
    tag: "City",
    rating: 4.92,
    country: "Japan",
    description: "A neon-lit mix of futuristic skyscrapers and historic temples — the world's most populous metropolis.",
    price: 289,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Shibuya Crossing", "Tsukiji Market", "Akihabara Tech Tour", "Imperial Palace"],
    region: "Asia"
  },
  {
    _id: "64f0a1b2c3d4e5f678901208",
    name: "Paris, France",
    tag: "Culture",
    rating: 4.88,
    country: "France",
    description: "The City of Light, famed for its cafe culture, the Eiffel Tower, and world-class art museums.",
    price: 310,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Eiffel Tower Visit", "Louvre Museum", "Seine River Cruise", "Montmartre Walk"],
    region: "Europe"
  },
  {
    _id: "64f0a1b2c3d4e5f678901209",
    name: "Jaipur, India",
    tag: "Culture",
    rating: 4.75,
    country: "India",
    description: "The Pink City of Rajasthan, known for its stunning forts, royal palaces, and vibrant bazaars.",
    price: 145,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Amer Fort", "Hawa Mahal", "Johari Bazaar", "City Palace"],
    region: "Asia"
  },
  {
    _id: "64f0a1b2c3d4e5f678901210",
    name: "New York City, USA",
    tag: "City",
    rating: 4.85,
    country: "USA",
    description: "The Big Apple, a global center of finance, culture, and entertainment with iconic landmarks.",
    price: 350,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eaa?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Statue of Liberty", "Central Park", "Times Square", "Broadway Show"],
    region: "Americas"
  },
  {
    _id: "64f0a1b2c3d4e5f678901211",
    name: "Rome, Italy",
    tag: "Culture",
    rating: 4.9,
    country: "Italy",
    description: "The Eternal City, where ancient history meets modern life through stunning architecture and food.",
    price: 230,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529260839312-41777c08238d?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Colosseum Tour", "Vatican Museums", "Trevi Fountain", "Pasta Making Class"],
    region: "Europe"
  },
  {
    _id: "64f0a1b2c3d4e5f678901212",
    name: "Sydney, Australia",
    tag: "Coastal",
    rating: 4.82,
    country: "Australia",
    description: "A vibrant harbor city known for the Opera House, Bondi Beach, and stunning coastal walks.",
    price: 275,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80"
    ],
    activities: ["Opera House Tour", "Bondi Beach", "Harbour Bridge Climb", "Manly Ferry Ride"],
    region: "Oceania"
  },
];

export const getDestinationById = (id) => seedDestinations.find((d) => d._id === id);
