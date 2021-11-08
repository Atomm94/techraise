import Joi from 'joi';
import {userRole} from "../../Helpers/constant";
const validator = require('express-joi-validation').createValidator({})

const register_schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    password: Joi.string().required().min(3).max(15).trim()
})

const login_schema = Joi.object({
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    password: Joi.string().required().min(3).max(15).trim()
})

const get_profile_schema = Joi.object({
    profileId: Joi.string().required(),
    personType: Joi.string().valid(...Object.values(userRole)).required()
})

const get_profiles_schema = Joi.object({
    personType: Joi.string().valid(...Object.values(userRole)).required()
})

const register = validator.body(register_schema);
const login = validator.body(login_schema);
const get_profiles = validator.query(get_profiles_schema);
const get_profile = validator.query(get_profile_schema);


export {
    register,
    login,
    get_profiles,
    get_profile
}