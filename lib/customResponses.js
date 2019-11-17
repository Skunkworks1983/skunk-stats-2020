// incorrect registration code
exports.registrationCodeError = (res) => {
  console.log('Incorrect registration code.');
  res.statusMessage = 'Incorrect registration code!';
  res.writeHead(403, {
    'Content-Type': 'text/plain'
  }).end()
}
// already have an account
exports.duplicateRegistration = (res) => {
  console.log('This account already exists.');
  res.statusMessage = 'Duplicate registration.';
  res.writeHead(409, {
    'Content-Type': 'text/plain'
  }).end()
}
// Unknown error with registration
exports.registrationError = (res) => {
  console.log('Error with registration.');
  res.statusMessage = 'Error with registration';
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  }).end()
}
// successful registration
exports.registrationSuccess = (res) => {
  res.statusMessage = 'Success!';
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  }).end()
}
// TBA request error
exports.TBAerror = (res) => {
  console.log('TBA request error');
}

// module.exports = customResponses;