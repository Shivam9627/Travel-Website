export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateRequiredField = (value) => {
  return value.trim() !== '';
};

export const validateDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString) && !isNaN(new Date(dateString).getTime());
};

export const validateBookingDetails = (details) => {
  return (
    validateRequiredField(details.name) &&
    validateRequiredField(details.email) &&
    validateEmail(details.email) &&
    validateRequiredField(details.date) &&
    validateDate(details.date)
  );
};