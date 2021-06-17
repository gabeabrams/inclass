// Import CACCL
const initCACCL = require('caccl/server/react');

// Import file libraries
const fs = require('fs');
const path = require('path');

// Import routes
const addRoutes = require('./server/routes');

// Read app xml
const installXML = fs.readFileSync(
  path.join(__dirname, 'install.xml'),
  'utf-8'
);

// Initialize CACCL
const app = initCACCL({
  expressAppPreprocessor: (expressApp) => {
    expressApp.all('*', (req, res, next) => {
      console.log('Request:');
      console.log(req.hostname, req.path);
      console.log(req.session);
      console.log(req.body || req.query);
      next();
    });
  },
});

// Serve XML
app.get('/config', (req, res) => {
  // Add the correct hostname to the XML
  const customizedInstallXML = installXML.replace(/HOSTNAME/g, req.hostname);

  // Send xml response
  return res
    .set('Content-Type', 'text/xml')
    .send(customizedInstallXML);
});

// Add routes
addRoutes(app);

console.log('New Service Up and Running');
