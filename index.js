// Import CACCL
const initCACCL = require('caccl/server/react');

// Import routes
const addRoutes = require('./server/routes');

// Initialize CACCL
const app = initCACCL();

// Add routes
addRoutes(app)
  .catch((err) => {
    /* eslint-disable no-console */
    console.log('An error occurred while attempting to add routes to the server:', err);
    console.log('Now exiting');
    process.exit(0);
  });
