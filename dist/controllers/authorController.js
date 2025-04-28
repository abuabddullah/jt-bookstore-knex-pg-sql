"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAuthors = getAllAuthors;
exports.getAuthorById = getAuthorById;
exports.createAuthor = createAuthor;
exports.updateAuthor = updateAuthor;
exports.deleteAuthor = deleteAuthor;
const authorService = __importStar(require("../services/authorService"));
async function getAllAuthors(req, res) {
    try {
        const authors = await authorService.getAllAuthors();
        res.json(authors);
    }
    catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({ error: 'Failed to fetch authors' });
    }
}
async function getAuthorById(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid author ID' });
        }
        const author = await authorService.getAuthorById(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json(author);
    }
    catch (error) {
        console.error('Error fetching author:', error);
        res.status(500).json({ error: 'Failed to fetch author' });
    }
}
async function createAuthor(req, res) {
    try {
        const newAuthor = await authorService.createAuthor(req.body);
        res.status(201).json(newAuthor);
    }
    catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ error: 'Failed to create author' });
    }
}
async function updateAuthor(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid author ID' });
        }
        const updatedAuthor = await authorService.updateAuthor(id, req.body);
        if (!updatedAuthor) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json(updatedAuthor);
    }
    catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ error: 'Failed to update author' });
    }
}
async function deleteAuthor(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid author ID' });
        }
        const deleted = await authorService.deleteAuthor(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.status(204).json({ message: 'Author deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Failed to delete author' });
    }
}
