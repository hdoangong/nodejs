var express=require('express');
var router=express.Router();
var db=require('../db');
var shorid=require('shortid');

router.get('/',function(req,res){
    res.render('./users/index',{
        users:db.get('users').value()//users
    });
});


router.get('/search', function(req,res){
    var q=req.query.q;
    var matchedUsers=db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase())!==-1;// nếu k có trong danh sách thì trả về -1    
    });
    res.render('./users/index',{
        users:matchedUsers
    })
});

router.get('/create',function(req,res){
    res.render('./users/create');
});

router.get('/:id',function(req,res){
    var id=req.params.id;
    var user =db.get('users').find({id: id}).value();
    //console.log(user.name);
    res.render('users/view',{
        users:user
    })
});
router.get('/view',function(req,res){
    //res.render('./users/view');
    db.get('users').push(req.body).write();//users.push(req.body);
    res.redirect('/users');// chuyển về trang 
});

router.post('/create',function(req,res){
    req.body.id=shorid.generate();
    db.get('users').push(req.body).write();//users.push(req.body);
    res.redirect('/users');// chuyển về trang 
});

module.exports=router;