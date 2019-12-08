var express=require('express');
var app=express();
var port=3000;

app.set('view engine','pug');
app.set('views','./views');


app.get('/',function(req,res){
    res.render("index");
});

var users=[
    {id: 1,name: 'trang'},
    {id: 2,name: 'Thanh'},
    {id: 3, name:'Tinh'}
    ];
app.get('/users',function(req,res){
    res.render("./users",{
        users:users
    });
});

app.get('/users/search', function(req,res){
    var q=req.query.q;
    var matchedUsers=users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase())!==-1;// nếu k có trong danh sách thì trả về -1    
    });
    res.render('./users/index',{
        users:matchedUsers
    })
});
app.listen(port,function(){
    console.log('port :'+port);
})