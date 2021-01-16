import React, { useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { verifyUsername, verifyPassword, request, cleanParagraphs, showFixes, switchLanguage } from '../helpers/functions';
import { logIn } from '../store/workspaceActions';
import Welcome from './Welcome';
import { verifyResponse } from '../helpers/logSystemActions'
import sha256 from 'sha256';
import translations from '../helpers/translations';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLanguage } from '@fortawesome/free-solid-svg-icons'

const LogIn = ({ logIn, userID }) => {
    const fetching = useRef(false)
    const lang = useSelector(state => state.language)
    const dispatch = useDispatch();

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        const verifications = {
            username: verifyUsername(username, lang),
            password: verifyPassword(password, lang)
        }
        const paragraphs = {
            username: document.getElementById("usernameFixes"),
            password: document.getElementById("passwordFixes")
        }
        cleanParagraphs(paragraphs)
        
        if (verifications.username.length > 0 || verifications.password.length > 0) {
            verifyResponse(verifications, paragraphs)
            return
        }
        
        document.getElementById('chargingDiv').style.display='block'
        
        const user = {
            username,
            password: sha256(password)
        }
        const init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
        const url = `${process.env.REACT_APP_API_URL}/login`;
        let response
        if (!fetching.current) {
            fetching.current = true
            response = await request(url, init)
            fetching.current = false
        } else return alert(translations[lang].alert.operationInProcess)
        
        cleanParagraphs(paragraphs)
        if (response['message'] === 'Database error') {
            showFixes(paragraphs['username'], [response['message']])
        }
        else if (response['userID'] === false) {
            showFixes(paragraphs['username'], [translations[lang].corrections.wrongUserPass])
            document.getElementById('chargingDiv').style.display='none'
        } else {
            logIn(response)
        }
    }

    if (userID) {
        return <Redirect to={{ pathname: "/" }} />
    } else {
        return <div className="container">
	    <div className="row">
                <div className="col-md-5">
                    <div className="card p-2">
			<div className='d-block'>
			    <h2 style={{float:'left'}}><small>{translations[lang].log.logInTitle}</small></h2>
			    <FontAwesomeIcon style={{color: '#17a2b8'}} id='langButton' className='langButton' onClick={() => switchLanguage(lang, dispatch)} name={lang==='es' ? 'en' : 'es'} icon={faLanguage} />
			</div>
                        <form className="mt-4" id="mainForm">
                            <div className="form-group">
                                <label htmlFor="username">{translations[lang].log.user}</label>
                                <input type="text" className="form-control" id="username" required={true} placeholder="miusuario"></input>
                                <p className="correctionsP"><small id="usernameFixes"></small></p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">{translations[lang].log.pass}</label>
                                <input type="password" className="form-control" id="password" required={true} placeholder="miclave8*"></input>
                                <p className="correctionsP"><small id="passwordFixes"></small></p>
                            </div>
                            <div className='mb-3' id='chargingDiv' style={{width:"50px", height:"50px", margin:'auto', display:'none'}}>
                                <img src="https://github.com/fabiosaac12/easyTidyB-Frontend/blob/master/src/styles/chargingImageGandB.png?raw=true" style={{maxHeight:'100%', maxWidth:'100%'}} className="imgr" alt='chargingImgagen'></img>
                            </div>
                            <button className="btn btn-block btn-success" onClick={handleSubmitClick}>{translations[lang].log.logIn}</button>
                            <Link className="btn btn-block btn-info" to="/signup">{translations[lang].log.haventAccount}</Link>
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <Welcome />
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    userID: state.userID
})

const mapDispatchToProps = {
    logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
