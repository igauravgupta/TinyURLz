import { cookieOptions } from "../../config/cookies.config.js"
import { loginUser, registerUser } from "./auth.services.js"
import {asyncHandler} from "../../utils/asyncHandler.utils.js"


export const register_user =asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    const {token,user} = await registerUser(name, email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({message:"register success"})
})

export const login_user = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    const {token,user} = await loginUser(email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({user:user,message:"login success"})
})

export const logout_user = asyncHandler( async (req, res) => {
    res.clearCookie("accessToken", cookieOptions)
    res.status(200).json({message:"logout success"})
})

export const get_current_user = asyncHandler( async (req, res) => {
    res.status(200).json({user:req.user})
})