/**
 * ==============================================================================
 * DUMMY DATA FOR PRODUCTION / FALLBACK DEMO
 * ==============================================================================
 * To remove or disable dummy data once the live backend / MongoDB database is
 * connected, simply set USE_DUMMY_DATA = false below (or remove the fallbacks).
 * ==============================================================================
 */

export const USE_DUMMY_DATA = true;

export const DUMMY_CATEGORIES = [
  {
    _id: 'cat-resin-art',
    name: 'Resin Art & Pooja Thalis',
    slug: 'resin-art',
    description: 'Bespoke resin pooja thalis, divine Ganesha trays, and luxury handcrafted decor made with crystal clear epoxy.',
    image: '/assets/products/product-01.png',
    itemCount: 4,
    order: 1
  },
  {
    _id: 'cat-candles',
    name: 'Artisanal Scented Candles',
    slug: 'candles',
    description: 'Hand-poured 100% soy wax modak candles, seasonal pine trees, and dessert bowls infused with pure essential oils.',
    image: '/assets/products/product-02.jpg',
    itemCount: 7,
    order: 2
  },
  {
    _id: 'cat-personalized-gifts',
    name: 'Varmala & Wedding Keepsakes',
    slug: 'personalized-gifts',
    description: 'Museum-grade preservation frames for bridal varmalas, chooda, kaleere, and personalized wedding invitation plaques.',
    image: '/assets/products/product-10.jpg',
    itemCount: 3,
    order: 3
  },
  {
    _id: 'cat-resin-gifts',
    name: 'Pet Memorials & Keepsakes',
    slug: 'resin-gifts',
    description: 'Tear-drop pendants, heart necklaces, and personalized pet collar tags lovingly preserving pet fur and paw prints.',
    image: '/assets/products/product-18.jpg',
    itemCount: 6,
    order: 4
  },
  {
    _id: 'cat-clocks',
    name: 'Geode Clocks & Plaques',
    slug: 'clocks',
    description: 'Statement handmade geode wall clocks and royal maroon wedding invitation plaques with 24K gold foil.',
    image: '/assets/products/product-15.jpg',
    itemCount: 2,
    order: 5
  },
  {
    _id: 'cat-gift-hampers',
    name: 'Festive Hampers & Favors',
    slug: 'gift-hampers',
    description: 'Curated gifting hampers with modak candles, marigold thalis, and gingerbread holiday favors.',
    image: '/assets/products/product-03.jpg',
    itemCount: 2,
    order: 6
  },
  {
    _id: 'cat-handmade-soaps',
    name: 'Winter Holiday Collection',
    slug: 'handmade-soaps',
    description: 'Special edition Christmas candles, sculpted reindeers, and snowflake tumblers with golden bells.',
    image: '/assets/products/product-06.jpg',
    itemCount: 2,
    order: 7
  },
  {
    _id: 'cat-hand-casting',
    name: 'Custom Floral Rakhis',
    slug: 'hand-casting',
    description: 'Handcrafted floral resin Bhaiya-Bhabhi rakhis, loomba sets, and personalized name slider bracelets.',
    image: '/assets/products/product-25.jpg',
    itemCount: 5,
    order: 8
  }
];

