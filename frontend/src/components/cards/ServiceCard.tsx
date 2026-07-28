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

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="glass-card flex flex-col overflow-hidden h-full group p-0 bg-white border border-slate-100 shadow-xl shadow-pink-500/5 hover:shadow-2xl hover:shadow-[#FF4D8D]/15 rounded-3xl"
    >
      {/* 1. Image Header (20px top border radius) */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-t-3xl">
        <img
          src={service.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-50" />
        <div className="absolute top-4 left-4">
          <Badge variant="purple" size="sm">
            {service.category.replace('_', ' ')}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200 flex items-center gap-1.5 text-xs text-slate-800 font-bold shadow-xs">
          <Clock className="w-4 h-4 text-[#FF4D8D]" />
          <span>{service.duration} Mins</span>
        </div>
      </div>

      {/* 24px Padding Content Area */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* 2. Title + ⭐ 4.9 (120 Reviews) */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[22px] font-bold text-slate-900 group-hover:text-[#E91E63] transition-colors line-clamp-1">
              {service.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-xs font-bold text-amber-700">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9 (120)</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 line-clamp-2 mt-2 leading-relaxed font-normal">
            {service.description}
          </p>
        </div>

        {/* 4. Address / Vendor Name with 📍 Icon */}
        <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <MapPin className="w-4 h-4 text-[#FF4D8D] shrink-0" />
          <span className="truncate">{service.vendor?.businessName || 'Glow & Grace Studio'}, Koramangala</span>
        </div>

        {/* 5. Starting Price & 6. Book Now CTA Button */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Starting</span>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{formatPrice(service.price)}</span>
          </div>

          <Link
            to={`/services/${service.id}`}
            className="gradient-btn px-6 h-12 text-sm font-bold rounded-3xl flex items-center gap-2"
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
