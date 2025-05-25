import mongoose from 'mongoose'

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    required: [true, 'Day is required'],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use HH:MM format']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    validate: {
      validator: function(value) {
        return value > this.startTime;
      },
      message: 'End time must be after start time'
    }
  }
});
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Name is required'],
        trim: true
    },
    email:{
         type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    photoUrl:{
        type:String,
    },
    availability: [availabilitySchema],

},{timestamps:true})
export const User = mongoose.model('User',userSchema);