import React from "react";
import {useSelector} from "react-redux";
import translations from "../helpers/translations";
import '../styles/welcome.css'

const Welcome = () => {
    const lang = useSelector(state => state.language)

    return <div className="w-100 h-100">
	<div className="aCard">
	    <h2 id="title">Easy Tidy B</h2>
		<p className="appDescription" style={{color: '#06353d'}}><span>{translations[lang].welcome.description1}</span></p>
	    <p className="appDescription" style={{color: '#0b3d06'}}><span>{translations[lang].welcome.description2}</span></p>
	    <p className="appDescription" style={{color: '#06353d'}}><span>{translations[lang].welcome.description3}</span></p>
	</div>
	
	<div className="aCard">
	    <h4 id="howMadeTitle"><strong>{translations[lang].welcome.howMadeTitle}</strong></h4>
	    <ul>
		<li><a target="_blank" rel="noreferrer" href='https://github.com/fabiosaac12/easyTidyB-Frontend'>{translations[lang].welcome.frontendR}</a></li>
		<li><a target="_blank" rel="noreferrer" href='https://github.com/fabiosaac12/easyTidyB-API'>{translations[lang].welcome.apiR}</a></li>
		<li><a target="_blank" rel="noreferrer" href='https://github.com/fabiosaac12/easyTidyB-DB'>{translations[lang].welcome.dbR}</a></li>
	    </ul>
	</div>
    </div>
};

export default Welcome;
