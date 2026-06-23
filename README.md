# 📄 ContentFlow - Smart Document Manager

A professional Node.js application demonstrating core web development concepts through a document management system.

## ✨ Features

- 📤 **Document Upload** — Upload `.txt` files with automatic metadata generation
- 📚 **Document Management** — View, search, and delete documents via REST API
- 🔍 **Smart Search** — Search by filename or content keywords
- 📊 **Analytics** — Auto-calculates word count, line count, and file size
- 🎨 **Beautiful Dashboard** — Responsive web UI for easy management
- ⚡ **Async Operations** — Non-blocking file I/O using Node.js fs module

## 🏗️ Professional Architecture

This separates concerns and makes the code scalable.

## 🚀 Quick Start

### Installation
```bash
git clone https://github.com/vania912/ContentFlow.git
cd ContentFlow
npm install
```

### Run Server
```bash
npm start
```

Visit: **http://localhost:3000**

## 📚 What This Demonstrates

### ✅ HTTP Module & REST API
- Express.js routing
- GET, POST, DELETE methods
- JSON request/response handling
- Proper HTTP status codes

### ✅ File System (FS) Module
- Asynchronous file read/write
- Non-blocking I/O operations
- File deletion
- Error handling

### ✅ Node.js Event Loop
- Async/await patterns
- Why Node.js can handle concurrent requests
- When callbacks execute
- Understanding non-blocking operations

## 🔌 API Endpoints

### Upload Document
```bash
POST /api/documents/upload
Content-Type: application/json

{
  "filename": "document.txt",
  "content": "Your text here..."
}
```

### List All Documents
```bash
GET /api/documents
```

### Get Single Document
```bash
GET /api/documents/:id
```

### Delete Document
```bash
DELETE /api/documents/:id
```

### Search Documents
```bash
GET /api/documents/search?q=keyword
```

## 💡 Key Learning Points

1. **Separation of Concerns** — Each file has a single responsibility
2. **Async/Await** — Modern JavaScript async patterns
3. **Error Handling** — Proper error responses
4. **REST API Design** — Professional API structure
5. **File Operations** — Real-world file management

## 🎓 Portfolio Value

This project shows:
- ✅ Understanding of Node.js fundamentals
- ✅ Professional code organization
- ✅ Full-stack capability (backend + frontend)
- ✅ Production-ready practices
- ✅ Clean, maintainable code

## 📈 Future Enhancements

- [ ] Database integration (MongoDB)
- [ ] User authentication
- [ ] File versioning
- [ ] Claude API integration for summaries
- [ ] Docker containerization
- [ ] Unit tests

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Storage**: File system + JSON metadata
- **Tools**: nodemon (auto-restart)

## 📝 License

MIT License - feel free to use and modify!

## 👨‍💻 Author

**Vania** — AI Specialist | Building scalable Node.js applications

---

**Star ⭐ this repo if you found it helpful!**
