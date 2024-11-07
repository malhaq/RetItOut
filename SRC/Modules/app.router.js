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
import AQRouter from './A&QOrComments/AQ.router.js';
import RecomendationRouter from './Recomendations/recomendation.router.js';
import ItemRouter from './Item/item.router.js';
import Verification from './Verification/verification.router.js';
import Rating from './trust&safety/TS.router.js';


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
    app.use('/AQ',AQRouter);
    app.use('recom',RecomendationRouter);
    app.use('/items', ItemRouter);
    app.use('/verification',Verification);
    app.use('/rate',Rating);
    app.use('/*',(req,res)=>{
        return res.json({message:"page not found"});
    })
}
export default initApp;