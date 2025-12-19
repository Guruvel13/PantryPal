import { Search, ShoppingBag, DollarSign, AlertCircle, Plus, Trash2, Check, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const shoppingItems = [
  { id: 1, name: 'Whole Milk', category: 'Dairy', status: 'Out of Stock', qtyNeeded: 2, estPrice: 4.50 },
  { id: 2, name: 'Eggs (Dozen)', category: 'Dairy', status: '1 left', qtyNeeded: 1, estPrice: 3.00 },
  { id: 3, name: 'Pasta Sauce', category: 'Pantry', status: '1 left', qtyNeeded: 3, estPrice: 9.00 },
  { id: 4, name: 'Sourdough Bread', category: 'Bakery', status: 'Out of Stock', qtyNeeded: 1, estPrice: 4.00 },
];

const suggestions = [
  { name: 'Coffee Beans', remaining: '20%', image: '☕' },
  { name: 'Oat Cereal', remaining: '15%', image: '🥣' },
  { name: 'Olive Oil', remaining: '25%', image: '🫒' },
  { name: 'Almonds', remaining: '10%', image: '🥜' },
];

export default function ShoppingList() {
  return (
    <div className="space-y-8">
       {/* Summary Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-secondary-100 shadow-card flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                  <p className="text-secondary-500 font-medium">Total Items Needed</p>
                  <h3 className="text-3xl font-bold text-secondary-900">12</h3>
              </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-secondary-100 shadow-card flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <DollarSign className="w-8 h-8" />
              </div>
              <div>
                  <p className="text-secondary-500 font-medium">Estimated Cost</p>
                  <h3 className="text-3xl font-bold text-secondary-900">$45.50</h3>
              </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-secondary-100 shadow-card flex items-center gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                  <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                  <p className="text-secondary-500 font-medium">Urgent Items</p>
                  <h3 className="text-3xl font-bold text-secondary-900">4</h3>
              </div>
          </div>
       </div>

       {/* Add Item Bar */}
       <div className="flex gap-4">
          <div className="relative flex-1">
              <Plus className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" />
              <input 
                  type="text" 
                  placeholder="Quick add item manually..." 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none shadow-sm transition-all"
              />
          </div>
          <div className="relative w-64">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" />
              <input 
                  type="text" 
                  placeholder="Search list..." 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none shadow-sm transition-all"
              />
          </div>
       </div>

       {/* Main List */}
       <div className="bg-white rounded-xl shadow-card border border-secondary-100 overflow-hidden">
          <table className="w-full text-left">
              <thead className="bg-secondary-50 text-secondary-500 uppercase text-xs font-semibold">
                  <tr>
                      <th className="px-6 py-4 w-12">
                          <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
                      </th>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Stock Status</th>
                      <th className="px-6 py-4 text-center">Qty Needed</th>
                      <th className="px-6 py-4">Est. Price</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                  {shoppingItems.map((item) => (
                      <tr key={item.id} className="hover:bg-secondary-50 transition-colors">
                          <td className="px-6 py-4">
                              <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
                          </td>
                          <td className="px-6 py-4 flex items-center gap-3">
                              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">🛍️</div>
                              <span className="font-semibold text-secondary-900">{item.name}</span>
                          </td>
                          <td className="px-6 py-4">
                              <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">{item.category}</span>
                          </td>
                          <td className="px-6 py-4">
                              {item.status === 'Out of Stock' ? (
                                  <span className="text-red-500 font-medium flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out of Stock
                                  </span>
                              ) : (
                                  <div className="w-32">
                                      <span className="text-orange-500 font-medium text-xs mb-1 block">{item.status}</span>
                                      <div className="h-1.5 w-full bg-secondary-100 rounded-full overflow-hidden">
                                          <div className="h-full bg-orange-400 w-1/4 rounded-full"></div>
                                      </div>
                                  </div>
                              )}
                          </td>
                          <td className="px-6 py-4">
                              <div className="flex justify-center items-center gap-2">
                                  <button className="w-8 h-8 rounded-lg border border-secondary-200 flex items-center justify-center hover:bg-secondary-50 text-secondary-500">-</button>
                                  <span className="font-bold w-4 text-center">{item.qtyNeeded}</span>
                                  <button className="w-8 h-8 rounded-lg border border-secondary-200 flex items-center justify-center hover:bg-secondary-50 text-secondary-500">+</button>
                              </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-secondary-900">${item.estPrice.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                  <button className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg font-medium text-sm hover:bg-primary-100 flex items-center gap-2">
                                      <Check className="w-4 h-4" /> Purchased
                                  </button>
                                  <button className="p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                  </button>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
       </div>

       {/* Suggestions */}
       <div>
           <div className="flex justify-between items-end mb-4">
                <h3 className="text-lg font-bold text-secondary-900">You might also run out of...</h3>
                <button className="text-primary-600 font-medium text-sm hover:underline">View All</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               {suggestions.map((item, idx) => (
                   <div key={idx} className="bg-white p-4 rounded-xl border border-secondary-100 hover:shadow-md transition-shadow cursor-pointer">
                       <div className="flex gap-3 mb-3">
                           <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center text-xl">{item.image}</div>
                           <div>
                               <h4 className="font-bold text-secondary-900">{item.name}</h4>
                               <p className="text-xs text-secondary-500">{item.remaining} remaining</p>
                           </div>
                       </div>
                       <div className="h-1.5 w-full bg-secondary-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 rounded-full" style={{width: item.remaining}}></div>
                       </div>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
}
