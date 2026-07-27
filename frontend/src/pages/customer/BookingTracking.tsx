import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookingApi } from '@/api/booking';
import { locationApi } from '@/api/location';
import { Booking, ProfessionalLocation } from '@/types';
import { formatCurrency, formatDateTime } from '@/utils/formatters';
import { MapPin, Navigation, MessageSquare, Clock, CheckCircle2, ShieldAlert, FileText, Lock, ShieldCheck, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { LeafletMap } from '@/components/common/LeafletMap';
import { useSocket } from '@/hooks/useSocket';
import { useToast } from '@/context/ToastContext';

export const BookingTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [location, setLocation] = useState<ProfessionalLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sosTriggered, setSosTriggered] = useState(false);
  const socket = useSocket();
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      bookingApi
        .getBookingById(id)
        .then((data) => {
          setBooking(data);
          return locationApi.getNearbyProfessionals(12.9352, 77.6245);
        })
        .then((locs) => setLocation(locs[0] || null))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      socket.joinBookingRoom(id);
      socket.onLocationUpdate((data) => {
        setLocation((prev) => (prev ? { ...prev, latitude: data.latitude, longitude: data.longitude } : null));
      });
      socket.onBookingStatusUpdate((updatedBooking) => {
        if (updatedBooking.id === id) {
          setBooking((prev) => (prev ? { ...prev, status: updatedBooking.status } : null));
        }
      });
    }
  }, [id, socket]);

  const handleTriggerSOS = () => {
    setSosTriggered(true);
    showToast('🚨 SOS ALERT TRIGGERED!', 'NexServe 24/7 Safety Command Center and local emergency contacts notified.', 'error');
  };

  if (isLoading) return <Loader fullScreen message="Connecting to Leaflet live GPS network..." />;
  if (!booking) return <div className="text-center py-20 text-slate-500 font-bold">Booking details not available.</div>;

  const vendorLat = location?.latitude || 12.942;
  const vendorLng = location?.longitude || 77.632;
  const customerLat = 12.9352;
  const customerLng = 77.6245;

  return (
    <div className="space-y-8 max-w-4xl mx-auto bg-[#FFFDFE] text-[#111827] pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#111827]">Booking Tracking #{booking.id.substring(0, 8)}</h1>
            <Badge variant="purple">{booking.status}</Badge>
          </div>
          <p className="text-xs text-[#64748B] font-medium mt-1">Live OpenStreetMap GPS Tracking & Doorstep Security Telemetry</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link to={`/customer/invoice/${booking.id}`}>
            <Button size="sm" variant="secondary" leftIcon={<FileText size={14} />}>
              Digital Invoice
            </Button>
          </Link>

          <Link to={`/customer/chat/${booking.id}`}>
            <Button size="sm" variant="primary" leftIcon={<MessageSquare size={14} />}>
              Open Chat
            </Button>
          </Link>
        </div>
      </div>

      {/* OTP Authentication & SOS Emergency Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Start OTP Box */}
        <div className="p-6 rounded-3xl bg-pink-50/70 border border-pink-200 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#FF2E7E] text-white font-bold">
              <Lock size={20} />
            </div>
            <div>
              <span className="text-xs text-[#FF2E7E] font-extrabold uppercase tracking-wider block">Service Start OTP</span>
              <p className="text-xs text-[#64748B]">Share this code with your beautician upon arrival.</p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white border border-pink-300 text-xl font-extrabold text-[#FF2E7E] shadow-sm tracking-widest">
            4892
          </div>
        </div>

        {/* SOS Emergency Trigger Card */}
        <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-600 text-white font-bold animate-pulse">
              <ShieldAlert size={20} />
            </div>
            <div>
              <span className="text-xs text-rose-700 font-extrabold uppercase tracking-wider block">24/7 Safety & SOS</span>
              <p className="text-xs text-rose-600">{sosTriggered ? 'SOS Active • Command Alerted' : 'Instant emergency support dispatch.'}</p>
            </div>
          </div>
          <button
            onClick={handleTriggerSOS}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              sosTriggered ? 'bg-rose-700 text-white shadow-md' : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
          >
            {sosTriggered ? 'ALERT SENT' : 'TRIGGER SOS'}
          </button>
        </div>
      </div>

      {/* Leaflet Map Card */}
      <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#FF2E7E] animate-spin" />
            <span className="text-sm font-bold text-[#111827]">Live OpenStreetMap GPS Tracking</span>
          </div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
            ETA: ~10 Mins Away
          </span>
        </div>

        <LeafletMap
          customerLat={customerLat}
          customerLng={customerLng}
          vendorLat={vendorLat}
          vendorLng={vendorLng}
          height="340px"
        />
      </div>

      {/* Professional Details & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
          <h3 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">Assigned Professional</h3>
          <div className="flex items-center gap-4">
            <img
              src={booking.vendor?.profileImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-200 shadow-sm"
            />
            <div className="flex-1 space-y-1">
              <h4 className="text-base font-bold text-[#111827]">{booking.vendor?.businessName}</h4>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200 inline-block">
                ✓ 5-Stage Verified Partner
              </span>
              <p className="text-xs text-[#64748B] font-medium">{booking.vendor?.phone}</p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
          <h3 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">Service Security Timeline</h3>
          <div className="space-y-3 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>Booking Confirmed & Paid ({formatDateTime(booking.createdAt || '')})</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>5-Stage Partner Verified</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-[#FF2E7E] shrink-0 animate-pulse" />
              <span className="font-bold text-[#FF2E7E]">Partner Travelling (ETA 10 Mins)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
