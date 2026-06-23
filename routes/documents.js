const express = require('express');
const router = express.Router();
const controller = require('../controllers/documentController');

// ============================================================================
// ROUTES
// ============================================================================

// POST /api/documents/upload - Upload a document
router.post('/upload', controller.uploadDocument);

// GET /api/documents - List all documents
router.get('/', controller.listDocuments);

// GET /api/documents/:id - Get single document
router.get('/:id', controller.getDocument);

// DELETE /api/documents/:id - Delete document
router.delete('/:id', controller.deleteDocument);

// GET /api/documents/search - Search documents
router.get('/search', controller.searchDocuments);

// ============================================================================
// EXPORT
// ============================================================================

module.exports = router;