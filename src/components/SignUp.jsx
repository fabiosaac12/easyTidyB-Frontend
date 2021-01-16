import React, { useRef } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import Welcome from './Welcome';
import { verifyUsername, verifyPassword, verifyPasswordConfirmation, request, showFixes, cleanParagraphs, switchLanguage } from '../helpers/functions';
import { logIn } from '../store/workspaceActions';
import sha256 from 'sha256';
import translations from '../helpers/translations';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLanguage } from '@fortawesome/free-solid-svg-icons'

const SignUp = ({ userID, logIn }) => {
    const lang = useSelector(state => state.language)
    const fetching = useRef(false)
    const dispatch = useDispatch();

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const passwordConfirmation = document.getElementById("passwordConfirmation").value;
        
        const verifications = {
            username: verifyUsername(username, lang),
            password: verifyPassword(password, lang),
            passwordConfirmation: verifyPasswordConfirmation(password, passwordConfirmation, lang)
        }
        const paragraphs = {
            username: document.getElementById("usernameFixes"),
            password: document.getElementById("passwordFixes"),
            passwordConfirmation: document.getElementById("passwordConfirmationFixes")
        }
        cleanParagraphs(paragraphs)
        
        if (verifications.username.length > 0 || verifications.password.length > 0 || verifications.passwordConfirmation.length > 0) {
            for (const key in verifications) {
                showFixes(paragraphs[key], verifications[key])
            }
            return
        }
        
        document.getElementById('chargingDiv').style.display = 'block'
        
        const user = {
            username,
            password: sha256(password)
        }
        const init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
        const url = `${process.env.REACT_APP_API_URL}/signup`;
        let response
        if (!fetching.current) {
            fetching.current = true
            response = await request(url, init)
            fetching.current = false
        } else return alert(translations[lang].alert.operationInProcess)

        cleanParagraphs(paragraphs)
        if (response['message'] === 'Database error') {
            showFixes(paragraphs['username'], [response['message']])
            document.getElementById('chargingDiv').style.display = 'none'
        } else if (response['id']) {
            logIn({ username: response.username, userID: response.id })
        } else {
            if (response.message === 'Repeated data') {
		showFixes(paragraphs['username'], [translations[lang].corrections.usernameNotAvailable])
            }
            document.getElementById('chargingDiv').style.display = 'none'
        }
    }
    if (userID) {
        return <Redirect to={{ pathname: "/" }} />
    } else {
        return <div className="container">
            <div className="row">
                <div className="col-md-5"><div className="card p-2">
			<div className='d-block'>
			    <h2 style={{float:'left'}}><small>{translations[lang].log.signUpTitle}</small></h2>
			    <FontAwesomeIcon id='langButton' className='langButton' onClick={() => switchLanguage(lang, dispatch)} name={lang==='es' ? 'en' : 'es'} icon={faLanguage} />
			</div>
                    <form className="mt-4" id="mainForm">
                        <div className="form-group">
			    <label htmlFor="username">{translations[lang].log.user}</label>
                            <input type="text" className="form-control" id="username" required={true} placeholder="miusuario"></input>
                            <p className="correctionsP"><small id="usernameFixes"></small></p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{translations[lang].log.pass}</label>
                            <input type="password" className="form-control" id="password" required={true} placeholder="miclave8"></input>
                            <p className="correctionsP"><small id="passwordFixes"></small></p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordConfirmation">{translations[lang].log.passConfirmation}</label>
                            <input type="password" className="form-control" id="passwordConfirmation" required={true} placeholder="miclave8"></input>
                            <p className="correctionsP"><small id="passwordConfirmationFixes"></small></p>
                        </div>
                        <div className='mb-3' id='chargingDiv' style={{ width: "50px", height: "50px", margin: 'auto', display: 'none' }}>
                            <img src="https://github.com/fabiosaac12/easyTidyB-Frontend/blob/master/src/styles/chargingImageGandB.png?raw=true" style={{ maxHeight: '100%', maxWidth: '100%' }} className="imgr" alt='chargingImgagen'></img>
                        </div>
                        <button className="btn btn-block btn-success" onClick={handleSubmitClick}>{translations[lang].log.signUp}</button>
                        <Link className="btn btn-block btn-info" to="/login">{translations[lang].log.haveAccount}</Link>
                    </form>
                </div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
