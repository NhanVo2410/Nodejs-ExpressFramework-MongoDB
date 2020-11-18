const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  isSuper: Number,
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' });
      }
    },
  },
  hash_password: {
    type: String,
    required: true,
    minLength: 6,
  },
  // tokens: [{
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }],
  phoneNumber: String,
  event: Array,
}, { timestamps: true });

// userSchema.pre('save', async function (next) {
//   // Hash the password before saving the user model
//   const user = this
//   if (user.isModified('password')) {
//       user.password = await bcrypt.hash(user.password, 8)
//   }
//   next()
// })

// userSchema.methods.generateAuthToken = async function() {
//   // Generate an auth token for the user
//   const user = this
//   const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: '1h' })
//   user.tokens = user.tokens.concat({token})
//   await user.save()
//   return token
// }

// userSchema.statics.findByCredentials = async (username, password) => {
//   // Search for a user by email and password.
//   const user = await User.findOne({ username} )
//   if (!user) {
//       throw new Error({ error: 'Invalid login credentials' })
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password)
//   if (!isPasswordMatch) {
//       throw new Error({ error: 'Invalid login credentials' })
//   }
//   return user
// }
// eslint-disable-next-line func-names
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};
module.exports = mongoose.model('users', userSchema);
