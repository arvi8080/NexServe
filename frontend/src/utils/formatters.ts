export const formatCurrency = (amount: number, currencySymbol: string = '₹', currencyCode: string = 'INR'): string => {
  if (currencySymbol === 'रु' || currencyCode === 'NPR') {
    return `रु ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)}`;
  }
  return `${currencySymbol}${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)}`;
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (dateString: string): string => {
  if (!dateString) return '';
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

export const truncateText = (text: string, maxLength: number = 80): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
