import { Bell, Mail, Send, ToggleLeft, ToggleRight, Trash2, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [telegramNotif, setTelegramNotif] = useState(false);
  const [expiryDays, setExpiryDays] = useState(5);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-secondary-900">Settings</h2>
        <p className="text-secondary-500">Manage your notification preferences and alert channels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Notification Channels */}
          <div className="bg-white rounded-xl shadow-card border border-secondary-100 p-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-1">Notification Channels</h3>
            <p className="text-sm text-secondary-500 mb-6">Choose where you want to receive inventory alerts.</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Email Notifications</h4>
                    <p className="text-xs text-secondary-500">Daily summary of items expiring within 3 days.</p>
                  </div>
                </div>
                <button onClick={() => setEmailNotif(!emailNotif)} className={clsx("transition-colors", emailNotif ? "text-primary-600" : "text-secondary-300")}>
                   {emailNotif ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                </button>
              </div>

              <div className="border-t border-secondary-100 pt-6"></div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-50 text-sky-500 rounded-full">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Telegram Alerts</h4>
                    <p className="text-xs text-secondary-500">Instant push notifications for expired items.</p>
                  </div>
                </div>
                <button onClick={() => setTelegramNotif(!telegramNotif)} className={clsx("transition-colors", telegramNotif ? "text-primary-600" : "text-secondary-300")}>
                   {telegramNotif ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                </button>
              </div>

              <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200 border-dashed">
                  <label className="text-xs font-bold text-secondary-500 uppercase tracking-wide mb-2 block">Telegram Chat ID</label>
                  <div className="flex gap-2">
                      <input 
                          type="text" 
                          placeholder="e.g. 123456789" 
                          className="flex-1 px-3 py-2 rounded-lg border border-secondary-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-lg hover:bg-primary-700">Connect</button>
                  </div>
                  <p className="text-xs text-secondary-500 mt-2 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" /> Start a chat with @SmartPantryBot to get your ID.
                  </p>
              </div>
            </div>
          </div>

          {/* Thresholds */}
          <div className="bg-white rounded-xl shadow-card border border-secondary-100 p-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-1">Inventory Thresholds</h3>
            <p className="text-sm text-secondary-500 mb-6">Set global rules for when items are considered "expiring soon".</p>
            
            <div className="mb-6">
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-secondary-700">Days before expiry to warn</label>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">{expiryDays} Days</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(e.target.value)}
                    className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-secondary-400 mt-1">
                    <span>1 Day</span>
                    <span>30 Days</span>
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-secondary-700 block mb-2">Default Sorting</label>
                <select className="w-full px-4 py-2 rounded-lg border border-secondary-200 bg-white text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Sort by Expiry Date (Soonest first)</option>
                    <option>Sort by Name (A-Z)</option>
                    <option>Sort by Date Added (Newest first)</option>
                </select>
            </div>
          </div>
          
           {/* Actions */}
           <div className="flex justify-end gap-3">
               <button className="px-6 py-2 rounded-lg border border-secondary-200 font-bold text-secondary-600 hover:bg-secondary-50 bg-white">Cancel</button>
               <button className="px-6 py-2 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-md">Save Changes</button>
           </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
             {/* Active Categories */}
             <div className="bg-white rounded-xl shadow-card border border-secondary-100 p-6">
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-secondary-900">Active Categories</h3>
                     <button className="text-primary-600 text-sm font-medium hover:underline">Edit</button>
                 </div>
                 <p className="text-xs text-secondary-500 mb-4">Manage tags used to organize your inventory.</p>
                 <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">Dairy</span>
                     <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">Meat</span>
                     <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">Pantry</span>
                     <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">Frozen</span>
                     <button className="px-3 py-1 border border-secondary-300 border-dashed rounded-full text-xs text-secondary-500 hover:bg-secondary-50">+ Add New</button>
                 </div>
             </div>

             {/* Danger Zone */}
             <div className="bg-red-50 rounded-xl border border-red-100 p-6">
                 <h3 className="font-bold text-red-900 mb-2">Danger Zone</h3>
                 <p className="text-xs text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                 <button className="w-full py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors">Delete Account</button>
             </div>

             {/* Help CTA */}
             <div className="bg-primary-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                 <div className="relative z-10">
                     <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                     <p className="text-primary-100 text-sm mb-4">Check our documentation to learn how to set up the Telegram bot.</p>
                     <button className="px-4 py-2 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 text-sm">View Guide</button>
                 </div>
                 <HelpCircle className="absolute -right-4 -bottom-4 w-32 h-32 text-primary-500 opacity-50" />
             </div>
        </div>
      </div>
    </div>
  );
}
