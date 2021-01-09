import React from 'react';
import {removeAccents} from '../helpers/functions';
import {setDoTableSearchFunction} from '../store/workspaceActions'
import { connect } from 'react-redux';

const Searcher = ({setDoTableSearchFunction}) => {

    const doSearch = (e) => {
        let whatSearch = removeAccents(e.target.value.toLowerCase());
        let trs = e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        if (trs.length < 2) {
            return
        }
        
        for (let i = 0; i < trs.length; i++) {
            let tr = trs[i];
            let found = false;
            let tds = tr.getElementsByClassName('toSearch');
            
            for (let i = 0; i < tds.length; i++) {
                let tdValue = removeAccents(tds[i].innerHTML.toLowerCase());
                if ((whatSearch.length === 0) || (tdValue.indexOf(whatSearch)>-1)) {
                    found = true
                }
            }
            if (found) {
                tr.style.display = '';
            } else {
                tr.style.display = 'none';
            }
        }
    }

    setDoTableSearchFunction({doTableSearch: doSearch})

    return <form className="w-75 mb-2 container">
        <div className="form-row">
            <div className="col-md-4"></div>
			<div className="col-md-4"></div>
			<div className="col-md-4">
				<input className="form-control" id="searcher" placeholder="Buscar en la tabla..." onChange={doSearch} type="text"/>
			</div>
        </div>
    </form>
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    setDoTableSearchFunction
}


export default connect(mapStateToProps, mapDispatchToProps)(Searcher)
