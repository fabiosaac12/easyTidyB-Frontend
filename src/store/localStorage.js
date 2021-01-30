export const loadState = () => {
    try {
	const serializedState = localStorage.getItem('state');
	if (!serializedState) {
	    return {}
	}
	return JSON.parse(serializedState)
    }
    catch { return {} }
}

export const saveState = (state) => {
    try {
	const serializedState = JSON.stringify(state);
	localStorage.setItem('state', serializedState)
    } catch { }
}
