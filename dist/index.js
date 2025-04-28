"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authorRoutes_1 = __importDefault(require("./routes/authorRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
const PORT = config_1.default.DB_PORT || 5432;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/authors', authorRoutes_1.default);
app.use('/books', bookRoutes_1.default);
// Health check route
app.get('/', (_req, res) => {
    res.send('Bookstore API is running');
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
