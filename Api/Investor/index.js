import {changeEmailStatusService, favouritesListService, verifyEmailService} from "../General";
import Investor from "../../Models/Investor";
import {errorHandler} from "../../Helpers/responseFunctions";

const verifyYourEmail = async (req, res) => {
    return await verifyEmailService(req, res, Investor);
}

const changeEmailStatus = async (req, res) => {
    return await changeEmailStatusService(req, res, Investor);
}

const updateFavouriteList = async (req, res) => {
    return await favouritesListService(req, res, Investor);
}

const sendRequest = async (req, res) => {
    try {
        const { startupId } = req.query;
        const { message } = req.body;
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    verifyYourEmail,
    changeEmailStatus,
    updateFavouriteList
}