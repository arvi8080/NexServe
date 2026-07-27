import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceApi } from '@/api/service';
import { Service } from '@/types';
import { SearchInput } from '@/components/ui/SearchInput';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Search Results</h1>
        <p className="text-xs text-slate-400 mt-1">
          {query ? `Showing matching services for "${query}"` : 'Type a query to search across all services and vendors.'}
        </p>
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
        <Loader message="Searching database..." />
      ) : results.length === 0 ? (
        <EmptyState
          title="No Results Found"
          description={`We couldn't find any services matching "${query}". Try searching for 'facial', 'haircut', or 'waxing'.`}
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
