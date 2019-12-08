var express=require('express');
var app=express();
var port=3000;

var low =require('lowdb');
var FileSync=require('lowdb/adapters/FileSync');
var adapter=new FileSync('db.json');
db=low(adapter);
db.defaults({users:[]})
.write();



app.set('view engine','pug');
app.set('views','./views');


app.get('/',function(req,res){
    res.render("index");
});

var a=[
    {id: 1,name: 'trang'},
    {id: 2,name: 'Thanh'},
    {id: 3, name:'Tinh'}
    ];
app.get('/users',function(req,res){
    res.render("./users",{
        users:db.get('users').value()//users
    });
});
app.get('/users/search', function(req,res){
    var q=req.query.q;
    var matchedUsers=db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase())!==-1;// nếu k có trong danh sách thì trả về -1    
    });
    // var matchedUsers=users.filter(function(user){
    //     return user.name.toLowerCase().indexOf(q.toLowerCase())!==-1;// nếu k có trong danh sách thì trả về -1    
    // });
    res.render('./users/index',{
        users:matchedUsers
    })
});

//bai 4:

var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/users/create',function(req,res){
    res.render('./users/create');
});

app.get('/users/:id',function(req,res){
    var id=parseInt( req.params.id);
    var user =db.get('users').find({id: id}).value();
    console.log(user.name);
    res.render('users/view',{
        users:user
        
    })
});

app.post('/users/create',function(req,res){
    // console.log(req.body);
    db.get('users').push(req.body).write();//users.push(req.body);
    res.redirect('/users');// chuyển về trang 
});


app.listen(port,function(){
    console.log('port :'+port);
});