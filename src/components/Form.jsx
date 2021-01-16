import React, { useEffect, useState, useCallback, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import FinderSelect from './finderSelect/FinderSelect';
import AditionalForms, { createANewForm } from './AditionalForms';
import formModels from '../helpers/forms';
import sendForms from '../helpers/formsActions';
import { addANewForm, deleteAditionalForm, addConsultSelectDataFunction, setResetProductsOptions, addCharge, removeCharge } from '../store/workspaceActions';
import { request, verifyFields, calculateAvailableProductsLength } from '../helpers/functions'
import { monitorProductSelects } from '../helpers/saleFormActions';
import data from '../helpers/data';
import translations from '../helpers/translations';


const getSelectSection = (url) => {
    let selectSection;
    switch (url) {
        case `${process.env.REACT_APP_API_URL}/salesProducts/select`:
            selectSection = "Products";
            break;
        case `${process.env.REACT_APP_API_URL}/salesClients/select`:
            selectSection = "Clients";
            break;
        case `${process.env.REACT_APP_API_URL}/productsOrders/select`:
            selectSection = "Orders";
            break;
        case `${process.env.REACT_APP_API_URL}/ordersSuppliers/select`:
            selectSection = "Suppliers";
            break;
        default:
            selectSection = ''
    }
    return selectSection
}

const setProductsDisplay = (products) => {
    const newProducts = []
    let productsIn = []
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        let display = true
        if (productsIn.includes(product.label) || parseInt(product.available) <= 0) {
            display = false
        } else {
            productsIn.push(product.label)
        }
        newProducts.push({ ...product, display: display })
    }
    return newProducts
}

const getInfo = (section) => {
    switch (section) {
        case "Products":
            return "available"
        case "Clients":
            return "contact"
        case "Orders":
            return "date"
        case "Suppliers":
            return "contact"
        default:
            break;
    }
}

const Select = ({ item, section, addConsultSelectDataFunction, setResetProductsOptions, userID, addCharge, removeCharge }) => {
    const mounted = useRef(false)
    const [optionsData, setOptionsData] = useState([])

    const url = item.choices.url;
    const selectSection = getSelectSection(url)

    const manageOptionsData = useCallback(async (newData) => {
        let newOptionsData = [];
	data[selectSection] = newData
	if (selectSection === 'Products') {
	    newOptionsData = setProductsDisplay(data['Products'])
	} else {
	    newOptionsData = newData
	}
	if (mounted.current) {
	    return setOptionsData(newOptionsData)
	}
    }, [selectSection])

    const consultOptionsData = useCallback(async (url, onThis = false) => {
        if (optionsData.length === 0) {
            addCharge()
            const data = await request(url + `/${userID}`);
            removeCharge()
            if (!onThis) manageOptionsData(data, section)
            else return data
        }
    }, [optionsData, section, userID, manageOptionsData, addCharge, removeCharge])

    useEffect(() => {
	mounted.current=true
        if (optionsData.length === 0) {
            addConsultSelectDataFunction(() => consultOptionsData(url))
        }
        if (section === 'Sales') {
            setResetProductsOptions({
                resetProductsOptions: async () => {
                    setOptionsData([])
                }
            })
        }
        return () => mounted.current = false
    }, [section, consultOptionsData, url, addConsultSelectDataFunction, optionsData, setResetProductsOptions])


    const handleOnMouseDown = () => {
        consultOptionsData(url, true).then(data => {
            if (data) manageOptionsData(data)
        })
    }

    let info = getInfo(selectSection)
    
    return <FinderSelect item={item} info={info} elements={optionsData} onClick={handleOnMouseDown} onChange={item.onChange} />
}


const generateNewInput = ({ name, heritable, type, onChange, className, step, min, disabled, placeholder, divClass }, label, lang) => {
    return <div key={name} className={`${heritable}Div ${divClass} inputDiv`}>
        {label === "ID" ? null : <label htmlFor={name} className='m-0'>{label}</label>}
	    <input type={type} onChange={(e) => onChange(e, lang)} name={name} className={`${className} ${name} ${heritable}`} step={step} min={min} disabled={disabled} placeholder={placeholder}></input>
        <p className={`correctionsP`}><small className={`${name}Fixes`}></small></p>
    </div>;
}

const generateNewDinamicSelect = ({ userID, item, section, addConsultSelectDataFunction, setResetProductsOptions, addCharge, removeCharge }) => {
    return <Select userID={userID} item={item} section={section} addConsultSelectDataFunction={addConsultSelectDataFunction} setResetProductsOptions={setResetProductsOptions} addCharge={addCharge} removeCharge={removeCharge} />
}

const generateNewNormalSelect = ({ name, onChange, className, heritable, step, min, disabled, choices }, lang) => {
    return <select key={name} name={name} onChange={(e) => onChange(e, lang)} className={`${className} ${name} ${heritable}`} step={step} min={min} disabled={disabled}>
        {choices.options.map((option, i) => {
            return <option key={i} value={option.value}>{translations[lang].words[option.label]}</option>
        })}
    </select>
}

