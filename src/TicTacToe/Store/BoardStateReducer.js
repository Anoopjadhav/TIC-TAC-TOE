
let initialState = {
    currentTurn: 'X',
    boardState: []
}

function returnNewEmptyArr() {
    let initBoardState = new Array(9).fill('');
    initBoardState = initBoardState.map((ele, index) => {
        return {
            value: '',
            index: index
        }
    })

    return [...initBoardState]
}


initialState.boardState = returnNewEmptyArr();

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SETVALUE':
            let index = parseInt(action.data.index);
            let tempBoardState = [...state.boardState];

            tempBoardState.forEach(ele => {
                if (ele.index === index) {
                    ele.value = state.currentTurn;
                }
            })

            let changedCurrentTurn;

            if (state.currentTurn === 'X') {
                changedCurrentTurn = 'O'
            } else if (state.currentTurn === 'O') {
                changedCurrentTurn = 'X'
            } else {
                changedCurrentTurn = ''
            }

            return {
                currentTurn: changedCurrentTurn,
                boardState: tempBoardState
            }

        case 'INITBOARD':
            console.log(returnNewEmptyArr());
            return {
                currentTurn: 'X',
                boardState: returnNewEmptyArr()
            }
        default:
            return state
    }
}

export default reducer;