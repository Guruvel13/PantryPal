import { useState } from 'react';
import { Upload, Calendar, ChevronDown, Minus, Plus, HelpCircle, Image as ImageIcon, Smile } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';

export default function AddItem() {
  const navigate = useNavigate();
  const [imageType, setImageType] = useState('image'); // 'image' or 'emoji'
  
  // Emoji picker state (simplified for UI)
  const [selectedEmoji, setSelectedEmoji] = useState('🍎');
  const commonEmojis = ['🥛', '🥚', '🍞', '🍎', '🍌', '🥦', '🥩', '🍗', '🍚', '🍝', '🍪', '🍫', '🧃', '🍺', '🧼', '🧻'];

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    expiryDate: '',
    quantity: 1,
    unit: 'pcs',
    minStock: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUnitChange = (u) => {
    setFormData(prev => ({ ...prev, unit: u }));
  };

  const handleQuantityChange = (val) => {
    setFormData(prev => ({ ...prev, quantity: Math.max(0, parseInt(val) || 0) }));
  };

  const incrementQuantity = () => handleQuantityChange(formData.quantity + 1);
  const decrementQuantity = () => handleQuantityChange(formData.quantity - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // Ideally send image/emoji too, but backend schema doesn't have it yet. 
       // We'll focus on core fields.
       await axios.post('/api/inventory', formData);
       navigate('/inventory');
    } catch (error) {
       console.error("Error adding item:", error);
       alert("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* ... keeping layout same ... */}
      <div className="flex items-center gap-2 text-sm text-secondary-500 mb-4">
        <Link to="/inventory" className="hover:text-primary-600">Inventory</Link>
        <span>›</span>
        <span className="text-secondary-900 font-medium">Add Item</span>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
           <h1 className="text-3xl font-bold text-secondary-900">Add Inventory Item</h1>
           <p className="text-secondary-500">Fill in the details below to add a new product to your pantry tracking.</p>
        </div>
        <button onClick={() => navigate('/inventory')} className="text-secondary-500 font-medium hover:text-secondary-900">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card border border-secondary-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Image/Emoji */}
            <div>
               <label className="block text-sm font-bold text-secondary-700 mb-4">Product Representation</label>
               
               {/* Toggle */}
               <div className="flex bg-secondary-50 p-1 rounded-lg border border-secondary-200 mb-4">
                  <button 
                    type="button"
                    onClick={() => setImageType('image')}
                    className={clsx("flex-1 py-1.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all", 
                        imageType === 'image' ? "bg-white text-secondary-900 shadow-sm" : "text-secondary-500 hover:text-secondary-900"
                    )}
                  >
                    <ImageIcon className="w-4 h-4" /> Image
                  </button>
                  <button 
                    type="button"
                    onClick={() => setImageType('emoji')}
                    className={clsx("flex-1 py-1.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all", 
                        imageType === 'emoji' ? "bg-white text-secondary-900 shadow-sm" : "text-secondary-500 hover:text-secondary-900"
                    )}
                  >
                    <Smile className="w-4 h-4" /> Emoji
                  </button>
               </div>

               {imageType === 'image' ? (
                   <div className="border-2 border-dashed border-secondary-300 rounded-xl bg-secondary-50 h-64 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-secondary-100 transition-colors">
                       <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                           <Upload className="w-6 h-6" />
                       </div>
                       <p className="text-sm font-medium text-primary-600 mb-1">Click to upload or drag & drop</p>
                       <p className="text-xs text-secondary-400">SVG, PNG, JPG or GIF</p>
                   </div>
               ) : (
                   <div className="border-2 border-secondary-100 rounded-xl bg-secondary-50 h-64 flex flex-col items-center justify-center p-6">
                       <div className="text-6xl mb-6">{selectedEmoji}</div>
                       <div className="flex flex-wrap gap-2 justify-center">
                           {commonEmojis.map(emoji => (
                               <button 
                                key={emoji} 
                                type="button"
                                onClick={() => setSelectedEmoji(emoji)}
                                className={clsx("w-8 h-8 flex items-center justify-center text-lg rounded hover:bg-white hover:shadow-sm transition-all", selectedEmoji === emoji && "bg-white shadow-sm ring-2 ring-primary-100")}
                               >
                                   {emoji}
                               </button>
                           ))}
                       </div>
                   </div>
               )}
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-secondary-700 mb-2">Product Name</label>
                    <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Almond Milk, Whole Wheat Bread" 
                        className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-secondary-700 mb-2">Category</label>
                        <div className="relative">
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-secondary-200 bg-white text-secondary-700 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Select category</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Bakery">Bakery</option>
                                <option value="Meat">Meat</option>
                                <option value="Pantry">Pantry</option>
                                <option value="Frozen">Frozen</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>
                    <div>
                         <div className="flex justify-between mb-2">
                             <label className="block text-sm font-bold text-secondary-700">Best Before Date</label>
                             <span className="text-xs text-secondary-400 bg-secondary-100 px-2 py-0.5 rounded">Optional</span>
                         </div>
                        <div className="relative">
                            <input 
                                type="date" 
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-secondary-200 text-secondary-700 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none"
                            />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-secondary-700 mb-2">Current Quantity</label>
                        <div className="flex rounded-lg border border-secondary-200 overflow-hidden">
                             <button type="button" onClick={decrementQuantity} className="px-4 hover:bg-secondary-50 border-r border-secondary-200 text-secondary-500">
                                 <Minus className="w-4 h-4" />
                             </button>
                             <input 
                                type="number" 
                                value={formData.quantity}
                                onChange={(e) => handleQuantityChange(e.target.value)}
                                className="flex-1 text-center py-3 outline-none"
                             />
                             <button type="button" onClick={incrementQuantity} className="px-4 hover:bg-secondary-50 border-l border-secondary-200 text-secondary-500">
                                 <Plus className="w-4 h-4" />
                             </button>
                        </div>
                        <div className="flex gap-4 mt-3">
                             {[{val: 'pcs', label: 'Pcs'}, {val: 'kg', label: 'Kg'}, {val: 'L', label: 'L'}].map((u) => (
                                 <label key={u.val} className="flex items-center gap-2 cursor-pointer">
                                     <input 
                                        type="radio" 
                                        name="unit" 
                                        checked={formData.unit === u.val} 
                                        onChange={() => handleUnitChange(u.val)}
                                        className="text-primary-600 focus:ring-primary-500" 
                                     />
                                     <span className="text-sm text-secondary-600">{u.label}</span>
                                 </label>
                             ))}
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-bold text-secondary-700 mb-2 flex items-center gap-1">
                             Low Stock Alert 
                             <HelpCircle className="w-4 h-4 text-secondary-400" />
                         </label>
                         <input 
                            type="number" 
                            name="minStock"
                            value={formData.minStock}
                            onChange={(e) => handleChange(e)}
                            className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-secondary-100 flex justify-end gap-3">
                     <button type="button" onClick={() => navigate('/inventory')} className="px-6 py-2 rounded-lg font-bold text-secondary-500 hover:bg-secondary-50 hover:text-secondary-900 transition-colors">
                         Cancel
                     </button>
                     <button type="submit" className="px-8 py-3 bg-primary-600 text-white font-bold rounded-lg shadow-lg hover:bg-primary-700 hover:shadow-primary-600/20 transition-all transform active:scale-95">
                         Save to Inventory
                     </button>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
}