const generateNewSelect = (item, label, url, toDinamicSelect, lang) => {
    return <div key={item.name} className={`${item.heritable}Div ${item.divClass} inputDiv`}>
        <label htmlFor={item.name} className='m-0'>{label}</label>
        {url ? generateNewDinamicSelect(toDinamicSelect) : generateNewNormalSelect(item, lang)}
        <p className={`correctionsP`}><small className={`${item.name}Fixes`}></small></p>
    </div>
}

const setNeccesaryValues = () => {
    const dateInput = document.getElementsByName('date')[0];
    try {
        if (dateInput.tagName === 'INPUT' && document.getElementById('registerButton').innerHTML !== 'Modificar') {
            dateInput.valueAsDate = new Date();
        }
    } catch { }
}

const consultSelectsOptions = async (consultSelectsData) => {
    try {
        const mainForm = document.getElementById('mainForm')
        for (let i = 0; i < consultSelectsData.length; i++) {
            let options = mainForm.getElementsByTagName('ul')[i].getElementsByTagName('li')
            let consult = consultSelectsData[i];
            if ((options.length === 0) || (options.length === 1 && options[0].className === "noData")) {
                await consult()
            }
        }
    } catch (e) {
        console.log(e);
    }
}

const Form = ({ section, addANewForm, deleteAditionalForm, nextAditionalFormKey, addConsultSelectDataFunction, consultSelectsData, resetAll, aditionalForms, updateMainTable, setResetProductsOptions, resetProductsOptions, userID, addCharge, removeCharge }) => {
    const [formElements, setFormElements] = useState([])
    const lang = useSelector(state => state.language)
    const fetching = useRef(false)
    useEffect(() => {
        const formModel = formModels[section];
        let formElements = [];
        for (let element in formModel) {
            let label = translations[lang].form.labels[element];
            let item = Object.assign(formModel[element], {placeholder: translations[lang].form.placeholders[element]});
            let newInput
            if (item.tag === 'input') {
                newInput = generateNewInput(item, label, lang)
            } else {
                const url = item.choices.url                          // TO SELECT JSX ELEMENT
                newInput = generateNewSelect(item, label, url, { userID, item, section, addConsultSelectDataFunction, setResetProductsOptions, addCharge, removeCharge}, lang)
            }
            formElements.push(newInput)
        }
        setFormElements(formElements)

    }, [section, addConsultSelectDataFunction, setResetProductsOptions, userID, addCharge, removeCharge, lang])

    setNeccesaryValues()

    const handleNewFormClick = async () => {
        if (section === 'Sales') {
            await consultSelectsOptions(consultSelectsData);
        }
        await createANewForm(section, document.getElementById('mainForm'), addANewForm, deleteAditionalForm, nextAditionalFormKey, lang)
        if (section === 'Sales') {
            monitorProductSelects()
        }
    }

    const availableProductsLength = calculateAvailableProductsLength(data['Products']);
    const addFormButtonDisabled = (aditionalForms.length >= 10 || aditionalForms.length >= availableProductsLength - 1) && (section === 'Sales')
    const addFormButton = <button id='addFormButton' onClick={handleNewFormClick} className='btn btn-primary float-right' disabled={addFormButtonDisabled}>+</button>

    const handleSubmitClick = async () => {
        if (!verifyFields(section, lang)) return
        if (document.getElementById('registerButton').innerHTML === 'Modificar') {
            if (!window.confirm(translations[lang].alert[`sureToModify${section}`])) return
        }
        if (!fetching.current) {
            fetching.current = true
            sendForms(section, resetAll, updateMainTable, userID, addCharge, removeCharge, lang);
            fetching.current = false
        } else return alert(translations[lang].alert.operationInProcess)
        if (section === "Sales") {
            await resetProductsOptions()
        }
    }
    const handleResetClick = async () => {
        await resetAll(false)
        if (section === 'Sales') await resetProductsOptions()
    }

    return <div className="row">
        <div className="card col-md-4 col-sm-6 p-2" style={{ minWidth: '270px' }}>
	    <h3 className="mt-2 mb-0"><small><span id='formTitle'>{translations[lang].form[`add${section}`]}</span>{section === 'Suppliers' || section === 'Orders' ? null : addFormButton}</small></h3>
            <form id="mainForm" className='formToSend'>
                <div className="form-row pt-2">
                    {formElements}
                </div>
            </form>
            <button id='registerButton' className="btn form-control btn-primary btn-block mt-3" onClick={handleSubmitClick}>{translations[lang].words.register}</button>
            <button className="btn form-control btn-secondary btn-block mt-3" onClick={handleResetClick}>{translations[lang].words.reset}</button>
        </div>
        <AditionalForms />
    </div>
}

const mapStateToProps = (state) => ({
    section: state.section,
    nextAditionalFormKey: state.nextAditionalFormKey,
    consultSelectsData: state.consultSelectsData,
    resetAll: state.resetAll,
    aditionalForms: state.aditionalForms,
    updateMainTable: state.updateMainTable,
    resetProductsOptions: state.resetProductsOptions,
    userID: state.userID
})

const mapDispatchToProps = {
    addANewForm,
    deleteAditionalForm,
    addConsultSelectDataFunction,
    setResetProductsOptions,
    addCharge,
    removeCharge
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
