import jwt from 'jsonwebtoken';

const checkAuth = (req, res,next) => {
  const { authorization } = req.headers;
  if(!authorization){
    return res.json({message:"Not Authenticated User !"});
  }
  const decode = jwt.verify(authorization,LGOINTOKENJABER99);
  req.userId=decode.id;
  next();
};
export default checkAuth;
