import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import translations from '../helpers/translations';
import {hidePopUpDiv, alterInModifyMode as alterInModifyModeDispatch, setPopUpDivContent} from '../store/actions';
import { resetAllModifyModes } from './Tr'

const PopUpDiv = ({hide, content, setHide, updateMainTable, section}) =>  {

    const what = content.props.what

    const dispatch = useDispatch()
    const lang = useSelector(state => state.language)
    const setModifyModeFunctions = useSelector(state => state.setModifyModeFunctions)
    const alterInModifyMode = (num) => {
	dispatch(alterInModifyModeDispatch(num))
    }
    
    const resetPopUpDivContent = () => {
	dispatch(setPopUpDivContent({popUpDivContent: <div></div>}))
    }

    const handleCloseClick = () => {
        setHide({hidePopUpDiv: true});
	resetPopUpDivContent()
	if (what === 'Table') {
	    updateMainTable();
	    resetAllModifyModes(setModifyModeFunctions)
	    alterInModifyMode(0)
	}
    }

    let title = ''

    try {
	switch(what) {
	    case 'Table':
		const rows = content.props.rows[0]
		title = <div style={{padding: '0px 0px 11px 20px'}}>
		    <h5 className='m-auto font-weight-bold' >{section==='Products' ? translations[lang].popUpDiv.titleProducts(rows['name'], rows['char1'], rows['char2']) : translations[lang].popUpDiv.titleSales(rows['client'], rows['date'])}</h5>
		</div>
		break
	    case 'addClient':
		title = <div style={{paddingLeft: '20px'}}><h5>{translations[lang].form.addClients}</h5></div>
		break
	    default:
		title = <div></div>
	}
    } catch {}
    
    return <div id="PopUpDiv" className={hide===true ? "bg-dark mh-100 p-3 d-none" : "bg-dark mh-100 p-3"}>
        <div className="row w-100">
            <button className='btn btn-danger ml-auto mb-2 btn-lg' onClick={handleCloseClick}></button>
        </div>
        <div className="row w-100">
            {title}
        </div>
        {content}
    </div>
}


const mapStateToProps = (state) => ({
    hide: state.hidePopUpDiv,
    content: state.popUpDivContent,
    updateMainTable: state.updateMainTable,
    section: state.section
});

const mapDispatchToProps = {
    setHide: hidePopUpDiv
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUpDiv);
