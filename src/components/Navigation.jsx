import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import translations from '../helpers/translations';
import { alterInModifyMode, logIn } from '../store/workspaceActions';
import {request, switchLanguage} from '../helpers/functions.js';
import data from '../helpers/data';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLanguage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const resetData = () => {
    for (let d in data) {
	data[d] = []
    }
}

const Navigation = ({ section, resetAll, cleanMainTable }) => {
    const dispatch = useDispatch()
    const lang = useSelector(state => state.language);
    const accessToken = useSelector(state => state.accessToken)
    
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        resetAll();
        if (section !== 'dashboard') {
            cleanMainTable()
        }
	dispatch(alterInModifyMode(0))
    }

    const logOut = () => {
        const url = `${process.env.REACT_APP_API_URL}/logout`;
	const init = {
	    method: 'DELETE'
	}
	request(url, accessToken, init)
        dispatch(
            logIn({
		accessToken: false, 
		username: false,
		section: '',
		hidePopUpDiv: true,
		popUpDivContent: <div></div>,
		updateMainTable: () => null, 
		aditionalForms: [],
		consultSelectsData: [],
		resetAll: () => null,
		doTableSearch: () => null,
		resetProductsOptions: () => null,
		cleanMainTable: () => null,
		setModifyModeFunctions: [],
		inModifyMode: 0,
            })
        );
        resetData();
    };

    return (
        <nav style={{minWidth: '249px'}} className="navbar navbar-expand-md fixed-top navbar-dark bg-dark p-0">
            <div className="container">
                <Link style={{ textDecoration: 'none' }} onClick={() => handleClick()} to='/'>
                    <button className="btn navbar-brand"><h2>Easy Tidy B</h2></button>
                </Link>
                <button className="navbar-toggler border-0 ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation" aria-haspopup="true" aria-expanded="true">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" style={{height: '58px'}} id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto h-100">
                        {['Suppliers', 'Orders', 'Products','Clients', 'Sales'].map((ele, i) => {
                            if (ele === section) {
                                return <NavLink key={i} to={`/workspace/${ele}`}>
                                    <button className="btn nav-link active"><h4><small>{translations[lang].words[ele]}</small></h4></button>
                                </NavLink>
                            } else {
                                return <NavLink key={i} to={`/workspace/${ele}`}>
                                    <button className="btn nav-link" onClick={() => handleClick()}><h4><small>{translations[lang].words[ele]}</small></h4></button>
                                </NavLink>
                            }
                        })}
			<li className="nav-item dropdown">
			    <button className="nav-link btn dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><h4><small></small></h4></button>
			    <div className="dropdown-menu bg-dark dropdown-menu-right" aria-labelledby="navbarDropdown">
				<button onClick={() => switchLanguage(lang, dispatch)} id='langButton' name={lang==='es' ? 'en' : 'es'} className="btn dropdown-item" >{translations[lang].nav.switchLang}<FontAwesomeIcon icon={faLanguage} style={{color: '#17a2b8', marginLeft: '10px', fontSize:'1.9rem', verticalAlign: '-0.65rem'}}/></button>
				<button onClick={logOut} className="btn dropdown-item" style={{color:'#d6463c', textAlign: 'right'}}>{translations[lang].nav.logOut}<FontAwesomeIcon icon={faSignOutAlt} style={{fontSize:'1.5rem', marginRight:'6px', marginLeft:'1.25rem', verticalAlign: '-0.4rem', float:'right'}}/></button>
			    </div>
		      </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    section: state.section,
    resetAll: state.resetAll,
    cleanMainTable: state.cleanMainTable
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
