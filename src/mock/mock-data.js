const testPoints = [
  {
    id: '1',
    type: 'taxi',
    destinationId: 'istanbul',
    dateStart: new Date('February 20, 2025 12:00:00'),
    dateEnd: new Date('February 20, 2025 13:30:00'),
    price: 8,
    pointOptions: ['beepbeep', 'water'],
    isFavorite: false,
  },
  {
    id: '2',
    type: 'ship',
    destinationId: 'bosphorus',
    dateStart: new Date('February 20, 2025 16:00:00'),
    dateEnd: new Date('February 20, 2025 18:00:00'),
    price: 30,
    pointOptions: ['cabin', 'lunch'],
    isFaivorite: true,
  },
  {
    id: '3',
    type: 'bus',
    destinationId: 'ankara',
    dateStart: new Date('February 20, 2025 18:55:00'),
    dateEnd: new Date('February 20, 2025 21:10:00'),
    price: 8,
    pointOptions: ['single-seat'],
    isFaivorite: true,
  },
  {
    id: '4',
    type: 'flight',
    destinationId: 'kaliningrad',
    dateStart: new Date('February 20, 2025 22:40:00'),
    dateEnd: new Date('February 21, 2025 03:40:00'),
    price: 237,
    pointOptions: ['business-class', 'baggage', 'wifi'],
    isFaivorite: true,
  },
];

const testOffers = [
  {
    type: 'taxi',
    options: [
      {
        id: 'beepbeep',
        title: 'Call BeepBeep',
        price: 20,
      },
      {
        id: 'water',
        title: 'Include water',
        price: 5,
      }
    ]
  },
  {
    type: 'ship',
    options: [
      {
        id: 'cabin',
        title: 'Rent cabin',
        price: 80,
      },
      {
        id: 'lunch',
        title: 'Order lunch',
        price: 10,
      }
    ]
  },
  {
    type: 'bus',
    options: [
      {
        id: 'single-seat',
        title: 'Choose single seat',
        price: 5,
      }
    ]
  },
  {
    type: 'flight',
    options: [
      {
        id: 'business-class',
        title: 'Choose business class',
        price: 100,
      },
      {
        id: 'baggage',
        title: 'Baggage 30+ kg',
        price: 12,
      },
      {
        id: 'wifi',
        title: 'Using Wi-Fi',
        price: 20,
      }
    ]
  },
];

const testDestinations = [
  {
    id: 'istanbul',
    description: 'Istanbul is a city where the ancient and the modern combine.',
    destinationName: 'Istanbul',
    photos: [
      {
        src: 'https://i.pinimg.com/736x/58/e6/a6/58e6a6d925dc66ae48cff51435d0095e.jpg',
        alt: 'Istanbul beach',
      },
    ]
  },
  {
    id: 'bosphorus',
    description: 'The Bosphorus is a strait between Europe and Asia Minor.',
    destinationName: 'Bosphorus',
    photos: [
      {
        src: 'https://i.pinimg.com/736x/30/27/c1/3027c1ffdd3a9b3c7e459565aab5449f.jpg',
        alt: 'Bosphorus'
      }
    ]
  },
  {
    id: 'ankara',
    description: 'The capital and second most popular city of Turkey.',
    destinationName: 'Ankara',
    photos: [
      {
        src: 'https://i.pinimg.com/736x/c3/ec/80/c3ec80b8178e053fc5e8087a3507350f.jpg',
        alt: 'Monument'
      },
      {
        src: 'https://i.pinimg.com/736x/97/87/8c/97878c9aca3d812967be37420f237898.jpg',
        alt: 'Cat'
      }
    ]
  },
  {
    id: 'kaliningrad',
    description: 'Kaliningrad, a tiny piece of Russia located on the Baltic Sea coast between Lithuania and Poland',
    destinationName: 'Kalinigrad',
    photos: [
      {
        src: 'https://i.pinimg.com/736x/29/ac/de/29acde000720dab4690d0d97ef86536f.jpg',
        alt: 'Historic Clock Tower'
      }
    ]
  },
];

export { testPoints, testOffers, testDestinations};
