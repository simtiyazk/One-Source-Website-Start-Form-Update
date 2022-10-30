const zipRegex = /^\d{5}(-\d{4})?(?!-)$/;
const phoneRegex = /^\d{10}(-\d{4})?(?!-)$/;
const numericRegex = /^\d+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateRequiredOnly = (value) => value.length > 0; // Validates input required only
export const validateRequiredQuantity = (value) => value !== 0; // Validates input required only
export const validateEmail = (value) => (value.length > 0 && emailRegex.test(value)); // Validates input email
export const validateNumeric = (value) => (value.length === 10 && numericRegex.test(value)); // Validates input numeric
export const validateZip = (value) => (value.length > 0 && zipRegex.test(value) && value !== '00000'); // Validates input zip
export const validateNPI = (value) => value.length === 10;
export const validatePhone = (value) => (value.length > 0 && phoneRegex.test(value) && value !== '0000000000'); // Validates input zip
export const validateToggleComponent = (info) => {
  let isValid = true;

  // Check if toggle component value is required
  info.isRequired && (isValid = validateRequiredOnly(info.value));

  return isValid;
};

export const validateOnlyNumber = (e) => {
  const key = e.keyCode ? e.keyCode : e.which;
  if ((isNaN(String.fromCharCode(key)) && key !== 8) || key === 32) {
    return false;
  }
};
