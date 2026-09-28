import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import CustomOrder from '../models/CustomOrder.js';
import Coupon from '../models/Coupon.js';

dotenv.config();

const categoriesData = [
  {
    name: 'Resin Art & Pooja Thalis',
    slug: 'resin-art',
    description: 'Bespoke resin pooja thalis, divine Ganesha trays, and luxury handcrafted decor made with crystal clear epoxy.',
    image: '/assets/products/product-01.png',
    order: 1
  },
  {
    name: 'Artisanal Scented Candles',
    slug: 'candles',
    description: 'Hand-poured 100% soy wax modak candles, seasonal pine trees, and dessert bowls infused with pure essential oils.',
    image: '/assets/products/product-02.jpg',
    order: 2
  },
  {
    name: 'Varmala & Wedding Keepsakes',
    slug: 'personalized-gifts',
    description: 'Museum-grade preservation frames for bridal varmalas, chooda, kaleere, and personalized wedding invitation plaques.',
    image: '/assets/products/product-10.jpg',
    order: 3
  },
  {
    name: 'Pet Memorials & Keepsakes',
    slug: 'resin-gifts',
    description: 'Tear-drop pendants, heart necklaces, and personalized pet collar tags lovingly preserving pet fur and paw prints.',
    image: '/assets/products/product-18.jpg',
    order: 4
  },
  {
    name: 'Geode Clocks & Plaques',
    slug: 'clocks',
    description: 'Statement handmade geode wall clocks and royal maroon wedding invitation plaques with 24K gold foil.',
    image: '/assets/products/product-15.jpg',
    order: 5
  },
  {
    name: 'Festive Hampers & Favors',
    slug: 'gift-hampers',
    description: 'Curated gifting hampers with modak candles, marigold thalis, and gingerbread holiday favors.',
    image: '/assets/products/product-03.jpg',
    order: 6
  },
  {
    name: 'Winter Holiday Collection',
    slug: 'handmade-soaps',
    description: 'Special edition Christmas candles, sculpted reindeers, and snowflake tumblers with golden bells.',
    image: '/assets/products/product-06.jpg',
    order: 7
  },
  {
    name: 'Custom Floral Rakhis',
    slug: 'hand-casting',
    description: 'Handcrafted floral resin Bhaiya-Bhabhi rakhis, loomba sets, and personalized name slider bracelets.',
    image: '/assets/products/product-25.jpg',
    order: 8
  }
];

