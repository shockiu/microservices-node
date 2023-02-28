import express from 'express';
import bodyParser from 'body-parser';

import { CONFIG } from '../config';


const app = express();
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hola mundo');
})

app.listen(CONFIG.api.port, () => {
    console.log('SERVER LISTEN ON PORT '+ CONFIG.api.port)
})