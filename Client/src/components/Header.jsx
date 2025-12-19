import { Search, Bell } from 'lucide-react';

export default function Header({ title = "Good Morning, Alex" }) {
  return (
    <header className="h-20 bg-white border-b border-secondary-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">{title}</h1>
        <p className="text-sm text-secondary-500">Here is your inventory status overview.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="pl-9 pr-4 py-2 w-64 rounded-lg bg-secondary-50 border border-secondary-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-secondary-50 transition-colors text-secondary-600">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full ring-2 ring-white"></span>
        </button>

        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
          alt="Profile"
          className="w-10 h-10 rounded-full border border-secondary-200 cursor-pointer hover:ring-2 hover:ring-primary-100 transition-all"
        />
      </div>
    </header>
  );
}
