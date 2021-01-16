import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ActionsButtons from './ActionsButtons';
import Searcher from './Searcher'
import Tr, {resetAllModifyModes} from './Tr';
import allColumns from '../helpers/columns';
import { createPopUpTable } from './PopUpTable'
import { addCharge, alterInModifyMode, hidePopUpDiv, removeCharge, setCleanMainTable, setPopUpDivContent, setUpdateMainTable } from '../store/workspaceActions'
import { request} from '../helpers/functions';
import { getNames } from './Tr.jsx'
import translations from '../helpers/translations';

export const Thead = ({ columns }) => {
    const lang = useSelector(state => state.language)
    let ths = [];
    const inModifyMode = useSelector(state => state.inModifyMode)

    if (inModifyMode < 1) {
        for (let col in columns) {
	    let name = columns[col][0]
	    let label = translations[lang].columns[name]
            ths.push(<th className={`text-center ${columns[col][1] ? 'd-none' : ''}`} key={label+name}>{label}</th>);
        }
    } else {
        const names = getNames()
        for (let col in columns) {
	    const name = columns[col][0]
            if (names.includes(name)) {
		let label = translations[lang].columns[name]
                ths.push(<th className={`text-center ${name==='id' ? 'd-none' : ''}`} key={label}>{label}</th>);
            }
        }
    }
    ths.push(<th className='text-center' key='actions'>{translations[lang].words.actions}</th>);

    return <thead className='thead-dark'><tr>{ths}</tr></thead>
}


const Tbody = ({columns, rows,
    // to actions buttons //
    updateTable, dataType,
    // to the tds action // to the tds action ////////// 
    section, hidePopUpDiv, setPopUpDivContent, userID, addCharge, removeCharge}) => {
    const lang = useSelector(state => state.language)
    const [trs, setTrs] = useState([])
    const setModifyModeFunctions = useSelector(state => state.setModifyModeFunctions)
    const dispatch = useDispatch();

    useEffect(() => {
        if (rows.message || !userID) {
            setTrs([])
            return
        }
        if (!rows) {
            setTrs(false)
            return
        }
	const handleTDOnClick = (e) => {
	    resetAllModifyModes(setModifyModeFunctions)
	    dispatch(alterInModifyMode(0))
	    createPopUpTable(e, section, hidePopUpDiv, setPopUpDivContent, userID, addCharge, removeCharge, lang)
	}
	let trs
	if (["Products", "Sales"].includes(section)) {
	    trs = rows.map((row, i) => {
		const tds = [];
		try {
		    for (let col in columns) {
			let column = columns[col][0]
		        tds.push(<td className={`text-center dataTD toSearch ${columns[col][1] ? 'd-none' : ''}`} name={`${columns[col][0]}`} key={`${i}${col}`} onClick={section === 'Sales' || section === 'Products' ? handleTDOnClick : null}>{column==='type' ? translations[lang].words[row[column]] : row[column]}</td>)
		    }
                } catch (e) {
                    console.log(e)
                }
                
                const actionButtons = <ActionsButtons dataType={dataType} updateTable={updateTable} key='actions'/>
                tds.push(actionButtons)
                
                return <tr key={i}>
                    {tds}
                </tr>
            })
	} else {
	    trs = rows.map((row, i) => <Tr columns={columns} key={i} i={i} row={row} updateTable={updateTable} section={section} />)
	}
	setTrs(trs)
    }, [columns, rows, dataType, updateTable, section, hidePopUpDiv, setPopUpDivContent, userID, addCharge, removeCharge, dispatch, setModifyModeFunctions, lang])
    
    const tbodyContent = trs.length !== 0 ? trs : <tr><td className="text-center">{rows.message ? rows.message : translations[lang].table[`no${section}`]}</td></tr>
    
    return <tbody>
        {tbodyContent}
    </tbody>
}


const Table = ({ section, setUpdateMainTable, userID, setCleanMainTable, addCharge, removeCharge,
    // to the tds action ///////////
    hidePopUpDiv, setPopUpDivContent }) => {

    const [rows, setRows] = useState(false);
    const [columns, setColumns] = useState([])
    
    const dataType = ["Sales", "Products"].includes(section) ? 'grouped' : 'detailed';
    
    const updateTable = useCallback(async (section, dataType='grouped', onThis=false) => {
        addCharge()
        let url = dataType === 'detailed' ? `${process.env.REACT_APP_API_URL}/${section}/${userID}` : `${process.env.REACT_APP_API_URL}/${section}/grouped/${userID}`;
        let rows = await request(url);
        removeCharge()
        if (!onThis) setRows(rows) 
        else return rows
    }, [userID, addCharge, removeCharge])
    
    useEffect(() => {
        let mounted = true;
        if (['Sales', 'Clients', 'Products', 'Orders', 'Suppliers'].includes(section)) {
            if (mounted) setCleanMainTable({cleanMainTable: () => setRows(false)})
            updateTable(section, dataType, true)
                .then(rows => {
                    if (mounted) setRows(rows)
                })
            setColumns(allColumns[dataType][section]);
            setUpdateMainTable({updateMainTable: () => updateTable(section, dataType)})
        }
        return () => mounted = false;
    }, [section, dataType, updateTable, setUpdateMainTable, setCleanMainTable])

    return (
        <div className='row mt-4'>
            <Searcher/>
            <div className="col-md-12">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover table-sm">
                        <Thead columns={columns}/>
                        <Tbody columns={columns} rows={rows} userID={userID}
                        // to actions buttons // to actions buttons /
                        updateTable={updateTable} dataType={dataType}
                        // to the tds action // to the tds action // to the tds action // to the tds action //
                        section={section} hidePopUpDiv={hidePopUpDiv} setPopUpDivContent={setPopUpDivContent} addCharge={addCharge} removeCharge={removeCharge} />
                    </table>
                </div>
            </div>
        </div>    
    )
}

const mapStateToProps = (state) => ({
    section: state.section,
    userID: state.userID
})

const mapDispatchToProps = {
    hidePopUpDiv,
    setPopUpDivContent,
    setUpdateMainTable,
    setCleanMainTable,
    addCharge,
    removeCharge
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
