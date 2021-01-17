import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { removeAccents, getInnerText } from '../../helpers/functions'
import {hidePopUpDiv, setPopUpDivContent} from '../../store/workspaceActions'
import PopUpAddClient from '../PopUpAddClient'
import './main.css'

const FinderSelect = ({ elements, item, onClick, onChange, info, selectSection, setOptionsData }) => {
    const lang = useSelector(state => state.language)
    const dispatch = useDispatch()
    
    const handleInputOnSelect = async ({ target }) => {
        try {
            onClick()
        } catch{}
        const ul = target.parentNode.getElementsByTagName('ul')[0]
        ul.style.display = ''
    }
    
    const handleInputOnBlur = async ({ target }) => {
        const ul = target.parentNode.getElementsByTagName('ul')[0]
        ul.style.display = 'none'
        
        const lis = ul.getElementsByTagName('li')
        let match = false
        for (let i = 0; i < lis.length; i++) {
            const li = lis[i];
            const liText = getInnerText(li)
            if (liText === target.value) {
                match = true
            }
        }
        if (!match) {
	    if (selectSection === 'Clients') {
		const newClientName = target.value
		if (newClientName!=='') {
		    dispatch(setPopUpDivContent({popUpDivContent: <PopUpAddClient what='addClient' input={target} lang={lang} newClientName={newClientName} setOptionsData={setOptionsData} />}))
		    dispatch(hidePopUpDiv({ hidePopUpDiv: false }))
		}
	    }
	    target.value = ''
	    target.parentNode.getElementsByTagName('input')[1].value = ''
            doSearch({target})
        }
        
        try {
            if (selectSection!=='Clients') onChange({target}, lang)
        } catch(e){}
    }
    
    
    const doSearch = ({target}) => {
        const whereSearch = target.parentNode.getElementsByTagName('li')
        const whatSearch = removeAccents(target.value.toLowerCase());
        
        for (let i = 0; i < whereSearch.length; i++) {
            const li = whereSearch[i];
            const liText = removeAccents(getInnerText(li).toLowerCase());
            if ((whatSearch.length === 0) || (liText.indexOf(whatSearch)>-1)) {
                li.hidden = false
            } else {
                li.hidden = true
            }
        }
    }
    
    const handleLiOnClick = ({ target }) => {
        const label = getInnerText(target)
        const value = target.getElementsByTagName('span')[0].innerHTML
        const input = target.parentNode.parentNode.getElementsByTagName('input')[0]
        const hiddenInput = target.parentNode.parentNode.getElementsByTagName('input')[1]
        input.value = label
        hiddenInput.value = value
    }
    
    // trying
    const options = elements.map((e, i) => {
        return <li key={i} onMouseDown={handleLiOnClick} style={{display: e.display === false ? 'none' : ''}} className={`${item.name}LI selectLI`}>{e.label}
            <span hidden>{e.value}</span>
            <p className="selectInfoP">{e[info]}</p>
        </li>
    })

    return <div className={`${item.name}Div selectContainer input-group ${item.heritable}`} >
        <input className={`${item.name}Input selectInput ${item.className}`} placeholder={item.placeholder} onChange={doSearch} onSelect={handleInputOnSelect} onBlur={handleInputOnBlur} />
        <input name={item.name} className={`${item.name} inputData`} hidden={true}></input>
        <ul style={{ display: 'none' }} className={`${item.name}UL selectUL`}>
            {options}
        </ul>
    </div>
}

export default FinderSelect
