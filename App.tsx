import React from 'react';
import { ImageAnalyzer } from './components/ImageAnalyzer';

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-black font-sans">
      
      {/* Background FX (Landing Page Only) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.15]"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        
        {/* Particles generated via array to keep React clean */}
        {[
          { left: '10%', duration: '15s', delay: '0s', opacity: 0.4 },
          { left: '20%', duration: '23s', delay: '-5s', opacity: 0.2 },
          { left: '30%', duration: '18s', delay: '-10s', opacity: 0.5 },
          { left: '45%', duration: '25s', delay: '-2s', opacity: 0.3 },
          { left: '60%', duration: '20s', delay: '-15s', opacity: 0.4 },
          { left: '75%', duration: '12s', delay: '-7s', opacity: 0.2 },
          { left: '85%', duration: '28s', delay: '-1s', opacity: 0.3 },
          { left: '95%', duration: '22s', delay: '-12s', opacity: 0.4 },
        ].map((p, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              left: p.left, 
              '--duration': p.duration, 
              '--delay': p.delay, 
              '--max-opacity': p.opacity 
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full px-6 pt-6 flex justify-center">
        <div className="glass-panel w-full max-w-5xl rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-emerald-600 flex items-center justify-center text-black shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[20px] font-bold">radar</span>
            </div>
            <h2 className="text-white text-lg font-bold tracking-tight">NeuralVerify</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#technology">Technology</a>
            <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#">API</a>
            <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#">Enterprise</a>
          </div>
          <div className="flex items-center gap-4">
            <a className="hidden sm:block text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#">Log In</a>
            <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 transition-all border border-white/10 backdrop-blur-md">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-32">
        <div className="w-full max-w-4xl flex flex-col items-center text-center gap-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Detection V4.0
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[1.1] glow-text">
              Can You Trust <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                What You See?
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
              Instant verification for AI-generated media. Protect your reality with enterprise-grade deep learning analysis.
            </p>
          </div>

          {/* Interactive Component */}
          <ImageAnalyzer />

        </div>
      </main>

      {/* TECHNOLOGY SECTION (Bento Grid) */}
      <section id="technology" className="relative z-10 w-full bg-[#0b0f0d] py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-4">
                Engineered for Truth
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Decrypting the <br/><span className="text-slate-400">Invisible Artifacts</span></h2>
             <p className="text-slate-400 max-w-2xl">Proprietary deep learning models designed to discern the subtle mathematical inconsistencies of synthetic media. We don't just guess; we calculate the probability of truth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
             {/* Card 1: Main Feature */}
             <div className="md:col-span-2 row-span-2 bg-[#131614] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700"></div>
                <div className="relative z-10">
                   <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                      <span className="material-symbols-outlined text-emerald-500">neurology</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4">Deep Learning Core</h3>
                   <p className="text-slate-400 leading-relaxed mb-8 max-w-md">Our Neural Engine is trained on over 100M+ parameters to detect diffusion patterns invisible to the human eye. It identifies the microscopic noise fingerprints left by generative models.</p>
                   <div className="flex gap-8">
                      <div>
                         <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Parameters</div>
                         <div className="text-3xl font-bold text-white">100M+</div>
                      </div>
                      <div>
                         <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Accuracy</div>
                         <div className="text-3xl font-bold text-emerald-500">99.9%</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Card 2: Zero Retention */}
             <div className="bg-[#131614] border border-white/5 rounded-3xl p-8 flex flex-col justify-center group hover:border-white/10 transition-colors">
                <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-white">
                   <span className="material-symbols-outlined text-lg">shield_lock</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Zero-Retention Policy</h3>
                <p className="text-slate-400 text-sm">Privacy by design. Your images are processed in volatile RAM and instantly discarded post-analysis.</p>
             </div>

             {/* Card 3: Encrypted */}
             <div className="bg-[#131614] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                   <span className="material-symbols-outlined text-emerald-500">lock</span>
                   <span className="text-white font-bold text-sm">End-to-End Encrypted</span>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Upload</span>
                      <span className="text-emerald-500">Encrypted (TLS 1.3)</span>
                   </div>
                   <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-emerald-500"></div>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Processing</span>
                      <span className="text-emerald-500">RAM Only</span>
                   </div>
                   <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-emerald-500"></div>
                   </div>
                </div>
             </div>

             {/* Card 4: Adversarial */}
             <div className="md:col-span-1 bg-[#131614] border border-white/5 rounded-3xl p-8 hover:bg-[#1a1f1c] transition-colors">
                <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-white">
                   <span className="material-symbols-outlined text-lg">grid_view</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Adversarial Training</h3>
                <p className="text-slate-400 text-sm">Continuously updated against the latest generators including Midjourney v6 and DALL-E 3.</p>
             </div>

             {/* Card 5: Live Analysis */}
             <div className="md:col-span-2 bg-[#131614] border border-white/5 rounded-3xl p-8 relative overflow-hidden flex items-center">
                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent"></div>
                 <div className="relative z-10 w-full">
                    <h3 className="text-xl font-bold text-white mb-6">Live Analysis</h3>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                        <div className="flex-1">
                           <div className="flex justify-between text-xs mb-2">
                              <span className="text-white font-mono">Pattern Match</span>
                              <span className="text-white font-bold">High Probability</span>
                           </div>
                           <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full w-[85%] bg-emerald-500"></div>
                           </div>
                           <div className="flex justify-end mt-2">
                              <span className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase">Detected: Synthetic</span>
                           </div>
                        </div>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-[#060807] border-t border-white/5 pt-16 pb-8">
         <div className="max-w-6xl mx-auto px-6">
            
            {/* Newsletter CTA */}
            <div className="bg-[#0f291e] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full"></div>
               <div className="relative z-10 max-w-lg">
                  <h3 className="text-3xl font-bold text-white mb-2">Stay ahead of the <span className="text-emerald-400">curve</span></h3>
                  <p className="text-emerald-100/70">Join our intelligence briefing. Get the latest detection algorithms delivered to your inbox.</p>
               </div>
               <div className="relative z-10 flex w-full md:w-auto gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="bg-white/5 border border-white/10 text-white rounded-full px-6 py-3 w-full md:w-80 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full px-6 py-3 transition-colors flex items-center gap-2">
                     Subscribe <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
               </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-white/5 pb-16">
               <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                        <span className="material-symbols-outlined text-[20px] font-bold">radar</span>
                     </div>
                     <h2 className="text-white text-lg font-bold">NeuralVerify</h2>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">Pioneering the standard for synthetic media detection. We bring clarity to a digital world of uncertainty.</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 inline-flex px-3 py-1 rounded-full border border-emerald-500/20">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ALL SYSTEMS OPERATIONAL
                  </div>
               </div>
               
               <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Product</h4>
                  <ul className="space-y-4 text-sm text-slate-400">
                     <li className="hover:text-white cursor-pointer transition-colors">Detection API</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Enterprise Shield</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Browser Extension</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Company</h4>
                  <ul className="space-y-4 text-sm text-slate-400">
                     <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Research</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Press Kit</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Legal</h4>
                  <ul className="space-y-4 text-sm text-slate-400">
                     <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Cookie Settings</li>
                     <li className="hover:text-white cursor-pointer transition-colors">GDPR</li>
                  </ul>
               </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
               <p>&copy; 2024 NeuralVerify Inc. All rights reserved. San Francisco, CA.</p>
               <div className="flex gap-4">
                  <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">public</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">work</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">hub</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">chat</span>
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
}

export default App;