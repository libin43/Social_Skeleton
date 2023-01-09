const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//testing

module.exports={
    userSignUp: async (req,res)=>{
        console.log(req.body)
        try{
            req.body.password = await bcrypt.hash(req.body.password,10)
            console.log(req.body)
             userModel.create(req.body).then(()=>{
                res.json({ status: 'created'})
            }).catch(()=>{
                res.json({ status: 'error', error: "duplicate email"})
            })
        } catch (error){
            console.log('Connection Timeout');
        }
    },

    userLogin: async (req,res)=>{
        console.log(req.body,'hitting in user controller')
         try{
           const user = await userModel.findOne({email:req.body.email}) 
           if(user!=null){
            bcrypt.compare(req.body.password,user.password).then((response)=>{
                console.log(response)
                if(response){
                    const token = jwt.sign({ name:user.name, email:user.email, id:user._id },"Webapp@123",{ expiresIn: "18000000000" })
                    console.log(token,'its token');
                    console.log('Login Sucess');
                    res.json({message:"Login Success",token,user: user.name})
                }else{
                    console.log('pass not match');
                    res.json({message:"Password doesnot match",user:null})
                }
               
            }).catch((err)=>{
                console.log(err)
               res.json({message:"Password comparing failed"})
            })
           }
           else{
            res.json({message:"No user found"})
           }
         } catch (error){
            console.log(error);
            res.json({message:"Connection Timeout"})
         }
    },

    verifyTokenOfUser: async (req,res)=>{
        try{
   
            const decoded = jwt.verify(req.body.Token,"Webapp@123")
            console.log(decoded,'verify token')
            
            const email = decoded.email
            const user = await userModel.findOne({email:email})
            console.log(user,'its user')
            if (user.image) user.image = `http://localhost:7000/${user.image}`
            else user.image = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
            return res.status(200).json({message:"token valid",user})
            
        }catch(error){
            console.log(error)
            return res.status(500).json({ message: "invalid token" });
        }
    },

    imageUpload: async (req,res)=>{
        try {
            const Token = req.params.token
            const decoded = jwt.verify(Token, "Webapp@123")
            console.log(decoded, 'image upload in backend route')
            const user = await userModel.findOne({ _id: decoded.id })
            if (user) {
                const update = await userModel.updateOne({ _id: user.id }, {
                    $set: {
                        image: req.files.image[0].filename
                    }
                })
            }
            const image = `http://localhost:7000/${req.files.image[0].filename}`
            console.log(image);
            return res.status(200).json({ message: "user found", image });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "something went wrong" });
        }
    }
}