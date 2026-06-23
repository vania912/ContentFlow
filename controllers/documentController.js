const Document = require('../models/Document');

// ============================================================================
// UPLOAD DOCUMENT
// ============================================================================

async function uploadDocument(req, res) {
    try {
        const { filename, content } = req.body;

        // Validate input
        if (!filename || !content) {
            return res.status(400).json({ error: 'Missing filename or content' });
        }

        if (!filename.endsWith('.txt')) {
            return res.status(400).json({ error: 'Only .txt files allowed' });
        }

        // Save document
        const newDoc = await Document.uploadDocument(filename, content);

        res.status(201).json({
            message: 'File uploaded successfully',
            document: newDoc,
        });

        console.log(`✓ Uploaded: ${filename}`);
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Upload failed' });
    }
}

// ============================================================================
// GET ALL DOCUMENTS
// ============================================================================

async function listDocuments(req, res) {
    try {
        const docs = await Document.getAllDocuments();

        res.json({
            count: docs.length,
            documents: docs,
        });
    } catch (err) {
        console.error('List error:', err);
        res.status(500).json({ error: 'Failed to list documents' });
    }
}

// ============================================================================
// GET SINGLE DOCUMENT
// ============================================================================

async function getDocument(req, res) {
    try {
        const { id } = req.params;
        const doc = await Document.getDocument(id);

        if (!doc) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.json(doc);
    } catch (err) {
        console.error('Get error:', err);
        res.status(500).json({ error: 'Failed to get document' });
    }
}

// ============================================================================
// DELETE DOCUMENT
// ============================================================================

async function deleteDocument(req, res) {
    try {
        const { id } = req.params;
        const doc = await Document.removeDocument(id);

        if (!doc) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.json({
            message: 'Document deleted successfully',
            deletedFile: doc.filename,
        });

        console.log(`✓ Deleted: ${doc.filename}`);
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ error: 'Delete failed' });
    }
}

// ============================================================================
// SEARCH DOCUMENTS
// ============================================================================

async function searchDocuments(req, res) {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ error: 'Missing search query' });
        }

        const results = await Document.searchDocuments(q);

        res.json({
            query: q,
            resultCount: results.length,
            results,
        });
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Search failed' });
    }
}

// ============================================================================
// EXPORT
// ============================================================================

module.exports = {
    uploadDocument,
    listDocuments,
    getDocument,
    deleteDocument,
    searchDocuments,
};