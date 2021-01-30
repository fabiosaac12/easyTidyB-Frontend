import { createStore } from 'redux';
import React from 'react'

const initialState = {
    language: 'es',
    accessToken: false,
    username: false,
    section: '',
    hidePopUpDiv: true,
    popUpDivContent: <div></div>,
    updateMainTable: () => null, 
    aditionalForms: [],
    nextAditionalFormKey: 1,
    consultSelectsData: [],
    charging: 0,
    resetAll: () => null,
    doTableSearch: () => null,
    resetProductsOptions: () => null,
    cleanMainTable: () => null,
    setModifyModeFunctions: [],
    inModifyMode: 0,
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
	case "CHANGE_LANGUAGE":
        case "CHANGE_SECTION":
        case "HIDE_POPUPDIV":
        case "SET_POPUPDIV_CONTENT":
        case "SET_UPDATE_MAIN_TABLE":
        case "SET_CLEAN_MAIN_TABLE":
        case "SET_RESET_ALL_FUNCTION":
        case "SET_DO_TABLE_SEARCH_FUNCTION":
        case "SET_RESET_PRODUCTS_OPTIONS":
        case "LOG_IN":
        case "RESET_ADITIONAL_FORMS":
            return { ...state, ...payload }

        case "ADD_A_NEW_FORM":
            return { ...state, aditionalForms: [...state.aditionalForms, payload], nextAditionalFormKey: state.nextAditionalFormKey + 1 }
        case "DELETE_A_ADITIONAL_FORM":
            return { ...state, aditionalForms: state.aditionalForms.filter(form => form.key !== payload) }
        case "SET_CONSULT_SELECTS_DATA":
            return { ...state, consultSelectsData: [...state.consultSelectsData, payload] }
        case "RESET_CONSULT_SELECTS_DATA":
            return { ...state, consultSelectsData: [] }
        case "ADD_CHARGE":
            return { ...state, charging: state.charging+1 }
        case "REMOVE_CHARGE":
            return { ...state, charging: state.charging-1 }
        case "ADD_SET_MODIFY_MODE_FUNCTION":
            return { ...state, setModifyModeFunctions: [...state.setModifyModeFunctions, payload] }
	case "ALTER_IN_MODIFY_MODE":
	    const newInMM = payload === 0 ? 0 : state.inModifyMode + payload;
	    return { ...state, inModifyMode: newInMM }
        default:
            return state
    }
}

export default createStore(reducer)
