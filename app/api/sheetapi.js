import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// initializes google sheet API w/ credentials
const serviceAccountAuth = new JWT({
    email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ]
})

const doc = new GoogleSpreadsheet('enter your route here', serviceAccountAuth);

export { doc, serviceAccountAuth }; // Export 'doc' and 'serviceAccountAuth'
