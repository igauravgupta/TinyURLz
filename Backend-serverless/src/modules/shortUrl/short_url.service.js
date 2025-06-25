import { generateNanoId } from "../../utils/auth.utils.js";
import { getCustomShortUrl, saveShortUrl } from "./short_url.dao.js";

export const createShortUrlWithUser = async (data,userId) => {
    const shortUrl = data.slug || generateNanoId(7);
    const exists = await getCustomShortUrl(shortUrl);
    if (exists) throw new Error("This custom URL already exists");
    let expireAt = null;
    if (data.expiresIn) {
        expireAt = new Date(Date.now() + data.expiresIn);
    }
    await saveShortUrl(shortUrl, data.url, userId, data.password, expireAt);
    return shortUrl;
};
