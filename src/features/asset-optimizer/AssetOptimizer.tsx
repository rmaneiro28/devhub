
import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, Layers } from 'lucide-react';

const AssetOptimizer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [optimized, setOptimized] = useState<string | null>(null);
  const [stats, setStats] = useState({ original: 0, optimized: 0 });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setStats(s => ({ ...s, original: file.size }));
        optimizeImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const optimizeImage = (dataUrl: string) => {
    setLoading(true);
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxWidth = 1200;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      
      const optimizedData = canvas.toDataURL('image/jpeg', 0.6);
      setOptimized(optimizedData);
      
      // Estimate size of base64
      const stringLength = optimizedData.length - 'data:image/jpeg;base64,'.length;
      const sizeInBytes = Math.ceil(stringLength * 0.75);
      setStats(s => ({ ...s, optimized: sizeInBytes }));
      setLoading(false);
    };
  };

  const download = () => {
    if (!optimized) return;
    const link = document.createElement('a');
    link.download = 'devhub-optimized.jpg';
    link.href = optimized;
    link.click();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
          <Layers size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Asset Optimizer</h3>
          <p className="text-sm text-slate-500">Client-side lossless-style compression</p>
        </div>
      </div>

      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center hover:border-teal-500 transition-colors cursor-pointer group"
        >
          <Upload className="w-12 h-12 text-slate-300 group-hover:text-teal-500 mb-4 transition-colors" />
          <p className="text-slate-600 dark:text-slate-400 font-medium text-center">
            Click to upload or drag & drop<br />
            <span className="text-xs text-slate-400">PNG, JPG, WEBP (Max 5MB)</span>
          </p>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFile} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Original</span>
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-800">
                <img src={image} className="max-h-full object-contain" alt="Original" />
              </div>
              <p className="text-xs text-slate-500">Size: {(stats.original / 1024).toFixed(2)} KB</p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">Optimized</span>
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center border border-teal-500/30">
                {loading ? (
                  <RefreshCw className="w-8 h-8 text-teal-500 animate-spin" />
                ) : (
                  <img src={optimized || ''} className="max-h-full object-contain" alt="Optimized" />
                )}
              </div>
              <p className="text-xs text-teal-500 font-bold">Size: {(stats.optimized / 1024).toFixed(2)} KB ({Math.round((1 - stats.optimized/stats.original) * 100)}% smaller)</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={download}
              className="flex-grow py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Optimized
            </button>
            <button 
              onClick={() => {setImage(null); setOptimized(null);}}
              className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetOptimizer;
