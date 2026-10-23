const mongoose=require('mongoose');



const dbConnect =async()=>{
    await mongoose.connect("mongodb+srv://charchit12cool_db_user:ecPUKhi8xlkmLfwR@namastenode.zlzmo1v.mongodb.net/devTinder")
};

module.exports=dbConnect;

