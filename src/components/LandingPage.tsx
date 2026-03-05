import React from 'react';
import { Trophy, Shield, Zap, BarChart3, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Trophy size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight text-sm sm:text-base">Badminton</h1>
              <p className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Kenya OS</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Features</a>
            <a href="#governance" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Governance</a>
            <a href="#rankings" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Rankings</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={onLogin}
              className="text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-2 sm:px-4 py-2"
            >
              Login
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-slate-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6">
                <Zap size={14} />
                <span>The Future of Kenyan Badminton</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1] sm:leading-[0.9] mb-6 sm:mb-8">
                Dominate the <span className="text-emerald-600">Court</span>, Manage the <span className="text-slate-400">Game.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 mb-8 sm:mb-10 max-w-lg leading-relaxed">
                The all-in-one operating system for badminton clubs, counties, and the national federation. Professional tournament management at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onGetStarted}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                >
                  Join the Community <ArrowRight size={20} />
                </button>
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-2xl font-bold text-base sm:text-lg transition-all border border-slate-200">
                  View Live Rankings
                </button>
              </div>
              <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 grayscale opacity-50">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Trusted by</p>
                <div className="flex gap-4 sm:gap-8 font-black text-lg sm:text-xl italic tracking-tighter">
                  <span>BK-NAIROBI</span>
                  <span>COAST-B</span>
                  <span>UNI-LEAGUE</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-[40px] bg-slate-100 overflow-hidden relative shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/badminton/800/800" 
                  alt="Badminton Action" 
                  className="object-cover w-full h-full mix-blend-multiply opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Live Match</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-center flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase">Player A</p>
                      <p className="text-2xl font-black">21</p>
                    </div>
                    <div className="text-slate-300 font-bold">VS</div>
                    <div className="text-center flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase">Player B</p>
                      <p className="text-2xl font-black">18</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full -z-10 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-100 rounded-full -z-10 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold mb-4">Everything you need to run the game.</h2>
            <p className="text-slate-500 text-lg">From local club matches to national championships, we've got you covered.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Results</h3>
              <p className="text-slate-500 leading-relaxed">Referees submit scores directly from the court. Brackets and rankings update in real-time.</p>
            </div>
            <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Dynamic Rankings</h3>
              <p className="text-slate-500 leading-relaxed">Automated points calculation based on tournament level and performance. See where you stand nationally.</p>
            </div>
            <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Audit & Transparency</h3>
              <p className="text-slate-500 leading-relaxed">Every payment, result, and approval is logged. Building trust through verifiable data governance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">Ready to step onto the <span className="text-emerald-400">digital court?</span></h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">Join hundreds of players and organizers building the most transparent sports ecosystem in Kenya.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onGetStarted}
                className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-emerald-500/20"
              >
                Create Free Account
              </button>
              <button className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-xl transition-all backdrop-blur-sm border border-white/10">
                Contact Federation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <Trophy size={18} />
            </div>
            <span className="font-bold text-slate-900">Badminton Kenya OS</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
          </div>
          <p className="text-sm text-slate-400 font-medium">© 2026 Badminton Kenya OS. Built for the community.</p>
        </div>
      </footer>
    </div>
  );
}
