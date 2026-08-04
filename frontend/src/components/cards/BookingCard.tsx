import React from 'react';
import { Calendar, MapPin, MessageSquare, Navigation } from 'lucide-react';
import { Booking } from '@/types';
import { formatCurrency, formatDateTime } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const statusVariants: Record<string, 'warning' | 'info' | 'purple' | 'success' | 'danger'> = {
    PENDING: 'warning',
    ACCEPTED: 'info',
    ON_THE_WAY: 'info',
    SERVICE_STARTED: 'purple',
    ONGOING: 'purple',
    COMPLETED: 'success',
    PAYMENT_CONFIRMED: 'success',
    CANCELLED: 'danger',
  };

  return (
    <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#FF2E7E]/40 transition-all bg-white border border-[#ECECEC] rounded-[32px] shadow-xl shadow-[#FF2E7E]/5">
      <div className="flex items-start gap-5 flex-1">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-[#ECECEC]">
          <img
            src={booking.service?.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80'}
            alt={booking.service?.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-[#111827] text-lg">{booking.service?.title || 'Service Booking'}</h3>
            <Badge variant={statusVariants[booking.status] || 'default'}>{booking.status}</Badge>
          </div>

          <p className="text-xs text-[#64748B] font-semibold">{booking.vendor?.businessName}</p>

          <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 flex-wrap font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#FF2E7E]" />
              <span>{formatDateTime(booking.bookingDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF2E7E]" />
              <span className="truncate max-w-55 sm:max-w-xs">{booking.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#ECECEC]">
        <div className="text-left md:text-right">
          <span className="text-xs text-slate-400 block font-medium">Total Amount</span>
          <span className="text-xl font-extrabold text-[#111827]">{formatCurrency(booking.totalAmount)}</span>
        </div>

        <div className="flex items-center gap-2">
          {['ACCEPTED', 'ON_THE_WAY', 'SERVICE_STARTED', 'ONGOING', 'PAYMENT_CONFIRMED'].includes(booking.status) ? (
            <Link to={`/customer/bookings/${booking.id}`}>
              <Button size="sm" variant="primary" leftIcon={<Navigation className="w-4 h-4" />}>
                Track Live
              </Button>
            </Link>
          ) : null}

          <Link to={`/customer/chat/${booking.id}`}>
            <Button size="sm" variant="secondary" leftIcon={<MessageSquare className="w-4 h-4" />}>
              Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
