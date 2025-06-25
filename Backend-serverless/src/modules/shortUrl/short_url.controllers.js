import { getShortUrl, deleteShortUrlById, getCustomShortUrl , comparePassword} from "./short_url.dao.js"
import {createShortUrlWithUser} from "./short_url.service.js"
import {asyncHandler} from "../../utils/asyncHandler.utils.js"


export const createShortUrl = asyncHandler(async (req,res)=>{
    const data = req.body;
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrlWithUser(data,req.user._id);
    }
    res.status(200).json({shortUrl : shortUrl})
})

export const redirectFromShortUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);

  if (!url) {
    return res.status(404).send("Short URL not found");
  }
  if (url.expireAt && url.expireAt < new Date()) {
    return res.status(410).send("This link has expired");
  }
  if (url.password) {
    return res.render("password",{id});
  }
  return res.redirect(url.full_url);
});

export const deleteShortUrl = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const url = await deleteShortUrlById(id)
    if(!url) throw new Error("Short URL not found")
    res.status(200).json({message:"URL deleted successfully"})
});

export const verifyPassword = asyncHandler(async(req,res)=>{
    const {password}=req.query;
    const {id}=req.params;
    const url = await getShortUrl(id);
    const matchPassword= await comparePassword(password,url);
    if(matchPassword){
        res.redirect(url.full_url);
    }else{
        return res.render('password_prompt', {
      slug: id,
      error: 'Incorrect password. Please try again.',
        });
    }
});

