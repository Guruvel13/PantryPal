import { Package, AlertTriangle, Clock, TrendingDown } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { differenceInDays, format } from 'date-fns';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     axios.get('/api/inventory').then(res => {
         setItems(res.data);
         setLoading(false);
     }).catch(err => {
         console.error(err);
         setLoading(false);
     });
  }, []);

  // Compute Stats
  const totalItems = items.length;
  const expiredItems = items.filter(i => differenceInDays(new Date(i.expiryDate), new Date()) < 0).length;
  const expiringSoonItems = items.filter(i => {
      const diff = differenceInDays(new Date(i.expiryDate), new Date());
      return diff >= 0 && diff <= 7;
  }).length;
  const lowStockItems = items.filter(i => i.quantity <= i.minStock).length;

  const stats = [
    {
      label: 'Total Items',
      value: totalItems,
      change: 'Active items',
      changeType: 'positive',
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
      alert: false
    },
    {
      label: 'Expired',
      value: expiredItems,
      change: 'Action required',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      alert: expiredItems > 0
    },
    {
      label: 'Expiring Soon',
      value: expiringSoonItems,
      change: 'Within 7 days',
      changeType: 'neutral',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      alert: false
    },
    {
      label: 'Low Stock',
      value: lowStockItems,
      change: 'Need restock',
      changeType: 'warning',
      icon: TrendingDown,
      color: 'bg-orange-100 text-orange-600',
      alert: false
    }
  ];

  const categoryBreakdown = [
    { label: 'Pantry', value: 45, color: 'bg-blue-500' },
    { label: 'Fridge', value: 30, color: 'bg-cyan-400' },
    { label: 'Medicine', value: 15, color: 'bg-purple-400' },
    { label: 'Others', value: 10, color: 'bg-gray-300' },
  ]; // Still static for now as category logic needs aggregation

  const recentItems = items.slice(0, 5); // Show first 5 items

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={clsx(
              "p-6 rounded-xl border transition-all hover:shadow-lg",
              stat.alert ? "bg-red-50 border-red-100" : "bg-white border-secondary-100"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className={clsx("text-sm font-medium mb-1", stat.alert ? "text-red-800" : "text-secondary-500")}>{stat.label}</p>
                <h3 className={clsx("text-3xl font-bold", stat.alert ? "text-red-900" : "text-secondary-900")}>{stat.value}</h3>
              </div>
              <div className={clsx("p-2 rounded-lg", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className={clsx("text-xs font-semibold", 
              stat.changeType === 'positive' ? 'text-success' : 
              stat.changeType === 'negative' ? 'text-danger' : 
              stat.changeType === 'warning' ? 'text-warning' : 'text-secondary-400'
            )}>
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-secondary-100 shadow-card overflow-hidden">
          <div className="p-6 border-b border-secondary-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-secondary-900">Recent Inventory</h3>
            <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium bg-primary-600 text-white rounded-full">All Items</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary-50 text-secondary-500 uppercase font-medium text-xs">
                <tr>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Expiry Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {recentItems.map((item, idx) => {
                   const isExpired = differenceInDays(new Date(item.expiryDate), new Date()) < 0;
                   const isExpiring = !isExpired && differenceInDays(new Date(item.expiryDate), new Date()) <= 7;
                   
                   return (
                  <tr key={idx} className="hover:bg-secondary-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary-100 rounded-md flex items-center justify-center text-xl">
                            📦
                        </div>
                        <div>
                          <p className="font-semibold text-secondary-900">{item.name}</p>
                          <p className={clsx("text-xs", isExpired ? "text-red-500 font-bold" : isExpiring ? "text-yellow-600 font-bold" : "text-secondary-400")}>
                              {isExpired ? 'Expired' : isExpiring ? 'Expiring Soon' : 'Good'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-primary-600 font-medium">{item.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-secondary-900 font-medium">{item.quantity} {item.unit}</span>
                      </div>
                    </td>
                    <td className={clsx("px-6 py-4 font-medium", 
                      isExpired ? 'text-danger' : 
                      isExpiring ? 'text-warning' : 'text-secondary-500'
                    )}>
                      {item.expiryDate ? format(new Date(item.expiryDate), 'MMM d, yyyy') : 'N/A'}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Widgets */}
        <div className="space-y-6">
           {/* Breakdown */}
          <div className="bg-white rounded-xl border border-secondary-100 shadow-card p-6">
            <h3 className="font-bold text-lg text-secondary-900 mb-6">Inventory Breakdown</h3>
            <div className="space-y-4">
              {categoryBreakdown.map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-secondary-600 font-medium">{cat.label}</span>
                    <span className="text-secondary-900 font-bold">{cat.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary-100 rounded-full overflow-hidden">
                    <div className={clsx("h-full rounded-full", cat.color)} style={{ width: `${cat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
}
