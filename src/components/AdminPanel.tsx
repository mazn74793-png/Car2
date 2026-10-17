import React, { useState, useRef } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Sliders,
  Settings,
  Car,
  Calendar,
  Layers,
  FileText,
  Cloud,
  Check,
  AlertCircle,
  Trash2,
  Plus,
  RefreshCw,
} from 'lucide-react';
import {
  CenterStoreData,
  CenterHeroSlide,
  CenterServicePackage,
  CenterFleetCar,
  BookingRecord,
  CenterGalleryItem,
} from '../types/centerTypes';
import { uploadImageFromDevice, UploadResult } from '../utils/imageUploader';
import { soundEngine } from '../utils/soundEngine';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: CenterStoreData;
  onSaveData: (newData: CenterStoreData) => void;
  onResetDefaults: () => void;
}

type AdminTab = 'info' | 'slides' | 'services' | 'fleet' | 'bookings' | 'gallery' | 'cloudinary';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('info');
  const [formData, setFormData] = useState<CenterStoreData>(data);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ message: string; isError?: boolean } | null>(null);
  const [saveToast, setSaveToast] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetKey, setUploadTargetKey] = useState<{
    type: 'slide' | 'service' | 'fleet' | 'gallery';
    id: string;
  } | null>(null);

  // Sync when data changes externally
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handleSave = () => {
    soundEngine.playClick(1200);
    onSaveData(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const triggerUpload = (type: 'slide' | 'service' | 'fleet' | 'gallery', id: string) => {
    setUploadTargetKey({ type, id });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTargetKey) return;

    setIsUploading(uploadTargetKey.id);
    setUploadStatus({ message: 'Uploading and processing image from device...' });

    try {
      const result: UploadResult = await uploadImageFromDevice(
        file,
        formData.cloudinaryConfig
      );

      soundEngine.playClick(1000);

      // Update target image in state
      if (uploadTargetKey.type === 'slide') {
        setFormData((prev) => ({
          ...prev,
          heroSlides: prev.heroSlides.map((s) =>
            s.id === uploadTargetKey.id ? { ...s, image: result.url } : s
          ),
        }));
      } else if (uploadTargetKey.type === 'service') {
        setFormData((prev) => ({
          ...prev,
          services: prev.services.map((s) =>
            s.id === uploadTargetKey.id ? { ...s, image: result.url } : s
          ),
        }));
      } else if (uploadTargetKey.type === 'fleet') {
        setFormData((prev) => ({
          ...prev,
          fleet: prev.fleet.map((c) =>
            c.id === uploadTargetKey.id ? { ...c, image: result.url } : c
          ),
        }));
      } else if (uploadTargetKey.type === 'gallery') {
        setFormData((prev) => ({
          ...prev,
          gallery: prev.gallery.map((g) =>
            g.id === uploadTargetKey.id ? { ...g, image: result.url } : g
          ),
        }));
      }

      setUploadStatus({
        message:
          result.source === 'cloudinary'
            ? 'Uploaded securely to Cloudinary!'
            : 'Image loaded and optimized from your device!',
      });
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err) {
      setUploadStatus({ message: 'Upload failed, please check file format', isError: true });
    } finally {
      setIsUploading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-2xl flex flex-col text-white">
      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top Console Bar */}
      <header className="px-6 py-4 bg-neutral-950 border-b border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs tracking-wider">
            P
          </div>
          <div>
            <h2 className="text-base font-bold uppercase tracking-widest text-white">
              Center Control Console & Content Manager
            </h2>
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
              <span>Cloudinary Status:</span>
              <span
                className={`font-semibold ${
                  formData.cloudinaryConfig.cloudName
                    ? 'text-emerald-400'
                    : 'text-neutral-400'
                }`}
              >
                {formData.cloudinaryConfig.cloudName ? 'Connected' : 'Device Direct Mode'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {uploadStatus && (
            <span
              className={`text-xs font-mono px-3 py-1 rounded-full border ${
                uploadStatus.isError
                  ? 'bg-red-500/10 text-red-400 border-red-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
            >
              {uploadStatus.message}
            </span>
          )}

          {saveToast && (
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Changes Saved & Live</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(900);
              setPreviewMode(!previewMode);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              previewMode
                ? 'bg-white text-black font-bold'
                : 'border border-white/20 text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? 'Exit Preview' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500 text-white hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save & Apply</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(600);
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Top Horizontal Segmented Tabs Bar (No Left Sidebar!) */}
      <div className="px-6 py-3 bg-neutral-950/95 border-b border-white/10 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-full overflow-x-auto">
          {[
            { id: 'info', label: 'بيانات ونصوص المركز (Center Info)', icon: FileText },
            { id: 'slides', label: 'الشرائح والصور (Hero Slides)', icon: Layers },
            { id: 'services', label: 'خدمات الصيانة (Services)', icon: Sliders },
            { id: 'bookings', label: 'سجل الحجوزات (Bookings)', icon: Calendar, badge: formData.bookings.length },
            { id: 'gallery', label: 'معرض المركز (Gallery)', icon: ImageIcon },
            { id: 'cloudinary', label: 'إعدادات كلاودينري (Cloudinary)', icon: Cloud },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick(850);
                  setActiveTab(tab.id as AdminTab);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                      isActive ? 'bg-black text-white' : 'bg-white/10 text-neutral-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm('استعادة الإعدادات والنصوص والصور الأصلية للمركز؟')) {
              soundEngine.playClick(600);
              onResetDefaults();
            }
          }}
          className="px-4 py-2 rounded-full text-xs font-mono uppercase text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">إعادة تعيين المصنع</span>
        </button>
      </div>

      {/* Main Container - Full Width Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Content Workspace */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10">
          {/* TAB 1: CENTER INFO */}
          {activeTab === 'info' && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Center Identity & Contact Information
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  Update the official name, taglines, contact details, and announcement banner visible to all visitors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Center Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.centerInfo.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, name: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Subtitle / Facility Title
                  </label>
                  <input
                    type="text"
                    value={formData.centerInfo.subName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, subName: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Center Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.centerInfo.tagline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, tagline: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Announcement Notice Banner
                  </label>
                  <input
                    type="text"
                    value={formData.centerInfo.announcementNotice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, announcementNotice: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Center Overview & Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.centerInfo.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, description: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Direct Phone / Hotline
                  </label>
                  <input
                    type="text"
                    value={formData.centerInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, phone: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Concierge Email
                  </label>
                  <input
                    type="email"
                    value={formData.centerInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, email: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Street Address & Location
                  </label>
                  <input
                    type="text"
                    value={formData.centerInfo.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, address: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={formData.centerInfo.workingHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerInfo: { ...formData.centerInfo, workingHours: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO SLIDES & PHOTOS WITH CLOUDINARY UPLOAD */}
          {activeTab === 'slides' && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                    Hero Showcase Slides & Images
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    Upload images from your device or Cloudinary and edit headline text in real time.
                  </p>
                </div>
              </div>

              {/* Slide Selector tabs */}
              <div className="flex gap-2">
                {formData.heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      activeSlideIdx === idx
                        ? 'bg-white text-black font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Slide {idx + 1}: {slide.model}
                  </button>
                ))}
              </div>

              {/* Selected Slide Editor */}
              {(() => {
                const slide = formData.heroSlides[activeSlideIdx];
                if (!slide) return null;
                return (
                  <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/10 space-y-6">
                    {/* Image Preview & Upload Trigger */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                        Slide Image (Full Width 16:9 Showcase)
                      </label>
                      <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-white/15 bg-black group">
                        <img
                          src={slide.image}
                          alt={slide.model}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => triggerUpload('slide', slide.id)}
                            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-xl"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Upload New Image from Device / Cloudinary</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-2">
                        <span>Current Source: {slide.image.startsWith('data:') ? 'Local Device Upload' : 'Cloud / Hosted'}</span>
                        <button
                          type="button"
                          onClick={() => triggerUpload('slide', slide.id)}
                          className="text-white underline hover:text-neutral-300"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>

                    {/* Slide Text Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                          Model Title
                        </label>
                        <input
                          type="text"
                          value={slide.model}
                          onChange={(e) => {
                            const newSlides = [...formData.heroSlides];
                            newSlides[activeSlideIdx] = { ...slide, model: e.target.value };
                            setFormData({ ...formData, heroSlides: newSlides });
                          }}
                          className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                          Kicker / Subtitle
                        </label>
                        <input
                          type="text"
                          value={slide.subtitle}
                          onChange={(e) => {
                            const newSlides = [...formData.heroSlides];
                            newSlides[activeSlideIdx] = { ...slide, subtitle: e.target.value };
                            setFormData({ ...formData, heroSlides: newSlides });
                          }}
                          className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                          Hero Main Headline
                        </label>
                        <input
                          type="text"
                          value={slide.headline}
                          onChange={(e) => {
                            const newSlides = [...formData.heroSlides];
                            newSlides[activeSlideIdx] = { ...slide, headline: e.target.value };
                            setFormData({ ...formData, heroSlides: newSlides });
                          }}
                          className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                          Acceleration 0–60
                        </label>
                        <input
                          type="text"
                          value={slide.specs.acceleration}
                          onChange={(e) => {
                            const newSlides = [...formData.heroSlides];
                            newSlides[activeSlideIdx] = {
                              ...slide,
                              specs: { ...slide.specs, acceleration: e.target.value },
                            };
                            setFormData({ ...formData, heroSlides: newSlides });
                          }}
                          className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2 text-xs text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                          Horsepower Output
                        </label>
                        <input
                          type="text"
                          value={slide.specs.power}
                          onChange={(e) => {
                            const newSlides = [...formData.heroSlides];
                            newSlides[activeSlideIdx] = {
                              ...slide,
                              specs: { ...slide.specs, power: e.target.value },
                            };
                            setFormData({ ...formData, heroSlides: newSlides });
                          }}
                          className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2 text-xs text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                          Top Speed
                        </label>
                        <input
                          type="text"
                          value={slide.specs.topSpeed}
                          onChange={(e) => {
                            const newSlides = [...formData.heroSlides];
                            newSlides[activeSlideIdx] = {
                              ...slide,
                              specs: { ...slide.specs, topSpeed: e.target.value },
                            };
                            setFormData({ ...formData, heroSlides: newSlides });
                          }}
                          className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2 text-xs text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                          Price / Session Display
                        </label>
                        <input
                          type="text"
                          value={slide.priceFrom}
                          onChange={(e) => {
                            const newSlides = [...formData.heroSlides];
                            newSlides[activeSlideIdx] = { ...slide, priceFrom: e.target.value };
                            setFormData({ ...formData, heroSlides: newSlides });
                          }}
                          className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: PACKAGES & SERVICES */}
          {activeTab === 'services' && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Center Services & Track Packages
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  Customize track programs, certified service pricing, duration, and photos.
                </p>
              </div>

              <div className="space-y-4">
                {formData.services.map((srv, idx) => (
                  <div
                    key={srv.id}
                    className="p-5 rounded-3xl bg-neutral-900/50 border border-white/10 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Service Photo with upload */}
                      <div className="relative w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-black shrink-0 group border border-white/10">
                        <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => triggerUpload('service', srv.id)}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-semibold text-white"
                        >
                          <Upload className="w-4 h-4 mb-1" />
                          <span>Upload Photo</span>
                        </button>
                      </div>

                      {/* Fields */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                            Service Title
                          </label>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[idx] = { ...srv, title: e.target.value };
                              setFormData({ ...formData, services: updated });
                            }}
                            className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3 py-1.5 text-xs text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                            Price ($ USD)
                          </label>
                          <input
                            type="number"
                            value={srv.price}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[idx] = { ...srv, price: Number(e.target.value) };
                              setFormData({ ...formData, services: updated });
                            }}
                            className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3 py-1.5 text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={srv.duration}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[idx] = { ...srv, duration: e.target.value };
                              setFormData({ ...formData, services: updated });
                            }}
                            className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={srv.description}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[idx] = { ...srv, description: e.target.value };
                              setFormData({ ...formData, services: updated });
                            }}
                            className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3 py-1.5 text-xs text-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VEHICLE FLEET */}
          {activeTab === 'fleet' && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Center Vehicle Fleet
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  Manage vehicles available for experience track drives and test drives. Upload custom fleet photos.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.fleet.map((car, idx) => (
                  <div
                    key={car.id}
                    className="p-5 rounded-3xl bg-neutral-900/50 border border-white/10 space-y-3"
                  >
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black group border border-white/10">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => triggerUpload('fleet', car.id)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-semibold text-white"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Car Photo</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                        Car Model Name
                      </label>
                      <input
                        type="text"
                        value={car.name}
                        onChange={(e) => {
                          const updated = [...formData.fleet];
                          updated[idx] = { ...car, name: e.target.value };
                          setFormData({ ...formData, fleet: updated });
                        }}
                        className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3 py-1.5 text-xs text-white font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[9px] uppercase text-neutral-500 block">Horsepower</span>
                        <input
                          type="number"
                          value={car.horsepower}
                          onChange={(e) => {
                            const updated = [...formData.fleet];
                            updated[idx] = { ...car, horsepower: Number(e.target.value) };
                            setFormData({ ...formData, fleet: updated });
                          }}
                          className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-neutral-500 block">0–60 Time</span>
                        <input
                          type="text"
                          value={car.zeroToSixty}
                          onChange={(e) => {
                            const updated = [...formData.fleet];
                            updated[idx] = { ...car, zeroToSixty: e.target.value };
                            setFormData({ ...formData, fleet: updated });
                          }}
                          className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-neutral-500 block">Top Speed</span>
                        <input
                          type="number"
                          value={car.topSpeed}
                          onChange={(e) => {
                            const updated = [...formData.fleet];
                            updated[idx] = { ...car, topSpeed: Number(e.target.value) };
                            setFormData({ ...formData, fleet: updated });
                          }}
                          className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BOOKINGS MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div className="max-w-5xl space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                    Guest Bookings & Reservation Log ({formData.bookings.length})
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    Review incoming track experiences, service appointments, and update status.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {formData.bookings.map((b, idx) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-neutral-900/50 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded-full">
                          {b.referenceCode}
                        </span>
                        <span className="text-xs font-bold text-white uppercase">{b.customerName}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-xs text-neutral-400 font-mono">{b.customerEmail}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-xs text-neutral-400 font-mono">{b.customerPhone}</span>
                      </div>
                      <div className="text-xs text-neutral-300">
                        <span className="font-semibold">{b.serviceTitle}</span> ({b.vehicleName})
                      </div>
                      <div className="text-[11px] font-mono text-neutral-500">
                        Scheduled for: {b.bookingDate} at {b.timeSlot} · Billed: ${b.totalPrice.toLocaleString()}
                      </div>
                      {b.notes && (
                        <div className="text-[11px] text-neutral-400 italic">Guest Note: "{b.notes}"</div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={b.status}
                        onChange={(e) => {
                          const updated = [...formData.bookings];
                          updated[idx] = { ...b, status: e.target.value as typeof b.status };
                          setFormData({ ...formData, bookings: updated });
                        }}
                        className="bg-neutral-900 border border-white/15 px-3 py-1.5 rounded-full text-xs text-white focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick(600);
                          setFormData({
                            ...formData,
                            bookings: formData.bookings.filter((item) => item.id !== b.id),
                          });
                        }}
                        aria-label="Delete booking"
                        className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FACILITY GALLERY */}
          {activeTab === 'gallery' && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Center & Circuit Facility Gallery
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  Upload high-resolution photography of the track, showroom, and workshop.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {formData.gallery.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-3xl bg-neutral-900/50 border border-white/10 space-y-3"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black group border border-white/10">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => triggerUpload('gallery', item.id)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-semibold text-white"
                      >
                        <Upload className="w-4 h-4 mb-1" />
                        <span>Upload Photo</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...formData.gallery];
                          updated[idx] = { ...item, title: e.target.value };
                          setFormData({ ...formData, gallery: updated });
                        }}
                        className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3 py-1.5 text-xs text-white font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CLOUDINARY CONFIGURATION */}
          {activeTab === 'cloudinary' && (
            <div className="max-w-2xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Cloudinary Image Hosting Configuration
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  Connect your Cloudinary account to store all images permanently on the cloud.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/10 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <Cloud className="w-6 h-6 text-sky-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">
                      Cloudinary Unsigned Upload
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Images uploaded from your device are sent directly to your Cloudinary storage.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Cloud Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. your-cloud-name"
                    value={formData.cloudinaryConfig.cloudName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cloudinaryConfig: {
                          ...formData.cloudinaryConfig,
                          cloudName: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Upload Preset (Unsigned)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. porsche_uploads"
                    value={formData.cloudinaryConfig.uploadPreset}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cloudinaryConfig: {
                          ...formData.cloudinaryConfig,
                          uploadPreset: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-neutral-900 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-2">
                  <div className="font-semibold text-white">How this works:</div>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-400 text-[11px]">
                    <li>If you leave this empty, image upload from your device still works 100% seamlessly using instant high-definition local compressed storage!</li>
                    <li>If you enter your Cloudinary cloud name & preset, files are permanently hosted on Cloudinary's global CDN.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Real-time Live Preview Floating Bar / Modal */}
      {previewMode && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col animate-in fade-in duration-300">
          <div className="p-4 bg-neutral-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Live Interactive Website Preview
              </span>
              <span className="text-xs text-neutral-500 font-mono">(Showing current edits live)</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-white text-black hover:bg-neutral-200 transition-colors"
              >
                Apply & Save These Changes
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode(false)}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="flex-1 overflow-y-auto p-6 space-y-12 max-w-6xl mx-auto w-full">
            {/* Live Center Header Banner */}
            <div className="p-6 rounded-3xl bg-neutral-900 border border-white/15 space-y-2 text-center">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                {formData.centerInfo.announcementNotice}
              </span>
              <h2 className="text-3xl font-extrabold uppercase text-white">
                {formData.centerInfo.name}
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                {formData.centerInfo.address} · {formData.centerInfo.phone}
              </p>
            </div>

            {/* Live Hero Slide Preview */}
            <div className="relative aspect-[16/8] rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <img
                src={formData.heroSlides[activeSlideIdx]?.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-8 flex flex-col justify-end">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  {formData.heroSlides[activeSlideIdx]?.subtitle}
                </span>
                <h3 className="text-4xl font-extrabold text-white uppercase">
                  {formData.heroSlides[activeSlideIdx]?.model}
                </h3>
                <p className="text-sm text-neutral-300 mt-1">
                  {formData.heroSlides[activeSlideIdx]?.headline}
                </p>
                <div className="flex gap-4 mt-3 text-xs font-mono text-neutral-300">
                  <span>0–60: {formData.heroSlides[activeSlideIdx]?.specs.acceleration}</span>
                  <span>Power: {formData.heroSlides[activeSlideIdx]?.specs.power}</span>
                  <span>Top Speed: {formData.heroSlides[activeSlideIdx]?.specs.topSpeed}</span>
                </div>
              </div>
            </div>

            {/* Live Services Grid Preview */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                Services Preview
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {formData.services.slice(0, 3).map((srv) => (
                  <div key={srv.id} className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10">
                    <img src={srv.image} alt={srv.title} className="w-full h-32 object-cover rounded-2xl mb-3" />
                    <h5 className="text-sm font-bold text-white uppercase">{srv.title}</h5>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{srv.description}</p>
                    <div className="mt-3 text-sm font-mono font-bold text-white">
                      ${srv.price.toLocaleString()} · {srv.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
