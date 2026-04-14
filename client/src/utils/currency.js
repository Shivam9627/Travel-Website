const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  const value = Number(amount ?? 0);
  if (Number.isNaN(value)) return '-';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

const parseCurrency = (currencyString) => {
  const numberString = currencyString.replace(/[^0-9.-]+/g, '');
  return parseFloat(numberString);
};

export { formatCurrency, parseCurrency };