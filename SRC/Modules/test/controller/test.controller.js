import testModel from "../../../../DB/models/test.model.js";

export const create = async (req,res)=>{
    const {ownerId,renterId,productId} = req.body;
    const test = testModel.create({ownerId,renterId,productId});
    if(test){
        return res.json({message:"success create test"});
    }
}