export const DUMMY_PRODUCTS = [
  {
    _id: 'prod-01',
    name: 'Resin Ganesha Pooja Thali & Diya Set',
    slug: 'resin-ganesha-pooja-thali-diya-set',
    description: 'Handcrafted luxury divine Pooja Thali encasing a porcelain Ganesha idol, brass diyas for kumkum & chawal, tealight holders, 24K gold foil flakes, and real preserved botanical florals.',
    price: 1499,
    originalPrice: 1999,
    discountPercentage: 25,
    category: {
      _id: 'cat-resin-art',
      name: 'Resin Art & Pooja Thalis',
      slug: 'resin-art'
    },
    categoryName: 'Resin Art & Pooja Thalis',
    images: [
      '/assets/products/product-01.png'
    ],
    stock: 15,
    material: 'Optical Grade Epoxy Resin, Brass Bowls, Ganesha Idol, Gold Leaf, Real Flowers',
    dimensions: '10 inches diameter x 0.5 inches depth',
    careInstructions: 'Clean with soft damp cloth. Keep away from direct high flame on resin surface.',
    customizationOptions: ['Name Inscription', 'Color Theme Customization', 'Flower Preservation Option'],
    featured: true,
    bestSeller: true,
    rating: 5.0,
    numReviews: 48,
    isAvailable: true,
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  {
    _id: 'prod-02',
    name: 'Pastel & Gold Leaf Modak Candles (Set of 6)',
    slug: 'pastel-gold-leaf-modak-candles-set-of-6',
    description: 'Handcrafted organic soy wax modak-shaped festive candles adorned with authentic 24K gold and silver leaf flakes in pastel pink, buttercup yellow, and pearl cream.',
    price: 599,
    originalPrice: 799,
    discountPercentage: 25,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-02.jpg',
      '/assets/products/product-03.jpg'
    ],
    stock: 35,
    material: '100% Pure Soy Wax, Organic Cotton Wick, 24K Gold Leaf, Premium Fragrance Oil',
    dimensions: '5cm height x 4.5cm width each',
    careInstructions: 'Trim wick to 1/4 inch before burning. Burn on heat-safe thali or tray.',
    customizationOptions: ['Scent Preference', 'Color Palette', 'Gift Packaging'],
    featured: true,
    bestSeller: true,
    rating: 4.9,
    numReviews: 56,
    isAvailable: true,
    createdAt: '2026-01-16T11:00:00.000Z'
  },
  {
    _id: 'prod-03',
    name: 'Metallic Modak Diya Candle Thali Set',
    slug: 'metallic-modak-diya-candle-thali-set',
    description: 'Festive arrangement of 6 vibrant metallic modak candles (saffron, crimson, emerald, gold) enriched with royal gold flakes, placed on a decorative marigold petal base.',
    price: 699,
    originalPrice: 899,
    discountPercentage: 22,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-03.jpg',
      '/assets/products/product-02.jpg'
    ],
    stock: 25,
    material: 'Pure Soy Wax, Essential Oils, Gold Foil, Cotton Wick',
    dimensions: '6cm x 5cm each (Set of 6)',
    careInstructions: 'Place on flameproof surface away from drafts.',
    customizationOptions: ['Fragrance Blend', 'Color Selection'],
    featured: false,
    bestSeller: true,
    rating: 4.8,
    numReviews: 32,
    isAvailable: true,
    createdAt: '2026-01-18T09:30:00.000Z'
  },
  {
    _id: 'prod-04',
    name: 'Holiday Gingerbread Man Candle Favors',
    slug: 'holiday-gingerbread-man-candle-favors',
    description: 'Delightful vanilla-scented gingerbread man candles individually wrapped in sheer white organza with festive ribbon and reindeer gift tag.',
    price: 349,
    originalPrice: 449,
    discountPercentage: 22,
    category: {
      _id: 'cat-gift-hampers',
      name: 'Festive Hampers & Favors',
      slug: 'gift-hampers'
    },
    categoryName: 'Festive Hampers & Favors',
    images: [
      '/assets/products/product-04.jpg',
      '/assets/products/product-14.jpg'
    ],
    stock: 50,
    material: 'Soy Wax, French Vanilla Fragrance, Organza Pouch, Satin Ribbon',
    dimensions: '8cm x 6cm',
    careInstructions: 'Keep in cool dry place until ready to light.',
    customizationOptions: ['Ribbon Color', 'Gift Tag Message'],
    featured: false,
    bestSeller: false,
    rating: 4.9,
    numReviews: 24,
    isAvailable: true,
    createdAt: '2026-01-20T14:15:00.000Z'
  },
  {
    _id: 'prod-05',
    name: 'Frosted Snowflake Glass Tumbler Candle',
    slug: 'frosted-snowflake-glass-tumbler-candle',
    description: 'Pure white winter soy candle poured in clear glass tumbler featuring an intricate sculpted snowflake wax topper with delicate golden jingle bell accent.',
    price: 549,
    originalPrice: 699,
    discountPercentage: 21,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-05.jpg'
    ],
    stock: 28,
    material: 'Natural Soy Wax, Glass Tumbler, Cotton Wick, Brass Bell',
    dimensions: '7.5cm diameter x 8.5cm height',
    careInstructions: 'Allow melt pool to reach glass edges on first burn.',
    customizationOptions: ['Winter Fragrance', 'Bell Charm'],
    featured: false,
    bestSeller: false,
    rating: 4.7,
    numReviews: 19,
    isAvailable: true,
    createdAt: '2026-01-22T10:00:00.000Z'
  },
  {
    _id: 'prod-06',
    name: 'Merry Christmas Gourmet Dessert Candle Bowl',
    slug: 'merry-christmas-gourmet-dessert-candle-bowl',
    description: 'Whimsical artisan candle bowl crafted with whipped wax frosting, miniature Santa Claus, pink Christmas tree, candy canes, and festive ornaments in warm cinnamon spice scent.',
    price: 999,
    originalPrice: 1299,
    discountPercentage: 23,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-06.jpg'
    ],
    stock: 16,
    material: 'Soy Wax, Glass Bowl, Cinnamon Spice & Vanilla Essential Oils',
    dimensions: '12cm diameter x 9cm height',
    careInstructions: 'Multi-wick candle. Trim all wicks before each burn.',
    customizationOptions: ['Topper Theme', 'Fragrance Selection'],
    featured: true,
    bestSeller: false,
    rating: 5.0,
    numReviews: 27,
    isAvailable: true,
    createdAt: '2026-01-24T12:00:00.000Z'
  },
  {
    _id: 'prod-07',
    name: 'Forest Pine Tree Scented Candle in Glass',
    slug: 'forest-pine-tree-scented-candle-in-glass',
    description: 'Tiered forest green pine tree soy candle nestled on whipped snow wax inside a clear tumbler with fresh Siberian fir and pine needle scent.',
    price: 499,
    originalPrice: 649,
    discountPercentage: 23,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-07.jpg',
      '/assets/products/product-11.jpg'
    ],
    stock: 30,
    material: 'Soy Wax, Pine Needle Extract, Glass Jar, Cotton Wick',
    dimensions: '7cm diameter x 9cm height',
    careInstructions: 'Keep wick centered and trimmed.',
    customizationOptions: ['Scent Blend'],
    featured: false,
    bestSeller: false,
    rating: 4.8,
    numReviews: 22,
    isAvailable: true,
    createdAt: '2026-01-25T13:00:00.000Z'
  },
  {
    _id: 'prod-08',
    name: 'Layered Sand & Pine Tree Holiday Candle',
    slug: 'layered-sand-pine-tree-holiday-candle',
    description: 'Exquisite multi-tone red, green, and white crystalline sand wax candle topped with a frosted evergreen tree in a luxury "Thank You" glass tumbler.',
    price: 549,
    originalPrice: 699,
    discountPercentage: 21,
    category: {
      _id: 'cat-handmade-soaps',
      name: 'Winter Holiday Collection',
      slug: 'handmade-soaps'
    },
    categoryName: 'Winter Holiday Collection',
    images: [
      '/assets/products/product-08.jpg',
      '/assets/products/product-07.jpg'
    ],
    stock: 20,
    material: 'Granulated Mineral Wax, Scented Soy Topper, Glass Tumbler',
    dimensions: '8cm diameter x 10cm height',
    careInstructions: 'Keep away from moisture and direct heat.',
    customizationOptions: ['Sand Layer Colors'],
    featured: false,
    bestSeller: false,
    rating: 4.8,
    numReviews: 16,
    isAvailable: true,
    createdAt: '2026-01-26T15:00:00.000Z'
  },
  {
    _id: 'prod-09',
    name: 'Bridal Varmala, Chooda & Jewelry Keepsake Frame',
    slug: 'bridal-varmala-chooda-jewelry-keepsake-frame',
    description: 'The ultimate royal wedding heirloom. Preserves bride and groom varmala roses, wedding chooda bangles, bridal jewelry, pearl necklaces, kaleere, and personalized wedding date calligraphy in solid teak shadowbox.',
    price: 4499,
    originalPrice: 5999,
    discountPercentage: 25,
    category: {
      _id: 'cat-personalized-gifts',
      name: 'Varmala & Wedding Keepsakes',
      slug: 'personalized-gifts'
    },
    categoryName: 'Varmala & Wedding Keepsakes',
    images: [
      '/assets/products/product-09.jpg',
      '/assets/products/product-10.jpg'
    ],
    stock: 8,
    material: 'Teakwood Shadowbox, Optical UV Epoxy, Client Wedding Jewelry & Flowers, 24K Gold Text',
    dimensions: '14 x 14 inches x 3 inches depth',
    careInstructions: 'Dust with soft microfiber. Avoid hanging in direct unrelenting afternoon sunlight.',
    customizationOptions: ['Couple Names & Date', 'Varmala & Jewelry Placement', 'Frame Finish'],
    featured: true,
    bestSeller: true,
    rating: 5.0,
    numReviews: 64,
    isAvailable: true,
    createdAt: '2026-01-27T16:00:00.000Z'
  },
  {
    _id: 'prod-10',
    name: 'Wedding Varmala & Pearl 3D Keepsake Frame',
    slug: 'wedding-varmala-pearl-3d-keepsake-frame',
    description: 'A deeply emotional keepsake preserving your actual wedding varmala florals, bride & groom portrait, golden wedding date inscription, and glowing ivory pearls in crystal epoxy.',
    price: 2999,
    originalPrice: 3999,
    discountPercentage: 25,
    category: {
      _id: 'cat-personalized-gifts',
      name: 'Varmala & Wedding Keepsakes',
      slug: 'personalized-gifts'
    },
    categoryName: 'Varmala & Wedding Keepsakes',
    images: [
      '/assets/products/product-10.jpg',
      '/assets/products/product-09.jpg'
    ],
    stock: 12,
    material: 'Solid Wood Box, Preserved Varmala Petals, Couple Photograph, Pearl Beads, Acrylic Glass',
    dimensions: '12 x 12 inches x 2.5 inches depth',
    careInstructions: 'Keep indoors in room temperature. Wipe with dry cotton cloth.',
    customizationOptions: ['Photograph Insertion', 'Date & Vows Engraving'],
    featured: true,
    bestSeller: true,
    rating: 5.0,
    numReviews: 53,
    isAvailable: true,
    createdAt: '2026-01-28T17:00:00.000Z'
  },
  {
    _id: 'prod-11',
    name: 'Winter Wonderland Pine Tree Candle Collection',
    slug: 'winter-wonderland-pine-tree-candle-collection',
    description: 'Set of clear glass tumblers filled with natural soy wax topped with sculpted green Christmas pines. Clean burning, soot-free, with refreshing evergreen aroma.',
    price: 799,
    originalPrice: 999,
    discountPercentage: 20,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-11.jpg',
      '/assets/products/product-07.jpg'
    ],
    stock: 20,
    material: 'Organic Soy Wax, Pine Essential Oil, Reusable Glass Container',
    dimensions: '8cm diameter x 8cm height (Set of 2)',
    careInstructions: 'Trim wick to 5mm before every lighting.',
    customizationOptions: ['Set of 2 or 4', 'Gift Packaging'],
    featured: false,
    bestSeller: false,
    rating: 4.8,
    numReviews: 18,
    isAvailable: true,
    createdAt: '2026-01-29T10:00:00.000Z'
  },
  {
    _id: 'prod-12',
    name: 'Holiday Teddy Bear & Pine Cone Winter Candle Set',
    slug: 'holiday-teddy-bear-pine-cone-winter-candle-set',
    description: 'Whimsical sculpted teddy bear candle with Christmas gift, snow-dusted pine cones, and miniature holiday decor inside clear glass tumbler.',
    price: 599,
    originalPrice: 799,
    discountPercentage: 25,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-12.jpg',
      '/assets/products/product-13.jpg'
    ],
    stock: 15,
    material: 'Natural Soy Wax, Glass Tumbler, Vanilla & Cocoa Bean Aroma',
    dimensions: '7.5cm x 9cm',
    careInstructions: 'Do not burn unattended. Keep away from flammable objects.',
    customizationOptions: ['Bear Scarf Color'],
    featured: false,
    bestSeller: false,
    rating: 4.9,
    numReviews: 21,
    isAvailable: true,
    createdAt: '2026-01-30T11:00:00.000Z'
  },
  {
    _id: 'prod-13',
    name: 'Sculptural Reindeer Soy Wax Candle',
    slug: 'sculptural-reindeer-soy-wax-candle',
    description: 'Freestanding 3D sculpted reindeer candle in smooth ivory white soy wax, detailed with golden antler bells and soft ambient glow.',
    price: 399,
    originalPrice: 499,
    discountPercentage: 20,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-13.jpg'
    ],
    stock: 25,
    material: 'Pure Soy Wax, Lead-Free Cotton Wick, Brass Bells',
    dimensions: '9cm height x 6cm width',
    careInstructions: 'Place on decorative plate or coaster when burning.',
    customizationOptions: ['Bell Color: Gold / Rose Gold'],
    featured: false,
    bestSeller: false,
    rating: 4.8,
    numReviews: 14,
    isAvailable: true,
    createdAt: '2026-01-31T12:00:00.000Z'
  },
  {
    _id: 'prod-14',
    name: 'Gingerbread Men Soy Candle Family Set',
    slug: 'gingerbread-men-soy-candle-family-set',
    description: 'Adorably detailed set of 5 gingerbread men candles in warm caramel, vanilla, and chocolate shades with hand-piped icing details and warm baked cookie fragrance.',
    price: 649,
    originalPrice: 849,
    discountPercentage: 24,
    category: {
      _id: 'cat-candles',
      name: 'Artisanal Scented Candles',
      slug: 'candles'
    },
    categoryName: 'Artisanal Scented Candles',
    images: [
      '/assets/products/product-14.jpg',
      '/assets/products/product-04.jpg'
    ],
    stock: 22,
    material: 'Soy Wax, Ginger & Spiced Vanilla Fragrance, Natural Dyes',
    dimensions: '7cm height x 5.5cm width each (Set of 5)',
    careInstructions: 'Keep away from excessive heat or direct sunlight.',
    customizationOptions: ['Custom Quantity', 'Gift Box'],
    featured: false,
    bestSeller: false,
    rating: 4.9,
    numReviews: 26,
    isAvailable: true,
    createdAt: '2026-02-01T14:00:00.000Z'
  },
  {
    _id: 'prod-15',
    name: 'Royal Maroon & Gold Geode Wedding Plaque',
    slug: 'royal-maroon-gold-geode-wedding-plaque',
    description: 'Opulent heirloom resin plaque featuring crushed glass geode borders with 24K gold gilding, deep imperial maroon resin pour, Lord Ganesha shloka, and personalized wedding invitation text.',
    price: 2499,
    originalPrice: 3299,
    discountPercentage: 24,
    category: {
      _id: 'cat-clocks',
      name: 'Geode Clocks & Plaques',
      slug: 'clocks'
    },
    categoryName: 'Geode Clocks & Plaques',
    images: [
      '/assets/products/product-15.jpg'
    ],
    stock: 10,
    material: 'High-Impact Resin, Crushed Crystals, 24K Gold Leaf, Metallic Foil Calligraphy',
    dimensions: '12 x 8 inches x 0.5 inches',
    careInstructions: 'Display on acrylic easel stand. Clean with dry lens cloth.',
    customizationOptions: ['Invitation Text & Shloka', 'Border Color (Maroon, Emerald, Sapphire)'],
    featured: true,
    bestSeller: true,
    rating: 5.0,
    numReviews: 39,
    isAvailable: true,
    createdAt: '2026-02-02T15:00:00.000Z'
  },
  {
    _id: 'prod-16',
    name: 'Pet Memorial Angel Wing & Bone Keepsake Keychain',
    slug: 'pet-memorial-angel-wing-bone-keepsake-keychain',
    description: 'Heartfelt circular resin memorial keychain in heavenly aqua blue, preserving pet silhouette, golden angel wing, halo, actual pet tooth/fur, and metallic bone charm.',
    price: 499,
    originalPrice: 699,
    discountPercentage: 29,
    category: {
      _id: 'cat-resin-gifts',
      name: 'Pet Memorials & Keepsakes',
      slug: 'resin-gifts'
    },
    categoryName: 'Pet Memorials & Keepsakes',
    images: [
      '/assets/products/product-16.jpg'
    ],
    stock: 40,
    material: 'Crystal Clear UV Resin, Pet Keepsake Relic, Stainless Steel Split Ring & Charm',
    dimensions: '4.5cm diameter x 0.8cm thickness',
    careInstructions: 'Scratch-resistant. Wipe with soft cotton cloth.',
    customizationOptions: ['Pet Name', 'Fur or Tooth Inclusion', 'Background Tint'],
    featured: true,
    bestSeller: true,
    rating: 5.0,
    numReviews: 58,
    isAvailable: true,
    createdAt: '2026-02-03T16:00:00.000Z'
  },
  {
    _id: 'prod-17',
    name: 'Teardrop Pet Fur & Paw Print Pendant Necklace',
    slug: 'teardrop-pet-fur-paw-print-pendant-necklace',
    description: 'Forever hold your furry best friend close to your heart. Delicate gold bezel teardrop pendant preserving a lock of your pet’s actual fur and a sweet hand-painted paw print.',
    price: 699,
    originalPrice: 899,
    discountPercentage: 22,
    category: {
      _id: 'cat-resin-gifts',
      name: 'Pet Memorials & Keepsakes',
      slug: 'resin-gifts'
    },
    categoryName: 'Pet Memorials & Keepsakes',
    images: [
      '/assets/products/product-17.jpg',
      '/assets/products/product-18.jpg'
    ],
    stock: 30,
    material: 'Jewelry-Grade Clear Epoxy, 18K Gold-Plated Bezel & Chain, Pet Fur',
    dimensions: 'Pendant: 2.5cm x 1.8cm, Chain: 18 inches',
    careInstructions: 'Avoid spraying perfume directly onto resin pendant.',
    customizationOptions: ['Chain Style (Box / Link)', 'Pet Name Engraving'],
    featured: true,
    bestSeller: true,
    rating: 5.0,
    numReviews: 47,
    isAvailable: true,
    createdAt: '2026-02-04T17:00:00.000Z'
  },
  {
    _id: 'prod-18',
    name: 'Heart Pet Hair & Gold Paw Charm Pendant',
    slug: 'heart-pet-hair-gold-paw-charm-pendant',
    description: 'Crystal-clear resin heart charm encasing pet fur lock, miniature golden heart charm, and golden paw pendant suspended on an 18K gold-plated box chain.',
    price: 749,
    originalPrice: 999,
    discountPercentage: 25,
    category: {
      _id: 'cat-resin-gifts',
      name: 'Pet Memorials & Keepsakes',
      slug: 'resin-gifts'
    },
    categoryName: 'Pet Memorials & Keepsakes',
    images: [
      '/assets/products/product-18.jpg',
      '/assets/products/product-22.jpg'
    ],
    stock: 25,
    material: 'Ultra-Clear Resin, 18K Gold Plated Alloy, Real Pet Hair',
    dimensions: 'Heart: 2.8cm x 2.8cm, Chain: 18 inches',
    careInstructions: 'Store in soft jewelry pouch when not wearing.',
    customizationOptions: ['Fur Hair Swirl Placement', 'Initial Stamp'],
    featured: false,
    bestSeller: true,
    rating: 4.9,
    numReviews: 36,
    isAvailable: true,
    createdAt: '2026-02-05T18:00:00.000Z'
  },
  {
    _id: 'prod-19',
    name: 'Custom Gold Leaf Pet Identification Tags',
    slug: 'custom-gold-leaf-pet-identification-tags',
    description: 'Custom resin pet tags in bone, fish, cat face, and round silhouettes infused with sparkling 24K gold foil flakes and your pet’s name in waterproof lettering.',
    price: 349,
    originalPrice: 499,
    discountPercentage: 30,
    category: {
      _id: 'cat-resin-gifts',
      name: 'Pet Memorials & Keepsakes',
      slug: 'resin-gifts'
    },
    categoryName: 'Pet Memorials & Keepsakes',
    images: [
      '/assets/products/product-19.jpg',
      '/assets/products/product-20.jpg'
    ],
    stock: 45,
    material: 'Shatter-Resistant Hard Resin, Gold Leaf, Heavy-Duty Jump Ring',
    dimensions: 'Various shapes: 4cm to 5cm width',
    careInstructions: 'Waterproof and mud-proof. Rinse with clean water.',
    customizationOptions: ['Shape (Bone / Round / Cat)', 'Pet Name & Phone Number'],
    featured: false,
    bestSeller: true,
    rating: 4.8,
    numReviews: 42,
    isAvailable: true,
    createdAt: '2026-02-06T10:00:00.000Z'
  },
  {
    _id: 'prod-20',
    name: 'Bone-Shaped Monogram Pet Tag with Gold Foil',
    slug: 'bone-shaped-monogram-pet-tag-gold-foil',
    description: 'Milky porcelain white bone-shaped pet collar tag accented with genuine gold leaf flakes and bold black script typography.',
    price: 399,
    originalPrice: 499,
    discountPercentage: 20,
    category: {
      _id: 'cat-resin-gifts',
      name: 'Pet Memorials & Keepsakes',
      slug: 'resin-gifts'
    },
    categoryName: 'Pet Memorials & Keepsakes',
    images: [
      '/assets/products/product-20.jpg',
      '/assets/products/product-21.jpg'
    ],
    stock: 35,
    material: 'Cast Resin, Gold Leaf, Brass Split Ring',
    dimensions: '5cm width x 3cm height',
    careInstructions: 'Wipe clean with damp cloth.',
    customizationOptions: ['Custom Name', 'Contact Number on Reverse'],
    featured: false,
    bestSeller: false,
    rating: 4.9,
    numReviews: 29,
    isAvailable: true,
    createdAt: '2026-02-07T11:00:00.000Z'
  },
  {
    _id: 'prod-21',
    name: 'Midnight Black & Gold Foil Bone Pet Tag ("Leo")',
    slug: 'midnight-black-gold-foil-bone-pet-tag',
    description: 'Statement midnight black resin dog tag with brilliant 24K gold foil flakes framing both ends and metallic rose gold cursive lettering.',
    price: 449,
    originalPrice: 599,
    discountPercentage: 25,
    category: {
      _id: 'cat-resin-gifts',
      name: 'Pet Memorials & Keepsakes',
      slug: 'resin-gifts'
    },
    categoryName: 'Pet Memorials & Keepsakes',
    images: [
      '/assets/products/product-21.jpg',
      '/assets/products/product-22.jpg'
    ],
    stock: 30,
    material: 'High-Gloss Pigmented Resin, Gold Foil, Heavy Brass Ring',
    dimensions: '6cm x 3.5cm',
    careInstructions: 'Durable and weather resistant.',
    customizationOptions: ['Lettering Color (Rose Gold / Silver)', 'Pet Name'],
    featured: false,
    bestSeller: false,
    rating: 5.0,
    numReviews: 31,
    isAvailable: true,
    createdAt: '2026-02-08T12:00:00.000Z'
  },
  {
    _id: 'prod-22',
    name: 'Circular Pet Fur Keepsake Medallion ("Thor")',
    slug: 'circular-pet-fur-keepsake-medallion',
    description: 'Pastel sky blue circular pendant capturing a swirling lock of your pet’s coat with golden hollow paw outline, mini heart, and scripted pet name.',
    price: 599,
    originalPrice: 799,
    discountPercentage: 25,
    category: {
      _id: 'cat-resin-gifts',
      name: 'Pet Memorials & Keepsakes',
      slug: 'resin-gifts'
    },
    categoryName: 'Pet Memorials & Keepsakes',
    images: [
      '/assets/products/product-22.jpg',
      '/assets/products/product-17.jpg'
    ],
    stock: 25,
    material: 'Epoxy Resin, Gold Charms, Client Pet Hair, 18K Gold Plated Bail',
    dimensions: '3.5cm diameter',
    careInstructions: 'Gently polish with dry microfibre cloth.',
    customizationOptions: ['Color Theme', 'Fur Placement'],
    featured: false,
    bestSeller: false,
    rating: 5.0,
    numReviews: 33,
    isAvailable: true,
    createdAt: '2026-02-09T13:00:00.000Z'
  },
  {
    _id: 'prod-23',
    name: 'Hexagonal Botanical Rakhi ("Sameer")',
    slug: 'hexagonal-botanical-rakhi-sameer',
    description: 'Handcrafted geometric hexagonal resin rakhi preserving real blush pink daisy petals, golden butterflies, pearls, and your brother’s name.',
    price: 299,
    originalPrice: 399,
    discountPercentage: 25,
    category: {
      _id: 'cat-hand-casting',
      name: 'Custom Floral Rakhis',
      slug: 'hand-casting'
    },
    categoryName: 'Custom Floral Rakhis',
    images: [
      '/assets/products/product-23.jpg',
      '/assets/products/product-24.jpg'
    ],
    stock: 50,
    material: 'Clear Resin, Real Pressed Daisy, Gold Thread, Ceramic & Pearl Beads',
    dimensions: 'Hexagon: 3.5cm diameter, Thread: 12 inches',
    careInstructions: 'Handle with love. Can be repurposed as a bookmark or keepsake charm after Raksha Bandhan.',
    customizationOptions: ['Brother Name', 'Flower Color (Pink / Yellow / White)'],
    featured: false,
    bestSeller: true,
    rating: 4.9,
    numReviews: 44,
    isAvailable: true,
    createdAt: '2026-02-10T14:00:00.000Z'
  },
  {
    _id: 'prod-24',
    name: 'Sunburst Yellow Daisy Floral Resin Rakhi',
    slug: 'sunburst-yellow-daisy-floral-resin-rakhi',
    description: 'Vibrant yellow daisy preserved in high-clarity hexagonal resin with metallic calligraphy name, carved red beads, and golden woven thread.',
    price: 299,
    originalPrice: 399,
    discountPercentage: 25,
    category: {
      _id: 'cat-hand-casting',
      name: 'Custom Floral Rakhis',
      slug: 'hand-casting'
    },
    categoryName: 'Custom Floral Rakhis',
    images: [
      '/assets/products/product-24.jpg',
      '/assets/products/product-23.jpg'
    ],
    stock: 45,
    material: 'Jewelry Resin, Real Yellow Blossom, Golden Dori, Crystal Spacers',
    dimensions: 'Hexagon: 3.5cm diameter, Thread: 12 inches',
    careInstructions: 'Keep dry and store in cotton pouch.',
    customizationOptions: ['Brother Name'],
    featured: false,
    bestSeller: true,
    rating: 4.8,
    numReviews: 37,
    isAvailable: true,
    createdAt: '2026-02-11T15:00:00.000Z'
  },
  {
    _id: 'prod-25',
    name: 'Rose Gold Bhaiya-Bhabhi Rakhi & Loomba Set',
    slug: 'rose-gold-bhaiya-bhabhi-rakhi-loomba-set',
    description: 'Designer coordinated pair for brother and bhabhi. Features a circular loomba with pearl latkan and rectangular rakhi with dried coral daisy, rose gold flakes, and custom names.',
    price: 599,
    originalPrice: 799,
    discountPercentage: 25,
    category: {
      _id: 'cat-hand-casting',
      name: 'Custom Floral Rakhis',
      slug: 'hand-casting'
    },
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
    customizationOptions: ['Bhaiya & Bhabhi Names', 'Pearl Drop Length'],
    featured: true,
    bestSeller: true,
    rating: 5.0,
    numReviews: 61,
    isAvailable: true,
    createdAt: '2026-02-12T16:00:00.000Z'
  },
  {
    _id: 'prod-26',
    name: 'Fuchsia Daisy Bhaiya-Bhabhi Loomba Pair',
    slug: 'fuchsia-daisy-bhaiya-bhabhi-loomba-pair',
    description: 'Vibrant hot pink daisy pair with gold foil border, personalized golden lettering, matching pink cord, and lustrous pearl cluster drops.',
    price: 599,
    originalPrice: 799,
    discountPercentage: 25,
    category: {
      _id: 'cat-hand-casting',
      name: 'Custom Floral Rakhis',
      slug: 'hand-casting'
    },
    categoryName: 'Custom Floral Rakhis',
    images: [
      '/assets/products/product-26.jpg',
      '/assets/products/product-29.jpg'
    ],
    stock: 30,
    material: 'Epoxy Resin, Natural Fuchsia Daisy, Gold Foiling, Crystal Rhinestones',
    dimensions: 'Loomba: 4cm + 7cm latkan, Rakhi: 3.5 x 2.2cm',
    careInstructions: 'Store in airtight box after the festivities.',
    customizationOptions: ['Custom Names'],
    featured: false,
    bestSeller: true,
    rating: 4.9,
    numReviews: 43,
    isAvailable: true,
    createdAt: '2026-02-13T17:00:00.000Z'
  },
  {
    _id: 'prod-27',
    name: 'Personalized Floral Slider Bracelet ("Nishaan")',
    slug: 'personalized-floral-slider-bracelet',
    description: 'Minimalist luxury floral wristlet featuring a scalloped resin charm embedding real violet flower, personalized gold foil name, and an adjustable box slider chain with pearl charm.',
    price: 499,
    originalPrice: 699,
    discountPercentage: 29,
    category: {
      _id: 'cat-personalized-gifts',
      name: 'Varmala & Wedding Keepsakes',
      slug: 'personalized-gifts'
    },
    categoryName: 'Varmala & Wedding Keepsakes',
    images: [
      '/assets/products/product-28.jpg'
    ],
    stock: 35,
    material: '18K Gold-Plated Stainless Steel, Jewelry Resin, Real Dried Bloom',
    dimensions: 'Resin charm: 2.5cm, Chain: Adjustable up to 9 inches',
    careInstructions: 'Remove before swimming or bathing. Wipe with microfibre cloth.',
    customizationOptions: ['Personalized Name Inscription', 'Flower Color'],
    featured: true,
    bestSeller: true,
    rating: 4.9,
    numReviews: 39,
    isAvailable: true,
    createdAt: '2026-02-14T18:00:00.000Z'
  },
  {
    _id: 'prod-28',
    name: 'Mint Daisy Bhaiya-Bhabhi Floral Rakhi Set',
    slug: 'mint-daisy-bhaiya-bhabhi-floral-rakhi-set',
    description: 'Refreshing seafoam green and mint daisy resin rakhi set with gold foil leafing, emerald beads, and cascading golden tassel.',
    price: 599,
    originalPrice: 799,
    discountPercentage: 25,
    category: {
      _id: 'cat-hand-casting',
      name: 'Custom Floral Rakhis',
      slug: 'hand-casting'
    },
    categoryName: 'Custom Floral Rakhis',
    images: [
      '/assets/products/product-30.jpg',
      '/assets/products/product-27.jpg'
    ],
    stock: 28,
    material: 'Epoxy Resin, Natural Pressed Florals, Emerald & Pearl Beads, Gold Dori',
    dimensions: 'Loomba: 4cm + 7cm latkan, Rakhi: 3.5 x 2.5cm',
    careInstructions: 'Keep in cotton pouch.',
    customizationOptions: ['Coordinated Custom Names'],
    featured: false,
    bestSeller: false,
    rating: 4.9,
    numReviews: 31,
    isAvailable: true,
    createdAt: '2026-02-15T19:00:00.000Z'
  }
];

