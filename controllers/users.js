const User=require("../models/user.js");

module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup=async(req,res)=>{
    try{
        let {email,username,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to EcoLiving!");
        res.redirect("/listings");
    });
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}
module.exports.loginForm =(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.login=async(req,res)=>{
    
    req.flash("success","Welcome back to EcoLiving!You are logged in ");
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully!");
        res.redirect("/listings")
    })
}