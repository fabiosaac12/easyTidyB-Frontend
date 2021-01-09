import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { verifyUsername, verifyPassword, request, cleanParagraphs, showFixes } from '../helpers/functions';
import { logIn } from '../store/workspaceActions';
import Welcome from './Welcome';
import { verifyResponse } from '../helpers/logSystemActions'
import sha256 from 'sha256';

const LogIn = ({ logIn, userID }) => {
    const fetching = useRef(false)
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        const verifications = {
            username: verifyUsername(username),
            password: verifyPassword(password)
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
        const url = `http://${process.env.REACT_APP_API_URL}/login`;
        let response
        if (!fetching.current) {
            fetching.current = true
            response = await request(url, init)
            fetching.current = false
        } else return alert('Su operación está en proceso.')
        
        cleanParagraphs(paragraphs)
        if (response['message'] === 'Database error') {
            showFixes(paragraphs['username'], [response['message']])
        }
        else if (response['userID'] === false) {
            showFixes(paragraphs['username'], ['Nombre de usuario o clave de acceso incorrecto'])
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
                        <h2><small>Iniciar sesion</small></h2>
                        <form className="mt-4" id="mainForm">
                            <div className="form-group">
                                <label htmlFor="username">Nombre de usuario</label>
                                <input type="text" className="form-control" id="username" required={true} placeholder="miusuario"></input>
                                <p className="correctionsP"><small id="usernameFixes"></small></p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Clave de acceso</label>
                                <input type="password" className="form-control" id="password" required={true} placeholder="miclave8*"></input>
                                <p className="correctionsP"><small id="passwordFixes"></small></p>
                            </div>
                            <div className='mb-3' id='chargingDiv' style={{width:"50px", height:"50px", margin:'auto', display:'none'}}>
                                <img src="https://github.com/fabiosaac12/easyTidyB-Frontend/blob/master/src/styles/chargingImageGandB.png?raw=true" style={{maxHeight:'100%', maxWidth:'100%'}} className="imgr" alt='chargingImgagen'></img>
                            </div>
                            <button className="btn btn-block btn-success" onClick={handleSubmitClick}>Iniciarse</button>
                            <Link className="btn btn-block btn-info" to="/signup">No tienes una cuenta?</Link>
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
