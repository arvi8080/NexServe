import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Building, User, Mail, Phone, MapPin, Home, Lock, Upload, CheckCircle2, ArrowRight, Star, ShieldCheck, Sparkles, Award, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const VendorRegister: React.FC = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    city: 'Bengaluru',
    address: '',
    password: '',
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    aadhaar: false,
    pan: false,
    salonPhoto: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    if (pass.length < 6) return { score: 33, label: 'Weak', color: 'bg-rose-500' };
    if (pass.length < 10 || !/\d/.test(pass)) return { score: 66, label: 'Medium', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const passStrength = getPasswordStrength(formData.password);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.businessName || !formData.ownerName || !formData.email || !formData.phone || !formData.password) {
        showToast('Required Fields Missing', 'Please complete all business & owner details.', 'warning');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    try {
      const nameParts = formData.ownerName.trim().split(' ');
      const firstName = nameParts[0] || 'Vendor';
      const lastName = nameParts.slice(1).join(' ') || 'Owner';

      await register({
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: 'VENDOR_OWNER',
        businessName: formData.businessName,
        city: formData.city,
        address: formData.address,
      });

      showToast('Partner Onboarding Submitted!', 'Welcome to GlowHome Partner Network.', 'success');
      navigate('/vendor/dashboard');
    } catch {
      showToast('Registration Failed', 'Could not complete partner registration.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[750px] mx-auto space-y-6">
      {/* 9. Partner Trust Statistics Bar Above Form */}
      <div className="grid grid-cols-4 gap-3 p-4 rounded-3xl bg-white border border-pink-100 shadow-md text-center text-xs font-bold text-slate-800">
        <div className="flex items-center justify-center gap-1.5 border-r border-slate-100">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>4.9★ Rating</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 border-r border-slate-100">
          <Award className="w-4 h-4 text-[#FF4D8D]" />
          <span>500+ Partners</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 border-r border-slate-100">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>50K+ Bookings</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>30+ Cities</span>
        </div>
      </div>

      {/* Main Form Card Container (750px Width) */}
      <div className="glass-panel p-8 md:p-10 bg-white border border-slate-100 shadow-xl rounded-3xl space-y-8">
        {/* 2. 3-Step Progress Indicator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="text-[#E91E63] uppercase tracking-wider">Step {step} of 3</span>
            <span className="text-slate-700">
              {step === 1 ? 'Business & Owner Details' : step === 2 ? 'Verification & Documents' : 'Partner Approval'}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-[#FF4D8D] to-[#E91E63] transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Become a GlowHome Partner</h2>
          <p className="text-xs text-slate-500 font-medium">Register your beauty studio, independent practice, or spa</p>
        </div>

        <form onSubmit={handleNextStep} className="space-y-6">
          {step === 1 && (
            <div className="space-y-5">
              {/* Business Name Field */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Business / Studio Name *</label>
                <div className="relative flex items-center">
                  <Building className="absolute left-4 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D8D] focus:ring-2 focus:ring-[#FF4D8D]/20 font-medium"
                    placeholder="e.g. Lotus Glow Beauty Studio"
                  />
                </div>
              </div>

              {/* 5. Owner Name + City Equal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Owner / Lead Name *</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-4 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D8D] focus:ring-2 focus:ring-[#FF4D8D]/20 font-medium"
                      placeholder="Priya Kapoor"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Operating City *</label>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-4 text-slate-400 w-5 h-5" />
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#FF4D8D] focus:ring-2 focus:ring-[#FF4D8D]/20 font-medium"
                    >
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Email Address *</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D8D] focus:ring-2 focus:ring-[#FF4D8D]/20 font-medium"
                      placeholder="vendor@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone Number *</label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 text-slate-400 w-5 h-5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D8D] focus:ring-2 focus:ring-[#FF4D8D]/20 font-medium"
                      placeholder="+91 91234 56789"
                    />
                  </div>
                </div>
              </div>

              {/* Studio Address */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Studio / Operating Address *</label>
                <div className="relative flex items-center">
                  <Home className="absolute left-4 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D8D] focus:ring-2 focus:ring-[#FF4D8D]/20 font-medium"
                    placeholder="e.g. 42 Lotus Avenue, Indiranagar, Sector 3"
                  />
                </div>
              </div>

              {/* Password & Strength Meter */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Set Account Password *</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D8D] focus:ring-2 focus:ring-[#FF4D8D]/20 font-medium"
                    placeholder="••••••••"
                  />
                </div>

                {/* 7. Password Strength Visual Meter */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-400">Password Strength:</span>
                      <span className={passStrength.score === 100 ? 'text-emerald-600' : passStrength.score === 66 ? 'text-amber-600' : 'text-rose-600'}>
                        {passStrength.label}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${passStrength.color} transition-all duration-300`} style={{ width: `${passStrength.score}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 6. Document Upload Section (Step 2) */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-xs text-slate-600 leading-relaxed font-medium">
                🔒 Upload identity documents for instant verified badge activation upon approval.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Aadhaar Upload Card */}
                <div
                  onClick={() => setUploadedDocs({ ...uploadedDocs, aadhaar: !uploadedDocs.aadhaar })}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                    uploadedDocs.aadhaar
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 hover:border-pink-300'
                  }`}
                >
                  {uploadedDocs.aadhaar ? <CheckCircle2 className="w-8 h-8 text-emerald-600" /> : <Upload className="w-8 h-8 text-pink-500" />}
                  <span className="text-xs font-bold">Aadhaar Card (Front/Back)</span>
                  <span className="text-[11px] text-slate-400">{uploadedDocs.aadhaar ? '✓ Document Uploaded' : 'Click to simulate upload'}</span>
                </div>

                {/* PAN Upload Card */}
                <div
                  onClick={() => setUploadedDocs({ ...uploadedDocs, pan: !uploadedDocs.pan })}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                    uploadedDocs.pan
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 hover:border-pink-300'
                  }`}
                >
                  {uploadedDocs.pan ? <CheckCircle2 className="w-8 h-8 text-emerald-600" /> : <FileText className="w-8 h-8 text-pink-500" />}
                  <span className="text-xs font-bold">PAN Card Copy</span>
                  <span className="text-[11px] text-slate-400">{uploadedDocs.pan ? '✓ Document Uploaded' : 'Click to simulate upload'}</span>
                </div>

                {/* Salon Photo Card */}
                <div
                  onClick={() => setUploadedDocs({ ...uploadedDocs, salonPhoto: !uploadedDocs.salonPhoto })}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                    uploadedDocs.salonPhoto
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 hover:border-pink-300'
                  }`}
                >
                  {uploadedDocs.salonPhoto ? <CheckCircle2 className="w-8 h-8 text-emerald-600" /> : <Building className="w-8 h-8 text-pink-500" />}
                  <span className="text-xs font-bold">Studio / Setup Photo</span>
                  <span className="text-[11px] text-slate-400">{uploadedDocs.salonPhoto ? '✓ Document Uploaded' : 'Click to simulate upload'}</span>
                </div>

                {/* Training Certificate Card */}
                <div className="p-5 rounded-2xl border bg-slate-50 border-slate-200 flex flex-col items-center text-center space-y-2">
                  <ShieldCheck className="w-8 h-8 text-purple-500" />
                  <span className="text-xs font-bold">Beauty Certification (Optional)</span>
                  <span className="text-[11px] text-slate-400">Optional for fast track</span>
                </div>
              </div>
            </div>
          )}

          {/* 8. Urban Company Style Partner Benefits Grid */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">GlowHome Partner Guarantee</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 85% Earning Payout</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Weekly Payouts</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited Bookings</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Marketing Support</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Partner Badge</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24 Hours Approval</div>
            </div>
          </div>

          {/* 10. Refined CTA Button ("Register & Continue → Step 1/3") */}
          <Button
            type="submit"
            variant="primary"
            className="w-full h-[52px] text-sm font-bold rounded-3xl"
            isLoading={isLoading}
            rightIcon={<ArrowRight size={18} />}
          >
            {step === 1 ? 'Register & Continue → (Step 1/3)' : 'Submit Partner Application → (Step 2/3)'}
          </Button>
        </form>

        {/* 11. Footer Section with Sign In & Legal Links */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-3">
          <p className="text-xs text-slate-500 font-medium">
            Already registered as a partner?{' '}
            <Link to="/login" className="text-[#E91E63] font-bold hover:underline">
              Sign In Here
            </Link>
          </p>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium pt-1">
            <Link to="/about" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-600 transition-colors">Concierge Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
