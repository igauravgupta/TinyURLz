import { generateNanoId } from "../../utils/auth.utils.js";
import { getCustomShortUrl, saveShortUrl } from "./short_url.dao.js";

export const createShortUrlWithUser = async (url, userId, expiresInMs = null, slug = null, password = null) => {
    const shortUrl = slug || generateNanoId(7);

    const exists = await getCustomShortUrl(shortUrl);
    if (exists) throw new Error("This custom URL already exists");

    let expireAt = null;
    if (expiresInMs) {
        expireAt = new Date(Date.now() + expiresInMs);
    }

    await saveShortUrl(shortUrl, url, userId, password, expireAt);

    return shortUrl;
};
