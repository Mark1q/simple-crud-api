const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

/**
 * @type {mongoose.Schema}
 */
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    return validator.isEmail(v);
                },
                message: "Enter valid email"
            }
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password should be at least 8 characters long"],
            validate: {
                validator: function(v) {
                    return validator.isStrongPassword(v);
                },
                message: "Enter a stronger password"
            }
        }
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

module.exports = mongoose.model("User", UserSchema);