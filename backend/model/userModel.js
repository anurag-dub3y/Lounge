const mongoose = require('mongoose');
const validator = require("validator");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
       validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password:{
        type:String,
        required:true,
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    blogs:[{type:mongoose.Schema.Types.ObjectId, ref : "posts"} ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

userSchema.pre("save", async function (next) {
    // Using async function instead of arrow func since we need to use this inside it
        
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
// This will generate token and it will be used to log in a user once they are registered.
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
      expiresIn: Date.now()+1000*60*60*24*30,
    });
  // sign method creates a token
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 60 * 60 * 1000;   // user will have 60 minutes to update pswd
  return resetToken;
};

module.exports = mongoose.model("User",userSchema)
