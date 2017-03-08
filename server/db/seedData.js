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
    phone_number: '971-533-5883',
    preferred_time: '16:30:00 PST'
  },
  {
    id: 2,
    username: 'daniel-test',
    first_name: 'daniel',
    last_name: 'voigt',
    password: bcrypt.hashSync('testpassword'),
    wallet_address: '1MPju73ZaVNEbpeJ4FwsycqUQW1iyFwG8U',
    address: '944 market st',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    postal_code: '94102',
    phone_number: '301-520-1246',
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
    phone_number: '9166069046',
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
    phone_number: '9166069046',
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
    category_id: 3,
    title: 'macbook pro',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 200.343,
    total_price_btc: 0.16,
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
    bitcoin_address: '',
    category_id: 3,
    title: 'Apple iPad Black',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: .1,
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
    bitcoin_address: '',
    category_id: 1,
    title: 'Blue Nike Zip-Up Jacket',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 12.50,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 26 20:30:00 2017 PST',
    image_links: [
      "https://img.letgo.com/images/93/33/14/37/93331437eb3cf2f0b1ed3d00f6ac8026.jpg"
      ]
  },
  {
    id: 4,
    seller_id: 2,
    buyer_id: 3,
    bitcoin_address: '',
    category_id: 1,
    title: 'Black And Red Checkered Button-Down Shirt',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 15,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      "https://img.letgo.com/images/cf/06/6c/4b/cf066c4b0838914893fed4f9b6c8324b.jpg"
    ]
  },
{
    id: 5,
    seller_id: 1,
    buyer_id: null,
    bitcoin_address: '',
    category_id: 3,
    title: 'Playstation 4 Pro',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 300,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 22 12:30:00 2017 PST',
    image_links: [
      'https://img.letgo.com/images/72/1b/f8/bf/721bf8bf01cb765044b06819d0fa7b50.jpeg'
      ]
  },
  {
    id: 6,
    seller_id: 1,
    buyer_id: null,
    bitcoin_address: '',
    category_id: 3,
    title: 'Gold Iphone 6',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 200,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 21 11:30:00 2017 PST',
    image_links: [
      'https://img.letgo.com/images/d1/54/82/03/d154820398c93d4f232c98f281375b78.jpeg'
    ]
  },
  {
    id: 7,
    seller_id: 1,
    buyer_id: 4,
    bitcoin_address: '',
    category_id: 1,
    title: 'Army Green Parka',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 30,
    address: '400 baker st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 26 20:30:00 2017 PST',
    image_links: [
      'https://img.letgo.com/images/bf/8b/85/56/bf8b8556880a89273d130da85002a872.jpg'
    ]
  },
  {
    id: 8,
    seller_id: 2,
    buyer_id: 3,
    bitcoin_address: '',
    category_id: 1,
    title: 'Black, Whiten Ad Pink Star Luggage',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 7,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/98/d7/23/b8/98d723b80e080a5f14d48e6bd01e49fd.jpeg'
    ]
  },
  {
    id: 9,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Guess Bag',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 55,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/c8/6c/2b/6f/c86c2b6f68a7ad9a60f263f63f487a78.jpeg'
    ]
  },
  {
    id: 10,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Grey Peacoat - Mission Rafael',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 20,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/a0/46/cc/a8/a046cca871c47de53574889118414281.jpg'
    ]
  },
  {
    id: 11,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Purple Lens Aviator Sunglasses With Silver Frame And Case',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 155,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/00/45/e7/9d/0045e79dd45caa5d192dce2bdd4edb0d.jpg?impolicy=img_900'
    ]
  },
  {
    id: 12,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'New Boots for Women',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 55,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/9e/de/fa/48/9edefa483ed1bc2ac73b8522c8caa3c7.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 13,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Pair Of Gray Pants',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 40,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/11/b3/18/ed/11b318ed596b4e574986e89a9807322b.jpeg'
    ]
  },
  {
    id: 14,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'White Keds',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 30,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/68/88/f6/7d/6888f67d9c8a76510143dd5a7af7351d.jpg'
    ]
  },
  {
    id: 15,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Red Sweat Pants',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 40,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/fe/e8/e9/77/fee8e977d4c382b9e7f19980520b5ed8.jpeg'
    ]
  },
  {
    id: 16,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Pair Of Diamond Shaped Silver And Black Earrings',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 60,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/91/7f/0c/b8/917f0cb8084e423f075be53a893c0e2e.jpg?impolicy=img_900'
    ]
  },
  {
    id: 17,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Gold Heart And Crown Pendant Chain Necklace',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 55,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/86/67/1f/b7/86671fb7c49356927ed247b973ccc32c.jpg?impolicy=img_900'
    ]
  },
  {
    id: 18,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Round Face Fossil Chronograph Watch With Silver Links',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 89,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/1b/10/63/70/1b106370fa8ccdeb3f1e226c2fd78a45.jpg?impolicy=img_900'
    ]
  },
  {
    id: 19,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Hooded Button Up Shirt',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 23,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/07/4a/52/03/074a5203635ba96c303b2811f7b3e3d3.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 20,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 1,
    title: 'Yellow North Face Raincoat',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 15,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/e8/3a/02/92/e83a02920c6e3fa2beff181b90efd5e7.jpg'
    ]
  },
  {
    id: 21,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Tv Flat Screen Television With Stand',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 170,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/69/03/97/ff/690397ff183d4c49df16b4914e34f946.jpg'
    ]
  },
  {
    id: 22,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Gray Front Load Clothes Dryer And Washing Machine',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 600,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/83/e5/55/22/83e55522ff3deb563326754ca0fb0160.jpg'
    ]
  },
  {
    id: 23,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Sofa Bed',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 200,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/9e/af/8b/7f/9eaf8b7f58e84b8ca5205653edef06d6.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 24,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Brown Wooden 4-Drawer Chest',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 65,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/21/75/0d/65/21750d65c6183e0260d0659b59fffa8a.jpg'
    ]
  },
  {
    id: 25,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Chair And Ottoman',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 250,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/e9/dc/52/83/e9dc5283a5c98b52bc3ad1bd4d457b34.jpg'
    ]
  },
  {
    id: 26,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'White Metal Frame Glass Panel Slide Door',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 210,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/68/85/a2/fb/6885a2fbf0db151f7352e4ed99585d70.jpg'
    ]
  },
  {
    id: 27,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Gray Fabric Wingback Armchair',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 200,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/64/21/ab/97/6421ab979926bb94ea79bfa967bb3114.jpg'
    ]
  },
  {
    id: 28,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Dining Table And Chair Set',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 100,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/c4/64/51/00/c4645100f316c15791ce7afdef7e01ff.jpg?impolicy=img_900'
    ]
  },
  {
    id: 29,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Refinished Vintage Dresser',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 580,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/74/42/b0/1a/7442b01a084dac57dc06ecb142a53b09.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 30,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'Room&board Brown Wooden Desk',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 180,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/0a/c9/8b/d7/0ac98bd758af086500936a93aad7f438.jpg?impolicy=img_900'
    ]
  },
  {
    id: 31,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 2,
    title: 'White Tufted Bed Headboard',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 30,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/e9/ba/8e/de/e9ba8ede4733b3b9d6a2b82ae7f738ed.jpg'
    ]
  },
  {
    id: 32,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: 'Black Bose Headset',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 470,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/35/ce/2b/99/35ce2b99bcb9632ab81cfc6576c47f53.jpeg'
    ]
  },
  {
    id: 33,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: '2 10S Kicker Comps',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 30,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/a4/9a/32/56/a49a32567741dbaf758623450b185dab.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 34,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: 'Black Tablet Computer',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 160,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/ba/d3/02/09/bad30209f18fd3d44dfa4dd51a6e5f27.jpg?impolicy=img_900'
    ]
  },
  {
    id: 35,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: 'White Samsung Android Smartphonee',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 125,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/27/9b/fa/d3/279bfad343fb7ff2900c0abfbd25bd7c.jpg'
    ]
  },
  {
    id: 36,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: 'Black Garmin Nuvi 42Lm',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 50,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/29/fb/96/b2/29fb96b2000ed9d9b555c9cd1096cfe4.jpeg'
    ]
  },
  {
    id: 37,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: 'Frigidaire Window Air',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 150,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/16/51/a8/15/1651a815289de9fb34a5297af1d6ddb5.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 38,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: '64 Gb Iphone 6 Plus',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 350,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/71/82/23/ae/718223ae3848772a331bcc43c9a79a1e.jpg?impolicy=img_900'
    ]
  },
  {
    id: 39,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: 'Hp 30 Inch Hd Monitor 2560 X 1600',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 275,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/18/f2/d1/be/18f2d1bedc92c0c3656a3db90828a854.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 40,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: 'Apple Iphone 6 - Rose Gold - Unlocked - 128 Gb ',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 500,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/48/5f/16/6b/485f166b7384a51152212ee0aa5dcb16.jpg?impolicy=img_900'
    ]
  },
  {
    id: 41,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 3,
    title: 'Copy Machine Scanner And Printer',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 30,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/cd/ae/96/e0/cdae96e0f3a76a8974998e10484dae4f.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 42,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Maclaren Baby Stroller',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 45,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/cd/ae/96/e0/cdae96e0f3a76a8974998e10484dae4f.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 43,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Coloring Table for kids',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 19,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/5f/46/74/c6/5f4674c688ef5f4f85f666fab61b102e.jpg?impolicy=img_900'
    ]
  },
  {
    id: 44,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Baby Brown Suit',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 25,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/69/5a/14/6a/695a146a6d5e41c0e6ae2d4c8bba94be.jpg'
    ]
  },
  {
    id: 45,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Toddler Three Assorted Colors Of Onesies',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 45,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/01/9b/a0/e2/019ba0e21187da594d3594803479080d.jpg'
    ]
  },
  {
    id: 46,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Baby Stroller',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 15,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/1b/8b/53/ae/1b8b53ae76c8ccf7cc500bc3034aff70.jpeg'
    ]
  },
  {
    id: 47,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Toddlers Yeezy Boost 350 V2 Zebra',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 140,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/1d/20/9e/e3/1d209ee3d8670139502615961340299a.jpg?impolicy=img_900'
    ]
  },
  {
    id: 48,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: '12 New Stuffed Animals',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 5,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/08/af/c8/36/08afc836a4fa99de64707a0f78b1fd84.jpg'
    ]
  },
  {
    id: 49,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Baby Brown Wooden Crib Frame',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 70,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/d6/56/d6/63/d656d6633b8eee022c3c45258c94107a.jpeg'
    ]
  },
  {
    id: 50,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Baby Multi Colored Activity Saucer',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 18,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/47/e0/71/61/47e07161dcc7f5d5be2eddb45f486b4b.jpg?impolicy=img_900'
    ]
  },
  {
    id: 51,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 4,
    title: 'Thomas & Friends Power Wheels',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 50,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/2f/d2/6f/ad/2fd26fad3b638cbfb2e77fc467c3acbb.jpg?impolicy=img_900'
    ]
  },
  {
    id: 52,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'Red Commuters Bicycle',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 30,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/de/86/99/dc/de8699dcaf4980adf38e905eba27bdac.jpg'
    ]
  },
  {
    id: 53,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'Super Smash Bros Nintendo 3Ds Game',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 35,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/a9/de/6c/58/a9de6c58c3518cbd20fc94bc17dec9c5.jpeg'
    ]
  },
  {
    id: 54,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'Pokemon Y Nintendo 3Ds Game',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 45,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/d0/95/5d/d8/d0955dd830c6fe067c2c77ebeb7ec87c.jpeg'
    ]
  },
  {
    id: 55,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'New Spalding Women Shoes w/Box - Size 7 1/2',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 50,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/4c/24/3a/37/4c243a370c601931b5306a51a04e33dd.jpg?impolicy=img_900'
    ]
  },
  {
    id: 56,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'Wilson Softball Firstbase Glove',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 25,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/bf/22/4a/4d/bf224a4d278bf17cb00e22c88b1f87bb.jpeg'
    ]
  },
  {
    id: 57,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'Lamiglas Redline Hs94Mhs Spinning Rod',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 120,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/6e/08/84/87/6e0884873be2182e741ebcb4be002310.jpg'
    ]
  },
  {
    id: 58,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'Nike Flyknit Presto Size 9.5',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 80,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/e9/12/84/a2/e91284a2b39e6c6699b5a7f6de22abaa.jpg?impolicy=img_900'
    ]
  },
  {
    id: 59,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'Mario Kart 7 Nintendo 3Ds Game',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 30,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/6c/ee/e8/3a/6ceee83a615d0c645e3f63f34bc2bcce.jpeg'
    ]
  },
  {
    id: 60,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: 'Three Brown And Blue Badminton Rackets',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 25,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/49/1a/44/ab/491a44ab178c16a0a6cb4102ad0bfedb.jpeg'
    ]
  },
  {
    id: 61,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 6,
    title: '2016 Nike Hyperrev Size 11.5 Draymond Green Pe',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 80,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/6b/90/52/22/6b905222e915a1332a4dfbe4a6e87480.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 62,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: 'Gray And Black Automotive Wheel',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 150,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/9a/75/7a/e2/9a757ae2b440cc4cb703b6839d4363cc.jpeg'
    ]
  },
  {
    id: 63,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: '2005 Toyota Tundra',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 1500,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/e2/1b/52/8c/e21b528c25b809056e827374964a9f06.jpeg'
    ]
  },
  {
    id: 64,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: 'Gray 2009 Honda Cbr 1000Rr',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 2523,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/35/4c/12/61/354c12616aa41816c52374ea015c4bfd.jpg'
    ]
  },
  {
    id: 65,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: '22 Inch Chrome Rims 2 Good Wheels',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 450,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/d7/71/04/73/d771047327d70d4b775089d1186e8513.jpeg'
    ]
  },
  {
    id: 66,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: '2005 Audi A4 2.0T ',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 1000,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/a1/d0/8e/c7/a1d08ec7e9661b4b1ea2485ac2f8cf70.jpeg'
    ]
  },
  {
    id: 67,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: '1999 Chevrolet S10 Pick Up Truck',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 2400,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/0d/20/24/a3/0d2024a39cb7d019558bffb9a21a76c7.jpg'
    ]
  },
  {
    id: 68,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: 'Lexus G 300',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 4000,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/46/1b/b0/ab/461bb0ab3b332a8da6542fb639778ffd.jpeg'
    ]
  },
  {
    id: 69,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: '1990 chevy scottsdale',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 450,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/f5/e7/5f/cd/f5e75fcd84ce9190ba051b23ad41599a.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 70,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: 'Nissan Quess',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 7000,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/03/84/2d/ca/03842dca59a8d731f322770f3f36acd5.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 71,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 5,
    title: 'Camaro Front And Rear Rim ',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 200,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/e4/9f/d3/c1/e49fd3c1583501fea23f9e7b0d982ce7.jpeg'
    ]
  },
  {
    id: 72,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'English Grammar Fourth Edition Book',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 12,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/cf/46/dc/05/cf46dc0586558731efca8bf6dc02c387.jpg?impolicy=img_900'
    ]
  },
  {
    id: 73,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'Yamaha Allegro Clarinet',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 175,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/70/b5/c9/3d/70b5c93d3444baec51787d38ccea165c.jpg?impolicy=img_900'
    ]
  },
  {
    id: 74,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'Gmat Books In Very Good Condition',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 50,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/50/35/cd/a1/5035cda1e9f7801ebc6da65e29de97d8.jpg'
    ]
  },
  {
    id: 75,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'Yoga - Beginners Manual - Hardcover',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 4,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/8d/cf/6c/c0/8dcf6cc0ba70c4932862531ffb9b9208.jpg'
    ]
  },
  {
    id: 76,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'Black Electronic Keyboard',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 60,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/cd/50/95/60/cd50956095b80f9f9ea0d663ba3e037d.jpeg'
    ]
  },
  {
    id: 77,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'The Paleo Diet Cookbook By Loren Cordain Phd',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 12,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/f1/eb/d8/b9/f1ebd8b989b2ba7f4bdfeeab00c235cd.jpg'
    ]
  },
  {
    id: 78,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: '80\'s Pearl Bass Drum',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 50,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/eb/d4/47/2b/ebd4472b27aa94cfd31652d3030b1e1a.jpeg'
    ]
  },
  {
    id: 79,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'Yamaha Clp-611 Piano',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 530,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/e6/5c/10/96/e65c1096288983dc3826ef24f6bc4dca.jpg?impolicy=img_900'
    ]
  },
  {
    id: 80,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'Ibanez Artcore Af55',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 350,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/98/aa/13/11/98aa131149ef17a7315d017bd2a98ba6.jpeg?impolicy=img_900'
    ]
  },
  {
    id: 81,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 7,
    title: 'Brown Violin With Bow And Case',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 200,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://img.letgo.com/images/55/d5/2f/05/55d52f05f8e4604e8340ab6640bea979.jpeg'
    ]
  },
  {
    id: 82,
    seller_id: Math.ceil(Math.random() * 4),
    buyer_id: Math.ceil(Math.random() * 4),
    bitcoin_address: '',
    category_id: 8,
    title: 'Oleg - Neighborhood Tech Mentor',
    description: 'Lorem ipsum dolor sit amet, an cum graecis concludaturque. Nam habeo dictas ex, harum officiis incorrupte in eum. Sint tacimates vis id, error ludus torquatos eam ne, populo oporteat voluptaria at duo. Mea antiopam neglegentur ei, in quo cibo nonumy, congue impetus suavitate quo ea. Ex mea primis numquam periculis, meis labitur fabulas no nec, est mediocrem pertinacia no.',
    asking_price: 20,
    address: '944 market st',
    postal_code: '94117',
    // preferred_time_and_date: 'February 28 9:30:30 2017 PST',
    image_links: [
      'https://media.licdn.com/mpr/mpr/shrink_100_100/p/1/000/074/152/2780704.jpg'
    ]
  }
]

seedData.transactionArray = [
  {
    id: 1,
    buyer_id: 3,
    product_id: 4,
    sale_price: .1,
    status: 'processing',
    uber_delivery_id: '295e895d-5bf7-4989-bd01-fdc7aaf9a3da'
  },
  {
    id: 2,
    buyer_id: 4,
    product_id: 7,
    sale_price: .45,
    status: 'at_dropoff',
    uber_delivery_id: 'fdc7aaf9a3da-5bf7-4989-bd01-295e895d'
  }
]

module.exports = seedData