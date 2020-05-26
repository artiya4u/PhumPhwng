exports.handleShow = function (request, h) {
  // TODO get user information from database.
  return request.auth.credentials.firebase;
};
