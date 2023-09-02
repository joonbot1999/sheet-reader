import { NextResponse } from "next/server";
import { doc } from '../sheetapi'; // Adjust the import path

export async function GET() {
    await doc.loadInfo();
    //console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
    //console.log(sheet.title)
    //const rowp = await sheet.addRow({todo: 'Larry'});
    await sheet.loadHeaderRow()
    const rows = await sheet.getRows()
    //console.log(rows.length)
    //console.log(sheet.headerValues)
    //const cells = await sheet.loadCells('A1:A14')
    let todo = []
    for (let i = 0; i < sheet.cellStats.nonEmpty - 1; i++) {
        todo.push(rows[i].get('todo'))
    }
    return NextResponse.json( {"list": todo} );
}