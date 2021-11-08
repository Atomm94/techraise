import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import {error, userRole} from "../../Helpers/constant";
import Founder from "../../Models/Founder";
import Investor from "../../Models/Investor";
import {comparePassword, hashPassword} from "../../Helpers/hashPassword";
import {createJwtToken} from "../../Helpers/auth";
import {capitalize} from "../../Helpers/helpFunctions";
import send from "../../Helpers/email";

const register = async (req, res) => {
    try {
        let model, createObj, findPerson;
        const { role } = req.query;
        let body = req.body;
        if (role === userRole.FOUNDER) {
            model = Founder;
            findPerson = await Investor.findOne({email: body.email});
            if (findPerson) {
                error.message = 'This email is already used!';
                return errorHandler(res, error);
            }
            createObj = {'privateInfo.contact_email': body.email, password: body.password}
        }
         else {
            model = Investor;
            findPerson = await Founder.findOne({email: body.email});
            if (findPerson) {
                error.message = 'This email is already used!';
                return errorHandler(res, error);
            }
            createObj = {email: body.email, password: body.password}
        }
        createObj.password = await hashPassword(body.password);
        const newPerson = await model.create(createObj);
        res.message = `New ${role} is successfully registered!`;
        return successHandler(res, newPerson);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const login = async (req, res, model) => {
    try {
        let tok, sendObj, role = userRole.FOUNDER;
        const { email, Password } = req.body;
        let findPerson = await Founder.findOne({'privateInfo.contact_email': email});
        if (!findPerson) {
            role = userRole.INVESTOR;
            findPerson = await Investor.findOne({email: email});
            if (!findPerson) {
                error.message = 'User with this email is not find!';
                return errorHandler(res, error);
            }
        }
        const compare = await comparePassword(Password, findPerson.password);
        if (!compare) {
            error.message = 'Password is not correct!';
            return errorHandler(res, error);
        }
        if (role === userRole.FOUNDER) {
            res.message = `${role} is successfully login!`;
            findPerson = await Founder.findOne({'privateInfo.contact_email': email}, {password: 0})
        } else {
            res.message = `${role} is successfully login!`;
            findPerson = await Investor.findOne({email: email}, {password: 0})
        }

        tok = {
            id: findPerson._id,
            role: role
        }
        const token = await createJwtToken(tok);
        sendObj = {
            Data: findPerson,
            Token: token
        }

        return successHandler(res, sendObj);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const getStartups = async (req, res) => {
    try {
        const {limit, page} = req.query;
        const findFounders = await Founder.find({profile_verification: true})
            .select({password: 0})
            .limit(Number(limit))
            .skip(Number(limit) * (Number(page) - 1))
            .sort( {createdAt: -1});
        return successHandler(res, findFounders);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const getStartup = async (req, res) => {
    try {
        const { founderId } = req.query;
        const getFounder = await Founder.findOne({_id: founderId, profile_verification: true}, {password: 0});
        res.message = 'Founder is successfully goted!';
        return successHandler(res, getFounder);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const verifyEmailService = async (req, res, model) => {
    try {
        const { email } = req.body;
        let findPerson, user_firstname;
        if (model.modelName === userRole.FOUNDER) {
            findPerson = await model.findOne({'privateInfo.contact_email': email});
            user_firstname = findPerson.privateInfo.contact_name || 'User'
        } else {
            findPerson = await model.findOne({email: email});
            user_firstname = findPerson.firstName || 'User'
        }

        if (!findPerson) {
            error.message = model.modelName +  " with this email is not find!";
            return errorHandler(res, error);
        }
        let tok = {
            id: findPerson._id,
            role: userRole[model.modelName]
        };
        const token = await createJwtToken(tok, 60 * 5)
        let fullUrl = `${req.protocol}://${req.get('host')}/api/general/next?tok=${token}`

        const sendEmail = await send(email, 'Verify you email', null, {user_firstname: user_firstname, confirm_link: fullUrl})
        res.message = `${model.modelName}'s email confirm link is successfully sent!`;
        return successHandler(res, null);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const changeEmailStatusService = async (req, res, model) => {
    try {
        const findPerson = await model.updateOne({_id: res.user.data.id}, {
            $set: {email_verification: true}
        });
        res.message = `${model.modelName}'s email is verified!`;
        return successHandler(res, null)
    } catch (err) {
        return errorHandler(res, err);
    }
}

const favouritesListService = async (req, res, model) => {
    try {
        let updateList;
        const { favouriteId } = req.query;
        const findFavouritesList = await model.findOne({_id: favouriteId}).select('myFavourites');
        if (findFavouritesList.includes(favouriteId)) {
            updateList = model.updateOne({_id: favouriteId}, {
                $push: {myFavourites: favouriteId}
            })
        } else {
            updateList = model.updateOne({_id: favouriteId}, {
                $pull: {myFavourites: favouriteId}
            })
        }
        res.message = 'In this profile is successfully updated favourites list!';
        return successHandler(res, null);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    register,
    login,
    getStartups,
    getStartup,
    verifyEmailService,
    changeEmailStatusService,
    favouritesListService
}