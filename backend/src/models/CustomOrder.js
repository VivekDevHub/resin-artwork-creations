import mongoose from 'mongoose';

const customOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    trim: true
  },
  productType: {
    type: String,
    required: [true, 'Please specify the product type'],
    enum: [
      'Resin Wall Art',
      'Resin Clock',
      'Preserved Flower Frame',
      'Couple / Name Plaque',
      'Resin Table / Tray',
      'Hand Casting Keepsake',
      'Custom Gift Hamper',
      'Personalized Coasters / Jewellery Box',
      'Other Custom Creation'
    ]
  },
  budget: {
    type: String,
    default: '₹1,000 - ₹3,000'
  },
  preferredColor: {
    type: String,
    default: 'Blush Pink & Gold'
  },
  customizationDetails: {
    type: String,
    required: [true, 'Please describe your customization requirements']
  },
  occasion: {
    type: String,
    default: 'Personalized Gift'
  },
  requiredDate: {
    type: String,
    default: ''
  },
  referenceImage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewing', 'Quoted', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  quoteAmount: {
    type: Number,
    default: 0
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('CustomOrder', customOrderSchema);
