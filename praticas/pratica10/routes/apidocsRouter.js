const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Load and parse the swagger document
const swaggerDocumentPath = path.join(__dirname, '../swagger.yaml');
const file = fs.readFileSync(swaggerDocumentPath, 'utf8');
const swaggerDocument = YAML.parse(file);

// Serve Swagger UI
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;
