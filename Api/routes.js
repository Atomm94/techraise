import { Router } from 'express';
import general from "./General/router";
import admin from "./Admin/router";
import founder from "./Founder/router";
import investor from "./Investor/router";
const route = Router();

route.use('/admin', admin);
route.use('/general', general);
route.use('/founder', founder);
route.use('/investor', investor);

export default route;