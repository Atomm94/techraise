import {Schema, model} from "mongoose";

const investorSchema = new Schema({
    avatar: String,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    linkedinUrl: String,
    shortBio: String,
    password: {
        type: String,
        required: true
    },
    email_verification: {
        type: Boolean,
        default: false
    },
    profile_verification: {
        type: Boolean,
        default: false
    },
    myFavourites: [{
        type: Schema.Types.ObjectId,
        ref: 'founder'
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'founder'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: Date
})

const Investor = model('investor', investorSchema);

export default Investor;