var production = false;
exports.path = (production) ? '73.109.240.48:1983' : '127.0.0.1:1983';

// incorrect registration code
exports.registrationCodeError = res => {
  console.log('Incorrect registration code.');
  res.status(403).send('Incorrect registration code!');
}
// already have an account
exports.duplicateRegistration = res => {
  console.log('This account already exists.');
  res.status(409).send('Duplicate Registration.');
}
// Unknown error with registration
exports.registrationError = res => {
  console.log('Error with registration.');
  res.status(500).send('Error with registration.');
}
// successful registration
exports.registrationSuccess = res => {
  res.status(201).send('Success!')
}
exports.errorUnspecified = res => {
  res.status(500).send('Internal server error.');
}
// login username does not exist
exports.loginNotFound = res => {
  res.status(404).send('User does not exist.');
}
// login password does not match
exports.loginPasswordError = res => {
  res.status(401).send('Password is incorrect.');
}
exports.loginSuccess = (res, token, user) => {
  res.status(200).json({
    msg: 'Success!',
    token,
    user
  });
}
// generic success
exports.success = res => {
  res.status(200).end();
}
exports.notFound = res => {
  res.status(404).send('Not Found');
}
// DB error
exports.dbDuplicate = res => {
  res.status(304).send('Duplicate entry');
}
exports.noEntryFound = res => {
  res.status(204).send('No data found')
}
// TBA request error
exports.TBAerror = (res, errorCode, errorStatus) => {
  console.log('TBA request error');
  res.status(errorCode).send(errorStatus);
}
// Invalid headers
exports.invalidHeaders = res => {
  res.status(401).send('Invalid Headers')
}
// Invalid auth
exports.invalidAuth = res => {
  res.status(401).send('Invalid Authentication');
}
// Server error
exports.serverError = res => {
  res.status(500).end()
}