import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, 'Note title is required'],
        trim: true,
        maxlength: [150, 'Title cannot exceed 150 characters']
    },
    content: {
        type: String,
        default: '',
        trim: true,
        maxlength: [20000, 'Content cannot exceed 20000 characters']
    }
}, {
    timestamps: true,
    collection: 'notes'
});

noteSchema.index({ user: 1, updatedAt: -1 });

const Note = mongoose.model('Note', noteSchema);
export default Note;
