import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pfp: {
        type: String
    }
})

userSchema.statics.signup = async function (username , password, description, pfp) {
    const exists = await this.findOne({username})

    if (exists) {
        throw Error('username already in use');
    }
    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password is not strong enough')
    // }
 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, password: hash, description, pfp})
    return user
} 

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({username})
    
    if (user) {
        const auth = await bcrypt.compare(password, user.password)

        if (auth) {
             return user
        } else {
             throw Error('incorrect password')
        }
    }

   throw Error('incorrect username')
    //error checking modal
}

const model = mongoose.model('User', userSchema)

export default model