import {inngest} from '../inngest/client.js'
import Token from '../models/token.js'

export const createToken = async(req,res)=>{
    try {
        const {title,description} = req.body
        if (!title || !description) {
            return res.status(400).json({message:"Title and description are required"})
        }
        const newToken = await Token.create({
            title,
            description,
            createdBy:req.user._id.toString()
        })

        await inngest.send({
            name:"token/created",
            data:{
                tokenId:newToken._id.toString(),
                title,
                description,
                createdBy:req.user._id.toString()
            }
        });
        return res.status(201).json({
            message:"Token created and processing started",
            token:newToken
        })
    } catch (error) {
        console.error("Error creating Token" , error.message)
        return res.status(500).json({message:"Internal Server error"})
    }
};

export const getTokens = async (req,res) => {
    try {
        const user = req.user
        let tokens = []
        if(user.role !== "user"){
            tokens = await Token.find({}).populate("assignedTo",
                ["email","_id"]
            ).sort({createdAt:-1})
        }else{
            tokens = await Token.find({createdBy:user._id})
            .select("title description status createdAt")
            .sort({createdAt:-1})
        }
        return res.status(200).json(tokens)
    } catch (error) {
        console.error("Error fetching Tokens" , error.message)
        return res.status(500).json({message:"Internal Server error"})
    }
};

export const getToken = async (req,res) => {
    try {
        const user = req.user;
        let token;

        if(user.role !== "user"){
            token = await Token.findById(req.params.id).populate("assignedTo",
            ["email","_id"]
          )
        }else{
            token = await Token.findOne({
                createdBy:user._id,
                _id:req.params.id
            }).select("title description status createdAt")
        }

        if(!token){
           return res.status(404).json({message:"token not found"})
        }
        return res.status(200).json(token)

    } catch (error) {
        console.error("Error fetching Token" , error.message)
        return res.status(500).json({message:"Internal Server error"})
    }
}
