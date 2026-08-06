import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, MapPin, Star } from 'lucide-react';
import { Service } from '@/types';
import { useCountry } from '@/context/CountryContext';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { formatPrice } = useCountry();

  const vendorName = service.vendor?.businessName || 'Glow & Grace Studio';
  const vendorLocation = service.vendor?.address || service.vendor?.city || 'Durbar Marg';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="glass-card flex flex-col overflow-hidden h-full group p-0 bg-white border border-slate-100 shadow-xl shadow-pink-500/5 hover:shadow-2xl hover:shadow-[#FF2E7E]/15 rounded-3xl"
    >
      {/* 1. Image Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-t-3xl">
        <img
          src={service.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-50" />
        <div className="absolute top-4 left-4">
          <Badge variant="purple" size="sm">
            {service.category.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200 flex items-center gap-1.5 text-xs text-slate-800 font-bold shadow-xs">
          <Clock className="w-4 h-4 text-[#FF2E7E]" />
          <span>{service.duration} Mins</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Title + Rating */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[20px] font-bold text-slate-900 group-hover:text-[#FF2E7E] transition-colors line-clamp-1">
              {service.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-xs font-bold text-amber-700">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9 (120)</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed font-normal">
            {service.description || 'Deep-cleansing diamond exfoliation with hyaluronic glow boost.'}
          </p>
        </div>

        {/* Parlour / Vendor Name & Locality */}
        <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <MapPin className="w-4 h-4 text-[#FF2E7E] shrink-0" />
          <span className="truncate font-semibold text-slate-700">
            {vendorName}, {vendorLocation}
          </span>
        </div>

        {/* Starting Price & Book Now Button */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Starting</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">{formatPrice(service.price)}</span>
          </div>

          <Link
            to={`/customer/book/${service.id}`}
            className="gradient-btn px-5 h-11 text-xs font-bold rounded-2xl flex items-center gap-2"
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
