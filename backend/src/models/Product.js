import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0
  },
  originalPrice: {
    type: Number,
    default: function() {
      return Math.round(this.price * 1.25);
    }
  },
  discountPercentage: {
    type: Number,
    default: function() {
      if (this.originalPrice && this.originalPrice > this.price) {
        return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
      }
      return 0;
    }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please specify category']
  },
  categoryName: {
    type: String,
    default: ''
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    default: 10,
    min: 0
  },
  material: {
    type: String,
    default: 'High-Gloss Epoxy Resin, Metallic Pigments & Botanicals'
  },
  dimensions: {
    type: String,
    default: 'Custom / Standard Artisan Size'
  },
  careInstructions: {
    type: String,
    default: 'Wipe gently with a soft microfibre cloth. Keep away from prolonged direct harsh sunlight and abrasive cleaners.'
  },
  customizationOptions: {
    type: [String],
    default: ['Name Inscription', 'Color Theme Customization', 'Flower Preservation Option']
  },
  featured: {
    type: Boolean,
    default: false
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.8,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 12
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
