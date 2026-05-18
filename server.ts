

import express from 'express'
import path from 'path';
import userROutes from './src/modules/users/routes'

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src','modules'));
export default app;

app.use('/',userROutes);
const port = 3000;

app.listen(port,()=>{
    console.log('http://localhost:3000')
})