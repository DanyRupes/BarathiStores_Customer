const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddressInput(data) {

    let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.address = !isEmpty(data.address) ? data.address : "";
  
  data.landmark = !isEmpty(data.landmark) ? data.landmark : "";
// Address checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address should not be empty";
  } 
// Landmark checks
  if (Validator.isEmpty(data.landmark)) {
    errors.landmark = "Landmark should not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};