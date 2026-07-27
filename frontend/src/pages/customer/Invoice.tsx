import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { invoiceApi } from '@/api/invoice';
import { Invoice as InvoiceType } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Printer, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';

export const Invoice: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [invoice, setInvoice] = useState<InvoiceType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      invoiceApi
        .getInvoiceByBookingId(bookingId)
        .then((data) => setInvoice(data))
        .finally(() => setIsLoading(false));
    }
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <Loader message="Generating formal digital invoice..." />;
  if (!invoice) return <div className="text-center py-20 text-slate-500 font-bold">Invoice not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 bg-[#FFFDFE] text-[#111827] pb-16">
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827]">Official GST Digital Invoice</h1>
          <p className="text-xs text-[#64748B]">Doorstep Treatment Session • Tax Compliant Receipt</p>
        </div>
        <Button variant="primary" size="sm" onClick={handlePrint} leftIcon={<Printer size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
          Download PDF / Print
        </Button>
      </div>

      <div className="p-10 bg-white border border-[#ECECEC] shadow-2xl rounded-[32px] space-y-8 print:border-none print:shadow-none">
        {/* Header Logo & Brand */}
        <div className="flex justify-between items-start border-b border-[#ECECEC] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF2E7E] to-[#FF5CA8] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#111827] block">NexServe Technologies</span>
              <span className="text-[11px] text-[#64748B] font-semibold">GSTIN: 29AAACN1234F1Z9 • Luxury Doorstep Beauty</span>
            </div>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold block mb-1">
              PAID RECEIPT
            </span>
            <span className="text-xs font-mono font-bold text-[#64748B]">{invoice.invoiceNumber}</span>
          </div>
        </div>

        {/* Invoice Customer & Issued Metadata */}
        <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-700">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block">Billed To Customer</span>
            <p className="font-extrabold text-base text-[#111827] mt-1">Aarav Sharma</p>
            <p className="text-[#64748B]">77 10th Main, 4th Block, Koramangala, Bengaluru</p>
          </div>
          <div className="text-right">
            <span className="text-slate-400 font-bold uppercase tracking-wider block">Date of Issue</span>
            <p className="font-extrabold text-base text-[#111827] mt-1">{formatDate(invoice.issueDate)}</p>
            <span className="text-emerald-600 font-bold block mt-1">✓ 100% Single-Use Kit Included</span>
          </div>
        </div>

        {/* Bill Items Table */}
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-[#111827] font-bold uppercase border-y border-[#ECECEC]">
            <tr>
              <th className="p-4">Itemized Description</th>
              <th className="p-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECECEC] text-slate-700 font-medium">
            <tr>
              <td className="p-4 font-bold text-[#111827]">{invoice.details || 'Diamond Hydra-Glow Facial Session'}</td>
              <td className="p-4 text-right font-extrabold text-[#111827]">{formatCurrency(invoice.subtotal)}</td>
            </tr>
            <tr>
              <td className="p-4">Sealed Mono-Dose Product Kit & Disposables</td>
              <td className="p-4 text-right font-bold text-emerald-600">FREE</td>
            </tr>
            <tr>
              <td className="p-4">Integrated GST (18%)</td>
              <td className="p-4 text-right font-bold text-[#111827]">{formatCurrency(invoice.tax)}</td>
            </tr>
          </tbody>
        </table>

        {/* Total & Guarantee Seal */}
        <div className="pt-4 border-t border-[#ECECEC] flex flex-col sm:flex-row items-center justify-between gap-4 font-bold text-sm">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
            <span>5-Stage Verified Partner Doorstep Delivery</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#64748B] block font-medium">Grand Total Paid</span>
            <span className="text-3xl font-extrabold text-[#FF2E7E]">{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