export const DUMMY_REVIEWS = [
  {
    _id: 'rev-01',
    productId: 'prod-01',
    name: 'Priya Sharma',
    rating: 5,
    title: 'Breathtaking finish for our home temple!',
    comment: 'Absolutely beautiful Pooja Thali. The detailing of the Ganesha idol and preserved petals is so pure and divine. The quality is truly exceptional!',
    createdAt: '2026-02-10T14:30:00.000Z'
  },
  {
    _id: 'rev-02',
    productId: 'prod-02',
    name: 'Ananya Verma',
    rating: 5,
    title: 'Lovely Modak candles with gold flakes',
    comment: 'Ordered for Ganesh Chaturthi and Diwali gifts. Everyone in the family loved the aroma and the 24K gold foil details. 10/10 recommend!',
    createdAt: '2026-02-12T16:15:00.000Z'
  },
  {
    _id: 'rev-03',
    productId: 'prod-09',
    name: 'Rohan & Surbhi Deshmukh',
    rating: 5,
    title: 'Emotional and priceless wedding keepsake',
    comment: 'Mahima did complete justice to our varmalas and chooda. It hanging in our living room is a conversation starter for every guest who visits!',
    createdAt: '2026-02-14T11:45:00.000Z'
  },
  {
    _id: 'rev-04',
    productId: 'prod-16',
    name: 'Kavita Singhal',
    rating: 5,
    title: 'So comforted to have my pet with me',
    comment: 'The angel wing keychain with Bruno’s fur came out even more beautiful than I envisioned. Thank you Mahima for this precious comfort piece.',
    createdAt: '2026-02-15T09:20:00.000Z'
  },
  {
    _id: 'rev-05',
    productId: 'prod-25',
    name: 'Megha Agarwal',
    rating: 5,
    title: 'Best Bhaiya Bhabhi Rakhi ever!',
    comment: 'My bhabhi was ecstatic to see the custom floral loomba! Quality is sturdy and looks like genuine jewelry rather than just a thread.',
    createdAt: '2026-02-18T13:10:00.000Z'
  }
];

