import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {simpleAddElement} from '../helpers/formsActions';
import {verifyFields} from '../helpers/functions';
import translations from '../helpers/translations';
import {addCharge, hidePopUpDiv, removeCharge, setPopUpDivContent} from '../store/workspaceActions';


const getData = (target) => {

    const inputs = target.parentNode.getElementsByTagName('input')
    const data = [{}]
    for (let i = 0; i < inputs.length; i++) {
	const input = inputs[i]
	data[0][input.getAttribute('name')] = input.value
    }
    return data
}

const PopUpAddClient = ({ input, lang, newClientName, setOptionsData }) => {
    const userID = useSelector(state => state.userID)
    const dispatch = useDispatch()

    const closePoUpDiv = () => {
	dispatch(hidePopUpDiv({hidePopUpDiv: true}))
	dispatch(setPopUpDivContent({popUpDivContent: <div></div>}))
    }

    const handleSubmit = async ({target}) => {
	const isCorrect = verifyFields('Clients', lang)
	if (!isCorrect) return
	const data = getData(target)
	dispatch(addCharge())
	const result = await simpleAddElement('Clients', data, userID, lang) 
	dispatch(removeCharge())

	if (result.isCorrect) {
	    input.value = data[0].name
	    input.parentNode.getElementsByTagName('input')[1].value = result.response.id
	    closePoUpDiv()
	    setOptionsData([])
	}
    }

    return <div>
	<div className='inputDiv' >
	    <input className='form-control w-auto mb-2 mt-2 name' name='name' placeholder={translations[lang].form.placeholders.name} defaultValue={newClientName} />
	    <p className={`correctionsP`}><small className='nameFixes'></small></p>
	</div>
	<div className='inputDiv' >
	    <input className='form-control w-auto mb-2 contact' name='contact' placeholder={translations[lang].form.placeholders.contact} />
	    <p className={`correctionsP`}><small className={'contactFixes'}></small></p>
	</div>
	<div className='inputDiv' >
	    <input className='form-control w-auto mb-3 place' name='place' placeholder={translations[lang].form.placeholders.place} />
	    <p className={`correctionsP`}><small className={'placeFixes'}></small></p>
	</div>
	    <button onClick={handleSubmit} className='btn btn-block btn-primary' >{translations[lang].words.register}</button>
    </div>
}

export default PopUpAddClient
