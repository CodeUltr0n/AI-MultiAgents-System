import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import {inngest} from '../inngest/client.js'


export const signup = async (req,res) => {
  const {email,password,skills = []} = req.body

  // Password restriction validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    });
  }

  try {
    const hashedpass = await bcrypt.hash(password,10)
    const user = await User.create({email,password:hashedpass,skills})

    // firing inngest events

    await inngest.send({
        name:'user/signup',
        data:{
            email
        }
    });

    const token = jwt.sign(
        {_id: user._id, role: user.role},
        process.env.JWT_SECRET
    )

    res.json({user,token})
  } catch (error) {
    res.status(500).json({ error:'signUp failed',
      details: error.message,
    })
  }
};

export const login = async (req,res) => {

    const {email,password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({error:"user not found"})

           const isMatch = await bcrypt.compare(password,user.password)

           if(!isMatch){
             return res.status(401).json({error:"invalid credentials"})
           }

        const token = jwt.sign(
            {_id: user._id, role: user.role},
            process.env.JWT_SECRET
        )

        return res.json({ user, token })
    } catch (error) {
         res.status(500).json({ error:'Login failed',
         details: error.message,
    })
    }
};

export const logout = async (req,res) => {
    /// removing cookies cause jwt is stateless it can only be login
    try {
       const token = req.headers.authorization.split(" ")[1]
       if(!token){
        return res.status(401).json({error:"Unauthorized"})
       }
       jwt.verify(token,process.env.JWT_SECRET,(err) => {
            if(err) return res.status(401).json({error:"Unauthorized"})
            return res.json({message:"Logout successfully"})
       })
    } catch (error) {
        res.status(500).json({ error:'Logout failed',
        details: error.message,
    })
}
};

export const updateUser = async (req,res) => {
    const{skills = [], role,email} = req.body

    try {
        if(req.user?.role !== "admin"){
            return res.status(401).json(
              {error:"User is not permitted"}
            );
        }
         const user = await User.findOne({
                email
            });
            if(!user) return res.status(401).json({error:"user not found"});

        await User.updateOne(
            {email},
            {skills:skills.length ? skills:user.skills,role}
        )
        return res.json({message:"User updated successfully"})
    } catch (error) {
        res.status(500).json({ error:'Update Failed',
        details: error.message,
        })
    }
};

export const getUsers = async (req,res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(401).json(
              {error:"User is not permitted"}
            );
        }

        /// finding user
        const user = await User.find().select("-password") // removing password
        return res.json(user)
    } catch (error) {
        res.status(500).json({ error:'User not found',
        details: error.message,
        })
    }
};
