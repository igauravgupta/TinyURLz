import { createUser, findUserByEmail, findUserByEmailByPassword } from "../auth/auth.dao.js"
import { ConflictError } from "../../middlewares/apiError.middleware.js"
import {signToken} from "../../utils/auth.utils.js"
import client from "../../config/google-auth.config.js"

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User already exists")
    const newUser = await createUser(name, email, password)
    const token = await signToken({id: newUser._id})
    return {token,user}
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailByPassword(email)
    if(!user) throw new Error("Invalid email or password")

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid email or password")
    const token = signToken({id: user._id})
    return {token,user}
}

export const getUserByGoogleId = async (token) => {
     const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload(); 
    const { email, name } = payload;
    return { email, name };
}
export const findUser = async (email) => {
    const user = await findUserByEmail(email);
    if (!user) return null;
    return user;
}