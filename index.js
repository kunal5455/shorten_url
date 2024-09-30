const express=require("express");
const urlRoute=require("./routes/url");
const {connectToMongoose}=require("./connect");
const URL=require('./models/url');
const app=express();
const port=3000;

connectToMongoose('mongodb://localhost:27017/short-url')
.then(()=>console.log(`MongoDB connected`))
.catch((err)=>console.log(`error :${err}`));

app.use(express.json());

app.use("/url",urlRoute);
app.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitedHistory:{
            timestamp:Date.now(),
        },
    },});
    res.redirect(entry.redirectURL);
});
app.use("/analytics/:shortId",urlRoute);
app.listen(port,()=>console.log(`Server running on port ${port}`));