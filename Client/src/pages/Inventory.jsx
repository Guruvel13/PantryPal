import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, MoreHorizontal, Calendar, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { format, differenceInDays, parseISO } from 'date-fns';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All'); // All, Low Stock, Expiring

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setError('Failed to load inventory.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`/api/inventory/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item');
    }
  };

  const getStatus = (expiryDate, quantity, minStock) => {
    const daysLeft = differenceInDays(new Date(expiryDate), new Date());
    if (daysLeft < 0) return 'Expired';
    if (daysLeft <= 7) return 'Expiring Soon';
    if (quantity <= minStock) return 'Low Stock';
    return 'Good';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Expired': return 'text-danger';
      case 'Expiring Soon': return 'text-warning';
      case 'Low Stock': return 'text-warning'; // or a separate color
      case 'Good': return 'text-success';
      default: return 'text-secondary-500';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'Expired': return 'bg-danger';
      case 'Expiring Soon': return 'bg-warning';
      case 'Low Stock': return 'bg-warning';
      default: return 'bg-success';
    }
  };

  const filteredItems = items.filter(item => {
    const status = getStatus(item.expiryDate, item.quantity, item.minStock);
    if (filter === 'All') return true;
    if (filter === 'Expiring' && (status === 'Expiring Soon' || status === 'Expired')) return true;
    if (filter === 'Low Stock' && status === 'Low Stock') return true;
    return false;
  });

  if (loading) return <div className="p-8 text-center">Loading inventory...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Inventory</h2>
          <p className="text-secondary-500">Manage your pantry items and track expirations.</p>
        </div>
        <Link to="/inventory/add" className="btn btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Item
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-secondary-100 overflow-hidden">
        {/* Filters & Search */}
        <div className="p-4 border-b border-secondary-100 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                <input 
                    type="text" 
                    placeholder="Search inventory..." 
                    className="input pl-9"
                />
            </div>
            <div className="flex gap-2">
                <div className="flex bg-secondary-50 p-1 rounded-lg border border-secondary-200">
                    <button onClick={() => setFilter('All')} className={clsx("px-3 py-1.5 rounded-md text-sm font-medium transition-all", filter === 'All' ? "bg-white shadow-sm text-secondary-900" : "text-secondary-500 hover:bg-secondary-100")}>All</button>
                    <button onClick={() => setFilter('Low Stock')} className={clsx("px-3 py-1.5 rounded-md text-sm font-medium transition-all", filter === 'Low Stock' ? "bg-white shadow-sm text-secondary-900" : "text-secondary-500 hover:bg-secondary-100")}>Low Stock</button>
                    <button onClick={() => setFilter('Expiring')} className={clsx("px-3 py-1.5 rounded-md text-sm font-medium transition-all", filter === 'Expiring' ? "bg-white shadow-sm text-secondary-900" : "text-secondary-500 hover:bg-secondary-100")}>Expiring</button>
                </div>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary-50 text-secondary-500 uppercase font-medium text-xs">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {filteredItems.map((item) => {
                const status = getStatus(item.expiryDate, item.quantity, item.minStock);
                return (
                <tr key={item._id} className="hover:bg-secondary-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-secondary-900">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary-600">{item.location}</td>
                  <td className="px-6 py-4 text-secondary-900 font-medium">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4">
                    <div className={clsx("flex items-center gap-2 text-xs font-semibold uppercase tracking-wide", getStatusColor(status))}>
                        <div className={clsx("w-2 h-2 rounded-full", getStatusBg(status))}></div>
                        {status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary-400" />
                    {item.expiryDate ? format(new Date(item.expiryDate), 'MMM d, yyyy') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-secondary-400 hover:text-red-600 transition-colors"
                        title="Delete Item"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
          {filteredItems.length === 0 && <div className="p-8 text-center text-secondary-500">No items found.</div>}
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-secondary-100 flex justify-between items-center text-sm text-secondary-500">
            <span>Showing 1-6 of 24 items</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-secondary-200 rounded hover:bg-secondary-50">Previous</button>
                <button className="px-3 py-1 border border-secondary-200 rounded hover:bg-secondary-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
}
