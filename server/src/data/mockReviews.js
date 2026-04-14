export const reviewsByDestination = {
  '64f0a1b2c3d4e5f678901201': [
    {
      _id: 'r1',
      destinationId: '64f0a1b2c3d4e5f678901201',
      author: 'Alex M.',
      rating: 5,
      title: 'Paradise found',
      body: 'Ubud mornings and Seminyak sunsets — flawless organization by Novanectra.',
      createdAt: '2025-11-02T10:00:00Z',
    },
    {
      _id: 'r2',
      destinationId: '64f0a1b2c3d4e5f678901201',
      author: 'Priya K.',
      rating: 5,
      title: 'Family friendly',
      body: 'Kids loved the cooking class. Transport pickups were always on time.',
      createdAt: '2025-10-18T14:30:00Z',
    },
  ],
  '64f0a1b2c3d4e5f678901202': [
    {
      _id: 'r3',
      destinationId: '64f0a1b2c3d4e5f678901202',
      author: 'Thomas R.',
      rating: 5,
      title: 'Temples & tranquility',
      body: 'The itinerary balanced crowds and quiet moments perfectly.',
      createdAt: '2025-12-01T09:15:00Z',
    },
  ],
};

export const getReviewsFor = (destinationId) => reviewsByDestination[destinationId] ?? [];
