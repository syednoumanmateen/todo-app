const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  password: {
    required: true,
    type: String
  },
  bio: {
    type: String
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Upload",
    default: null
  },
  isPublicProfile: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  resetToken: {
    type: String,
    default: uuidv4,
    unique: true
  },
  resetTokenExpiry: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  collection: "user"
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next();
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.$set && update.$set.password && this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.$set.password, salt);
      update.$set.password = hashedPassword;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next();
  }
});



module.exports = mongoose.model("User", userSchema)
