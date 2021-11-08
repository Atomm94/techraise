import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as config from './config';
import route from "./Api/routes";
import {userToken} from "./Helpers/auth";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', 'view')

app.use('/api/user/log', userToken);
app.use('/api', route);


app.listen(port, () => {
    console.log(`Server started with port ${port}`);
})

