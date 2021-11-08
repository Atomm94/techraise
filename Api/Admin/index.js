import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import {comparePassword, hashPassword} from "../../Helpers/hashPassword";
import Admin from "../../Models/Admin";
import {error, userRole} from "../../Helpers/constant";
import {createJwtToken} from "../../Helpers/auth";
import Founder from "../../Models/Founder";
import Investor from "../../Models/Investor";

const register = async (req, res) => {
    try {
        const body = req.body;
        body.password = await hashPassword(body.password);
        res.message = 'Admin is successfully registered!';
        const createAdmin = await Admin.create(body);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const login = async (req, res) => {
    try {
        let tok, sendObj;
        const { email, password } = req.body;
        let findAdmin = await Admin.findOne({email: email});
        if (!findAdmin) {
            error.message = 'Admin with this email is not find!';
            return errorHandler(res, error);
        }
        const compare = await comparePassword(password, findAdmin.password);
        if (!compare) {
            error.message = 'Password is not correct!';
            return errorHandler(res, error);
        }
        tok = {
            id: findAdmin._id,
            role: userRole.ADMIN
        }
        const token = await createJwtToken(tok);

        findAdmin = await Admin.findOne({email: email}, {password: 0});
        sendObj = {
            Data: findAdmin,
            Token: token
        }
        res.message = 'Admin is successfully login!';
        return successHandler(res, sendObj);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const getProfiles = async (req, res) => {
    try {
        let findPerson;
        const { personType } = req.query;
        if (personType === userRole.FOUNDER) {
            findPerson = await Founder.find({profile_verification: false});
        } else {
            findPerson = await Investor.find({profile_verification: false});
        }
        res.message = `all ${personType}s!`;
        return successHandler(res, findPerson);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const getProfile = async (req, res) => {
    try {
        let findProfile;
        const { profileId, personType } = req.query;
        if (personType === userRole.FOUNDER) {
            findProfile = await Founder.findOne({_id: profileId});
        } else {
            findProfile = await Investor.findOne({_id: profileId});
        }
        res.message = `${personType}'s profile!`;
        return successHandler(res, findProfile);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const verifyProfile = async (req, res) => {
    try {
        let findProfile;
        const { profileId, personType } = req.query;
        if (personType === userRole.FOUNDER) {
            findProfile = await Founder.updateOne({_id: profileId}, {
                $set: {profile_verification: true}
            });
        } else {
            findProfile = await Investor.updateOne({_id: profileId}, {
                $set: {profile_verification: true}
            });
        }
        res.message = `${personType}'s profile is verified!`;
        return successHandler(res, findProfile);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    register,
    login,
    getProfiles,
    getProfile,
    verifyProfile
}