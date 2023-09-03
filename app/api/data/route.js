import { NextResponse } from "next/server";
import { doc } from '../sheetapi'; // Adjust the import path

export async function POST(request) {
    try {
        const data = await request.json()
        const toSend = data.inputValue
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({todo: toSend});
        return NextResponse.json( 
            {
                status: 200, 
                message: "Successfully sent"
            }) 
    } catch (error) {
        return NextResponse.json( 
            { 
                status: 500,
                description: "Something went wrong"
            })
    }

}