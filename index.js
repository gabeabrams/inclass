// Import CACCL
const initCACCL = require('caccl/server/react');

// Import routes
const addRoutes = require('./server/routes');

// Initialize CACCL
const app = initCACCL();

// Add routes
addRoutes(app);
