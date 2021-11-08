import express from 'express';
const founder = express();
import * as controllers from './index';
import * as validation from './validation';

founder.post('/log/verify', controllers.verifyYourEmail);
founder.put('/log/changeEmailStatus', controllers.changeEmailStatus);
founder.put('/log/updateFavouriteList', controllers.updateFavouriteList);
founder.put('/log/changeProfileStatus', controllers.changeProfileStatus);

export default founder;