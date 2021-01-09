import React from 'react';
import { connect } from 'react-redux';
import calculateSale from '../helpers/saleFormActions';
import data from '../helpers/data';
import { monitorProductSelects } from '../helpers/saleFormActions';
import { calculateAvailableProductsLength, collectionToArray, getInnerText } from '../helpers/functions'
import FinderSelect from './finderSelect/FinderSelect';

const deleteForm = async (e, deleteAditionalForm) => {
    e.preventDefault();
    const form = e.target.parentNode.parentNode.parentNode.parentNode;
    await deleteAditionalForm(form.id)
    monitorProductSelects()
}

const isThereSpaceForMoreForms = (section) => {
    const aditionalFormsLength = document.getElementsByClassName('aditionalForm').length
    const availableProductsLength = calculateAvailableProductsLength(data['Products']);
    if (aditionalFormsLength >= 10 || (aditionalFormsLength >= availableProductsLength - 1 && section === 'Sales')) {
        return false
    }
    return true
}

const generateNewInput = (section, input) => {
    return <input type={input.type} onChange={section === 'Sales' ? (e) => calculateSale(e, e.target.parentNode.parentNode.parentNode) : null} name={input.name} className={`${input.className} ${input.name} heritable`} step={input.step} min={input.min} disabled={input.disabled} placeholder={input.placeholder}></input>
}

const generateNewOptions = (options) => {
    const newOptions = options.map(e => {
        const value = e.getElementsByTagName('span')[0].innerHTML
        const label = getInnerText(e)
        const display = e.style.display === 'none' ? false : true
        const available = e.getElementsByTagName('p')[0].innerHTML
        return {label, value, display, available}
    })
    return newOptions
}

const generateItem = (select) => {
    const className = 'form-control'
    const name = select.getElementsByTagName('input')[1].getAttribute('name')
    const heritable = 'heritable'
    const placeholder = 'selecciona un producto'
    return {className, name, heritable, placeholder}
}

const generateNewSelect = async (select, oldOptions) => {
    const newOptions = generateNewOptions(oldOptions)
    const item = generateItem(select)
    
    const handleSalesSelectOnChange = (e) => {
        monitorProductSelects()
        calculateSale(e, e.target.parentNode.parentNode.parentNode);
    }
    return <FinderSelect elements={newOptions} item={item} onChange={handleSalesSelectOnChange} info="available" />
}

const generateNewElement = (i, input, label, newInput, deleteAditionalForm) => {
    return <div key={i}>
        <label htmlFor={input.name} className='m-0'>{label.innerHTML}</label>
        {i === 0 ? <button className='btn btn-danger float-right' onClick={(e) => deleteForm(e, deleteAditionalForm)}></button> : null}
        {newInput}
        <p className={`correctionsP`}><small className={`${input.name}Fixes`}></small></p>
    </div>
}

const generateNewForm = (nextAditionalFormKey, formElements) => {
    return <div key={`aditionalForm${nextAditionalFormKey}`} id={`aditionalForm${nextAditionalFormKey}`} className="aditionalForm m-2">
        <form className="aditionalForms formToSend">
            <div className="form-group pt-2">
                {formElements}
            </div>
        </form>
    </div>
}

export const createANewForm = async (section, mainForm, addANewForm, deleteAditionalForm, nextAditionalFormKey) => {
    if (!isThereSpaceForMoreForms(section)) {
        return
    }
    const formElements = [];
    const divsToNewForm = mainForm.getElementsByClassName("heritableDiv");
    for (let i = 0; i < divsToNewForm.length; i++) {
        const div = divsToNewForm[i];
        const label = div.childNodes[0];
        let input = div.childNodes[1];

        let newInput
        if (input.tagName === "INPUT") {
            newInput = generateNewInput(section, input)
        } else if (input.tagName === "DIV") {
            const options = collectionToArray(input.getElementsByTagName('li'))
            newInput = await generateNewSelect(input, options)
            input = input.getElementsByTagName('input')[1]
        }
        const newElement = generateNewElement(i, input, label, newInput, deleteAditionalForm)
        formElements.push(newElement)
    }

    const newForm = generateNewForm(nextAditionalFormKey, formElements)
    await addANewForm(newForm)
    monitorProductSelects()
}

const AditionalForms = ({ aditionalForms }) => {
    return (
        <div className="card col-sm">
            <div id="aditionalFormsContainer">
                {aditionalForms}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    aditionalForms: state.aditionalForms
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AditionalForms)
