import OwnerReviwsCommentsModel from "../../../../DB/models/OwnerReviwsComments.model.js";
import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import RentersCommentsModel from "../../../../DB/models/RentersComments.model.js";

export const addComment = async (req,res)=>{
  try{
    const {ownerEmail,productId,comment,isQuestion} = req.body;
    const renterId = req.userId;
    const owner = await ownerUserModel.findOne({email:ownerEmail});
    if(!owner){
        return res.json({message:"owner not found"});
    }
    const ownerId = owner._id;
    const newcomment = await RentersCommentsModel.create({renterId,ownerId,productId,comment,isQuestion});
    if(!newcomment){
        return res.json({message:"new Comment not created !"});
    }
    if(isQuestion==='true'){
        return res.json({message:"Your question sent successfully !"});
    }
    return res.json({message:"Your Comment sent successfully"});
  }catch(error){
    return res.json({message:"Error During sending the comment",error:error.stack});
  }
};

export const AnswerQuestion = async (req,res)=>{
  try{
    const {productId,answer} = req.body;
    const ownerId = req.userId;
    const fromComment = await RentersCommentsModel.findOne({ productId, ownerId, isQuestion: true });
    if(!fromComment){
        return res.json({message:"The question not found"});
    }
    const renterId = fromComment.renterId;
    const Answer = await OwnerReviwsCommentsModel.create({ownerId,renterId,productId,answer});
    if(!Answer){
        return res.json({message:"Problem occure while send the answer"});
    }
    return res.json({message:"The answer sent successfully"});
  }catch(error){
    return res.json({message:"Error during sending the ansewr for the question",error:error.stack});
  }
};

export const renterViewResposes = async (req,res)=>{
   try{
    const renterId = req.userId;
    const responses = await OwnerReviwsCommentsModel.find({renterId});
    if(!responses){
      return res.json({message:"No responses"});
    }
    return res.json({message:"This is all your responses",fetchData:responses});
   }catch(error){
    return res.json({message:"Error during viewing the responses"});
   }
};

export const ownerViewQuestions = async(req,res) =>{
    try{
     const id = req.userId;
     const myquestions = await RentersCommentsModel.find({ownerId:id,isQuestion: true});
     if(!myquestions){
        return res.json({message:"No questions availables now"});
     }
     return res.json({message:"youe question fetched successfully", fetchedQuestion:myquestions});
    }catch(error){
     return res.json({message:"Error during viewing the answers"});
    }
};