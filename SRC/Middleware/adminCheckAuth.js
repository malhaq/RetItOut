import jwt from 'jsonwebtoken';

const adminCheckAuth = (req, res,next) => {
  const { authorization } = req.headers;
  if(!authorization){
    return res.json({message:"Hi, Admin you are not  Authenticated User !"});
  }
  const decode = jwt.verify(authorization,LGOINTOKENJABER102);
  req.userId=decode.id;
  next();
};
export default adminCheckAuth;