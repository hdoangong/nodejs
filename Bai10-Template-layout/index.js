var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var port=3000;

var useRouter=require('./routers/user.router');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','pug');
app.set('views','./views');

app.get('/',function(req,res){
    res.render('index');
});

app.use('/users', useRouter);

app.listen(port,function(){
    console.log('port :'+port);
})