import { useState } from 'react';
import { Package, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary-600 p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Smart Inventory</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Manage your pantry <br /> efficiently.
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed">
            Track expiry dates, organize your stock, and minimize food waste with our intelligent tracking system.
          </p>

          <div className="mt-12 flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm max-w-sm border border-white/20">
              <div className="flex -space-x-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" className="w-10 h-10 rounded-full border-2 border-primary-500 bg-white" alt="User" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" className="w-10 h-10 rounded-full border-2 border-primary-500 bg-white" alt="User" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" className="w-10 h-10 rounded-full border-2 border-primary-500 bg-white" alt="User" />
              </div>
              <div className="text-sm">
                  <span className="font-bold block">Join 10k+ users today</span>
                  <span className="text-blue-200">Start saving food & money.</span>
              </div>
          </div>
        </div>

        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">Welcome back</h2>
            <p className="text-secondary-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
                        placeholder="Enter your password" 
                        className="w-full pl-11 pr-11 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-secondary-600">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform active:scale-95">
                Log In
            </button>
          </form>

          <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-secondary-200"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-secondary-500">Or continue with</span></div>
          </div>

          <button className="w-full py-3 border border-secondary-300 rounded-lg hover:bg-secondary-50 font-medium text-secondary-700 transition-colors flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Sign in with Google
          </button>

          <p className="text-center text-sm text-secondary-600">
              Don't have an account? <Link to="/signup" className="font-bold text-primary-600 hover:text-primary-700">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
