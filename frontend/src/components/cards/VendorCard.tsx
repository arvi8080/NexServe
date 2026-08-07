import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Vendor } from '@/types';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card flex flex-col overflow-hidden group p-0 bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-pink-500/10"
    >
      <div className="relative aspect-video w-full bg-slate-100 rounded-t-2xl overflow-hidden">
        <img
          src={vendor.profileImage || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80'}
          alt={vendor.businessName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge
            variant={vendor.status === 'APPROVED' ? 'success' : vendor.status === 'PENDING' ? 'warning' : 'danger'}
          >
            {vendor.status === 'APPROVED' ? 'Verified Partner' : vendor.status}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-pink-600 transition-colors line-clamp-1">
              {vendor.businessName}
            </h3>
            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
            <span className="truncate">{vendor.address}, {vendor.city}</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1">
          {vendor.description || 'Verified home service professional partner specializing in organic treatments.'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Rating value={vendor.averageRating || 4.9} reviewsCount={vendor.totalReviews || 128} size={16} />
          <Link
            to={`/search?vendor=${vendor.id}`}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 transition-colors"
          >
            <span>View Menu</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
