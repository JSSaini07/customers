const validateFields = (data = {}) => {
  const fields = Object.keys(data);
  const errors = [];
  fields.map((field) => {
    if(data[field].trim && !data[field].trim().length) {
      errors.push(`Required Field: ${field}`);
    }
  });
  return errors;
}

module.exports = validateFields;
