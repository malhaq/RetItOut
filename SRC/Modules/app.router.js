import connectDB from '../../DB/connection.js'
import AuthRouter from './Auth/auth.router.js';
import InsuranceRouter from './Insurance/insurance.router.js';
import RevenueRouter from './Revenue/revenue.router.js'

const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',AuthRouter);
    app.use('/insu',InsuranceRouter);
    app.use('/revenue',RevenueRouter);
    app.use('/*',(req,res)=>{
        return res.json({message:"page not found"});
    })
}
export default initApp;