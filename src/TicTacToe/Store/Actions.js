
export const initBoard = () => {
    return { type: 'INITBOARD' }
}


export const setValue = (index) => {
    return { type: 'SETVALUE', data : {index} }
}