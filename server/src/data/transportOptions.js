export const transportCatalog = {
  bikes: [
    {
      id: 'bk-city-1',
      name: 'Urban Explorer e-Bike',
      category: 'bike',
      pricePerDay: 24,
      image:
        'https://images.unsplash.com/photo-1593258136406-541a4d565ae4?auto=format&fit=crop&w=800&q=80',
      description: 'Lightweight frame, 80km range — ideal for coastal paths and old towns.',
    },
    {
      id: 'bk-mtn-2',
      name: 'Trail Pro MTB',
      category: 'bike',
      pricePerDay: 35,
      image:
        'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
      description: 'Full suspension for alpine trails and volcano routes.',
    },
  ],
  cars: [
    {
      id: 'cr-compact-1',
      name: 'Compact Hybrid',
      category: 'car',
      pricePerDay: 52,
      image:
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      description: 'Fuel-efficient, easy parking — best for solo or duo city hops.',
    },
    {
      id: 'cr-suv-2',
      name: 'Family SUV AWD',
      category: 'car',
      pricePerDay: 89,
      image:
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
      description: 'Space for luggage + gear; great for national parks and gravel roads.',
    },
    {
      id: 'cr-lux-3',
      name: 'Executive Sedan',
      category: 'car',
      pricePerDay: 110,
      image:
        'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=800&q=80',
      description: 'Chauffeur-ready comfort for airport transfers and evening dining.',
    },
    {
      id: 'cr-van-4',
      name: 'Adventure Camper Van',
      category: 'car',
      pricePerDay: 120,
      image:
        'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
      description: 'Sleep and drive in one; fully equipped for the ultimate road trip.',
    },
  ],
  buses: [
    {
      id: 'bs-coach-1',
      name: 'Premium Intercity Coach',
      category: 'bus',
      pricePerDay: 450,
      image:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      description: 'Reclining seats, Wi‑Fi, and onboard refreshments — hub-to-hub comfort.',
    },
    {
      id: 'bs-mini-2',
      name: 'Private Mini-Bus (12 seats)',
      category: 'bus',
      pricePerDay: 195,
      image:
        'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      description: 'Perfect for friend groups; includes professional driver on request.',
    },
  ],
};

export const listAllTransport = () => [
  ...transportCatalog.bikes,
  ...transportCatalog.cars,
  ...transportCatalog.buses,
];
