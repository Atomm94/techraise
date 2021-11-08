import express from 'express';
const general = express();
import * as controllers from './index';
import * as validation from './validation';
import {
    registerQueryValid,
    registerBodyValid,
    contactInfoBodyValid,
    changeProfileStatusValid
} from './validation';

general.get('/getStartups', controllers.getStartups);
general.get('/getStartup', controllers.getStartup);
general.post('/register', controllers.register);
general.post('/login', controllers.login);

export default general;