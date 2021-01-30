import React from 'react'
import allColumns from '../helpers/columns';
import Tr from './Tr'
import { request } from '../helpers/functions'
import { Thead } from './Table';
import translations from '../helpers/translations';

let creating = false

const Tbody = ({ columns, rows, updateTable, section }) => {
    const trs = rows.message ? [] : rows.map((row, i) => <Tr key={section+row.id} columns={columns} i={i} row={row} updateTable={updateTable} section={section} />)

    const tbodyContent = trs.length !== 0 ? trs : <tr><td className="text-center">{rows.message}</td></tr>

    return <tbody>
        {tbodyContent}
    </tbody>
}

const Table = ({ columns, rows,
    // to update table // to update table // to update table // to update table ///
    section, tds, groupedColumns, hidePopUpDiv, setPopUpDivContent, accessToken }) => {

    // function to update this table when a change happens
    const updateTable = () => {
        return updatePopUpTable(section, tds, groupedColumns, hidePopUpDiv, setPopUpDivContent, accessToken)
    }

    return <div className='row'>
        <div className="col-md-12">
            <div className="table-responsive">
                <table id="popUpTable" className="table table-dark table-striped table-bordered table-hover table-sm p-5">
                    <Thead columns={columns} />
                    <Tbody columns={columns} rows={rows} updateTable={updateTable} section={section} />
                </table>
            </div>
        </div>
    </div>
}

const mountTable = (elements, section, hidePopUpDiv, setPopUpDivContent,
    // to update table /
    tds, groupedColumns, accessToken) => {
    const columns = allColumns['equal'][section];
    setPopUpDivContent({
        popUpDivContent: <Table what='Table' columns={columns} rows={elements}
            // to update table // to update table // to update table // to update table // to update table // to update table /////////////
            section={section} tds={tds} groupedColumns={groupedColumns} hidePopUpDiv={hidePopUpDiv} setPopUpDivContent={setPopUpDivContent} accessToken={accessToken} />
    });
    hidePopUpDiv({ hidePopUpDiv: false })

}

// called from Table by td's actions
export const createPopUpTable = async (e, section, hidePopUpDiv, setPopUpDivContent, accessToken, addCharge, removeCharge, lang) => { 
    if (document.getElementById('registerButton').innerHTML === 'Modificar') { 
	alert(translations[lang].alert.finishModification) 
	return 
    }
    addCharge()
    if (!creating) {
        const tds = e.target.parentNode.getElementsByClassName('toSearch');
        const groupedColumns = allColumns['grouped'][section];
        creating = true
        await updatePopUpTable(section, tds, groupedColumns, hidePopUpDiv, setPopUpDivContent, accessToken)
        creating = false
    }
    removeCharge()
}

const updatePopUpTable = async (section, tds, groupedColumns, hidePopUpDiv, setPopUpDivContent, accessToken) => {
    let elementToSend = {};
    let i = 0;
    for (let col in groupedColumns) {
        let column = groupedColumns[col][0];
        let value = tds[i].innerHTML;
        elementToSend[column] = value
        i++;
    }

    let url = `${process.env.REACT_APP_API_URL}/${section}/equalelements`;
    let init = {
        method: 'POST',
        body: JSON.stringify(elementToSend)
    }
    return await request(url, accessToken, init)
        .then(elements => {
            mountTable(elements, section, hidePopUpDiv, setPopUpDivContent,
                // to update table /
                tds, groupedColumns, accessToken)
        })
}
