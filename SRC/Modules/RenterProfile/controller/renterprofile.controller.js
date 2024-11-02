import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import Item from "../../Item/controller/itemModel.js";
import { itemNameSchema, renterUpdateSchema } from "./renterprofile.validation.js";

export const updateRenterProfile = async (req,res)=>{
    try{
      const {email,address,phoneNumber,password} = req.body;
      const checkInputData = renterUpdateSchema.validate({email,address,phoneNumber,password},{abortEarly:false});
      if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
      }
      const id = req.userId;
      const renter = await renterUserModel.findByIdAndUpdate(id,{ email, address, phoneNumber, password },{ new: true });
      if(!renter){
        return res.status(404).json({message:"user not found !"});
      }
      return res.status(200).json({message:"your profile updated successfully",renter});
    }catch(error){
        return res.status(500).json({message:"Error during update the renter profile !",error:error.stack});
    }
};

export const destroyRenter = async (req,res)=>{
    try{
        const id = req.userId;
        const destroyRenter = await renterUserModel.findOneAndDelete(id);
        if(!destroyRenter){
           return res.status(400).json({message:"user nor found"});
        }
        return res.status(200).json({message:"your account deleted successfully"});
    }catch(error){
       return res.status(500).json({message:"Error durong destroy renter"});
    }
};

// filters section

export const searchCatProducts = async (req,res)=>{
   try{
    const ItemCategories = await Item.aggregate([ // aggregate method to make group of products based on category
      {
          // first : must check the available products
          $match: { availability: true }
      },
      {
          $group: {
              _id: "$category",
              FilterdItems: {
                  $push: {
                      ItemsName: "$name",
                      ItemsDescription: "$description",
                      ItemsRentalPrice: "$rentalPrice"
                  }
              }
          }
      }
  ]);

  if (ItemCategories.length > 0) {
      return res.status(200).json({ ItemCategories });
  } else {
      return res.status(404).json({ message: "No Items with available!" });
  }
   }catch(error){
     return res.json({message:"Error during the search Cat. produect !",error:error.stack});
   }
};

export const searchProductName = async (req,res)=>{
  try{
    const {itemName} = req.body;
    const validateName = itemNameSchema.validate({itemName});
    if(validateName.error){
      return res.status(400).json(validateName.error);
    }
    // Make the provided name case insensitive
    const checckItem = await Item.find({ name:itemName });
    if (checckItem.length == 0) {
      return res.status(404).json({ message: "Not found any items related to provided item name!" });
    }
    return res.status(200).json(checckItem);
  }catch(error){
    return res.json({message:"Error during the search produect name !",error:error.stack});
  }
};
