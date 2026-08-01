import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceApi } from '@/api/service';
import { Service } from '@/types';
import { SearchInput } from '@/components/ui/SearchInput';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { useCountry } from '@/context/CountryContext';
import { MapPin, Globe } from 'lucide-react';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const { selectedCountry } = useCountry();

  const [cityFilter, setCityFilter] = useState('All Cities');
  const [areaFilter, setAreaFilter] = useState('All Areas');

  const [results, setResults] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    serviceApi
      .searchServices(query)
      .then((data) => setResults(data))
      .finally(() => setIsLoading(false));
  }, [query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val) setSearchParams({ q: val });
    else setSearchParams({});
  };

  return (
    <div className="space-y-8 bg-[#FFFDFE] text-[#111827] pb-20">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="text-xs font-bold text-[#FF2E7E] uppercase font-mono tracking-wider">
            {selectedCountry.name} Marketplace Catalog
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">Search Services & Vendors</h1>
        <p className="text-xs text-slate-500 font-semibold mt-1">
          Filter doorstep treatments by Country, City, and Area locality.
        </p>
      </div>

      {/* Country -> City -> Area Text Filters */}
      <div className="p-6 rounded-[28px] bg-white border border-[#ECECEC] shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Active Country</label>
          <div className="h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 flex items-center gap-2">
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Filter City</label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
          >
            <option value="All Cities">All Cities ({selectedCountry.name})</option>
            {selectedCountry.code === 'IN' ? (
              <>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="New Delhi">New Delhi</option>
              </>
            ) : (
              <>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Lalitpur">Lalitpur</option>
              </>
            )}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Filter Locality / Area</label>
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
          >
            <option value="All Areas">All Areas</option>
            <option value="Indiranagar">Indiranagar</option>
            <option value="Koramangala">Koramangala</option>
            <option value="Durbar Marg">Durbar Marg</option>
            <option value="Thamel">Thamel</option>
          </select>
        </div>
      </div>

      <SearchInput
        value={query}
        onChange={handleSearchChange}
        onClear={() => {
          setQuery('');
          setSearchParams({});
        }}
      />

      {isLoading ? (
        <Loader message="Searching treatment catalog..." />
      ) : results.length === 0 ? (
        <EmptyState
          iconType="search"
          title="No Matching Services Found"
          description={`We couldn't find any treatment matching "${query}" in ${selectedCountry.name}.`}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};
