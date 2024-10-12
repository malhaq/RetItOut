import connectDB from '../../DB/connection.js'
import AuthRouter from './Auth/auth.router.js';
import InsuranceRouter from './Insurance/insurance.router.js';
import RevenueRouter from './Revenue/revenue.router.js';
import AdminRouter from './AdminProfile/adminprofile.router.js';
import OwnerRouter from './OwnerProfile/ownerprofile.router.js';
import RenterRouter from './RenterProfile/renterprofile.router.js';
import DeliveryRouter from './DeliveryProfile/deliveryprofile.router.js';
import EmailRouter from './EmailNotification/emailnotification.router.js';
import FeedbackRouter from './UserFeedback/userfeedback.router.js';

const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',AuthRouter);
    app.use('/insu',InsuranceRouter);
    app.use('/revenue',RevenueRouter);
    app.use('/admin',AdminRouter);
    app.use('/owner',OwnerRouter);
    app.use('/renter',RenterRouter);
    app.use('/delivery',DeliveryRouter);
    app.use('/email',EmailRouter);
    app.use('/feedback',FeedbackRouter);
    app.use('/*',(req,res)=>{
        return res.json({message:"page not found"});
    })
}
export default initApp;