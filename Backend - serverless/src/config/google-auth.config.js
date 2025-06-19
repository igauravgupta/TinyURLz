import pkg from 'google-auth-library';
const { OAuth2Client } = pkg;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export default client;