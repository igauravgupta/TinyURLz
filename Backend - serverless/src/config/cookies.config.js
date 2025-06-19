export const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true, 
    // sameSite: 'None',
    maxAge: 1000 * 60 * 60, // 5 minutes
}