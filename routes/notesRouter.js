//import dependencies
import express from 'express';
const router = express.Router();
import Note from '../models/Notes.js';

// Auth middleware. checks if user is authenticated before allowing access to notes routes
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

// GET all notes
router.get('/', isAuthenticated, async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.render('notes/notes', { notes });
});

//GET new note form
router.get('/new', isAuthenticated, (req, res) => {
    res.render('notes/form', { note: null });
});

// GET Edit note form
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    res.render('notes/form', { note });
});

//POST create new note
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content, user: req.user._id });
        await note.save();
        res.redirect('/notes');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating note. Please try again later." });
    }
});

// PUT update existing note
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content }
        );
        res.redirect('/notes');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating note. Please try again later." });
    }
});

// DELETE a note
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.redirect('/notes');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting note. Please try again later." });
    }
});

export default router;