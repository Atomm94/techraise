import express from 'express';
const admin = express();
import * as controllers from './index';
import * as validation from './validation';

admin.get('/log/getProfiles', validation.get_profiles, controllers.getProfiles);
admin.get('/log/getProfile', validation.get_profile, controllers.getProfile);
admin.post('/register', validation.register, controllers.register);
admin.post('/login', validation.login, controllers.login);
admin.put('/log/verifyProfile', controllers.verifyProfile);

export default admin;