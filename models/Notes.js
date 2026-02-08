import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        user: { // reference to the User model for ownership enforcement
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true // adds createdAt + updatedAt automatically
    }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
