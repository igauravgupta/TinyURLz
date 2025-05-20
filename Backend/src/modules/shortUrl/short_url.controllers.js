import { getShortUrl, deleteShortUrlById } from "./short_url.dao.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "./short_url.service.js"
import {asyncHandler} from "../../utils/asyncHandler.utils.js"

export const createShortUrl = asyncHandler(async (req,res)=>{
    const data = req.body
    let shortUrl
    console.log("Data",data)
    console.log("User",req.user)
    if(req.user){
        console.log("User ID",req.user._id)
        shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug)
    }else{  
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})


export const redirectFromShortUrl = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = asyncHandler(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})

export const deleteShortUrl = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const url = await deleteShortUrlById(id)
    if(!url) throw new Error("Short URL not found")
    res.status(200).json({message:"URL deleted successfully"})
});