const redis = require("redis");


const client = redis.createClient({
    url:"redis://localhost:6379"
});


client.on("connect",()=>{
    console.log("Redis connected");
});


client.on("error",(err)=>{
    console.log("Redis Error",err);
});


client.connect();


module.exports = client;