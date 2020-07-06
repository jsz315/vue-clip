var fs = require('fs')
var path = require('path')
var fname = path.resolve(__dirname, "./public/man.jpg");
console.log(fname);
fs.unlink(fname, (error)=>{
    if(error){
        console.log(error);
        console.log("delete fail");
    }
    else{
        console.log("delete success");
    }
});
