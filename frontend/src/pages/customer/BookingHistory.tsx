import React, { useState, useEffect } from 'react';
import { bookingApi } from '@/api/booking';
import { Booking } from '@/types';
import { BookingCard } from '@/components/cards/BookingCard';
import { Tabs } from '@/components/ui/Tabs';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';

export const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    bookingApi
      .getMyBookings()
      .then((data) => setBookings(data))
      .finally(() => setIsLoading(false));
  }, []);

  const tabs = [
    { id: 'ALL', label: 'All Bookings', count: bookings.length },
    {
      id: 'UPCOMING',
      label: 'In Progress',
      count: bookings.filter((b) => ['PENDING', 'ACCEPTED', 'ON_THE_WAY', 'SERVICE_STARTED', 'ONGOING', 'PAYMENT_CONFIRMED'].includes(b.status)).length,
    },
    { id: 'COMPLETED', label: 'Completed', count: bookings.filter((b) => b.status === 'COMPLETED').length },
    { id: 'CANCELLED', label: 'Cancelled', count: bookings.filter((b) => b.status === 'CANCELLED').length },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'UPCOMING') return ['PENDING', 'ACCEPTED', 'ON_THE_WAY', 'SERVICE_STARTED', 'ONGOING', 'PAYMENT_CONFIRMED'].includes(b.status);
    if (activeTab === 'COMPLETED') return b.status === 'COMPLETED';
    if (activeTab === 'CANCELLED') return b.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Booking History</h1>
        <p className="text-xs text-slate-400 mt-1">Track live status and view past appointment logs</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {isLoading ? (
        <Loader message="Loading appointment records..." />
      ) : filteredBookings.length === 0 ? (
        <EmptyState title="No Bookings Found" description="No appointment history matches the selected tab filter." />
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};
