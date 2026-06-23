const fs = require('fs').promises;
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploaded-documents');
const METADATA_FILE = path.join(__dirname, '..', 'data', 'metadata.json');

// ============================================================================
// READ METADATA
// ============================================================================

async function readMetadata() {
    try {
        const data = await fs.readFile(METADATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// ============================================================================
// WRITE METADATA
// ============================================================================

async function writeMetadata(docs) {
    await fs.writeFile(METADATA_FILE, JSON.stringify(docs, null, 2));
}

// ============================================================================
// SAVE FILE
// ============================================================================

async function saveFile(filename, content) {
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.writeFile(filePath, content, 'utf8');
}

// ============================================================================
// READ FILE
// ============================================================================

async function readFile(filename) {
    const filePath = path.join(UPLOAD_DIR, filename);
    return await fs.readFile(filePath, 'utf8');
}

// ============================================================================
// DELETE FILE
// ============================================================================

async function deleteFile(filename) {
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.unlink(filePath);
}

// ============================================================================
// UPLOAD DOCUMENT
// ============================================================================

async function uploadDocument(filename, content) {
    // Save file to disk
    await saveFile(filename, content);

    // Get current metadata
    const docs = await readMetadata();

    // Create new document
    const newDoc = {
        id: Date.now().toString(),
        filename,
        uploadedAt: new Date().toISOString(),
        size: content.length,
        wordCount: content.split(/\s+/).filter(w => w.length > 0).length,
        lineCount: content.split('\n').length,
    };

    // Add to list
    docs.push(newDoc);

    // Save metadata
    await writeMetadata(docs);

    return newDoc;
}

// ============================================================================
// GET ALL DOCUMENTS
// ============================================================================

async function getAllDocuments() {
    return await readMetadata();
}

// ============================================================================
// GET SINGLE DOCUMENT
// ============================================================================

async function getDocument(id) {
    const docs = await readMetadata();
    const doc = docs.find(d => d.id === id);

    if (!doc) return null;

    const content = await readFile(doc.filename);
    return { metadata: doc, content };
}

// ============================================================================
// DELETE DOCUMENT
// ============================================================================

async function removeDocument(id) {
    const docs = await readMetadata();
    const doc = docs.find(d => d.id === id);

    if (!doc) return null;

    // Delete file from disk
    await deleteFile(doc.filename);

    // Remove from metadata
    const updated = docs.filter(d => d.id !== id);
    await writeMetadata(updated);

    return doc;
}

// ============================================================================
// SEARCH DOCUMENTS
// ============================================================================

async function searchDocuments(query) {
    const lowerQuery = query.toLowerCase();
    const docs = await readMetadata();
    const results = [];

    for (const doc of docs) {
        // Search filename
        if (doc.filename.toLowerCase().includes(lowerQuery)) {
            results.push({ ...doc, matchType: 'filename' });
            continue;
        }

        // Search content
        try {
            const content = await readFile(doc.filename);
            if (content.toLowerCase().includes(lowerQuery)) {
                results.push({ ...doc, matchType: 'content' });
            }
        } catch {
            // File missing, skip
        }
    }

    return results;
}

// ============================================================================
// EXPORT
// ============================================================================

module.exports = {
    uploadDocument,
    getAllDocuments,
    getDocument,
    removeDocument,
    searchDocuments,
};