import { Package, Scan, Bell, Users, CheckCircle, ArrowRight, Star, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-secondary-900 selection:bg-primary-100 selection:text-primary-900">
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">SmartTracker</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-secondary-600 hover:text-primary-600 text-sm font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-secondary-600 hover:text-primary-600 text-sm font-medium transition-colors">How it works</a>
              <a href="#pricing" className="text-secondary-600 hover:text-primary-600 text-sm font-medium transition-colors">Pricing</a>
              <Link to="/login" className="text-secondary-900 font-bold text-sm hover:text-primary-600 transition-colors">Log In</Link>
              <Link to="/signup" className="px-5 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-lg hover:bg-primary-700 shadow-lg hover:shadow-primary-500/30 transition-all">Get Started</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-secondary-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="max-w-2xl">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-secondary-900 mb-6 leading-[1.1]">
                Stop Wasting <br className="hidden sm:block" /> Food. <br />
                <span className="text-primary-600">Start Saving Money.</span>
              </h1>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                The smart way to track your home inventory, get expiry alerts, and optimize your grocery shopping automatically.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/signup" className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl text-center shadow-xl hover:bg-primary-700 hover:shadow-primary-600/30 transition-all transform hover:-translate-y-1">
                  Get Started for Free
                </Link>
                <button className="px-8 py-4 bg-white text-secondary-900 font-bold rounded-xl border border-secondary-200 hover:bg-secondary-50 transition-colors text-center">
                  View Demo
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-secondary-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" /> No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" /> Free for home use
                </div>
              </div>
            </div>

            {/* Hero Image / Mockup */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
               <div className="relative w-full aspect-square max-w-lg">
                  {/* Abstract Background Blob */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-200 to-primary-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  
                  {/* App Mockup */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 bg-white rounded-2xl shadow-2xl border border-secondary-200/50 overflow-hidden backdrop-blur-sm"
                  >
                     {/* Fake Browser Header */}
                     <div className="h-8 bg-secondary-100 border-b border-secondary-200 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                     </div>
                     
                     {/* Fake App Content */}
                     <div className="p-6 bg-secondary-50 h-[320px] w-[500px] flex flex-col gap-4">
                        {/* Alert */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 flex items-center gap-4">
                             <div className="w-2 h-12 bg-red-500 rounded-full"></div>
                             <div className="flex-1">
                                 <h4 className="font-bold text-secondary-900">Expiring Soon</h4>
                                 <p className="text-xs text-secondary-500">2 items need attention</p>
                             </div>
                             <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded">Urgent</span>
                        </div>
                        
                        {/* List Items */}
                        <div className="space-y-2">
                            <div className="bg-white p-3 rounded-lg border border-secondary-100 flex justify-between items-center opacity-80">
                                <span className="font-medium text-sm">Organic Milk</span>
                                <span className="text-xs text-red-500 font-bold">1 Day Left</span>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-secondary-100 flex justify-between items-center opacity-80">
                                <span className="font-medium text-sm">Greek Yogurt</span>
                                <span className="text-xs text-orange-500 font-bold">3 Days Left</span>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-secondary-100 flex justify-between items-center opacity-60">
                                <span className="font-medium text-sm">Cheddar Cheese</span>
                                <span className="text-xs text-success font-bold">12 Days Left</span>
                            </div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-secondary-900 mb-4">Everything you need to organize your kitchen.</h2>
                <p className="text-secondary-500 text-lg">Reduce waste and streamline your grocery runs with powerful tracking tools.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-secondary-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-secondary-100 group">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Package className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-3">Color-Coded Status</h3>
                    <p className="text-secondary-600 leading-relaxed">Instantly see what's fresh and what's expiring with intuitive traffic-light indicators on your dashboard.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-secondary-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-secondary-100 group">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Bell className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-3">Instant Notifications</h3>
                    <p className="text-secondary-600 leading-relaxed">Receive timely push alerts before food goes bad so you can use it in time or freeze it for later.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-secondary-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-secondary-100 group">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-3">Family Sync</h3>
                    <p className="text-secondary-600 leading-relaxed">Keep everyone in the loop. Sync inventory across family devices so you never buy double.</p>
                </div>
            </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-secondary-900 mb-2">How it works</h2>
                <p className="text-secondary-500">Simple steps to a smarter kitchen.</p>
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-secondary-200 md:left-1/2 md:-ml-0.5 hidden md:block"></div>

                <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 md:text-right">
                             <div className="md:hidden w-14 h-14 bg-white rounded-full border-2 border-primary-500 flex items-center justify-center text-primary-600 font-bold text-xl mb-4 relative z-10 mx-auto">
                                <Scan className="w-6 h-6" />
                             </div>
                             <h3 className="text-xl font-bold text-secondary-900 mb-2">Quick Add</h3>
                             <p className="text-secondary-600">Easily add items to your inventory manually. We automatically categorize items and estimate expiry dates.</p>
                        </div>
                        <div className="w-14 h-14 bg-white rounded-full border-2 border-primary-500 hidden md:flex items-center justify-center text-primary-600 font-bold text-xl relative z-10 shrink-0 shadow-lg">
                            <Scan className="w-6 h-6" />
                        </div>
                        <div className="flex-1 md:block hidden">
                           {/* Illustration Placeholder */}
                           <div className="h-4 bg-secondary-200 w-24 rounded-full ml-8 opacity-20"></div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row gap-8 items-center">
                         <div className="flex-1 md:block hidden"></div>
                         <div className="w-14 h-14 bg-white rounded-full border-2 border-primary-500 hidden md:flex items-center justify-center text-primary-600 font-bold text-xl relative z-10 shrink-0 shadow-lg">
                            <div className="w-6 h-6 rounded bg-primary-500/20"></div>
                         </div>
                         <div className="flex-1">
                             <div className="md:hidden w-14 h-14 bg-white rounded-full border-2 border-primary-500 flex items-center justify-center text-primary-600 font-bold text-xl mb-4 relative z-10 mx-auto">2</div>
                             <h3 className="text-xl font-bold text-secondary-900 mb-2">Track Freshness</h3>
                             <p className="text-secondary-600">Your dashboard updates daily. Green means good, yellow means use soon, and red means urgent.</p>
                         </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 md:text-right">
                             <div className="md:hidden w-14 h-14 bg-white rounded-full border-2 border-primary-500 flex items-center justify-center text-primary-600 font-bold text-xl mb-4 relative z-10 mx-auto">3</div>
                             <h3 className="text-xl font-bold text-secondary-900 mb-2">Get Notified</h3>
                             <p className="text-secondary-600">We'll ping you with recipes and reminders before your ingredients expire. Save money and eat better.</p>
                        </div>
                        <div className="w-14 h-14 bg-white rounded-full border-2 border-primary-500 hidden md:flex items-center justify-center text-primary-600 font-bold text-xl relative z-10 shrink-0 shadow-lg">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div className="flex-1 md:block hidden"></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-8 gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />)}
            </div>
            <h2 className="text-2xl md:text-4xl font-medium text-secondary-900 mb-8 leading-snug">
                "I used to throw away so much food. Since using SmartTracker, I've saved hundreds on groceries by simply eating things before they expire. It's paid for itself ten times over."
            </h2>
            <div className="flex flex-col items-center">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-16 h-16 rounded-full border-2 border-white shadow-lg mb-4" alt="Sarah J." />
                <h4 className="font-bold text-secondary-900">Sarah Jenkins</h4>
                <p className="text-sm text-secondary-500">Busy Mom & Home Chef</p>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary-50">
          <div className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Ready to organize your kitchen?</h2>
              <Link to="/signup" className="inline-block px-8 py-4 bg-primary-600 text-white font-bold rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all hover:-translate-y-1">
                  Start Your Free Trial
              </Link>
              <p className="text-sm text-secondary-400 mt-4">No credit card required. Cancel anytime.</p>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8 border-t border-secondary-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  <div className="col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center text-white">
                            <Package className="w-3 h-3" />
                        </div>
                        <span className="font-bold text-lg">SmartTracker</span>
                      </div>
                      <p className="text-sm text-secondary-500 mb-6">Making home inventory management simple, smart, and sustainable.</p>
                  </div>
                  <div>
                      <h4 className="font-bold text-secondary-900 mb-4">Product</h4>
                      <ul className="space-y-2 text-sm text-secondary-500">
                          <li><a href="#" className="hover:text-primary-600">Features</a></li>
                          <li><a href="#" className="hover:text-primary-600">Pricing</a></li>
                          <li><a href="#" className="hover:text-primary-600">Recipes</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold text-secondary-900 mb-4">Company</h4>
                      <ul className="space-y-2 text-sm text-secondary-500">
                          <li><a href="#" className="hover:text-primary-600">About</a></li>
                          <li><a href="#" className="hover:text-primary-600">Blog</a></li>
                          <li><a href="#" className="hover:text-primary-600">Careers</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold text-secondary-900 mb-4">Legal</h4>
                      <ul className="space-y-2 text-sm text-secondary-500">
                          <li><a href="#" className="hover:text-primary-600">Privacy</a></li>
                          <li><a href="#" className="hover:text-primary-600">Terms</a></li>
                      </ul>
                  </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-secondary-100 text-sm text-secondary-400">
                  <p>&copy; 2024 SmartTracker Inc. All rights reserved.</p>
                  <div className="flex gap-4 mt-4 md:mt-0">
                      {/* Social placeholders */}
                      <div className="w-5 h-5 bg-secondary-200 rounded"></div>
                      <div className="w-5 h-5 bg-secondary-200 rounded"></div>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}
