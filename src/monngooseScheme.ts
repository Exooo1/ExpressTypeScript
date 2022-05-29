import mongoose from 'mongoose'

const userScheme = new mongoose.Schema({
    name: String,
    age: Number,
    country: String,
    friends: [String]
})

export const user = mongoose.model('user', userScheme)
