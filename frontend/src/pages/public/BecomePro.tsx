import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  DollarSign,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  Upload,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  X,
  Check,
  Send,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { compressImage } from '@/utils/imageCompressor';
import { useToast } from '@/context/ToastContext';
import { Service, Vendor, BeautyCategory } from '@/types';
import { MOCK_SERVICES } from '@/services/mockDataService';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: string;
}

export const BecomePro: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [ownerName, setOwnerName] = useState('');
  const [parlourName, setParlourName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Kathmandu');
  const [area, setArea] = useState('Durbar Marg');
  const [workingSchedule, setWorkingSchedule] = useState('Mon - Sat, 9:00 AM - 7:00 PM');
  
  // Dynamic Services State
  const [services, setServices] = useState<ServiceItem[]>([
    { id: '1', name: 'Diamond Hydra-Glow Facial', category: 'Facial', duration: '60 min', price: '1499' },
    { id: '2', name: 'Trending Layered Haircut & Blowdry', category: 'Haircut', duration: '45 min', price: '1500' },
  ]);

  // Image Upload State (Compressed Base64 strings)
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  // Form Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // FAQ Accordion Toggle State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Add Dynamic Service
  const handleAddService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      name: '',
      category: 'Facial',
      duration: '60 min',
      price: '',
    };
    setServices([...services, newService]);
  };

  // Remove Dynamic Service
  const handleRemoveService = (id: string) => {
    if (services.length <= 1) {
      showToast('Minimum Service Required', 'Please list at least one parlour service.', 'error');
      return;
    }
    setServices(services.filter((s) => s.id !== id));
  };

  // Update Dynamic Service Item
  const handleUpdateService = (id: string, field: keyof ServiceItem, value: string) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // Handle Photo Upload with Client-Side HTML5 Canvas Compression
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > 4) {
      showToast('Photo Limit', 'You can upload up to 4 work/parlour photos.', 'error');
      return;
    }

    setIsCompressing(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressedBase64 = await compressImage(files[i], 800, 0.7);
        compressedList.push(compressedBase64);
      }
      setPhotos((prev) => [...prev, ...compressedList]);
      showToast('Photos Compressed!', 'Images resized to 800px max width (70% quality) for fast upload.', 'success');
    } catch {
      showToast('Upload Error', 'Failed to compress image photo.', 'error');
    } finally {
      setIsCompressing(false);
    }
  };

  // Remove Photo
  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ownerName.trim() || !parlourName.trim()) {
      showToast('Missing Info', 'Please enter Owner Name and Parlour Name.', 'error');
      return;
    }

    // Phone validation for Nepal (+977 10 digits starting 98/97)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showToast('Invalid Phone', 'Please enter a valid 10-digit Nepal mobile number.', 'error');
      return;
    }

    // Check services validation
    const hasEmptyService = services.some((s) => !s.name.trim() || !s.price.trim());
    if (hasEmptyService) {
      showToast('Incomplete Services', 'Please complete service name and price for all listed services.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Create Vendor Record
      const newVendor: Vendor = {
        id: `vendor_${Date.now()}`,
        userId: `user_v_${Date.now()}`,
        businessName: parlourName,
        description: `Certified parlour services by ${ownerName} in ${area}, ${city}.`,
        phone: `+977 ${phone}`,
        address: area,
        city: city,
        state: 'Bagmati Province',
        country: 'Nepal',
        status: 'APPROVED',
        averageRating: 4.9,
        totalReviews: 120,
        profileImage: photos[0] || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
        createdAt: new Date().toISOString(),
      };

      // Create Service Objects for each listed service
      const newServiceList: Service[] = services.map((s, idx) => ({
        id: `service_reg_${Date.now()}_${idx}`,
        vendorId: newVendor.id,
        title: s.name,
        description: `Deep-cleansing diamond exfoliation with hyaluronic glow boost offered by ${parlourName}.`,
        category: (s.category.toUpperCase().replace(/\s+/g, '_') as BeautyCategory),
        price: Number(s.price) || 1499,
        minPrice: Number(s.price) || 500,
        maxPrice: Number(s.price) * 2 || 5000,
        duration: parseInt(s.duration) || 60,
        image: photos[idx] || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
        isActive: true,
        vendor: newVendor,
      }));

      // Store in localStorage & MOCK_SERVICES memory
      try {
        const existingRaw = localStorage.getItem('GLOWHOME_REGISTERED_SERVICES');
        const existingServices: Service[] = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [...newServiceList, ...existingServices];
        localStorage.setItem('GLOWHOME_REGISTERED_SERVICES', JSON.stringify(updated));
      } catch {
        // ignore
      }

      newServiceList.forEach((s) => MOCK_SERVICES.unshift(s));

      setIsSubmitting(false);
      setShowSuccessModal(true);
      showToast('Parlour Registered!', `${parlourName} services are now live on the Services page!`, 'success');
    }, 1200);
  };

  const preconfiguredCategories = [
    { title: 'Haircut & Styling', count: '15+ Pro Vendors', icon: '✂️' },
    { title: 'Facial Cleanup & Hydra-Glow', count: '28+ Pro Vendors', icon: '✨' },
    { title: 'Party Glam Makeup', count: '20+ Pro Vendors', icon: '💄' },
    { title: 'Bridal Makeup Package', count: '12+ Pro Vendors', icon: '👑' },
    { title: 'Manicure & Pedicure', count: '18+ Pro Vendors', icon: '💅' },
    { title: 'Waxing & Threading', count: '22+ Pro Vendors', icon: '🌺' },
    { title: 'Body Spa & Massage', count: '10+ Pro Vendors', icon: '🧘‍♀️' },
    { title: 'Bridal Mehendi & Henna', count: '14+ Pro Vendors', icon: '🌿' },
  ];

  const faqs = [
    {
      q: 'Is registering my parlour on GlowHome free?',
      a: 'Yes, 100% free! There are zero registration fees or hidden subscription costs. You only pay a minimal commission on completed customer bookings.',
    },
    {
      q: 'When is GlowHome launching in Kathmandu?',
      a: 'GlowHome is launching very soon across Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur). By registering now, your parlour will get priority placement on launch day!',
    },
    {
      q: 'Who controls service prices and working hours?',
      a: 'You have 100% full control! You decide your own prices in NPR (रु), your service durations, and your working schedule.',
    },
    {
      q: 'How do I receive customer bookings?',
      a: 'Once verified, you will receive instant booking alerts with the customer address in Kathmandu Valley, chosen appointment time, and selected treatment.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* 1. HERO & VALUE PROPOSITION */}
      <section className="relative pt-8 max-w-7xl mx-auto px-4">
        <div className="p-8 md:p-16 rounded-[40px] bg-gradient-to-br from-[#FF2E7E] via-[#E01F68] to-purple-900 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold shadow-xs">
              <Sparkles size={16} />
              <span>Kathmandu, Nepal Launching Soon 🇳🇵</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Register Your Parlour — <span className="underline decoration-pink-300">It's Free to Join</span>
            </h1>

            <p className="text-base sm:text-lg text-pink-100 font-normal leading-relaxed">
              Join Kathmandu's premier doorstep beauty network. Expand your parlour clientele, set your own prices, and get verified bookings delivered directly to your doorstep schedule.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
                <ShieldCheck size={16} className="text-emerald-300" />
                <span>Verified Customers</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
                <DollarSign size={16} className="text-amber-300" />
                <span>You Set the Prices</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
                <Clock size={16} className="text-pink-300" />
                <span>Work Your Own Schedule</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#register-form"
                className="inline-flex items-center gap-3 h-[58px] px-8 rounded-full bg-white text-[#FF2E7E] hover:bg-pink-50 text-sm font-extrabold shadow-xl transition-transform hover:scale-105"
              >
                <span>Register Parlour Now</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Live Metrics Card Showcase */}
          <div className="relative z-10 w-full max-w-md shrink-0 space-y-4">
            <div className="p-6 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 text-white space-y-6 shadow-2xl">
              <h3 className="text-sm font-bold tracking-wider uppercase text-pink-200 border-b border-white/20 pb-3">
                Kathmandu Launch Metrics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-3xl font-extrabold text-white block">500+</span>
                  <span className="text-xs text-pink-100 font-semibold block">Interested Customers</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-3xl font-extrabold text-white block">100+</span>
                  <span className="text-xs text-pink-100 font-semibold block">Listed Treatments</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-100">
                  Priority Placement Open for Kathmandu Valley Parlours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW GLOWHOME WORKS (4-STEP PROCESS) & WHY JOIN */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block">SIMPLE 4-STEP PROCESS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">How GlowHome Works for Parlours</h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Get your parlour online in 5 minutes and start receiving doorstep beauty bookings across Kathmandu Valley.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Register Parlour',
              desc: 'Fill your parlour details, add your services, custom prices in NPR (रु), and working schedule.',
              icon: '📝',
            },
            {
              step: '02',
              title: 'Get Bookings',
              desc: 'Receive instant booking notifications from customers in your nearby Kathmandu neighbourhood.',
              icon: '📲',
            },
            {
              step: '03',
              title: 'Receive Details',
              desc: 'Get exact customer location, appointment time, and treatment requirements before traveling.',
              icon: '📍',
            },
            {
              step: '04',
              title: 'Serve & Earn',
              desc: 'Deliver doorstep salon service, collect payments via eSewa / Khalti / Cash, and grow earnings.',
              icon: '💰',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-white border border-[#ECECEC] shadow-sm hover:shadow-xl transition-all space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-pink-100 group-hover:text-[#FF2E7E] transition-colors">
                  {item.step}
                </span>
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[#111827]">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Join Highlights */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-base font-bold text-[#111827] flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle2 size={18} className="text-[#FF2E7E]" />
              <span>Zero Marketing Costs</span>
            </h4>
            <p className="text-xs text-slate-600">
              We bring ready-to-book customers directly to your parlour without advertising costs.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-[#111827] flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle2 size={18} className="text-[#FF2E7E]" />
              <span>100% Price Autonomy</span>
            </h4>
            <p className="text-xs text-slate-600">
              You set your own service charges in NPR (रु) and duration for every treatment.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-[#111827] flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle2 size={18} className="text-[#FF2E7E]" />
              <span>Flexible Schedule</span>
            </h4>
            <p className="text-xs text-slate-600">
              Toggle your availability online/offline whenever you want to accept doorstep clients.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SERVICE CATALOG SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block">PRE-CONFIGURED CATEGORIES</span>
          <h2 className="text-3xl font-extrabold text-[#111827]">Services You Can List & Offer</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {preconfiguredCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-5 rounded-2xl bg-white border border-[#ECECEC] hover:border-[#FF2E7E] hover:shadow-lg transition-all space-y-2 text-center group cursor-pointer"
            >
              <span className="text-3xl block group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h4 className="text-sm font-bold text-[#111827] group-hover:text-[#FF2E7E]">{cat.title}</h4>
              <span className="text-[11px] text-slate-400 font-semibold block">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE PARLOUR REGISTRATION FORM */}
      <section id="register-form" className="max-w-4xl mx-auto px-4">
        <div className="p-8 md:p-12 rounded-[36px] bg-white border border-[#ECECEC] shadow-2xl space-y-8 relative">
          <div className="text-center space-y-2 border-b border-[#ECECEC] pb-6">
            <span className="text-xs font-bold text-[#FF2E7E] uppercase font-mono tracking-widest block">
              PARLOUR ONBOARDING PORTAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              Register Your Parlour in Kathmandu
            </h2>
            <p className="text-xs text-slate-500">
              Fill your details below to join the upcoming GlowHome Nepal Marketplace launch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step A: Personal & Business Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider text-[#FF2E7E] border-l-4 border-[#FF2E7E] pl-3">
                1. Personal & Parlour Info
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Owner Full Name *</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Priya Shrestha"
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Parlour / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={parlourName}
                    onChange={(e) => setParlourName(e.target.value)}
                    placeholder="e.g. Glow & Grace Studio"
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Mobile Phone (+977) *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9808422407"
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Lalitpur">Lalitpur (Patan)</option>
                    <option value="Bhaktapur">Bhaktapur</option>
                    <option value="Pokhara">Pokhara</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Area / Neighbourhood *</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Durbar Marg">Durbar Marg</option>
                    <option value="Koramangala">Koramangala</option>
                    <option value="Thamel">Thamel</option>
                    <option value="New Baneshwor">New Baneshwor</option>
                    <option value="Jhamsikhel">Jhamsikhel</option>
                    <option value="Lazimpat">Lazimpat</option>
                    <option value="Maharajgunj">Maharajgunj</option>
                    <option value="Bhatbhateni">Bhatbhateni</option>
                    <option value="Koteshwor">Koteshwor</option>
                    <option value="Lakeside Pokhara">Lakeside Pokhara</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step B: Dynamic Service & Pricing Builder */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-l-4 border-[#FF2E7E] pl-3">
                <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider text-[#FF2E7E]">
                  2. Dynamic Services & Pricing Builder (NPR रु)
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddService}
                  leftIcon={<Plus size={14} />}
                  className="h-9 px-3 text-xs font-bold rounded-xl border-[#FF2E7E] text-[#FF2E7E]"
                >
                  + Add Service
                </Button>
              </div>

              <div className="space-y-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                  >
                    <div className="sm:col-span-4 space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Service Name</label>
                      <input
                        type="text"
                        value={srv.name}
                        onChange={(e) => handleUpdateService(srv.id, 'name', e.target.value)}
                        placeholder="e.g. Diamond Hydra-Glow Facial"
                        className="w-full h-10 px-3 rounded-lg bg-white border border-[#ECECEC] text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Category</label>
                      <select
                        value={srv.category}
                        onChange={(e) => handleUpdateService(srv.id, 'category', e.target.value)}
                        className="w-full h-10 px-2 rounded-lg bg-white border border-[#ECECEC] text-xs font-bold text-slate-900"
                      >
                        <option value="Facial">Facial Cleanup</option>
                        <option value="Haircut">Haircut & Styling</option>
                        <option value="HairSpa">Hair Spa</option>
                        <option value="Makeup">Party Makeup</option>
                        <option value="Bridal">Bridal Makeup</option>
                        <option value="Manicure">Mani / Pedi</option>
                        <option value="Waxing">Waxing & Threading</option>
                        <option value="Massage">Body Spa</option>
                        <option value="Mehendi">Mehendi Art</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Duration</label>
                      <select
                        value={srv.duration}
                        onChange={(e) => handleUpdateService(srv.id, 'duration', e.target.value)}
                        className="w-full h-10 px-2 rounded-lg bg-white border border-[#ECECEC] text-xs font-bold text-slate-900"
                      >
                        <option value="30 min">30 min</option>
                        <option value="45 min">45 min</option>
                        <option value="60 min">60 min</option>
                        <option value="1.5 hr">1.5 hr</option>
                        <option value="2 hr">2 hr</option>
                        <option value="3+ hr">3+ hr</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Price (रु NPR)</label>
                      <input
                        type="number"
                        value={srv.price}
                        onChange={(e) => handleUpdateService(srv.id, 'price', e.target.value)}
                        placeholder="1499"
                        className="w-full h-10 px-3 rounded-lg bg-white border border-[#ECECEC] text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-1 flex items-center justify-end pt-3 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => handleRemoveService(srv.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step C: Availability Schedule */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider text-[#FF2E7E] border-l-4 border-[#FF2E7E] pl-3">
                3. Working Schedule Availability
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Working Days & Operating Hours *</label>
                <input
                  type="text"
                  required
                  value={workingSchedule}
                  onChange={(e) => setWorkingSchedule(e.target.value)}
                  placeholder="e.g. Mon - Sat, 9:00 AM - 7:00 PM"
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Step D: Client-Side HTML5 Canvas Photo Compressor */}
            <div className="space-y-4">
              <div className="border-l-4 border-[#FF2E7E] pl-3">
                <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider text-[#FF2E7E]">
                  4. Upload Parlour / Treatment Photos (Optional)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Automatic client-side HTML5 Canvas compressor (resizes to max 800px width with 70% JPEG quality for fast upload).
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {photos.map((src, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden aspect-square border border-slate-200 group">
                    <img src={src} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {photos.length < 4 && (
                  <label className="border-2 border-dashed border-slate-300 hover:border-[#FF2E7E] rounded-2xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors p-4 text-center space-y-2 bg-slate-50/50 hover:bg-pink-50/30">
                    {isCompressing ? (
                      <Loader2 size={24} className="text-[#FF2E7E] animate-spin" />
                    ) : (
                      <Upload size={24} className="text-slate-400" />
                    )}
                    <span className="text-[11px] font-bold text-slate-600 block">
                      {isCompressing ? 'Compressing...' : '+ Upload Photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      disabled={isCompressing}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              leftIcon={isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              className="w-full h-14 rounded-2xl text-sm font-extrabold shadow-2xl shadow-[#FF2E7E]/25"
            >
              {isSubmitting ? 'Sending Registration Details...' : 'Register Parlour — Free Priority Access'}
            </Button>
          </form>
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-3xl font-extrabold text-[#111827]">Got Questions About GlowHome Nepal?</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#ECECEC] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-sm text-[#111827] hover:text-[#FF2E7E] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FF2E7E]' : 'text-slate-400'}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[36px] p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
              <Check size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#111827]">Congratulations!</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Your parlour <strong className="text-[#FF2E7E]">{parlourName}</strong> is now registered! Your services are live on the GlowHome Services Menu.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100 text-xs text-slate-700 space-y-1 text-left">
              <p><strong>Parlour:</strong> {parlourName}</p>
              <p><strong>Owner:</strong> {ownerName}</p>
              <p><strong>Phone:</strong> +977 {phone}</p>
              <p><strong>Location:</strong> {area}, {city}</p>
              <p><strong>Services Live:</strong> {services.length} Treatments</p>
            </div>

            <div className="space-y-2">
              <Button
                variant="primary"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/services');
                }}
                className="w-full h-12 rounded-xl text-xs font-bold shadow-lg shadow-[#FF2E7E]/20"
                rightIcon={<ArrowRight size={16} />}
              >
                View My Parlour Services on Menu
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowSuccessModal(false)}
                className="w-full h-10 rounded-xl text-xs font-bold text-slate-600"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
