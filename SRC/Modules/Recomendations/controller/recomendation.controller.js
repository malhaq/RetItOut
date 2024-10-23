
// here I must import the model database

export const productWithHighRental = async (req,res)=>{
    try{
        // here I must  define
        // const x= await model.find().sort({couter:-1});
        // return x;
    }catch(error){
        return res.status(500).json({message:"Error during display products with high rental"});
    }
}

export const nProductWithHighRental = async (req,res)=>{
    try{
    const Products = parseInt(req.params.limit, 10);
    if (isNaN(Products) || Products <= 0) {
        return res.status(400).json({ message: "Invalid number of products" });
    }
    //const products = await Product.find().sort({ rentalCount: -1 }).limit(Products);
    //    return res.json({ message: "success", products });
    }catch(error){
        return res.status(500).json({message:"Error during fetch n product with high rental",error:error.stack});
    }
}