var low =require('lowdb');
var FileSync=require('lowdb/adapters/FileSync');
var adapter=new FileSync('db.json');
db=low(adapter);
//set mặc định cho trường hợp file rỗng
db.defaults({users:[]})
    .write();

module.exports=db;
