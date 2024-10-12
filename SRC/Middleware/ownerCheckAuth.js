import jwt from 'jsonwebtoken';

const ownerCheckAuth = (req, res,next) => {
  const { authorization } = req.headers;
  if(!authorization){
    return res.json({message:"Hi, Owner you are not  Authenticated User !"});
  }
  const decode = jwt.verify(authorization,"LGOINTOKENJABER99");
  req.userId=decode.id;
  next();
};
export default ownerCheckAuth;