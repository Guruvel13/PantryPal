import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import InventoryItem from './models/InventoryItem.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Smart Pantry API is running...');
});

// Inventory Routes
// GET /api/inventory/summary (Requested by user for n8n)
app.get('/api/inventory/summary', async (req, res) => {
  try {
    const items = await InventoryItem.find({}, 'name quantity unit expiryDate minStock vendorEmail');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const items = await InventoryItem.find().sort({ expiryDate: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/inventory', async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await InventoryItem.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pantrypal';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
