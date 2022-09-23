import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    maxlength: 100,
    required: true
  },
  authenticated: {
    type: Boolean,
  }
}, {
  timestamps: true,
  versionKey: false
})

export const User = mongoose.model('User', userSchema)