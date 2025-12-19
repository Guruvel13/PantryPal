import { LayoutDashboard, Package, ShoppingCart, Utensils, Settings, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: ShoppingCart, label: 'Shopping List', path: '/shopping-list' },
  { icon: Utensils, label: 'Alerts History', path: '/alerts-history' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-secondary-200 h-screen fixed left-0 top-0 flex flex-col z-20 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl text-secondary-900">Smart Pantry</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-secondary-200">
        <NavLink
            to="/profile"
            className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                )
              }
        >
             <User className="w-5 h-5" />
             Profile
        </NavLink>
      </div>
    </aside>
  );
}
