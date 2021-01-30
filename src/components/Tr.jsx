import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectionToArray, resetCorrectionPs, resetInputs } from '../helpers/functions';
import ActionsButtons from './ActionsButtons'
import data from '../helpers/data';
import { modifyFromTable } from '../helpers/formsActions'
import { hidePopUpDiv, addSetModifyModeFunction, alterInModifyMode as alterInModifyModeDispatch, addCharge as addChargeDispatch, removeCharge as removeChargeDispatch } from '../store/actions';
import modifyInTableInputs from '../helpers/modifyInTableGuide';
import {useEffect} from 'react';
import translations from '../helpers/translations';

export const getNames = (modifyMode=false) => {
    let names = collectionToArray(document.getElementById("mainForm").getElementsByClassName("inputData")).map(e => {
        return e.getAttribute('name')
    })
    if (modifyMode) {
	names = names.map(name => {
	    try {
		return name.endsWith('ID') ? name.replace("ID", '') : name
	    } catch {}
	    return name
	})
    }
    return names
}

const adjustProductQuantity = (tr) => {
    const productID = tr.getElementsByClassName("productIDTD")[0].innerHTML
    const quantity = tr.getElementsByClassName("quantityTD")[0].innerHTML
    for (let i = 0; i < data['Products'].length; i++) {
        const product = data['Products'][i];
        if (product.value === parseInt(productID)) {
            product.available = parseInt(product.available) + parseInt(quantity)
        }
    }
}

export const resetAllModifyModes = async (setModifyModeFunctions) => {
    for (let i = 0; i < setModifyModeFunctions.length; i++) {
        const reset = setModifyModeFunctions[i];
        reset(false)
    }
}


const generateTDToModifyMode = (column, section, row, col, lang) => {
    const { tag, type, name, min, step, disabled, className, choices, onChange } = modifyInTableInputs[section][column]
    const placeholder = translations[lang].form.placeholders[name]
    const value = row[column]
    let td
    if (tag === 'input') {
        td = <td onChange={(e) => onChange(e, lang)} className={`text-center ${name==='id' ? 'd-none' : ''}`} key={col}><input type={type} placeholder={placeholder} defaultValue={value} name={name} min={min} step={step} className={`${className} ${name}TD`} disabled={disabled} /></td>
    } else if (tag === 'select') {
	const dinamicSelect = ['clientID', 'productID', 'orderID', 'supplierID'].includes(name) 	
	const choicesOptions = dinamicSelect ? data[choices.options] : choices.options

	const options = choicesOptions.map((opt, i) => {
	    return <option value={opt.value} key={i}>{!dinamicSelect ? translations[lang].words[opt.label] : opt.label}</option>
	})
        td = <td onChange={(e) => onChange(e, lang)} className='text-center' key={col}><select defaultValue={value} disabled={disabled} name={name} className={`${className} ${name}TD`}>{options}</select></td>
    }
    return td
}

const generateButtonsToModifyMode = (setModifyMode, alterInModifyMode, section, updateTable, addCharge, removeCharge, hidePopUpDiv, setModifyModeFunctions, updateMainTable, resetProductsOptions, accessToken) => {
    const handleModifyClick = async ({ target }) => {
	const tbody = target.parentNode.parentNode.parentNode
        const form = target.parentNode.parentNode
        const result = await modifyFromTable(section, updateTable, addCharge, removeCharge, form, accessToken)
	if (!result) return
	const dataLength = tbody.getElementsByTagName('td').length;
	if (dataLength <= 1) {
            hidePopUpDiv({ hidePopUpDiv: true });
            resetAllModifyModes(setModifyModeFunctions)		
	    alterInModifyMode(0)
            updateMainTable()
        } else {
	    setModifyMode(false)
            alterInModifyMode(-1)
	}
	if (section==='Sales') {
	    resetProductsOptions()
	    resetInputs(false)
	    resetCorrectionPs()
	}
    }

    const handleCancelClick = () => {
        setModifyMode(false)
        alterInModifyMode(-1)
    }

    const submitButton = <button onClick={handleModifyClick} className="btn btn-success mr-1"></button>
    const cancelButton = <button onClick={handleCancelClick} className="btn btn-secondary ml-1"></button>

    return { submitButton, cancelButton }
}

