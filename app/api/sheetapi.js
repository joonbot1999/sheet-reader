import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const serviceAccountAuth = new JWT({
    email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ]
})

const doc = new GoogleSpreadsheet('1vbAXCHs3i4fNLZB-pN8uKSuVBV5lwP2LQUOrEUXGu4s', serviceAccountAuth);

export { doc, serviceAccountAuth }; // Export 'doc' and 'serviceAccountAuth'
