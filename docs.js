const fs = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.config.json');
const swaggerDocs = swaggerJsDoc(swaggerOptions);

fs.writeFile('static-docs.json', JSON.stringify(swaggerDocs), function(err) {
  if (err) throw err;
  console.log('complete');
},
);
