import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import columns from '../helpers/columns';
import { collectionToArray, elementToJSON, request, getInnerText, resetInputs, resetCorrectionPs } from '../helpers/functions';
import { alterInModifyMode as alterInModifyModeDispatch, hidePopUpDiv, addCharge, removeCharge } from '../store/actions';
import data from '../helpers/data';
import { resetAllModifyModes } from './Tr';
import translations from '../helpers/translations';


export const backToRegisterMode = (section, resetAll = false, lang) => {
    const registerButton = document.getElementById('registerButton');
    registerButton.className = 'btn form-control btn-primary btn-block mt-3'
    registerButton.innerHTML = translations[lang].words.register
    document.getElementById('formTitle').innerHTML = translations[lang].form[`add${section}`];

    try {
        const addFormButton = document.getElementById('addFormButton')
        addFormButton.setAttribute('class', 'btn btn-primary float-right')
    } catch { }

    if (resetAll) {
        resetAll(false)
    }
}

const goToModifyMode = async (section, updateMainTable, lang) => {

    const registerButton = document.getElementById('registerButton')
    registerButton.className = 'btn form-control btn-info btn-block mt-3'
    registerButton.innerHTML = translations[lang].words.modify
    document.getElementById('formTitle').innerHTML = translations[lang].form[`modify${section}`]

    try {
        const addFormButton = document.getElementById('addFormButton')
        addFormButton.setAttribute('class', 'btn btn-primary float-right d-none')
    } catch { }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    await updateMainTable()

}


const doConsultSelectsData = async (mainForm, consultSelectsData) => {
    for (let i = 0; i < consultSelectsData.length; i++) {
        try{
            let options = mainForm.getElementsByTagName('ul')[i].getElementsByTagName('li')
            let consult = consultSelectsData[i];
            if (options.length === 0) {
                await consult()
            }
        } catch (e) {

        }
    }
}

const ModifyButton = ({ section, updateMainTable, consultSelectsData, resetAll, alterInModifyMode }) => {
    const setModifyModeFunctions = useSelector(state => state.setModifyModeFunctions)
    const lang = useSelector(state => state.language)
    
    const handleClick = async (e) => {
        if (document.getElementById('registerButton').innerHTML === 'Modificar') {
            alert(translations[lang].alert.finishModification)
            return
        }
        
        resetAll(false)
        const mainForm = document.getElementById('mainForm');

        const mainFormInputs = collectionToArray(mainForm.getElementsByClassName('fsControl')).concat(collectionToArray(mainForm.getElementsByClassName('selectContainer')))
        const elements = e.target.parentNode.parentNode.getElementsByClassName('dataTD');

	// if (section === 'Sales') await resetProductsOptions()
        
        await doConsultSelectsData(mainForm, consultSelectsData)

        let selectInfoP
        let productIndex
        
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const elementName = element.getAttribute("name")
            for (let i = 0; i < mainFormInputs.length; i++) {
                const input = mainFormInputs[i];
                let inputName = input.getAttribute("name")
                
                if (input.tagName === 'DIV') {
                    inputName = input.getElementsByTagName('input')[1].getAttribute("name")
                    if (elementName === inputName) {
                        let value = element.innerHTML
                        let label 
                        const spans = input.getElementsByTagName('span')
                        for (let i = 0; i < spans.length; i++) {
                            const span = spans[i];
                            if (span.innerHTML === value) {
                                label = getInnerText(span.parentNode)
                                selectInfoP = span.parentNode.getElementsByTagName('p')[0]
                            }
                        }
                        const labelInput = input.getElementsByTagName('input')[0]
                        const hiddenInput = input.getElementsByTagName('input')[1]
                        labelInput.value = label
                        hiddenInput.value = value
                    }
                    continue
                }
                
                if (elementName === inputName) {
                    if (section === 'Sales' && inputName === 'quantity') {
                        for (let j = 0; j < data['Products'].length; j++) {
                            if (data['Products'][j].label === elements.product.innerHTML && String(data['Products'][j].orderID) === elements.orderID.innerHTML) {
                                productIndex = j
                                data['Products'][j].available = parseInt(data['Products'][j].available) + parseInt(elements.quantity.innerHTML);
                                const options = mainForm.getElementsByTagName('ul')[1].getElementsByTagName('li')
                                
                                for (let i = 0; i < options.length; i++) {
                                    const li = options[i]
                                    const optionValue = li.getElementsByTagName('span')[0].innerHTML
                                    if (optionValue === String(data['Products'][j].value)) {
                                        li.style.display = ''
                                    }
                                }
                            }
                        }
                    }
                    input.value = element.innerHTML;
                    if (inputName === 'date') {
                        input.valueAsDate = new Date(element.innerHTML)
                    }
                }
            }
        }
        try {
            selectInfoP.innerHTML = data['Products'][productIndex].available
        } catch{}
        await goToModifyMode(section, updateMainTable, lang)
        resetAllModifyModes(setModifyModeFunctions)
	alterInModifyMode(0)
    }

    return <button onClick={handleClick} className="btn btn-info mr-1"></button>
}

