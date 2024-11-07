import RevenueModel from "./../../../../DB/models/Revenues.model.js";
import { RevenueSchema } from "./revenue.validation.js";

export const getRevenues = async (req, res) => {
  try {
    const totalRevenue = await RevenueModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$moneyAmount" },
        },
      },
    ]);
    return res.json({
      message: "Total revenue retrieved successfully",
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error during displaying the platform revenues",
      error: error.stack,
    });
  }
};

export const getCatRevenues = async (req,res)=>{
    try{
        const { categoryName } = req.params;
        const checkCatName = RevenueSchema.validate({categoryName});
        if(checkCatName.error){
            return res.status(400).json(checkCatName.error);
        }
        const categoryRevenue = await RevenueModel.aggregate([
          {
            $match: { categoryName: categoryName }
          },
          {
            $group: {
              _id: '$categoryName',
              totalRevenue: { $sum: '$moneyAmount' }
            }
          }
        ]);
        return res.json({
          message: `Revenue for category ${categoryName} retrieved successfully`,
          categoryName,
          totalRevenue: categoryRevenue[0]?.totalRevenue || 0
        });
    }catch(error){
        return res.json({message:"Error suring get the revenues for certain catrgory", error:error.stack});
    }
};

export const newRevenue = async (req,res)=>{
    try{
      const {categoryName,moneyAmount,ownerId,renterId,productId} = req.body;
      const checkvalidation = RevenueSchema.validate({categoryName});
      if(checkvalidation.error){
        return res.json(checkvalidation.error);
      }
      const createRev = await RevenueModel.create({categoryName,moneyAmount,ownerId,renterId,productId});
      return res.json({message:"Revenue added successfully to the platform",createRev});
    }catch(error){
        return res.json({message:"Error during create a revenue",error:error.stack});
    }
};