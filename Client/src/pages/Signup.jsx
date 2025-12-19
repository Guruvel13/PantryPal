import { useState } from 'react';
import { Package, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-secondary-900 p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Smart Inventory</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Join thousands of <br /> smart kitchens.
          </h1>
          <p className="text-secondary-400 text-lg max-w-md leading-relaxed">
            Create an account to start tracking your inventory, reducing waste, and saving money on groceries.
          </p>
        </div>
         {/* Decorative Background */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">Create an account</h2>
            <p className="text-secondary-500">Join us to manage your inventory smarter.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Full Name</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create a password" 
                        className="w-full pl-11 pr-11 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Confirm Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Confirm your password" 
                        className="w-full pl-11 pr-11 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    />
                </div>
            </div>

            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform active:scale-95">
                Sign Up
            </button>
          </form>

          <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-secondary-200"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-secondary-500">Or register with</span></div>
          </div>

          <button className="w-full py-3 border border-secondary-300 rounded-lg hover:bg-secondary-50 font-medium text-secondary-700 transition-colors flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Sign up with Google
          </button>

          <p className="text-center text-sm text-secondary-600">
              Already have an account? <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
