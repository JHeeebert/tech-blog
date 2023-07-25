// This is middleware for restricting routes a user is not allowed to visit if not logged in
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    }
    // If the user is logged in, continue with the request to the restricted route
    else {
        next();
    }
};
// Exporting this middleware function for use in server.js
module.exports = withAuth;