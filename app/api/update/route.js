import { NextResponse } from "next/server";
import { doc } from '../sheetapi'; // Adjust the import path

// POST request to update
export async function POST(request) {
    try {
        const data = await request.json();
        const toUpdate = data.updateValue;
        const key = data.key;
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        rows[key].set('todo', toUpdate);
        await rows[key].save();
        return NextResponse.json( 
            {
                status: 200, 
                message: "Successfully updated"
            }) 
    } catch (error) {
        return NextResponse.json( 
            { 
                status: 500,
                description: "Something went wrong"
            })
    }
}

// DELETE request
export async function DELETE(request) {
    try {
        const data = await request.json();
        const key = data.key;
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        await rows[key].delete();
        return NextResponse.json( 
            {
                status: 200, 
                message: "Successfully deleted"
            }) 
    } catch (error) {
        return NextResponse.json( 
            { 
                status: 500,
                description: "Something went wrong"
            })
    } 
}