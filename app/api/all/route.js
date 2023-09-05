import { NextResponse } from "next/server";
import { doc } from '../sheetapi'; // Adjust the import path

export async function GET() {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.loadHeaderRow()
        const rows = await sheet.getRows()
        const cells = await sheet.loadCells('A1:A14')
        let todo = []
        for (let i = 0; i < sheet.cellStats.nonEmpty - 1; i++) {
            todo.push(rows[i].get('todo'))
        }
        return NextResponse.json( 
            {
                status: 200, 
                list: todo
            }) 
    } catch (error) {
        return NextResponse.json( 
            { 
                status: 500,
                description: "Something went wrong"
            })
    }

}

export async function POST() {

}