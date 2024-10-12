import jwt from 'jsonwebtoken';

const deliveryCheckAuth = (req, res,next) => {
  const { authorization } = req.headers;
  if(!authorization){
    return res.json({message:"Hi, Delivery you are not  Authenticated User !"});
  }
  const decode = jwt.verify(authorization,"LGOINTOKENJABER101");
  req.userId=decode.id;
  next();
};
export default deliveryCheckAuth;