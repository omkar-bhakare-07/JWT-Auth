import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    // Sparse unique index allows multiple users to omit this optional field.
    phoneNumber: { type: String, unique: true, sparse: true, trim: true },
    password: { type: String, required: true, select: false }
}, {
    timestamps: true,
    collection: 'users'
});

const User = mongoose.model('User', userSchema);
export default User;
