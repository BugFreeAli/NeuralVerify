import React, { useState, useRef, useCallback, useEffect } from 'react';
import { analyzeImage, DetectionResult, ScanStage } from '../services/detectionService';

export const ImageAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [scanStage, setScanStage] = useState<ScanStage>({ name: 'Initializing', progress: 0, log: '' });
  const [logs, setLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll logs
  const logContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;
    setMode('analyzing');
    setLogs([]);
    
    try {
      const data = await analyzeImage(file, (stage) => {
        setScanStage(stage);
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString('en-US', {hour12: false})} ${stage.log}`]);
      });
      setResult(data);
      setMode('result');
    } catch (error) {
      console.error("Analysis failed", error);
      setMode('upload');
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setMode('upload');
    setLogs([]);
  };

  // --------------------------------------------------------------------------
  // FULL SCREEN DASHBOARD: LOADING STATE (Based on "AI Sentinel .PRO")
  // --------------------------------------------------------------------------
  if (mode === 'analyzing' && preview) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0b0f0d] flex flex-col font-sans">
        {/* Header */}
        <div className="border-b border-white/10 p-4 flex justify-between items-center bg-[#161b18]">
            <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <span className="material-symbols-outlined text-emerald-400">radar</span>
                </div>
                <h1 className="text-white font-bold tracking-wider">AI SENTINEL <span className="text-emerald-500">.PRO</span></h1>
            </div>
            <div className="flex items-center gap-4">
                <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-slate-400 border border-white/10">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
                    ANALYSIS IN PROGRESS
                </span>
                <button onClick={reset} className="text-slate-400 hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
            {/* Left: Image Scanner */}
            <div className="lg:col-span-2 relative bg-black rounded-2xl border border-white/10 overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${preview})` }}></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                
                {/* Scanner Effect */}
                <div className="absolute top-0 w-full h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)] animate-[scan_3s_linear_infinite]"></div>
                
                {/* Overlay UI */}
                <div className="absolute top-8 left-8">
                   <div className="text-4xl font-bold text-white mb-2">Processing Asset_</div>
                   <div className="text-emerald-500 font-mono text-sm tracking-widest">ID: 884-29-XJ • ENGINE V4.2</div>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                     <div className="flex justify-between items-end mb-2">
                         <div className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Current Task</div>
                         <div className="text-white text-3xl font-bold">{Math.round(scanStage.progress)}%</div>
                     </div>
                     <div className="text-white text-xl font-medium mb-4">{scanStage.name}</div>
                     <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981] transition-all duration-300 ease-out"
                           style={{ width: `${scanStage.progress}%` }}
                         ></div>
                     </div>
                     <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                         <span>START: {new Date().toLocaleTimeString()}</span>
                         <span>EST. REMAINING: 00:04</span>
                     </div>
                </div>
            </div>

            {/* Right: Stats & Logs */}
            <div className="flex flex-col gap-6">
                {/* Score Preview */}
                <div className="bg-[#161b18] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                     <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20">LIVE</div>
                     <div className="text-slate-400 text-sm font-medium mb-1">Preliminary Score</div>
                     <div className="text-5xl font-bold text-white mb-2">
                        {(80 + (scanStage.progress * 0.15)).toFixed(1)}<span className="text-2xl text-slate-500">%</span>
                     </div>
                     <div className="text-xs text-slate-500">Probability of AI generation based on current pass.</div>
                     
                     <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Noise Map</div>
                            <div className="text-white font-bold">High</div>
                        </div>
                        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Metadata</div>
                            <div className="text-white font-bold">Clean</div>
                        </div>
                     </div>
                </div>

                {/* Terminal Log */}
                <div className="flex-1 bg-black border border-white/10 p-4 rounded-2xl font-mono text-xs text-green-500/80 overflow-hidden flex flex-col">
                    <div className="flex items-center gap-2 text-slate-500 border-b border-white/10 pb-2 mb-2">
                        <span className="material-symbols-outlined text-sm">terminal</span>
                        System Log
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar" ref={logContainerRef}>
                        {logs.map((log, i) => (
                            <div key={i} className="opacity-80 border-l-2 border-green-900 pl-2">
                                <span className="text-slate-600 mr-2">{log.split(' ')[0]}</span>
                                {log.substring(log.indexOf(' ') + 1)}
                            </div>
                        ))}
                        <div className="animate-pulse">_</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // FULL SCREEN DASHBOARD: RESULT STATE (Based on "DeepDetect Pro")
  // --------------------------------------------------------------------------
  if (mode === 'result' && preview && result) {
    const isAuthentic = !result.isAiGenerated;
    const colorClass = isAuthentic ? 'text-emerald-400' : 'text-red-500';
    const bgClass = isAuthentic ? 'bg-emerald-500' : 'bg-red-500';
    const borderColor = isAuthentic ? 'border-emerald-500' : 'border-red-500';

    return (
      <div className="fixed inset-0 z-[100] bg-[#0b0f0d] flex flex-col font-sans overflow-auto">
        {/* Navigation */}
        <div className="border-b border-white/10 h-16 flex items-center justify-between px-6 bg-[#0b0f0d]">
           <div className="flex items-center gap-2">
              <div className="size-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                 <span className="material-symbols-outlined text-emerald-500">all_inclusive</span>
              </div>
              <span className="font-bold text-lg text-white">DeepDetect <span className="font-normal text-slate-500">Pro</span></span>
           </div>
           <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-4 text-sm font-medium text-slate-400">
                 <span className="text-white">History</span>
                 <span className="hover:text-white cursor-pointer">API</span>
                 <span className="hover:text-white cursor-pointer">Documentation</span>
              </div>
              <div className="size-8 rounded-full bg-gradient-to-r from-orange-300 to-rose-300 border-2 border-black"></div>
           </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Image Viewer */}
            <div className="lg:col-span-8 bg-[#131614] rounded-3xl border border-white/5 p-4 flex flex-col relative group">
               <div className="absolute top-6 left-6 z-10 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-xs font-medium text-emerald-400 border border-emerald-500/30 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Analysis
                  </span>
               </div>
               
               <div className="flex-1 relative rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/5">
                  <div className="absolute inset-0 bg-[url('https://assets.codepen.io/108082/dot-grid.png')] opacity-10"></div>
                  <img src={preview} alt="Analysis Target" className="max-h-full max-w-full object-contain" />
               </div>

               <div className="h-12 mt-4 flex items-center justify-between px-2">
                  <div className="text-xs font-mono text-slate-500">SOURCE: {file?.name.toUpperCase()}</div>
                  <div className="flex gap-4 text-xs font-medium text-slate-400">
                     <span className="text-white cursor-pointer border-b border-emerald-500 pb-0.5">Original</span>
                     <span className="hover:text-white cursor-pointer transition-colors">Heatmap</span>
                     <span className="hover:text-white cursor-pointer transition-colors">ELA</span>
                  </div>
               </div>
            </div>

            {/* Right Column: Analysis Data */}
            <div className="lg:col-span-4 flex flex-col gap-4">
                
                {/* Main Result Card */}
                <div className="bg-[#131614] rounded-3xl border border-white/5 p-8 flex flex-col items-center text-center relative overflow-hidden">
                    <div className={`absolute top-0 w-full h-1 ${bgClass} shadow-[0_0_20px_currentColor] opacity-50`}></div>
                    
                    <div className="mb-4">
                       <span className={`text-xs font-bold px-3 py-1 rounded border ${borderColor} ${colorClass} bg-opacity-10 bg-black`}>
                          CONFIDENCE HIGH
                       </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 drop-shadow-2xl">
                        {isAuthentic ? 'REAL IMAGE' : 'FAKE IMAGE'}
                    </h2>
                    <div className="text-slate-500 text-sm mb-8 font-mono">Classification ID: #{Math.floor(Math.random()*9000)+1000}-AFX</div>

                    {/* Progress Circle */}
                    <div className="relative size-40 mb-8">
                        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                           <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="8" />
                           <circle 
                             cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"
                             strokeDasharray="283"
                             strokeDashoffset={283 - (283 * result.confidence / 100)} 
                             className={`${colorClass} transition-all duration-1000 ease-out`}
                             strokeLinecap="round"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white">{result.confidence.toFixed(0)}<span className="text-lg">%</span></span>
                            <span className={`text-[10px] font-bold tracking-widest uppercase ${colorClass}`}>
                                {isAuthentic ? 'AUTHENTIC' : 'SYNTHETIC'}
                            </span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                        {Object.values(result.metadata).slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Insight Card */}
                <div className="bg-[#131614] rounded-3xl border border-white/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-emerald-400 text-sm">auto_awesome</span>
                        <h3 className="text-white font-bold text-sm">AI Insight</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {result.details} Our DeepScan V4.2 model {isAuthentic ? 'confirms' : 'detects'} patterns consistent with {isAuthentic ? 'high-end optical sensors' : 'generative diffusion models'}.
                    </p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-medium text-sm transition-colors border border-white/10 flex items-center justify-center gap-2">
                       <span className="material-symbols-outlined text-lg">download</span> Report
                    </button>
                    <button className="bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-medium text-sm transition-colors border border-white/10 flex items-center justify-center gap-2">
                       <span className="material-symbols-outlined text-lg">share</span> Share
                    </button>
                </div>
                <button 
                  onClick={reset}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                >
                   <span className="material-symbols-outlined">add_a_photo</span> Start New Scan
                </button>

            </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // LANDING PAGE UPLOAD STATE (Original)
  // --------------------------------------------------------------------------
  return (
    <div className="w-full max-w-2xl mt-8 animate-fade-in-up">
      <div className="glass-panel p-2 rounded-2xl md:rounded-[2rem]">
          <div 
            className={`
              relative bg-black/40 border-dashed border transition-all duration-300 rounded-xl md:rounded-[1.5rem] p-10 md:p-14 
              flex flex-col items-center justify-center min-h-[350px]
              ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-slate-700 hover:border-slate-500'}
            `}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {preview ? (
              <div className="flex flex-col items-center w-full z-10">
                <div className="relative mb-6 group">
                   <img src={preview} alt="Upload preview" className="h-48 rounded-lg shadow-lg object-contain border border-slate-700" />
                   <button onClick={reset} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-transform hover:scale-110">
                      <span className="material-symbols-outlined text-sm">close</span>
                   </button>
                </div>
                <button 
                  onClick={handleAnalyze}
                  className="bg-primary hover:bg-[#2fd16f] text-black text-sm font-bold rounded-full px-10 py-4 flex items-center gap-2 glow-button transition-transform active:scale-95"
                >
                   Run Deep Analysis
                   <span className="material-symbols-outlined text-base">psychology</span>
                </button>
              </div>
            ) : (
              <div className="z-10 flex flex-col items-center gap-6 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-500"></div>
                  <div className={`relative h-20 w-20 rounded-full bg-surface-dark border border-slate-700 flex items-center justify-center shadow-xl z-10 transition-transform duration-300 ${isDragging ? '-translate-y-2' : 'group-hover:-translate-y-2'}`}>
                    <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">cloud_upload</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-2xl font-semibold tracking-tight">
                    {isDragging ? 'Drop Image Here' : 'Drag & drop an image'}
                  </h3>
                  <p className="text-slate-500 text-sm">Supports JPG, PNG, WEBP up to 50MB</p>
                </div>
                <div className="mt-4">
                  <div className="bg-slate-800/50 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-full px-6 py-2.5 transition-colors border border-slate-700">
                    Browse Files
                  </div>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            />
          </div>
      </div>
    </div>
  );
};