var db=require('../db');
var shorid=require('shortid');
module.exports={
    index: function(req,res){
        res.render('./users/index',{
            users:db.get('users').value()//users
        })},
    search: function(req,res){
            var q=req.query.q;
            var matchedUsers=db.get('users').value().filter(function(user){
                return user.name.toLowerCase().indexOf(q.toLowerCase())!==-1;// nếu k có trong danh sách thì trả về -1    
            });
            res.render('./users/index',{
                users:matchedUsers
            })},
    create: function(req,res){
        res.render('./users/create');},
    get:function(req,res){
        var id=req.params.id;
        var user =db.get('users').find({id: id}).value();
        //console.log(user.name);
        res.render('users/view',{
            users:user
        })},
    postCreate: function(req,res){
        req.body.id=shorid.generate();
        // kiểm tra khôn cho nhập tên và sdt rỗng
        var err=[];
        if(!req.body.name){
            err.push('chưa nhập name');
        }
        if(!req.body.phone){
            err.push('chưa nhập phone');
        }
        if(err.length){
            res.render('users/create',{
                errors:err,
                values: req.body
            });
            return;
        }
        db.get('users').push(req.body).write();//users.push(req.body);
        res.redirect('/users');// chuyển về trang
    }
    
};