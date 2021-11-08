import express from 'express';
const investor = express();
import * as controllers from './index';
import * as validation from './validation';

investor.post('/log/verify', controllers.verifyYourEmail);
investor.put('/log/changeEmailStatus', controllers.changeEmailStatus);
investor.put('/log/updateFavouriteList', controllers.updateFavouriteList);

export default investor;