const Tr = ({ columns, row, updateTable, section, i }) => {
    const lang = useSelector(state => state.language)
    const mounted = useRef(false)
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.accessToken)
    const consultSelectsData = useSelector(state => state.consultSelectsData)
    const inModifyMode = useSelector(state => state.inModifyMode)
    const setModifyModeFunctions = useSelector(state => state.setModifyModeFunctions)
    const resetProductsOptions = useSelector(state => state.resetProductsOptions)
    const aditionalForms = useSelector(state => state.aditionalForms)
    const updateMainTable = useSelector(state => state.updateMainTable)
    const alterInModifyMode = (num) => {
	dispatch(alterInModifyModeDispatch(num))
    }
    const [modifyMode, setModifyMode] = useState(false)
    
    useEffect(() => {
	mounted.current = true
	return () => mounted.current = false
    })

    const verifyAndSetModifyMode = (bool) => {
        if (mounted.current) {
            setModifyMode(bool)
        }
    }

    const addCharge = () => dispatch(addChargeDispatch())
    const removeCharge = () => dispatch(removeChargeDispatch())

    const handleOnDoubleClickToNoModifyMode = async (e) => {
	if (aditionalForms.length > 0) {
	    alert('Primero cierra los formularios adicionales o tarmina de insertar.')
	    return
	} 

        const trs = e.target.parentNode.parentNode.getElementsByTagName("tr")
	for (let i = 0; i < consultSelectsData.length; i++) {
            const consult = consultSelectsData[i];
            await consult()
        }
        if (section === "Sales") {
            for (let i = 0; i < trs.length; i++) {
                const tr = trs[i];
                adjustProductQuantity(tr)
            }
        }
        setModifyMode(true)
        alterInModifyMode(1)
        dispatch(addSetModifyModeFunction(verifyAndSetModifyMode))
    }

    // GENERATING THE RESPECTIVE TD'S ACCORDING TO THE CURRENT MODE
    let tds = []
    if (!modifyMode && inModifyMode < 1) {
        for (let col in columns) {
            let column = columns[col][0]
            tds.push(<td onDoubleClick={handleOnDoubleClickToNoModifyMode} className={`text-center ${column}TD dataTD toSearch ${columns[col][1] ? 'd-none' : ''}`} name={`${column}`} key={`${i}${col}`}>{row[column]}</td>)
        }
        const actionButtons = <ActionsButtons updateTable={updateTable} key='actions' />
        tds.push(actionButtons)
    } else if (modifyMode) {
        for (let col in columns) {
            let column = columns[col][0]
            try {
                const td = generateTDToModifyMode(column, section, row, col, lang)
                tds.push(td)
            } catch { }
        }
        const {submitButton, cancelButton} = generateButtonsToModifyMode(verifyAndSetModifyMode, alterInModifyMode, section, updateTable, addCharge, removeCharge, () => dispatch(hidePopUpDiv({ hidePopUpDiv: true })), setModifyModeFunctions, updateMainTable, resetProductsOptions, accessToken)
        const actionButtons = <td key="actions" className="text-center">{submitButton}{cancelButton}</td>
        tds.push(actionButtons)
    } else {
        const names = getNames(true)
        for (let col in columns) {
            let column = columns[col][0]
            tds.push(<td onDoubleClick={handleOnDoubleClickToNoModifyMode} className={`text-center ${column}TD toSearch dataTD ${!names.includes(column) || column==='id' ? 'd-none' : ''}`} name={`${column}`} key={`${i}${col}`}>{row[column]}</td>)
        }
        const actionButtons = <ActionsButtons updateTable={updateTable} key='actions' />
        tds.push(actionButtons)
    }

    return <tr>{tds}</tr>
}

export default Tr
