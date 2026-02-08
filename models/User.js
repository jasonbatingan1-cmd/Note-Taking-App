import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },       // base64 hash
    passwordSalt: { type: String, required: true },    // base64 salt
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

export default User;