import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import {hidePopUpDiv, alterInModifyMode as alterInModifyModeDispatch} from '../store/workspaceActions';
import { resetAllModifyModes } from './Tr'

const PopUpDiv = ({hide, content, setHide, updateMainTable, section}) =>  {
    const dispatch = useDispatch()
    const setModifyModeFunctions = useSelector(state => state.setModifyModeFunctions)
    const alterInModifyMode = (num) => {
	dispatch(alterInModifyModeDispatch(num))
    }
    const handleCloseClick = () => {
        setHide({hidePopUpDiv: true});
        updateMainTable();
        resetAllModifyModes(setModifyModeFunctions)
        alterInModifyMode(0)
    }

    let title = ''
    try {
        const rows = content.props.rows[0]
        title = <div style={{padding: '15px'}}>
            <h5 className='m-auto font-weight-bold' >{section==='Products' ? `Producto: ${rows['name']} ${rows['char1']} ${rows['char2']}` : `Venta a: ${rows['client']} el ${rows['date']}`}</h5>
        </div>
    } catch {}
    
    return <div id="PopUpDiv" className={hide===true ? "bg-dark mh-100 p-3 d-none" : "bg-dark mh-100 p-3"}>
        <div className="row w-100">
            <button className='btn btn-danger ml-auto mb-2 btn-lg' onClick={handleCloseClick}></button>
        </div>
        <div className="row w-100 mb-3">
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
