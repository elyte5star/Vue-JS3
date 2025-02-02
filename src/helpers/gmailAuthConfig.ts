import { GoogleOAuthProvider } from 'google-oauth-gsi';
import logger from './logger';


export const googleProvider = new GoogleOAuthProvider({
    clientId: process.env.VUE_GOOGLE_CLIENT_ID || "",
    onScriptLoadError: () => logger.error('onScriptLoadError'),
    onScriptLoadSuccess: () => logger.info('onScriptLoadSuccess'),
});