/**
 * Helper: Retrieve all categories with dynamic count calculation
 */
export const getDummyCategories = () => {
  return DUMMY_CATEGORIES.map((cat) => {
    const count = DUMMY_PRODUCTS.filter(
      (p) => p.category?.slug === cat.slug || p.category?._id === cat._id
    ).length;
    return {
      ...cat,
      itemCount: count > 0 ? count : cat.itemCount
    };
  });
};

/**
 * Helper: Retrieve products with full filtering, search, and sorting
 */
export const getFilteredDummyProducts = ({
  category = 'all',
  search = '',
  sort = 'featured',
  minPrice = '',
  maxPrice = '',
  rating = '',
  limit = 30
} = {}) => {
  let list = [...DUMMY_PRODUCTS];

  // 1. Filter by category
  if (category && category !== 'all') {
    list = list.filter((p) => {
      const catSlug = p.category?.slug || '';
      const catId = p.category?._id || '';
      return (
        catSlug.toLowerCase() === category.toLowerCase() ||
        catId.toLowerCase() === category.toLowerCase()
      );
    });
  }

  // 2. Filter by search query
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = (p.categoryName || p.category?.name || '').toLowerCase().includes(q);
      return matchName || matchDesc || matchCat;
    });
  }

  // 3. Filter by price range
  if (minPrice !== '') {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) {
      list = list.filter((p) => p.price >= min);
    }
  }
  if (maxPrice !== '') {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      list = list.filter((p) => p.price <= max);
    }
  }

  // 4. Filter by minimum rating
  if (rating !== '') {
    const r = parseFloat(rating);
    if (!isNaN(r)) {
      list = list.filter((p) => (p.rating || 5) >= r);
    }
  }

  // 5. Sorting
  switch (sort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      break;
    case 'popular':
      list.sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0));
      break;
    case 'rating':
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'featured':
    default:
      list.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.rating || 0) - (a.rating || 0);
      });
      break;
  }

  if (limit && limit > 0) {
    return list.slice(0, limit);
  }

  return list;
};

