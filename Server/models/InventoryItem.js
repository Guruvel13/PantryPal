import mongoose from 'mongoose';

const InventoryItemSchema = new mongoose.Schema({
  userId: {
    type: String, // For now, simple string or ref if we had auth middleware
    required: true,
    default: 'demo-user'
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Dairy', 'Meat', 'Pantry', 'Frozen', 'Bakery', 'Medicine', 'Other']
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true,
    enum: ['pcs', 'kg', 'g', 'L', 'ml', 'oz', 'lb']
  },
  expiryDate: {
    type: Date,
    required: true
  },
  minStock: {
    type: Number,
    default: 1
  },
  vendorEmail: {
    type: String,
    lowercase: true,
    trim: true
  },
  location: {
    type: String,
    default: 'Pantry'
  }
}, { timestamps: true });

export default mongoose.model('InventoryItem', InventoryItemSchema);
