const serverUrl = process.env.REACT_APP_SERVER_URL;
const buttonAPIKey = process.env.REACT_APP_GOOGLE_BUTTON_API;

if (!serverUrl) {
    throw new Error('REACT_APP_SERVER_URL must be set');
}

if (!buttonAPIKey) {
    throw new Error('REACT_APP_GOOGLE_BUTTON_API must be set');
}

export const config = {
    serverUrl,
    buttonAPIKey,
};
