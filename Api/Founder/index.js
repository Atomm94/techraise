import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import {changeEmailStatusService, favouritesListService, verifyEmailService} from "../General";
import Founder from "../../Models/Founder";
import {error, profileStatus} from "../../Helpers/constant";


const verifyYourEmail = async (req, res) => {
    return await verifyEmailService(req, res, Founder);
}

const changeEmailStatus = async (req, res) => {
    return await changeEmailStatusService(req, res, Founder);
}

const updateFavouriteList = async (req, res) => {
    return await favouritesListService(req, res, Founder);
}

const changeProfileStatus = async (req, res) => {
    try {
        const findProfile = await Founder.findOne({_id: res.user.data.id});
        if (!findProfile) {
            error.message = 'Founder is not find!';
            return errorHandler(res, error);
        }
        if ('findProfile.privateInfo.profile_status' === profileStatus.PRIVATE) {
            await Founder.updateOne({_id: res.user.data.id}, {
                $set: {
                    'findProfile.privateInfo.profile_status': profileStatus.PUBLIC
                }
            })
        } else {
            await Founder.updateOne({_id: res.user.data.id}, {
                $set: {
                    'findProfile.privateInfo.profile_status': profileStatus.PRIVATE
                }
            })
        }
        res.message = 'Profile status is successfully updated!';
        return successHandler(res, null);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    verifyYourEmail,
    changeEmailStatus,
    updateFavouriteList,
    changeProfileStatus
}