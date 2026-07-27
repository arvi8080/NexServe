import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceApi } from '@/api/service';
import { Service } from '@/types';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SkeletonLoader } from '@/components/common/SkeletonLoader';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/Button';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/services/mockDataService';

export const Services: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high'>('recommended');

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchServicesData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await serviceApi.getAllServices(selectedCategory === 'All' ? undefined : selectedCategory);
      setServices(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, [selectedCategory]);

  const categoriesList = ['All', ...MOCK_CATEGORIES.map((c: any) => c.title)];

  const filteredServices = services
    .filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24 px-4 bg-[#FFFDFE] text-[#111827]">
      {/* Header Banner */}
      <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-pink-50/90 via-purple-50/40 to-white border border-pink-200 shadow-xl space-y-4 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">Doorstep Beauty & Wellness Menu</h1>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl font-medium">
          Select from certified hydra-facials, keratin hair spas, bridal party makeovers, and nail artistry delivered to your living room.
        </p>
      </div>

      {/* Filter Controls & Search Bar */}
      <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facials, hair spa, bridal makeup, nail art..."
              className="w-full h-11 pl-11 pr-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <SlidersHorizontal size={16} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-[#111827] focus:outline-none focus:border-[#FF2E7E] cursor-pointer w-full sm:w-auto"
            >
              <option value="recommended">Recommended</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 border-t border-[#ECECEC]">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchParams(cat === 'All' ? {} : { category: cat });
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid Content */}
      {isLoading ? (
        <SkeletonLoader type="card" count={8} />
      ) : isError ? (
        <div className="py-16 text-center space-y-4">
          <EmptyState
            iconType="calendar"
            title="Error Loading Service Menu"
            description="Could not fetch treatment catalog from API."
          />
          <Button variant="primary" onClick={fetchServicesData} leftIcon={<RefreshCw size={16} />}>
            Retry Menu Fetch
          </Button>
        </div>
      ) : filteredServices.length === 0 ? (
        <EmptyState
          iconType="search"
          title="No Treatments Found"
          description={`No beauty treatments match "${searchQuery || selectedCategory}".`}
          actionText="Reset Filters"
          actionPath="/services"
        />
      ) : (
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-500 block">
            Showing {filteredServices.length} Doorstep Treatments ({selectedCategory})
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
