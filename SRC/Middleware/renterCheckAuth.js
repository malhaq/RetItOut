import jwt from 'jsonwebtoken';

const renterCheckAuth = (req, res,next) => {
  const { authorization } = req.headers;
  if(!authorization){
    return res.json({message:"Hi, Renter you are not  Authenticated User !"});
  }
  const decode = jwt.verify(authorization,"LGOINTOKENJABER100");
  req.userId=decode.id;
  next();
};
export default renterCheckAuth;