import connectDB from '../../DB/connection.js'
import AuthRouter from './Auth/auth.router.js';

const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',AuthRouter);
    app.use('/*',(req,res)=>{
        return res.json({message:"page not found"});
    })
}
export default initApp;