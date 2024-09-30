const mongoose=require("mongoose");
mongoose.set("strictQuery",true);
async function connectToMongoose(url){
    mongoose.connect(url);
}
module.exports={
    connectToMongoose,
}