/**
 * Helper: Find product by ID or Slug
 */
export const getDummyProductByIdOrSlug = (idOrSlug) => {
  if (!idOrSlug) return null;
  const match = DUMMY_PRODUCTS.find(
    (p) => p._id === idOrSlug || p.slug === idOrSlug
  );
  return match || null;
};

/**
 * Helper: Get related products by category
 */
export const getDummyRelatedProducts = (currentProductId, categorySlug, limit = 4) => {
  return DUMMY_PRODUCTS.filter((p) => {
    if (p._id === currentProductId) return false;
    if (categorySlug && (p.category?.slug === categorySlug || p.categorySlug === categorySlug)) {
      return true;
    }
    return true;
  }).slice(0, limit);
};

/**
 * Helper: Get Best Sellers
 */
export const getDummyBestSellers = (limit = 8) => {
  const bestSellers = DUMMY_PRODUCTS.filter((p) => p.bestSeller || p.featured);
  return (bestSellers.length > 0 ? bestSellers : DUMMY_PRODUCTS).slice(0, limit);
};

/**
 * Helper: Get reviews for product
 */
export const getDummyReviews = (productId) => {
  const specific = DUMMY_REVIEWS.filter((r) => r.productId === productId);
  if (specific.length > 0) return specific;

  // Generic fallback reviews
  return [
    {
      _id: `rev-gen-${productId}-1`,
      name: 'Pooja Kashyap',
      rating: 5,
      title: 'Handcrafted to perfection!',
      comment: 'The resin clarity and gold foil detailing exceeded my expectations. Delivered safely with premium packaging!',
      createdAt: new Date().toISOString()
    },
    {
      _id: `rev-gen-${productId}-2`,
      name: 'Aditi Jain',
      rating: 5,
      title: 'Exquisite artisan finish',
      comment: 'Ordered this as a gift and the recipient was totally mesmerized. Real resin artwork at its best.',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    }
  ];
};
