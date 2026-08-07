import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Trash2, ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import { customerApi } from '@/api/customer.api';
import { Service } from '@/types';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { useCountry } from '@/context/CountryContext';
import { Loader } from '@/components/common/Loader';

export const Wishlist: React.FC = () => {
  const { showToast } = useToast();
  const { formatPrice } = useCountry();
  const [wishlistServices, setWishlistServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    customerApi.getWishlist()
      .then((data) => setWishlistServices(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRemoveItem = async (serviceId: string, title: string) => {
    await customerApi.toggleWishlist(serviceId);
    setWishlistServices((prev) => prev.filter((s) => s.id !== serviceId));
    showToast('Removed from Wishlist', `${title} removed from saved wishlist.`, 'info');
  };

  const filteredServices = wishlistServices.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Loader message="Fetching saved wishlist treatments..." />;

  return (
    <div className="space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-extrabold border border-rose-200 mb-2">
            <Heart size={14} className="fill-rose-500 text-rose-500" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">My Saved Wishlist</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Bookmark your favorite salon & spa treatments for instant repeat booking.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-2xl bg-white border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
          />
        </div>
      </div>

      {/* Wishlist Grid & Empty States */}
      {filteredServices.length === 0 ? (
        <div className="p-12 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-500 mx-auto flex items-center justify-center">
            <Heart size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#111827]">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            You haven't saved any treatments yet. Explore our catalog to save luxury doorstep salon services.
          </p>
          <Link to="/services">
            <Button variant="primary" className="h-11 px-6 text-xs font-bold rounded-2xl shadow-lg mt-2">
              Browse Treatments
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4 hover:border-pink-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden h-44">
                  <img
                    src={service.image || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80'}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveItem(service.id, service.title)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-md cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-[#FF2E7E] uppercase font-mono tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="text-base font-bold text-[#111827] line-clamp-1">{service.title}</h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ECECEC] flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Starting From</span>
                  <span className="text-lg font-extrabold text-[#FF2E7E]">{formatPrice(service.price)}</span>
                </div>

                <Link to={`/services/${service.id}`}>
                  <Button variant="primary" size="sm" className="h-10 px-4 text-xs font-bold rounded-xl shadow-md">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
