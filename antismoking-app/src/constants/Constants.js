const APIURL= 'https://a569ef76.ngrok.io';

export const UrlConstants = {
    MESSAGES: `${APIURL}/messages`,
    MESSAGES_PHOTO: `${APIURL}/photo`,
    YES_RESPONSES: `${APIURL}/yes`,
    NO_RESPONSES: `${APIURL}/no`,
  };

export const facebookConstants = {
  appId: '2302797986640863'
};

export const firebaseConfig = {
  apiKey: "AIzaSyC7IEkkidFmc8h1Td0RHMhb0-J0N3KjxbE",
  authDomain: "amsa-9f95c.firebaseapp.com",
  databaseURL: "https://amsa-9f95c.firebaseio.com",
  projectId: "amsa-9f95c",
  storageBucket: "amsa-9f95c.appspot.com"
};

export const items = [
  {
    "id": 1,
    "name": "Candy",
    "price": 0,
    "source": require('../../assets/items/candy.png')
  },
  {
    "id": 2,
    "name": "Chocolate",
    "price": 0.50,
    "source": require('../../assets/items/chocolate.png')
  },
  {
    "id": 3,
    "name": "Ticket",
    "price": 1.00,
    "source": require('../../assets/items/ticket.png')
  },
  {
    "id": 4,
    "name": "Cigarettes",
    "price": 2.00,
    "source": require('../../assets/items/cigarettes.png')
  }
];

export const avatars = [
  {
    "id": 1,
    "name": "Male",
    "source": require('../../assets/avatars/male.png')
  },
  {
    "id": 2,
    "name": "Female",
    "source": require('../../assets/avatars/female.png')
  },
  {
    "id": 3,
    "name": "Other",
    "source": require('../../assets/avatars/other.png')
  }
];

export const backgrounds = [
  {
    "id": 1,
    "name": "Background with cigarette",
    "source": require('../../assets/backgrounds/Background_with_cigarette.png')
  },
  {
    "id": 2,
    "name": "Background with smoking cigarette",
    "source": require('../../assets/backgrounds/Background_with_cigarette_smoking.png')
  },
  {
    "id": 3,
    "name": "Message background",
    "source": require('../../assets/backgrounds/Message.png')
  }
];

export const menuIcons = [
  {
    "id": 1,
    "name": "Share the love",
    "source": require('../../assets/menu/heart.png')
  }
];
