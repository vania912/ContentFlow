const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

// ============================================================================
// IMPORTS
// ============================================================================

const documentRoutes = require('./routes/documents');
const errorHandler = require('./middlewares/errorHandler');

// ============================================================================
// SETUP DIRECTORIES
// ============================================================================

async function setupDirectories() {
    const dirs = [
        path.join(__dirname, 'uploaded-documents'),
        path.join(__dirname, 'data'),
        path.join(__dirname, 'logs'),
    ];

    for (const dir of dirs) {
        try {
            await fs.mkdir(dir, { recursive: true });
        } catch (err) {
            console.error(`Error creating ${dir}:`, err);
        }
    }

    // Create metadata.json if it doesn't exist
    const metadataFile = path.join(__dirname, 'data', 'metadata.json');
    try {
        await fs.access(metadataFile);
    } catch {
        await fs.writeFile(metadataFile, JSON.stringify([], null, 2));
    }
}

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Parse JSON requests
app.use(express.json());

// Serve static files (dashboard)
app.use(express.static('public'));

// ============================================================================
// ROUTES
// ============================================================================

// Serve dashboard at GET /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes
app.use('/api/documents', documentRoutes);

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// ============================================================================
// START SERVER
// ============================================================================

async function startServer() {
    try {
        // Setup directories
        await setupDirectories();

        // Start listening
        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════════╗
║   ContentFlow - Document Manager           ║
╠════════════════════════════════════════════╣
║   🚀 Server running at:                    ║
║   http://localhost:${PORT}                ║
║                                            ║
║   Press Ctrl+C to stop                     ║
╚════════════════════════════════════════════╝
      `);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

// Start the server
startServer();