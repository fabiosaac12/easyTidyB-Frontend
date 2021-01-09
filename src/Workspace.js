import Form from './components/Form';
import PopUpDiv from './components/PopUpDiv';
import Table from './components/Table';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { setResetAllFunction, resetAditionalForms, resetConsultSelectsData, hidePopUpDiv, changeSection } from './store/workspaceActions'
import { backToRegisterMode } from './components/ActionsButtons'
import { resetInputs, resetCorrectionPs } from './helpers/functions';
import { aSectionES } from './helpers/ES';
import ChargingImage from './components/ChargingImage';


const Workspace = ({ setResetAllFunction, resetAditionalForms, resetConsultSelectsData, doTableSearch, hidePopUpDiv, changeSection, userID }) => {
  const { section } = useParams()
  try {
    document.getElementById('formTitle').innerHTML = `Agregar ${aSectionES[section]}`;
  } catch { }

  useEffect(() => {
    changeSection({ section: section })
    setResetAllFunction({
      resetAll: async (changeSection = true) => {
        try {
          const registerButton = document.getElementById('registerButton');
          if (registerButton) if (registerButton.innerHTML === 'Modificar') {
            backToRegisterMode(section)
          }

          resetAditionalForms({ aditionalForms: [] })

          resetInputs(changeSection);
          resetCorrectionPs();

          hidePopUpDiv({ hidePopUpDiv: true })

          if (changeSection) {
            resetConsultSelectsData();
            if (document.getElementById('searcher')) doTableSearch({ target: document.getElementById('searcher') })
          }
        } catch (e) { console.log(e) }
      }
    })
  }, [setResetAllFunction, resetAditionalForms, resetConsultSelectsData, doTableSearch, hidePopUpDiv, section, changeSection])
  if (userID) {
    if (['Sales', 'Clients', 'Products', 'Orders', 'Suppliers'].includes(section)) {
      return <div>
        <div id="bodyDiv" className="container">
          <Form />
          <Table />
        </div>
          <ChargingImage />
          <PopUpDiv />
      </div>
    } else {
      return <Redirect to={{ pathname: "/workspace/Sales" }} />
    }
  } else {
    return <Redirect to={{ pathname: "/login" }} />
  }
}

const mapStateToProps = (state) => ({
  doTableSearch: state.doTableSearch,
  userID: state.userID
})

const mapDispatchToProps = {
  setResetAllFunction,
  resetAditionalForms,
  resetConsultSelectsData,
  hidePopUpDiv,
  changeSection
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);