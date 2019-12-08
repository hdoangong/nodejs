var express=require('express');
var app=express();
var port=3000;

app.set('view engine','pug');
app.set('views','./views');


app.get('/',function(req,res){
    res.render("index");
});
app.get('/users',function(req,res){
    res.render("./users",{
        users:[
        {id: 1,name: 'trang'},
        {id: 2,name: 'Thanh'},
        {id: 3, name:'Tinh'}
        ]
    });

});
app.listen(port,function(){
    console.log('port :'+port);
})