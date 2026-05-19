import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import path from 'path';
import session from 'express-session';
import userROutes from './src/modules/users/presentation/routes'
import adminRoutes from './src/modules/admin/presentation/routes'
import {connectDatabase} from './src/modules/infrastructure/database/db'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src','modules'));
export default app;

app.use('/',userROutes);
app.use('/admin',adminRoutes)

const port = Number(process.env.PORT);

async function startServer() {
    await connectDatabase();
    app.listen(port,()=>{
    console.log('http://localhost:3000')
})
}
startServer();