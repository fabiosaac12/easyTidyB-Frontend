export const changeSection = (payload) => ({
    type: 'CHANGE_SECTION',
    payload
})

export const changeLanguage = (payload) => ({
    type: 'CHANGE_LANGUAGE',
    payload
})

export const hidePopUpDiv = (payload) => {
    try {
        const bodyDiv = document.getElementById("bodyDiv")
        payload.hidePopUpDiv ? bodyDiv.style.filter = "none" : bodyDiv.style.filter = "blur(2px)"
    } catch{}
    return {
        type: 'HIDE_POPUPDIV',
        payload
    }
}

export const setPopUpDivContent = (payload) => ({
    type: 'SET_POPUPDIV_CONTENT',
    payload
})

export const setUpdateMainTable = (payload) => ({
    type: 'SET_UPDATE_MAIN_TABLE',
    payload
})

export const setCleanMainTable = (payload) => ({
    type: 'SET_CLEAN_MAIN_TABLE',
    payload
})

export const addANewForm = (payload) => ({
    type: 'ADD_A_NEW_FORM',
    payload
})

export const deleteAditionalForm = (payload) => ({
    type: 'DELETE_A_ADITIONAL_FORM',
    payload
})

export const resetAditionalForms = (payload) => ({
    type: 'RESET_ADITIONAL_FORMS',
    payload
})

export const addConsultSelectDataFunction = (payload) => ({
    type: 'SET_CONSULT_SELECTS_DATA',
    payload
})

export const resetConsultSelectsData = () => ({
    type: 'RESET_CONSULT_SELECTS_DATA'
})

export const setResetAllFunction = (payload) => ({
    type: 'SET_RESET_ALL_FUNCTION',
    payload
})

export const setDoTableSearchFunction = (payload) => ({
    type: 'SET_DO_TABLE_SEARCH_FUNCTION',
    payload
})

export const setResetProductsOptions = (payload) => ({
    type: 'SET_RESET_PRODUCTS_OPTIONS',
    payload
})

export const logIn = (payload) => ({
    type: 'LOG_IN',
    payload
})

export const addCharge = () => ({
    type: 'ADD_CHARGE'
})

export const removeCharge = () => ({
    type: 'REMOVE_CHARGE'
})

export const addSetModifyModeFunction = (payload) => ({
    type: 'ADD_SET_MODIFY_MODE_FUNCTION',
    payload
})

export const addResetInModifyModeFunction = (payload) => ({
    type: 'ADD_RESET_IN_MODIFY_MODE_FUNCTION',
    payload
})

export const alterInModifyMode = (payload) => ({
    type: "ALTER_IN_MODIFY_MODE",
    payload
})
