import React, { useState, useEffect } from 'react';
import { bookingApi } from '@/api/booking';
import { Booking } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Wallet as WalletIcon, Download, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';

export const Wallet: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bookingApi
      .getMyBookings()
      .then((data) => setBookings(data.filter((b) => b.status === 'COMPLETED' || b.status === 'ACCEPTED')))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader message="Loading wallet transaction records..." />;

  const totalSpent = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Wallet & Tax Invoices</h1>
        <p className="text-xs text-slate-400 mt-1">Payment logs and downloadable tax invoice receipts</p>
      </div>

      <div className="glass-panel p-6 bg-gradient-to-r from-rose-950/40 via-slate-900 to-purple-950/40 border border-rose-500/30 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Total Value Delivered</span>
          <h2 className="text-3xl font-extrabold text-white">{formatCurrency(totalSpent)}</h2>
          <p className="text-[11px] text-slate-400">All transactions verified via SSL Encrypted Payment Channels</p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <WalletIcon className="w-8 h-8" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Available Tax Invoices</h3>
        {bookings.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No completed transactions available for invoicing.</p>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="glass-panel p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-rose-400">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{booking.service?.title}</h4>
                    <span className="text-[11px] text-slate-400 block">{formatDate(booking.bookingDate)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-white">{formatCurrency(booking.totalAmount)}</span>
                  <Link to={`/customer/invoice/${booking.id}`}>
                    <Button size="sm" variant="outline" leftIcon={<Download size={12} />}>
                      View Invoice
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
