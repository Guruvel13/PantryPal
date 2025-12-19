import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import AddItem from './pages/AddItem';
import ShoppingList from './pages/ShoppingList';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup'; // Assumed existence or created next

// Placeholder components
const Placeholder = ({ title }) => <div className="p-8"><h2 className="text-2xl font-bold">{title}</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected App Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/add" element={<AddItem />} />
          <Route path="shopping-list" element={<ShoppingList />} />
          <Route path="recipes" element={<Placeholder title="Recipes" />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Placeholder title="Profile" />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
