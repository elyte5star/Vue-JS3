import { GoogleOAuthProvider } from 'google-oauth-gsi';


export const googleProvider = new GoogleOAuthProvider({
    clientId: process.env.VUE_GOOGLE_CLIENT_ID || "",
    onScriptLoadError: () => console.log('onScriptLoadError'),
    onScriptLoadSuccess: () => console.log('onScriptLoadSuccess'),
});


