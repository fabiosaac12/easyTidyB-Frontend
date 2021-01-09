import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { sectionsES } from '../helpers/ES';
import { alterInModifyMode } from '../store/workspaceActions'

const Navigation = ({ section, resetAll, cleanMainTable }) => {
    const dispatch = useDispatch()
    
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        resetAll();
        if (section !== 'dashboard') {
            cleanMainTable()
        }
	dispatch(alterInModifyMode(0))
    }

    return (
        <nav style={{minWidth: '249px'}} className="navbar navbar-expand-md fixed-top navbar-light bg-light p-0">
            <div className="container">
                <Link style={{ textDecoration: 'none' }} onClick={() => handleClick()} to='/'>
                    <button className="btn navbar-brand"><h2>Easy Tidy B</h2></button>
                </Link>
                <button className="navbar-toggler border-0 ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {['Suppliers', 'Orders', 'Products','Clients', 'Sales'].map((ele, i) => {
                            if (ele === section) {
                                return <NavLink key={i} to={`/workspace/${ele}`}>
                                    <button className="btn nav-link active"><h4><small>{sectionsES[ele]}</small></h4></button>
                                </NavLink>
                            } else {
                                return <NavLink key={i} to={`/workspace/${ele}`}>
                                    <button className="btn nav-link" onClick={() => handleClick()}><h4><small>{sectionsES[ele]}</small></h4></button>
                                </NavLink>
                            }
                        })}
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
