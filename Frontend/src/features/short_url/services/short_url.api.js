import axiosInstance from "../../../services/axiousInstance.js"

export const createShortUrl = async (url,slug) =>{
    const {data} = await axiosInstance.post("/api/urls/",{url,slug})
    return data.shortUrl
}

export const deleteShortUrl = async (id) => {
  // Assumes backend route: DELETE /api/user/urls/:id
  return await axiosInstance.delete(`/api/urls/delete/${id}`);
}