import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Copy,
  RefreshCw,
  Sparkles,
  Layers,
  X
} from 'lucide-react';
import { adminApi, type AdminImageItem } from '../services/adminApi';

export const FoodImagesPage: React.FC = () => {
  const [images, setImages] = useState<AdminImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'Uploaded Foods' | 'Official Buckets'>('all');

  // Preview modal for enlarged viewing
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Notification state
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  const loadImages = async () => {
    try {
      setIsLoading(true);
      const res = await adminApi.getImages();
      setImages(res.images || []);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to load image library.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'Image exceeds the maximum allowed size of 5MB.');
      return;
    }

    // Validate extension
    const validExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validExtensions.includes(file.type.toLowerCase())) {
      showNotification('error', 'Please upload a valid image file (JPEG, PNG, or WebP).');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleCancelSelected = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      const res = await adminApi.uploadImage(selectedFile);
      showNotification('success', `Image "${res.file.filename}" uploaded successfully!`);
      handleCancelSelected();
      await loadImages();
    } catch (err: any) {
      showNotification('error', err.message || 'Image upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showNotification('success', `Copied image path to clipboard: ${url}`);
  };

  const filteredImages = images.filter((img) => {
    if (activeCategory === 'all') return true;
    return img.category === activeCategory;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between shadow-xl animate-in slide-in-from-top-2 duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/90 border border-brand-red/50 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-brand-red" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-gold text-xs font-bold tracking-wider uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Visual Assets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            Food Images & Media Library
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 mt-0.5">
            Upload new dish photos, preview before saving, and manage image paths for menu items.
          </p>
        </div>

        <button
          onClick={loadImages}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-gold/40 text-cream/90 hover:text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-60 w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-gold ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Library</span>
        </button>
      </div>

      {/* Upload New Image Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950/90 border border-gold/30 shadow-xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-red/20 text-brand-red">
            <Upload className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white">Upload New Food Image</h2>
            <p className="text-xs text-cream/60">
              Accepted formats: WebP, PNG, JPEG. Maximum file size: 5 MB.
            </p>
          </div>
        </div>

        {!previewUrl ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/20 hover:border-gold/60 rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-900/50 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-cream/60 group-hover:text-gold group-hover:scale-110 transition-all">
                <ImageIcon className="w-6 h-6 text-gold" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-gold transition-colors">
                  Click to browse or drop an image here
                </span>
                <p className="text-[11px] text-cream/50 mt-1">
                  High-resolution food photographs will be stored locally in public assets.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-gold/40 flex flex-col sm:flex-row items-center gap-6">
            {/* Preview Thumbnail */}
            <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-neutral-950 border border-white/10 shrink-0">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-full object-contain"
              />
            </div>

            {/* File info & actions */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <div className="text-xs font-bold text-gold uppercase tracking-wider">
                  Ready to Upload
                </div>
                <div className="font-bold text-sm text-white truncate max-w-sm mt-0.5">
                  {selectedFile?.name}
                </div>
                <div className="text-[11px] text-cream/60 mt-0.5">
                  Size: {selectedFile ? (selectedFile.size / 1024).toFixed(1) : 0} KB • Type:{' '}
                  {selectedFile?.type}
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={handleCancelSelected}
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-cream/70 hover:text-white text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUploadSubmit}
                  disabled={isUploading}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-brand-red/40 active:scale-95 transition-all flex items-center gap-2"
                >
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>Confirm & Save Image</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Existing Image Library */}
      <div className="p-6 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gold" />
            <h2 className="text-base font-black text-white">Media Library ({images.length})</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-gold text-neutral-950'
                  : 'bg-neutral-900 text-cream/70 hover:text-white'
              }`}
            >
              All Assets ({images.length})
            </button>
            <button
              onClick={() => setActiveCategory('Uploaded Foods')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeCategory === 'Uploaded Foods'
                  ? 'bg-gold text-neutral-950'
                  : 'bg-neutral-900 text-cream/70 hover:text-white'
              }`}
            >
              Uploaded Foods ({images.filter((i) => i.category === 'Uploaded Foods').length})
            </button>
            <button
              onClick={() => setActiveCategory('Official Buckets')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeCategory === 'Official Buckets'
                  ? 'bg-gold text-neutral-950'
                  : 'bg-neutral-900 text-cream/70 hover:text-white'
              }`}
            >
              Official Buckets ({images.filter((i) => i.category === 'Official Buckets').length})
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-cream/50 space-y-2">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs">Loading media assets...</div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="py-12 text-center text-cream/40 text-xs">
            No images in this category yet. Upload a dish photo above!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-2xl bg-neutral-900/70 border border-white/5 hover:border-gold/40 overflow-hidden shadow-md transition-all flex flex-col justify-between"
              >
                {/* Image Thumbnail */}
                <div
                  onClick={() => setZoomImage(img.url)}
                  className="relative aspect-square w-full bg-neutral-950 cursor-pointer overflow-hidden flex items-center justify-center p-2"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white">
                    Click to zoom
                  </div>
                </div>

                {/* Details & Copy Button */}
                <div className="p-3 space-y-2">
                  <div>
                    <div className="text-[11px] font-bold text-white truncate" title={img.name}>
                      {img.name}
                    </div>
                    <div className="text-[10px] text-cream/50 flex items-center justify-between mt-0.5">
                      <span>{img.category}</span>
                      <span>{(img.size / 1024).toFixed(0)} KB</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyUrl(img.url)}
                    className="w-full py-1.5 px-2 rounded-lg bg-neutral-950 hover:bg-gold hover:text-neutral-950 border border-white/10 text-[10px] font-bold text-cream/80 transition-all flex items-center justify-center gap-1.5"
                    title="Copy path to use in menu item"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Path</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enlarged Zoom Modal */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-2xl max-h-[85vh] bg-neutral-950 rounded-2xl p-4 border border-gold/30">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-3 right-3 p-2 bg-neutral-900 text-white rounded-full border border-white/20 hover:bg-brand-red"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={zoomImage}
              alt="Enlarged food preview"
              className="max-h-[75vh] w-auto object-contain mx-auto rounded-lg"
            />
            <div className="text-center text-xs text-cream/70 mt-3 font-mono">
              {zoomImage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
