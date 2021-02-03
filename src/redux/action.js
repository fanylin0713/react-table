export const setPlace = (data) => {
    return {
        type: 'SET_PLACE',
        payload: {
            data: data,
        }
    }
}

export const setDialogOpen = (open) => {
    return {
        type: 'SET_DIALOG_OPEN',
        payload: {
            open: open,
        }
    }
}

export const SET_PLACE = setPlace().type;
export const SET_DIALOG_OPEN = setDialogOpen().type;