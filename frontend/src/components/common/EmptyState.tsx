import React, { ReactNode } from 'react';
import { Sparkles, Calendar, Search, Bell, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionPath?: string;
  onAction?: () => void;
  iconType?: 'calendar' | 'search' | 'bell' | 'heart' | 'sparkles';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Items Found',
  description = 'You are all caught up! Browse our luxury doorstep treatments menu.',
  actionText = 'Book a Service',
  actionPath = '/services',
  onAction,
  iconType = 'calendar',
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'search':
        return <Search className="w-12 h-12 text-[#FF2E7E]" />;
      case 'bell':
        return <Bell className="w-12 h-12 text-[#FF2E7E]" />;
      case 'heart':
        return <Heart className="w-12 h-12 text-[#FF2E7E]" />;
      case 'sparkles':
        return <Sparkles className="w-12 h-12 text-[#FF2E7E]" />;
      case 'calendar':
      default:
        return <Calendar className="w-12 h-12 text-[#FF2E7E]" />;
    }
  };

  return (
    <div className="p-10 md:p-14 text-center rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4 max-w-lg mx-auto my-6">
      <div className="w-20 h-20 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mx-auto shadow-xs">
        {getIcon()}
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-[#111827]">{title}</h3>
        <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed font-normal">{description}</p>
      </div>

      {actionText && (
        <div className="pt-2">
          {actionPath ? (
            <Link to={actionPath}>
              <Button variant="primary" size="md" rightIcon={<ArrowRight size={18} />}>
                {actionText}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="md" onClick={onAction} rightIcon={<ArrowRight size={18} />}>
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
