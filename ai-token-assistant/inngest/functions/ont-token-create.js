import { inngest } from "../client.js";
import Token from '../../models/token.js'
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";
import analyizeToken from "../../utils/Ai.js";
import User from '../../models/user.js'


export const onTokenCreated = inngest.createFunction(
    {id : 'on-token-created', retries: 2, triggers: { event: "token/created" }},

    async ({event,step}) =>{
        try {
            const {tokenId} = event.data;

            /// fetching token from db
           const token = await step.run("fetch-token",async ()=> {
            const tokenObject = await Token.findById(tokenId);
            if(!tokenObject){
                throw new NonRetriableError("Token not found");
            }
            return tokenObject
           })

           await step.run("update-token-status",async ()=>{
            await Token.findByIdAndUpdate(token._id,{status:"TODO"});
           })

        const aiResponse =  await analyizeToken(token);

        const relatedskills = await step.run("ai-processing",async ()=>{
            let skills = []
            if(aiResponse){
                await Token.findByIdAndUpdate(token._id,{
                    priority: !["low","medium","high"]
                    .includes(aiResponse.priority) ? "medium" : aiResponse.priority,
                    helpfulNotes: aiResponse.helpfulNotes,
                    status:"IN_PROGRESS",
                    relatedSkills:aiResponse.relatedSkills
                })
                skills = aiResponse.relatedSkills
            }
            return skills
           })

        const moderator = await step.run("assign-moderator",
            async () => {
                let user = await User.findOne({
                    role:"moderator",
                    skills:{
                        $elemMatch:{
                            $regex:relatedskills.join("|"),
                            $options:"i"
                        },
                    },
                });
                if(!user){
                    user = await User.findOne({
                        role:"admin"
                    })
                }
                await Token.findByIdAndUpdate(token._id,{
                    assignedTo:user?._id || null
                })
                return user
            }
        );

        await step.run("send-email-notification",
            async () => {
                if(moderator){
                    const finalToken = await Token.findById(token._id)
                    await sendMail(
                        moderator.email,
                        "Token assigned",
                        `A new Token is assigned to you ${finalToken.title}`
                    )
                }
            }
        );
        return { success: true };
        } catch (error) {
            console.error("Error running the step", error.message);
            return { success : false}
        }
    }
)
