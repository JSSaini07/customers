const logger = {
  info: (message = "") => {
    message = `--- ${getDateTime()} ${message} ---`
    console.log('\x1b[37m', message);
  },
  error: (message = "") => {
    message = `--- ${getDateTime()} ${message} ---`
    console.log('\x1b[31m', message);
  },
  success: (message = "") => {
    message = `--- ${getDateTime()} ${message} ---`
    console.log('\x1b[32m', message);
  }
}

const getDateTime = () => {
  const now = new Date();
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return now.toLocaleTimeString("en-US", dateOptions);
}

module.exports = logger;
