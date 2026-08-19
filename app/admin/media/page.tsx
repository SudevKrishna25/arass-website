'use client';

import React, { useState, useEffect } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Upload, Image as ImageIcon, Trash2, Copy, Search, ShieldCheck } from 'lucide-react';

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/media')
      .then((res) => res.json())
      .then((data) => {
        setAssets(data.assets || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', file.name);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.asset) {
        setAssets([data.asset, ...assets]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
      setAssets(assets.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = assets.filter((a) => a.filename.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
              MEDIA STORAGE ENGINE
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Media Asset Library</h1>
          </div>

          <label className="px-5 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,255,0.5)] cursor-pointer self-start sm:self-auto">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'UPLOADING...' : 'UPLOAD MEDIA ASSET'}</span>
            <input type="file" onChange={handleFileUpload} disabled={uploading} className="hidden" />
          </label>
        </div>

        {/* Search */}
        <div className="bg-[#020b18]/60 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search filename..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#01050d] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
            />
          </div>
          <span className="text-xs font-mono text-white/50">{filtered.length} Assets Registered</span>
        </div>

        {/* Media Grid */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl">
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-electric-cyan animate-pulse">
              LOADING MEDIA ASSETS...
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((asset) => (
                <div
                  key={asset.id}
                  className="p-4 rounded-2xl border border-white/10 bg-[#01050d] space-y-3 font-mono text-xs hover:border-electric-cyan/40 transition-all group"
                >
                  <div className="h-36 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden relative">
                    <ImageIcon className="w-8 h-8 text-white/20" />
                  </div>
                  <div>
                    <div className="font-bold text-white truncate">{asset.filename}</div>
                    <div className="text-white/40 text-[11px]">
                      {(asset.sizeBytes / 1024 / 1024).toFixed(2)} MB • {asset.mimeType}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10 text-[11px]">
                    <button
                      onClick={() => navigator.clipboard.writeText(asset.url)}
                      className="text-electric-cyan hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </button>
                    <button onClick={() => handleDelete(asset.id)} className="text-red-400 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs font-mono text-white/50">
              No media assets uploaded yet. Use the upload button to add images/videos.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