const couponsData = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    maxDiscount: 500,
    minOrderValue: 799,
    description: '10% discount on your first handmade resin order!'
  },
  {
    code: 'MAHIMA15',
    discountPercent: 15,
    maxDiscount: 1000,
    minOrderValue: 1499,
    description: 'Special 15% boutique festival discount!'
  },
  {
    code: 'FESTIVE20',
    discountPercent: 20,
    maxDiscount: 1200,
    minOrderValue: 2499,
    description: 'Exclusive 20% discount on orders above ₹2,499'
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resin_art_db';
    console.log(`Connecting to ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await CustomOrder.deleteMany({});
    await Coupon.deleteMany({});

    console.log('Seeding categories...');
    const createdCategories = await Category.insertMany(categoriesData);
    const catMap = {};
    createdCategories.forEach(cat => {
      catMap[cat.slug] = cat._id;
    });

    console.log('Seeding coupons...');
    await Coupon.insertMany(couponsData);

    console.log('Seeding users...');
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const customerPassword = await bcrypt.hash('customer123', salt);

    const adminUser = await User.create({
      name: 'Mahima Choukse (Admin)',
      email: 'admin@resinartworkcreations.com',
      password: adminPassword,
      role: 'admin',
      phone: '+91 93290 28062',
      addresses: [{
        house: 'PVWH+JQ9, Road No. 26',
        area: 'New Gori Nagar, Nanda Nagar',
        city: 'Indore',
        state: 'Madhya Pradesh',
        pincode: '452011',
        isDefault: true
      }]
    });

    const customer1 = await User.create({
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      password: customerPassword,
      role: 'customer',
      phone: '+91 98260 12345',
      addresses: [{
        house: 'Flat 402, Sunshine Heights',
        area: 'AB Road, Palasia',
        city: 'Indore',
        state: 'Madhya Pradesh',
        pincode: '452001',
        isDefault: true
      }]
    });

    const customer2 = await User.create({
      name: 'Ananya Verma',
      email: 'ananya.v@example.com',
      password: customerPassword,
      role: 'customer',
      phone: '+91 97110 54321',
      addresses: [{
        house: '12-B, Green Avenue',
        area: 'Saket Nagar',
        city: 'Indore',
        state: 'Madhya Pradesh',
        pincode: '452018',
        isDefault: true
      }]
    });

    const customer3 = await User.create({
      name: 'Rohan Deshmukh',
      email: 'rohan.d@example.com',
      password: customerPassword,
      role: 'customer',
      phone: '+91 99812 77665',
      addresses: [{
        house: 'Plot 77',
        area: 'Scheme 54, Vijay Nagar',
        city: 'Indore',
        state: 'Madhya Pradesh',
        pincode: '452010',
        isDefault: true
      }]
    });

    console.log('Seeding authentic atelier products...');
    const productsData = [
      {
        name: 'Resin Ganesha Pooja Thali & Diya Set',
        slug: 'resin-ganesha-pooja-thali-diya-set',
        description: 'Handcrafted luxury divine Pooja Thali encasing a porcelain Ganesha idol, brass diyas for kumkum & chawal, tealight holders, 24K gold foil flakes, and real preserved botanical florals.',
        price: 1499,
        originalPrice: 1999,
        discountPercentage: 25,
        category: catMap['resin-art'],
        categoryName: 'Resin Art & Pooja Thalis',
        images: [
          '/assets/products/product-01.png'
        ],
        stock: 15,
        material: 'Optical Grade Epoxy Resin, Brass Bowls, Ganesha Idol, Gold Leaf, Real Flowers',
        dimensions: '10 inches diameter x 0.5 inches depth',
        careInstructions: 'Clean with soft damp cloth. Keep away from direct high flame on resin surface.',
        featured: true,
        bestSeller: true,
        rating: 5.0,
        numReviews: 48
      },
      {
        name: 'Pastel & Gold Leaf Modak Candles (Set of 6)',
        slug: 'pastel-gold-leaf-modak-candles-set-of-6',
        description: 'Handcrafted organic soy wax modak-shaped festive candles adorned with authentic 24K gold and silver leaf flakes in pastel pink, buttercup yellow, and pearl cream.',
        price: 599,
        originalPrice: 799,
        discountPercentage: 25,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-02.jpg',
          '/assets/products/product-03.jpg'
        ],
        stock: 35,
        material: '100% Pure Soy Wax, Organic Cotton Wick, 24K Gold Leaf, Premium Fragrance Oil',
        dimensions: '5cm height x 4.5cm width each',
        careInstructions: 'Trim wick to 1/4 inch before burning. Burn on heat-safe thali or tray.',
        featured: true,
        bestSeller: true,
        rating: 4.9,
        numReviews: 56
      },
      {
        name: 'Metallic Modak Diya Candle Thali Set',
        slug: 'metallic-modak-diya-candle-thali-set',
        description: 'Festive arrangement of 6 vibrant metallic modak candles (saffron, crimson, emerald, gold) enriched with royal gold flakes, placed on a decorative marigold petal base.',
        price: 699,
        originalPrice: 899,
        discountPercentage: 22,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-03.jpg',
          '/assets/products/product-02.jpg'
        ],
        stock: 25,
        material: 'Pure Soy Wax, Essential Oils, Gold Foil, Cotton Wick',
        dimensions: '6cm x 5cm each (Set of 6)',
        careInstructions: 'Place on flameproof surface away from drafts.',
        featured: false,
        bestSeller: true,
        rating: 4.8,
        numReviews: 32
      },
      {
        name: 'Holiday Gingerbread Man Candle Favors',
        slug: 'holiday-gingerbread-man-candle-favors',
        description: 'Delightful vanilla-scented gingerbread man candles individually wrapped in sheer white organza with festive ribbon and reindeer gift tag.',
        price: 349,
        originalPrice: 449,
        discountPercentage: 22,
        category: catMap['gift-hampers'],
        categoryName: 'Festive Hampers & Favors',
        images: [
          '/assets/products/product-04.jpg',
          '/assets/products/product-14.jpg'
        ],
        stock: 50,
        material: 'Soy Wax, French Vanilla Fragrance, Organza Pouch, Satin Ribbon',
        dimensions: '8cm x 6cm',
        careInstructions: 'Keep in cool dry place until ready to light.',
        featured: false,
        bestSeller: false,
        rating: 4.9,
        numReviews: 24
      },
      {
        name: 'Frosted Snowflake Glass Tumbler Candle',
        slug: 'frosted-snowflake-glass-tumbler-candle',
        description: 'Pure white winter soy candle poured in clear glass tumbler featuring an intricate sculpted snowflake wax topper with delicate golden jingle bell accent.',
        price: 549,
        originalPrice: 699,
        discountPercentage: 21,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-05.jpg'
        ],
        stock: 28,
        material: 'Natural Soy Wax, Glass Tumbler, Cotton Wick, Brass Bell',
        dimensions: '7.5cm diameter x 8.5cm height',
        careInstructions: 'Allow melt pool to reach glass edges on first burn.',
        featured: false,
        bestSeller: false,
        rating: 4.7,
        numReviews: 19
      },
      {
        name: 'Merry Christmas Gourmet Dessert Candle Bowl',
        slug: 'merry-christmas-gourmet-dessert-candle-bowl',
        description: 'Whimsical artisan candle bowl crafted with whipped wax frosting, miniature Santa Claus, pink Christmas tree, candy canes, and festive ornaments in warm cinnamon spice scent.',
        price: 999,
        originalPrice: 1299,
        discountPercentage: 23,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-06.jpg'
        ],
        stock: 16,
        material: 'Soy Wax, Glass Bowl, Cinnamon Spice & Vanilla Essential Oils',
        dimensions: '12cm diameter x 9cm height',
        careInstructions: 'Multi-wick candle. Trim all wicks before each burn.',
        featured: true,
        bestSeller: false,
        rating: 5.0,
        numReviews: 27
      },
      {
        name: 'Forest Pine Tree Scented Candle in Glass',
        slug: 'forest-pine-tree-scented-candle-in-glass',
        description: 'Tiered forest green pine tree soy candle nestled on whipped snow wax inside a clear tumbler with fresh Siberian fir and pine needle scent.',
        price: 499,
        originalPrice: 649,
        discountPercentage: 23,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-07.jpg',
          '/assets/products/product-11.jpg'
        ],
        stock: 30,
        material: 'Soy Wax, Pine Needle Extract, Glass Jar, Cotton Wick',
        dimensions: '7cm diameter x 9cm height',
        careInstructions: 'Keep wick centered and trimmed.',
        featured: false,
        bestSeller: false,
        rating: 4.8,
        numReviews: 22
      },
      {
        name: 'Layered Sand & Pine Tree Holiday Candle',
        slug: 'layered-sand-pine-tree-holiday-candle',
        description: 'Exquisite multi-tone red, green, and white crystalline sand wax candle topped with a frosted evergreen tree in a luxury "Thank You" glass tumbler.',
        price: 549,
        originalPrice: 699,
        discountPercentage: 21,
        category: catMap['handmade-soaps'],
        categoryName: 'Winter Holiday Collection',
        images: [
          '/assets/products/product-08.jpg',
          '/assets/products/product-07.jpg'
        ],
        stock: 20,
        material: 'Granulated Mineral Wax, Scented Soy Topper, Glass Tumbler',
        dimensions: '8cm diameter x 10cm height',
        careInstructions: 'Keep away from moisture and direct heat.',
        featured: false,
        bestSeller: false,
        rating: 4.8,
        numReviews: 16
      },
      {
        name: 'Bridal Varmala, Chooda & Jewelry Keepsake Frame',
        slug: 'bridal-varmala-chooda-jewelry-keepsake-frame',
        description: 'The ultimate royal wedding heirloom. Preserves bride and groom varmala roses, wedding chooda bangles, bridal jewelry, pearl necklaces, kaleere, and personalized wedding date calligraphy in solid teak shadowbox.',
        price: 4499,
        originalPrice: 5999,
        discountPercentage: 25,
        category: catMap['personalized-gifts'],
        categoryName: 'Varmala & Wedding Keepsakes',
        images: [
          '/assets/products/product-09.jpg',
          '/assets/products/product-10.jpg'
        ],
        stock: 8,
        material: 'Teakwood Shadowbox, Optical UV Epoxy, Client Wedding Jewelry & Flowers, 24K Gold Text',
        dimensions: '14 x 14 inches x 3 inches depth',
        careInstructions: 'Dust with soft microfiber. Avoid hanging in direct unrelenting afternoon sunlight.',
        featured: true,
        bestSeller: true,
        rating: 5.0,
        numReviews: 64
      },
      {
        name: 'Wedding Varmala & Pearl 3D Keepsake Frame',
        slug: 'wedding-varmala-pearl-3d-keepsake-frame',
        description: 'A deeply emotional keepsake preserving your actual wedding varmala florals, bride & groom portrait, golden wedding date inscription, and glowing ivory pearls in crystal epoxy.',
        price: 2999,
        originalPrice: 3999,
        discountPercentage: 25,
        category: catMap['personalized-gifts'],
        categoryName: 'Varmala & Wedding Keepsakes',
        images: [
          '/assets/products/product-10.jpg',
          '/assets/products/product-09.jpg'
        ],
        stock: 12,
        material: 'Solid Wood Box, Preserved Varmala Petals, Couple Photograph, Pearl Beads, Acrylic Glass',
        dimensions: '12 x 12 inches x 2.5 inches depth',
        careInstructions: 'Keep indoors in room temperature. Wipe with dry cotton cloth.',
        featured: true,
        bestSeller: true,
        rating: 5.0,
        numReviews: 53
      },
      {
        name: 'Winter Wonderland Pine Tree Candle Collection',
        slug: 'winter-wonderland-pine-tree-candle-collection',
        description: 'Set of clear glass tumblers filled with natural soy wax topped with sculpted green Christmas pines. Clean burning, soot-free, with refreshing evergreen aroma.',
        price: 799,
        originalPrice: 999,
        discountPercentage: 20,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-11.jpg',
          '/assets/products/product-07.jpg'
        ],
        stock: 20,
        material: 'Organic Soy Wax, Pine Essential Oil, Reusable Glass Container',
        dimensions: '8cm diameter x 8cm height (Set of 2)',
        careInstructions: 'Trim wick to 5mm before every lighting.',
        featured: false,
        bestSeller: false,
        rating: 4.8,
        numReviews: 18
      },
      {
        name: 'Holiday Teddy Bear & Pine Cone Winter Candle Set',
        slug: 'holiday-teddy-bear-pine-cone-winter-candle-set',
        description: 'Whimsical sculpted teddy bear candle with Christmas gift, snow-dusted pine cones, and miniature holiday decor inside clear glass tumbler.',
        price: 599,
        originalPrice: 799,
        discountPercentage: 25,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-12.jpg',
          '/assets/products/product-13.jpg'
        ],
        stock: 15,
        material: 'Natural Soy Wax, Glass Tumbler, Vanilla & Cocoa Bean Aroma',
        dimensions: '7.5cm x 9cm',
        careInstructions: 'Do not burn unattended. Keep away from flammable objects.',
        featured: false,
        bestSeller: false,
        rating: 4.9,
        numReviews: 21
      },
      {
        name: 'Sculptural Reindeer Soy Wax Candle',
        slug: 'sculptural-reindeer-soy-wax-candle',
        description: 'Freestanding 3D sculpted reindeer candle in smooth ivory white soy wax, detailed with golden antler bells and soft ambient glow.',
        price: 399,
        originalPrice: 499,
        discountPercentage: 20,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-13.jpg'
        ],
        stock: 25,
        material: 'Pure Soy Wax, Lead-Free Cotton Wick, Brass Bells',
        dimensions: '9cm height x 6cm width',
        careInstructions: 'Place on decorative plate or coaster when burning.',
        featured: false,
        bestSeller: false,
        rating: 4.8,
        numReviews: 14
      },
      {
        name: 'Gingerbread Men Soy Candle Family Set',
        slug: 'gingerbread-men-soy-candle-family-set',
        description: 'Adorably detailed set of 5 gingerbread men candles in warm caramel, vanilla, and chocolate shades with hand-piped icing details and warm baked cookie fragrance.',
        price: 649,
        originalPrice: 849,
        discountPercentage: 24,
        category: catMap['candles'],
        categoryName: 'Artisanal Scented Candles',
        images: [
          '/assets/products/product-14.jpg',
          '/assets/products/product-04.jpg'
        ],
        stock: 22,
        material: 'Soy Wax, Ginger & Spiced Vanilla Fragrance, Natural Dyes',
        dimensions: '7cm height x 5.5cm width each (Set of 5)',
        careInstructions: 'Keep away from excessive heat or direct sunlight.',
        featured: false,
        bestSeller: false,
        rating: 4.9,
        numReviews: 26
      },
      {
        name: 'Royal Maroon & Gold Geode Wedding Plaque',
        slug: 'royal-maroon-gold-geode-wedding-plaque',
        description: 'Opulent heirloom resin plaque featuring crushed glass geode borders with 24K gold gilding, deep imperial maroon resin pour, Lord Ganesha shloka, and personalized wedding invitation text.',
        price: 2499,
        originalPrice: 3299,
        discountPercentage: 24,
        category: catMap['clocks'],
        categoryName: 'Geode Clocks & Plaques',
        images: [
          '/assets/products/product-15.jpg'
        ],
        stock: 10,
        material: 'High-Impact Resin, Crushed Crystals, 24K Gold Leaf, Metallic Foil Calligraphy',
        dimensions: '12 x 8 inches x 0.5 inches',
        careInstructions: 'Display on acrylic easel stand. Clean with dry lens cloth.',
        featured: true,
        bestSeller: true,
        rating: 5.0,
        numReviews: 39
      },
      {
        name: 'Pet Memorial Angel Wing & Bone Keepsake Keychain',
        slug: 'pet-memorial-angel-wing-bone-keepsake-keychain',
        description: 'Heartfelt circular resin memorial keychain in heavenly aqua blue, preserving pet silhouette, golden angel wing, halo, actual pet tooth/fur, and metallic bone charm.',
        price: 499,
        originalPrice: 699,
        discountPercentage: 29,
        category: catMap['resin-gifts'],
        categoryName: 'Pet Memorials & Keepsakes',
        images: [
          '/assets/products/product-16.jpg'
        ],
        stock: 40,
        material: 'Crystal Clear UV Resin, Pet Keepsake Relic, Stainless Steel Split Ring & Charm',
        dimensions: '4.5cm diameter x 0.8cm thickness',
        careInstructions: 'Scratch-resistant. Wipe with soft cotton cloth.',
        featured: true,
        bestSeller: true,
        rating: 5.0,
        numReviews: 58
      },
      {
        name: 'Teardrop Pet Fur & Paw Print Pendant Necklace',
        slug: 'teardrop-pet-fur-paw-print-pendant-necklace',
        description: 'Forever hold your furry best friend close to your heart. Delicate gold bezel teardrop pendant preserving a lock of your pet’s actual fur and a sweet hand-painted paw print.',
        price: 699,
        originalPrice: 899,
        discountPercentage: 22,
        category: catMap['resin-gifts'],
        categoryName: 'Pet Memorials & Keepsakes',
        images: [
          '/assets/products/product-17.jpg',
          '/assets/products/product-18.jpg'
        ],
        stock: 30,
        material: 'Jewelry-Grade Clear Epoxy, 18K Gold-Plated Bezel & Chain, Pet Fur',
        dimensions: 'Pendant: 2.5cm x 1.8cm, Chain: 18 inches',
        careInstructions: 'Avoid spraying perfume directly onto resin pendant.',
        featured: true,
        bestSeller: true,
        rating: 5.0,
        numReviews: 47
      },
      {
        name: 'Heart Pet Hair & Gold Paw Charm Pendant',
        slug: 'heart-pet-hair-gold-paw-charm-pendant',
        description: 'Crystal-clear resin heart charm encasing pet fur lock, miniature golden heart charm, and golden paw pendant suspended on an 18K gold-plated box chain.',
        price: 749,
        originalPrice: 999,
        discountPercentage: 25,
        category: catMap['resin-gifts'],
        categoryName: 'Pet Memorials & Keepsakes',
        images: [
          '/assets/products/product-18.jpg',
          '/assets/products/product-22.jpg'
        ],
        stock: 25,
        material: 'Ultra-Clear Resin, 18K Gold Plated Alloy, Real Pet Hair',
        dimensions: 'Heart: 2.8cm x 2.8cm, Chain: 18 inches',
        careInstructions: 'Store in soft jewelry pouch when not wearing.',
        featured: false,
        bestSeller: true,
        rating: 4.9,
        numReviews: 36
      },
      {
        name: 'Custom Gold Leaf Pet Identification Tags',
        slug: 'custom-gold-leaf-pet-identification-tags',
        description: 'Custom resin pet tags in bone, fish, cat face, and round silhouettes infused with sparkling 24K gold foil flakes and your pet’s name in waterproof lettering.',
        price: 349,
        originalPrice: 499,
        discountPercentage: 30,
        category: catMap['resin-gifts'],
        categoryName: 'Pet Memorials & Keepsakes',
        images: [
          '/assets/products/product-19.jpg',
          '/assets/products/product-20.jpg'
        ],
        stock: 45,
        material: 'Shatter-Resistant Hard Resin, Gold Leaf, Heavy-Duty Jump Ring',
        dimensions: 'Various shapes: 4cm to 5cm width',
        careInstructions: 'Waterproof and mud-proof. Rinse with clean water.',
        featured: false,
        bestSeller: true,
        rating: 4.8,
        numReviews: 42
      },
      {
        name: 'Bone-Shaped Monogram Pet Tag with Gold Foil',
        slug: 'bone-shaped-monogram-pet-tag-gold-foil',
        description: 'Milky porcelain white bone-shaped pet collar tag accented with genuine gold leaf flakes and bold black script typography.',
        price: 399,
        originalPrice: 499,
        discountPercentage: 20,
        category: catMap['resin-gifts'],
        categoryName: 'Pet Memorials & Keepsakes',
        images: [
          '/assets/products/product-20.jpg',
          '/assets/products/product-21.jpg'
        ],
        stock: 35,
        material: 'Cast Resin, Gold Leaf, Brass Split Ring',
        dimensions: '5cm width x 3cm height',
        careInstructions: 'Wipe clean with damp cloth.',
        featured: false,
        bestSeller: false,
        rating: 4.9,
        numReviews: 29
      },
      {
        name: 'Midnight Black & Gold Foil Bone Pet Tag ("Leo")',
        slug: 'midnight-black-gold-foil-bone-pet-tag',
        description: 'Statement midnight black resin dog tag with brilliant 24K gold foil flakes framing both ends and metallic rose gold cursive lettering.',
        price: 449,
        originalPrice: 599,
        discountPercentage: 25,
        category: catMap['resin-gifts'],
        categoryName: 'Pet Memorials & Keepsakes',
        images: [
          '/assets/products/product-21.jpg',
          '/assets/products/product-22.jpg'
        ],
        stock: 30,
        material: 'High-Gloss Pigmented Resin, Gold Foil, Heavy Brass Ring',
        dimensions: '6cm x 3.5cm',
        careInstructions: 'Durable and weather resistant.',
        featured: false,
        bestSeller: false,
        rating: 5.0,
        numReviews: 31
      },
      {
        name: 'Circular Pet Fur Keepsake Medallion ("Thor")',
        slug: 'circular-pet-fur-keepsake-medallion',
        description: 'Pastel sky blue circular pendant capturing a swirling lock of your pet’s coat with golden hollow paw outline, mini heart, and scripted pet name.',
        price: 599,
        originalPrice: 799,
        discountPercentage: 25,
        category: catMap['resin-gifts'],
        categoryName: 'Pet Memorials & Keepsakes',
        images: [
          '/assets/products/product-22.jpg',
          '/assets/products/product-17.jpg'
        ],
        stock: 25,
        material: 'Epoxy Resin, Gold Charms, Client Pet Hair, 18K Gold Plated Bail',
        dimensions: '3.5cm diameter',
        careInstructions: 'Gently polish with dry microfibre cloth.',
        featured: false,
        bestSeller: false,
        rating: 5.0,
        numReviews: 33
      },
      {
        name: 'Hexagonal Botanical Rakhi ("Sameer")',
        slug: 'hexagonal-botanical-rakhi-sameer',
        description: 'Handcrafted geometric hexagonal resin rakhi preserving real blush pink daisy petals, golden butterflies, pearls, and your brother’s name.',
        price: 299,
        originalPrice: 399,
        discountPercentage: 25,
        category: catMap['hand-casting'],
        categoryName: 'Custom Floral Rakhis',
        images: [
          '/assets/products/product-23.jpg',
          '/assets/products/product-24.jpg'
        ],
        stock: 50,
        material: 'Clear Resin, Real Pressed Daisy, Gold Thread, Ceramic & Pearl Beads',
        dimensions: 'Hexagon: 3.5cm diameter, Thread: 12 inches',
        careInstructions: 'Handle with love. Can be repurposed as a bookmark or keepsake charm after Raksha Bandhan.',
        featured: false,
        bestSeller: true,
        rating: 4.9,
        numReviews: 44
      },
      {
        name: 'Sunburst Yellow Daisy Floral Resin Rakhi',
        slug: 'sunburst-yellow-daisy-floral-resin-rakhi',
        description: 'Vibrant yellow daisy preserved in high-clarity hexagonal resin with metallic calligraphy name, carved red beads, and golden woven thread.',
        price: 299,
        originalPrice: 399,
        discountPercentage: 25,
        category: catMap['hand-casting'],
        categoryName: 'Custom Floral Rakhis',
        images: [
          '/assets/products/product-24.jpg',
          '/assets/products/product-23.jpg'
        ],
        stock: 45,
        material: 'Jewelry Resin, Real Yellow Blossom, Golden Dori, Crystal Spacers',
        dimensions: 'Hexagon: 3.5cm diameter, Thread: 12 inches',
        careInstructions: 'Keep dry and store in cotton pouch.',
        featured: false,
        bestSeller: true,
        rating: 4.8,
        numReviews: 37
      },
      {
        name: 'Rose Gold Bhaiya-Bhabhi Rakhi & Loomba Set',
        slug: 'rose-gold-bhaiya-bhabhi-rakhi-loomba-set',
        description: 'Designer coordinated pair for brother and bhabhi. Features a circular loomba with pearl latkan and rectangular rakhi with dried coral daisy, rose gold flakes, and custom names.',
        price: 599,
        originalPrice: 799,
        discountPercentage: 25,
        category: catMap['hand-casting'],
        categoryName: 'Custom Floral Rakhis',
        images: [
          '/assets/products/product-25.jpg',
          '/assets/products/product-26.jpg',
          '/assets/products/product-27.jpg'
        ],
        stock: 35,
        material: 'Clear Epoxy, Real Pressed Florals, 24K Gold Leaf, Pearls & Silk Tassel',
        dimensions: 'Loomba: 4cm + 8cm latkan, Rakhi: 3.5 x 2.5cm',
        careInstructions: 'Reusable keepsake. Loomba latkan can be worn as jewelry or saree brooch.',
        featured: true,
        bestSeller: true,
        rating: 5.0,
        numReviews: 61
      },
      {
        name: 'Fuchsia Daisy Bhaiya-Bhabhi Loomba Pair',
        slug: 'fuchsia-daisy-bhaiya-bhabhi-loomba-pair',
        description: 'Vibrant hot pink daisy pair with gold foil border, personalized golden lettering, matching pink cord, and lustrous pearl cluster drops.',
        price: 599,
        originalPrice: 799,
        discountPercentage: 25,
        category: catMap['hand-casting'],
        categoryName: 'Custom Floral Rakhis',
        images: [
          '/assets/products/product-26.jpg',
          '/assets/products/product-29.jpg'
        ],
        stock: 30,
        material: 'Epoxy Resin, Natural Fuchsia Daisy, Gold Foiling, Crystal Rhinestones',
        dimensions: 'Loomba: 4cm + 7cm latkan, Rakhi: 3.5 x 2.2cm',
        careInstructions: 'Store in airtight box after the festivities.',
        featured: false,
        bestSeller: true,
        rating: 4.9,
        numReviews: 43
      },
      {
        name: 'Sunflower & Pearl Couple Loomba Rakhi Set',
        slug: 'sunflower-pearl-couple-loomba-rakhi-set',
        description: 'Sunny yellow floral scalloped loomba with triple pearl tassel and coordinated rectangular brother rakhi, green crystal beads, and gold flake shimmer.',
        price: 649,
        originalPrice: 849,
        discountPercentage: 24,
        category: catMap['hand-casting'],
        categoryName: 'Custom Floral Rakhis',
        images: [
          '/assets/products/product-29.jpg',
          '/assets/products/product-30.jpg'
        ],
        stock: 25,
        material: 'Resin, Pressed Yellow Blooms, Simulated Pearls, Green Agate Style Beads',
        dimensions: 'Loomba: 4.5cm + 7cm pearl fall, Rakhi: 3.8 x 2.5cm',
        careInstructions: 'Clean with soft cloth. Avoid moisture.',
        featured: false,
        bestSeller: false,
        rating: 5.0,
        numReviews: 28
      },
      {
        name: 'Personalized Floral Slider Bracelet ("Nishaan")',
        slug: 'personalized-floral-slider-bracelet',
        description: 'Minimalist luxury floral wristlet featuring a scalloped resin charm embedding real violet flower, personalized gold foil name, and an adjustable box slider chain with pearl charm.',
        price: 499,
        originalPrice: 699,
        discountPercentage: 29,
        category: catMap['personalized-gifts'],
        categoryName: 'Varmala & Wedding Keepsakes',
        images: [
          '/assets/products/product-28.jpg'
        ],
        stock: 35,
        material: '18K Gold-Plated Stainless Steel, Jewelry Resin, Real Dried Bloom',
        dimensions: 'Resin charm: 2.5cm, Chain: Adjustable up to 9 inches',
        careInstructions: 'Remove before swimming or bathing. Wipe with microfibre cloth.',
        featured: true,
        bestSeller: true,
        rating: 4.9,
        numReviews: 39
      },
      {
        name: 'Mint Daisy Bhaiya-Bhabhi Floral Rakhi Set',
        slug: 'mint-daisy-bhaiya-bhabhi-floral-rakhi-set',
        description: 'Refreshing seafoam green and mint daisy resin rakhi set with gold foil leafing, emerald beads, and cascading golden tassel.',
        price: 599,
        originalPrice: 799,
        discountPercentage: 25,
        category: catMap['hand-casting'],
        categoryName: 'Custom Floral Rakhis',
        images: [
          '/assets/products/product-30.jpg',
          '/assets/products/product-27.jpg'
        ],
        stock: 28,
        material: 'Epoxy Resin, Natural Pressed Florals, Emerald & Pearl Beads, Gold Dori',
        dimensions: 'Loomba: 4cm + 7cm latkan, Rakhi: 3.5 x 2.5cm',
        careInstructions: 'Keep in cotton pouch.',
        featured: false,
        bestSeller: false,
        rating: 4.9,
        numReviews: 31
      }
    ];

    const createdProducts = await Product.insertMany(productsData);

    console.log('Seeding reviews...');
    const reviewsData = [
      {
        product: createdProducts[0]._id,
        user: customer1._id,
        name: 'Priya Sharma',
        rating: 5,
        title: 'Breathtaking finish for our home temple!',
        comment: 'Absolutely beautiful Pooja Thali. The detailing of the Ganesha idol and preserved petals is so pure and divine. The quality is truly exceptional!'
      },
      {
        product: createdProducts[1]._id,
        user: customer2._id,
        name: 'Ananya Verma',
        rating: 5,
        title: 'Lovely Modak candles with gold flakes',
        comment: 'Ordered for Ganesh Chaturthi and Diwali gifts. Everyone in the family loved the aroma and the 24K gold foil details. 10/10 recommend!'
      },
      {
        product: createdProducts[8]._id,
        user: customer3._id,
        name: 'Rohan Deshmukh',
        rating: 5,
        title: 'Our wedding memories preserved forever',
        comment: 'Mahima preserved my wife’s bridal chooda and our varmala roses into this magnificent frame. Truly an heirloom we will treasure for life!'
      },
      {
        product: createdProducts[14]._id,
        user: customer1._id,
        name: 'Priya Sharma',
        rating: 5,
        title: 'Brought tears to my eyes',
        comment: 'Lost our beloved dog recently and Mahima crafted a keychain with his fur and halo. So emotional, comforting and beautifully made.'
      },
      {
        product: createdProducts[23]._id,
        user: customer2._id,
        name: 'Ananya Verma',
        rating: 5,
        title: 'Best Bhaiya Bhabhi Rakhi ever',
        comment: 'The real daisy encased in clear resin looks so fresh and graceful. My brother and bhabhi were amazed!'
      }
    ];

    await Review.insertMany(reviewsData);

    console.log('Seeding demo custom orders...');
    const customOrdersData = [
      {
        name: 'Dr. Sneha Joshi',
        email: 'sneha.joshi@example.com',
        phone: '+91 94250 88776',
        productType: 'Preserved Flower Frame',
        budget: '₹3,000 - ₹5,000',
        preferredColor: 'Crimson, Gold Leaf & White Roses',
        customizationDetails: 'Want to preserve wedding garland roses along with our bridal picture and wedding date (21st Nov 2025).',
        occasion: 'Wedding',
        requiredDate: '2026-10-15',
        status: 'Quoted',
        quoteAmount: 3800,
        adminNotes: 'Spoke over WhatsApp (+91 93290 28062). Received flowers in studio. Ready for resin pour.'
      },
      {
        name: 'Vikram & Tanvi Mehta',
        email: 'vikram.mehta@example.com',
        phone: '+91 98930 44332',
        productType: 'Couple / Name Plaque',
        budget: '₹2,500 - ₹4,000',
        preferredColor: 'Royal Maroon & Champagne Gold',
        customizationDetails: 'Bespoke acrylic invitation plaque with gold cursive lettering and crushed geode crystals for living room display.',
        occasion: 'Anniversary',
        requiredDate: '2026-10-05',
        status: 'In Progress',
        quoteAmount: 3200,
        adminNotes: 'Base layer cured. Adding gold leaf calligraphy now.'
      },
      {
        name: 'Kavita Chawla',
        email: 'kavita.chawla@example.com',
        phone: '+91 98270 99881',
        productType: 'Other Custom Creation',
        budget: '₹700 - ₹1,200',
        preferredColor: 'Sky Blue & Gold Paw Charm',
        customizationDetails: 'Tear drop pendant with golden retriever fur curl and custom name "Bruno".',
        occasion: 'Memorial',
        requiredDate: '2026-10-20',
        status: 'Pending',
        quoteAmount: 850,
        adminNotes: 'New inquiry received via website form.'
      }
    ];

    await CustomOrder.insertMany(customOrdersData);

    console.log('Seeding demo orders with timeline states...');
    const orderStatuses = [
      'Delivered',
      'Shipped',
      'Out for Delivery',
      'Processing',
      'Confirmed'
    ];

    const demoOrders = [];
    const users = [customer1, customer2, customer3];

    for (let i = 0; i < 10; i++) {
      const selectedUser = users[i % users.length];
      const prod1 = createdProducts[i % createdProducts.length];
      const prod2 = createdProducts[(i + 3) % createdProducts.length];
      const status = orderStatuses[i % orderStatuses.length];

      const item1Price = prod1.price;
      const item2Price = prod2.price;
      const subtotal = item1Price + item2Price;
      const discount = i % 3 === 0 ? 100 : 0;
      const shippingCharge = subtotal > 999 ? 0 : 99;
      const finalAmount = subtotal - discount + shippingCharge;

      demoOrders.push({
        orderId: `RAC-2026-${1000 + i}`,
        user: selectedUser._id,
        customer: {
          name: selectedUser.name,
          email: selectedUser.email,
          phone: selectedUser.phone
        },
        shippingAddress: {
          house: selectedUser.addresses[0].house,
          area: selectedUser.addresses[0].area,
          city: selectedUser.addresses[0].city,
          state: selectedUser.addresses[0].state,
          pincode: selectedUser.addresses[0].pincode
        },
        orderItems: [
          {
            product: prod1._id,
            name: prod1.name,
            price: item1Price,
            quantity: 1,
            image: prod1.images[0]
          },
          {
            product: prod2._id,
            name: prod2.name,
            price: item2Price,
            quantity: 1,
            image: prod2.images[0]
          }
        ],
        subtotal,
        discount,
        shippingFee: shippingCharge,
        totalAmount: finalAmount,
        paymentMethod: i % 2 === 0 ? 'Razorpay' : 'COD',
        paymentStatus: status === 'Delivered' || status === 'Shipped' || i % 2 === 0 ? 'Paid' : 'Pending',
        orderStatus: status,
        timeline: [
          { status: 'Order Placed', timestamp: new Date(Date.now() - (10 - i) * 86400000), note: 'Customer placed order successfully.' },
          { status: 'Payment Confirmed', timestamp: new Date(Date.now() - (9 - i) * 86400000), note: 'Payment verified by atelier.' },
          ...(status !== 'Confirmed' ? [{ status: 'Processing', timestamp: new Date(Date.now() - (7 - i) * 86400000), note: 'Artisan finished protective clear coat.' }] : []),
          ...(status === 'Shipped' || status === 'Out for Delivery' || status === 'Delivered' ? [{ status: 'Shipped', timestamp: new Date(Date.now() - (4 - i) * 86400000), note: 'Handed over to express courier with tracking ID.' }] : []),
          ...(status === 'Delivered' ? [{ status: 'Delivered', timestamp: new Date(Date.now() - (1 - i) * 86400000), note: 'Successfully delivered to customer doorstep.' }] : [])
        ]
      });
    }

    await Order.insertMany(demoOrders);

    console.log('--------------------------------------------------');
    console.log('DATABASE SEEDED SUCCESSFULLY WITH AUTHENTIC PRODUCTS!');
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Products: ${createdProducts.length}`);
    console.log(`- Reviews: ${reviewsData.length}`);
    console.log(`- Custom Orders: ${customOrdersData.length}`);
    console.log(`- Demo Orders: ${demoOrders.length}`);
    console.log(`- Admin Credentials: admin@resinartworkcreations.com / admin123`);
    console.log('--------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
