import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF2E7E]/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:scale-[1.02]';

  const variants = {
    primary: 'gradient-btn',
    secondary: 'h-[52px] px-6 bg-white hover:bg-slate-50 text-[#111827] border border-[#ECECEC] shadow-xs',
    outline: 'h-[52px] px-6 border border-pink-200 hover:border-[#FF2E7E] hover:bg-pink-50 text-slate-800 hover:text-[#FF2E7E]',
    ghost: 'h-[52px] px-4 hover:bg-pink-50 text-slate-700 hover:text-[#FF2E7E]',
    danger: 'h-[52px] px-6 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white shadow-md shadow-rose-500/20',
  };

  const sizes = {
    sm: 'h-10 px-4 text-xs gap-2',
    md: 'h-[52px] px-6 text-sm gap-2.5',
    lg: 'h-[58px] px-8 text-base gap-3',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
