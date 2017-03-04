const bcrypt = require('bcrypt-nodejs')
var seedData = {}

seedData.usersArray = [
  {
    id: 1,
    username: 'brenner-test',
    first_name: 'brenner',
    last_name: 'spear',
    password: bcrypt.hashSync('testpassword'),
    wallet_address: 'none',
    address: '400 baker st',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    postal_code: '94117',
    phone_number: '111-222-3333',
    preferred_time: '16:30:00 PST'
  },
  {
    id: 2,
    username: 'daniel-test',
    first_name: 'daniel',
    last_name: 'voigt',
    password: bcrypt.hashSync('testpassword'),
    wallet_address: 'none',
    address: '944 market st',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    postal_code: '94102',
    phone_number: '111-222-4444',
    preferred_time: '11:30:00 PST'
  },
  {
    id: 3,
    username: 'greg-test',
    first_name: 'Greg',
    last_name: 'Prouty',
    password: bcrypt.hashSync('testpassword'),
    wallet_address: 'none',
    address: '556 mission st',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    postal_code: '94117',
    phone_number: '111-222-4444',
    preferred_time: '9:30:00 PST'
  },
  {
    id: 4,
    username: 'mark-test',
    first_name: 'Mark',
    last_name: 'Jung',
    password: bcrypt.hashSync('testpassword'),
    wallet_address: 'none',
    address: '200 Valencia st',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    postal_code: '94117',
    phone_number: '111-222-4444',
    preferred_time: '20:30:00 PST'
  }
]

seedData.categoryArray = [
  {
    id: 1,
    name: 'Fashion and Accessories',
    parent_category_id: null,
  },
  {
    id: 2,
    name: 'Home and Garden',
    parent_category_id: null,
  },
  {
    id: 3,
    name: 'Electronics',
    parent_category_id: null,
  },
  {
    id: 4,
    name: 'Baby and Child',
    parent_category_id: null,
  },
  {
    id: 5,
    name: 'Cars and Motors',
    parent_category_id: null,
  },
  {
    id: 6,
    name: 'Sports, Leisure and Games',
    parent_category_id: null,
  },
  {
    id: 7,
    name: 'Movies, Books and Music',
    parent_category_id: null,
  },
  {
    id: 8,
    name: 'Other',
    parent_category_id: null,
  }
]

seedData.tagArray = [
  {
    id: 1,
    tag: 'laptop',
    category_id: 3 
  },
  {
    id: 2,
    tag: 'computer',
    category_id: 3 
  },
  {
    id: 3,
    tag: 'keyboard',
    category_id: 3 
  },
  {
    id: 4,
    tag: 'mouse',
    category_id: 3 
  }
]

seedData.productArray = [
  {
    id: 1,
    seller_id: 1,
    buyer_id: null,
    attempted_buyer_id: 4,
    bitcoin_address: '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW',
    category_id: 1,
    title: 'macbook pro',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 200.343,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 22 12:30:00 2017 PST',
    image_links: [
      "https://images.craigslist.org/00505_7pnZpZ8Vnp2_600x450.jpg",
      "https://images.craigslist.org/00404_c04Y4L0KJO6_600x450.jpg",
      "https://images.craigslist.org/00d0d_bY2WDoNBmzB_600x450.jpg",
      ]
  },
  {
    id: 2,
    seller_id: 1,
    buyer_id: null,
    bitcoin_address: '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW',
    category_id: 1,
    title: 'Apple iPad Black',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 100,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 21 11:30:00 2017 PST',
    image_links: [
      "https://images.craigslist.org/00U0U_2Yb8OBggWpS_600x450.jpg",
      "https://images.craigslist.org/01212_iQjjXfiw1Nh_600x450.jpg",
      "https://images.craigslist.org/00F0F_h07TBD325k7_600x450.jpg",
      ]
  },
  {
    id: 3,
    seller_id: 1,
    buyer_id: null,
    bitcoin_address: '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW',
    category_id: 2,
    title: 'long sleeve shirt',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 12.50,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 26 20:30:00 2017 PST',
    image_links: [
      "https://images.craigslist.org/00q0q_lrtlvRAGXm7_600x450.jpg",
      "https://images.craigslist.org/00K0K_iJ5dAZCJgAu_600x450.jpg"
      ]
  },
  {
    id: 4,
    seller_id: 2,
    buyer_id: 3,
    bitcoin_address: '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW',
    category_id: 2,
    title: 'beanie',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 7,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      "https://images.craigslist.org/00c0c_lBDttuJqkIu_600x450.jpg",
      "https://images.craigslist.org/00u0u_5b77UXS8EaK_600x450.jpg",
      "https://images.craigslist.org/00a0a_6M9odNQtSnJ_600x450.jpg",
      ]
  },
{
    id: 5,
    seller_id: 1,
    buyer_id: null,
    bitcoin_address: '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW',
    category_id: 1,
    title: 'macbook pro',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 200.343,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 22 12:30:00 2017 PST',
    image_links: [
      "https://images.craigslist.org/00505_7pnZpZ8Vnp2_600x450.jpg",
      "https://images.craigslist.org/00404_c04Y4L0KJO6_600x450.jpg",
      "https://images.craigslist.org/00d0d_bY2WDoNBmzB_600x450.jpg",
      ]
  },
  {
    id: 6,
    seller_id: 1,
    buyer_id: null,
    bitcoin_address: '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW',
    category_id: 1,
    title: 'Apple iPad Black',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 100,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 21 11:30:00 2017 PST',
    image_links: [
      "https://images.craigslist.org/00U0U_2Yb8OBggWpS_600x450.jpg",
      "https://images.craigslist.org/01212_iQjjXfiw1Nh_600x450.jpg",
      "https://images.craigslist.org/00F0F_h07TBD325k7_600x450.jpg",
      ]
  },
  {
    id: 7,
    seller_id: 1,
    buyer_id: null,
    bitcoin_address: '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW',
    category_id: 2,
    title: 'long sleeve shirt',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 12.50,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 26 20:30:00 2017 PST',
    image_links: [
      "https://images.craigslist.org/00q0q_lrtlvRAGXm7_600x450.jpg",
      "https://images.craigslist.org/00K0K_iJ5dAZCJgAu_600x450.jpg"
      ]
  },
  {
    id: 8,
    seller_id: 2,
    buyer_id: 3,
    bitcoin_address: '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW',
    category_id: 4,
    title: 'beanie',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 7,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      "https://images.craigslist.org/00c0c_lBDttuJqkIu_600x450.jpg",
      "https://images.craigslist.org/00u0u_5b77UXS8EaK_600x450.jpg",
      "https://images.craigslist.org/00a0a_6M9odNQtSnJ_600x450.jpg",
      ]
  }
]

seedData.transactionArray = [
  {
    id: 1,
    buyer_id: 3,
    product_id: 4,
    sale_price: 7,
    status: 'buyer_paid',
    uber_delivery_id: 1
  }
]

module.exports = seedData