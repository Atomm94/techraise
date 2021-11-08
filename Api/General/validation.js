import Joi from 'joi';
import {profileStatus, userRole} from "../../Helpers/constant";
const validator = require('express-joi-validation').createValidator({})

const registerBody = Joi.object({
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    password: Joi.string().required().min(3).max(15).trim()
})

const registerQuery = Joi.object({
    role: Joi.string().valid(...Object.values(userRole)).required()
})

const contactInfoBody = Joi.object({
    contact_name: Joi.string().required(),
    startup_name: Joi.string().required(),
    website: Joi.string().required(),
    files: Joi.array().items(Joi.string())
})

const changeProfileStatusQuery = Joi.object({
    profile_status: Joi.string().valid(...Object.values(profileStatus))
})

const registerBodyValid = validator.body(registerBody);
const registerQueryValid = validator.query(registerQuery);

const contactInfoBodyValid = validator.body(contactInfoBody);
const changeProfileStatusValid = validator.query(changeProfileStatusQuery);

export {
    registerBodyValid,
    registerQueryValid,
    contactInfoBodyValid,
    changeProfileStatusValid
}