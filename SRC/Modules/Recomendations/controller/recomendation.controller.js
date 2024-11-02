import testModel from "../../../../DB/models/test.model.js";


export const productWithHighRental = async (req, res) => {
    try {
        const productWithHighRent = await testModel.aggregate([
            {
                $group: {
                    _id: "$productId",
                    rentalCount: { $sum: 1 }
                }
            },{$sort: { rentalCount: -1 }}, { $limit: 1}
        ]);

        if (productWithHighRent.length > 0) {
            return res.status(200).json({
                productId: productWithHighRent[0]._id,
                rentalCount: productWithHighRent[0].rentalCount
            });
        } else {
            return res.status(404).json({ message: "No Products found!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error during show the product with high rent" });
    }
};


export const nProductWithHighRental = async (req,res)=>{
    try {
        const nProduct = parseInt(req.params.n, 10); // take the decimal number
        // validate the product number entered from the user
        if (isNaN(nProduct) || nProduct < 1) {
            return res.status(400).json({ message: "Invalid number, Please make sure that you enter positive numebr!" });
        }
        const nHighProduct = await testModel.aggregate([
            {
                $group: {
                    _id: "$productId",
                    productCount: { $sum: 1 }
                }
            },{ $sort: { productCount: -1 }},{ $skip: nProduct - 1},{ $limit: 1}
        ]);

        if (nHighProduct.length > 0) {
            return res.status(200).json({
                productId: nHighProduct[0]._id,
                productCount: nHighProduct[0].productCount
            });
        } else {
            return res.status(404).json({ message: "No products found!" });
        }
    }catch(error){
        return res.status(500).json({message:"Error during fetch n product with high rental",error:error.stack});
    }
};