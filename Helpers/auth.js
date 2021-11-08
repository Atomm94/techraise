import express from'express';
import jwt from'jsonwebtoken';
import * as config from '../config';
import {successHandler, errorHandler, errorHandlerAuth} from "./responseFunctions";
import userModel from "../Models/Founder";
import jsonwebtoken from "jsonwebtoken";
import {error, userRole} from "./constant";
import Founder from "../Models/Founder";
const userToken = express();


userToken.use('/', async (req, res, next) => {
    const jwtAuth = req.authorization || req.headers['authorization'];
    jwt.verify(jwtAuth, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) {
            return errorHandler(res, err);
        }
        res.user = await jsonwebtoken.decode(jwtAuth);
        let role = res.user.data.role;

        if (role !== userRole[`${role}`.toUpperCase()]){
            error.message = `${role} is not find!`;
            return errorHandlerAuth(res, error);
        }
        next()
    })
})

const createJwtToken = async (data, expire) => {
    let getToken = await jwt.sign({data: data}, process.env.JWT_SECRET_KEY);
    if (expire) {
        getToken = await jwt.sign({data: data}, process.env.JWT_SECRET_KEY, {
            expiresIn: expire
        });
    }
    return getToken;
}

export {
    userToken,
    createJwtToken
}
