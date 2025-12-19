import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-secondary-50 font-sans">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