const DeleteButton = ({ dataType, section, updateTable, hidePopUpDiv, updateMainTable, resetProductsOptions, accessToken, addCharge, removeCharge, alterInModifyMode }) => {
    const setModifyModeFunctions = useSelector(state => state.setModifyModeFunctions)
    const lang = useSelector(state => state.language)
    const aditionalForms = useSelector(state => state.aditionalForms)

    const handleClick = async (e) => {
        if (document.getElementById('registerButton').innerHTML === 'Modificar') {
            alert(translations[lang].alert.finishModification)
            return
        }
	if (aditionalForms.length > 0) {
	    alert('Primero cierra todos los formularios extras o termina de insertar los datos')
	    return
	}
        if (!window.confirm(translations[lang].alert[`sureToDelete${section}`])) {
            return
        }
        addCharge()
        const tbody = e.target.parentNode.parentNode.parentNode;
        const tds = e.target.parentNode.parentNode.getElementsByTagName('td');
        const ids = []
        if (dataType === 'grouped') {
            const headers = columns[dataType][section];
            const element = elementToJSON(tds, headers);

	    const url = `${process.env.REACT_APP_API_URL}/${section}/equalelements`
	    const init = {
                method: 'POST',
                body: JSON.stringify(element)
            }
            const elements = await request(url, accessToken, init);

            for (let element of elements) {
                ids.push(element['id'])
            };
        } else {
            ids.push(tds[0].innerHTML);
        }
        const url = `${process.env.REACT_APP_API_URL}/${section}`;
        const init = {
            method: 'DELETE',
            body: JSON.stringify(ids)
        };
        await request(url, accessToken, init);
        await updateTable(section, dataType).then(() => {
            const dataLength = tbody.getElementsByTagName('td').length;
            if (dataLength <= 1) {
                hidePopUpDiv({ hidePopUpDiv: true });
                resetAllModifyModes(setModifyModeFunctions)
		alterInModifyMode(0)
                updateMainTable()
            };
        });
	if (section==='Sales') {
	    resetProductsOptions()
	    resetInputs(false)
	    resetCorrectionPs()
	}
        removeCharge()
    };
    return <button className="btn btn-danger ml-1" onClick={handleClick}></button>;
};

const ActionsButtons = ({ section, dataType = 'detailed', updateTable, consultSelectsData, resetAll, updateMainTable, hidePopUpDiv, resetProductsOptions, accessToken, addCharge, removeCharge }) => {
    const dispatch = useDispatch()
    const alterInModifyMode = (num) => {
	dispatch(alterInModifyModeDispatch(num))
    }
    return (
        <td className='text-center actionsTD'>
            {dataType === "detailed" ? <ModifyButton updateMainTable={updateMainTable} dataType={dataType} consultSelectsData={consultSelectsData} section={section} updateTable={updateTable} resetAll={resetAll} resetProductsOptions={resetProductsOptions} alterInModifyMode={alterInModifyMode}r /> : null}
            <DeleteButton dataType={dataType} accessToken={accessToken} section={section} updateTable={updateTable} hidePopUpDiv={hidePopUpDiv} updateMainTable={updateMainTable} resetProductsOptions={resetProductsOptions} addCharge={addCharge} removeCharge={removeCharge} alterInModifyMode={alterInModifyMode} />
        </td>
    )
}


const mapStateToProps = (state) => ({
    section: state.section,
    consultSelectsData: state.consultSelectsData,
    resetAll: state.resetAll,
    updateMainTable: state.updateMainTable,
    resetProductsOptions: state.resetProductsOptions,
    accessToken: state.accessToken
})

const mapDispatchToProps = {
    hidePopUpDiv,
    addCharge,
    removeCharge,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsButtons)
