import Product from '../models/Product.js';
import Category from '../models/Category.js';

// @desc    Get all products with filters, sorting, search and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      rating,
      featured,
      bestSeller,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = { isAvailable: true };

    // Search keyword in name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { material: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter (support category slug or ID)
    if (category && category !== 'all') {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        const foundCategory = await Category.findOne({ slug: category });
        if (foundCategory) {
          query.category = foundCategory._id;
        }
      }
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Featured / BestSeller
    if (featured === 'true') query.featured = true;
    if (bestSeller === 'true') query.bestSeller = true;

    // Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1, numReviews: -1 };
    else if (sort === 'popular') sortOption = { numReviews: -1 };
    else if (sort === 'featured') sortOption = { featured: -1, createdAt: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured and best selling products
// @route   GET /api/products/highlights
// @access  Public
export const getHighlights = async (req, res, next) => {
  try {
    const featured = await Product.find({ featured: true, isAvailable: true })
      .populate('category', 'name slug')
      .limit(8);

    const bestSellers = await Product.find({ bestSeller: true, isAvailable: true })
      .populate('category', 'name slug')
      .limit(8);

    res.status(200).json({
      success: true,
      featured,
      bestSellers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:identifier
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id).populate('category', 'name slug');
    } else {
      product = await Product.findOne({ slug: id }).populate('category', 'name slug');
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Also fetch related products from same category
    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      isAvailable: true
    }).limit(4);

    res.status(200).json({
      success: true,
      product,
      relatedProducts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      images,
      stock,
      material,
      dimensions,
      careInstructions,
      customizationOptions,
      featured,
      bestSeller
    } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const categoryObj = await Category.findById(category);

    const product = await Product.create({
      name,
      slug,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.25),
      category,
      categoryName: categoryObj ? categoryObj.name : '',
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'],
      stock: Number(stock) || 10,
      material: material || 'High-Gloss Epoxy Resin & Fine Pigments',
      dimensions: dimensions || 'Standard Artisan Size',
      careInstructions: careInstructions || 'Wipe gently with a soft microfibre cloth. Avoid harsh abrasives and direct sunlight.',
      customizationOptions: customizationOptions || ['Name Inscription', 'Color Theme Choice'],
      featured: Boolean(featured),
      bestSeller: Boolean(bestSeller)
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.description) product.description = req.body.description;
    if (req.body.price !== undefined) product.price = Number(req.body.price);
    if (req.body.originalPrice !== undefined) product.originalPrice = Number(req.body.originalPrice);
    if (req.body.stock !== undefined) product.stock = Number(req.body.stock);
    if (req.body.category) {
      product.category = req.body.category;
      const cat = await Category.findById(req.body.category);
      if (cat) product.categoryName = cat.name;
    }
    if (req.body.images) product.images = req.body.images;
    if (req.body.material) product.material = req.body.material;
    if (req.body.dimensions) product.dimensions = req.body.dimensions;
    if (req.body.careInstructions) product.careInstructions = req.body.careInstructions;
    if (req.body.featured !== undefined) product.featured = req.body.featured;
    if (req.body.bestSeller !== undefined) product.bestSeller = req.body.bestSeller;
    if (req.body.isAvailable !== undefined) product.isAvailable = req.body.isAvailable;

    if (product.originalPrice && product.originalPrice > product.price) {
      product.discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
