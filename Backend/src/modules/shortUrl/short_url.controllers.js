import { getShortUrl, deleteShortUrlById } from "./short_url.dao.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "./short_url.service.js"
import {asyncHandler} from "../../utils/asyncHandler.utils.js"

export const createShortUrl = asyncHandler(async (req,res)=>{
    const data = req.body;
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrlWithUser(data,req.user._id);
    }
    res.status(200).json({shortUrl : shortUrl})
})


export const redirectFromShortUrl = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})



export const deleteShortUrl = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const url = await deleteShortUrlById(id)
    if(!url) throw new Error("Short URL not found")
    res.status(200).json({message:"URL deleted successfully"})
});