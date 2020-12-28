import styles from './index.module.css'
import Block from './Block'
import Popover from '../Components/Popover'

import * as actions from '../Store/Actions'
import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'

const Board = (props) => {

    let [confirmationText, setConfirmationText] = useState();
    let [playerWon, setPlayerWon] = useState();
    let [showPopover, setShowPopover] = useState();
    useEffect(() => {
        console.log('Init Board')
        props.initBoard();

    }, [])


    function getCurrentBoard() {
        let tempBoardArr = new Array(9).fill('');
        props.boardState.forEach(ele => {
            tempBoardArr[ele.index] = ele.value;
        })
        return tempBoardArr;
    }
    function checkIfWon(tempBoardArr) {
        try {
            //// X values
            if (tempBoardArr[0] === 'X' && tempBoardArr[1] === 'X' && tempBoardArr[2] === 'X') return 'X';
            if (tempBoardArr[0] === 'X' && tempBoardArr[4] === 'X' && tempBoardArr[8] === 'X') return 'X';
            if (tempBoardArr[0] === 'X' && tempBoardArr[3] === 'X' && tempBoardArr[6] === 'X') return 'X';
            if (tempBoardArr[1] === 'X' && tempBoardArr[4] === 'X' && tempBoardArr[7] === 'X') return 'X';
            if (tempBoardArr[2] === 'X' && tempBoardArr[4] === 'X' && tempBoardArr[6] === 'X') return 'X';
            if (tempBoardArr[2] === 'X' && tempBoardArr[5] === 'X' && tempBoardArr[8] === 'X') return 'X';
            if (tempBoardArr[3] === 'X' && tempBoardArr[4] === 'X' && tempBoardArr[5] === 'X') return 'X';
            if (tempBoardArr[6] === 'X' && tempBoardArr[7] === 'X' && tempBoardArr[8] === 'X') return 'X';

            //// O values
            if (tempBoardArr[0] === 'O' && tempBoardArr[1] === 'O' && tempBoardArr[2] === 'O') return 'O';
            if (tempBoardArr[0] === 'O' && tempBoardArr[4] === 'O' && tempBoardArr[8] === 'O') return 'O';
            if (tempBoardArr[0] === 'O' && tempBoardArr[3] === 'O' && tempBoardArr[6] === 'O') return 'O';
            if (tempBoardArr[1] === 'O' && tempBoardArr[4] === 'O' && tempBoardArr[7] === 'O') return 'O';
            if (tempBoardArr[2] === 'O' && tempBoardArr[4] === 'O' && tempBoardArr[6] === 'O') return 'O';
            if (tempBoardArr[2] === 'O' && tempBoardArr[5] === 'O' && tempBoardArr[8] === 'O') return 'O';
            if (tempBoardArr[3] === 'O' && tempBoardArr[4] === 'O' && tempBoardArr[5] === 'O') return 'O';
            if (tempBoardArr[6] === 'O' && tempBoardArr[7] === 'O' && tempBoardArr[8] === 'O') return 'O';

             //check if game complete
             let isGameComplete = checkIfGameComplete(tempBoardArr)

             if (isGameComplete) {
                 setTimeout(() => {
                     setConfirmationText('It was a Draw. Do you want to restart the game?')
                     setShowPopover(true);
                 }, 800);
             }

        } catch (e) {
            console.log(e);
        }
    }
    function checkIfGameComplete(tempBoardArr) {
        let isGameComplete = true;
        tempBoardArr.forEach(ele => {
            if (ele === '')
                isGameComplete = false;
        })
        return isGameComplete;
    }

    function blockClickHandler(evt) {
        try {

            let clickedElementIndex = parseInt(evt.currentTarget.dataset.index);

            if (props.boardState[clickedElementIndex].value === '') {
                props.setValue(clickedElementIndex);
            }

            let tempBoardArr = getCurrentBoard();

            let checkIfWonFlag = checkIfWon(tempBoardArr);

            if (checkIfWonFlag === 'X' || checkIfWonFlag === 'O') {
                setPlayerWon(checkIfWonFlag);
                setTimeout(() => {
                    setConfirmationText(`${checkIfWonFlag} won the Game. Do you want to restart?`)
                    setShowPopover(true);
                }, 800);
            }

        } catch (e) {
            console.log(e);
        }
    }
    function confirmhandler() {
        props.initBoard();
        setPlayerWon('');
        setShowPopover(false);
    }
    function cancelHandler() {
        props.initBoard();
        setPlayerWon('');
        setShowPopover(false);
    }
    return (
        <React.Fragment>
            <div className={styles.boardTurnText}>{`${props.currentTurn}'s turn`}</div>
            <div className={styles.boardWrapper}>
                {
                    props.boardState !== undefined && props.boardState.map((ele, index) => {
                        return <Block key={ele.index} index={ele.index} type={ele.value} onClick={blockClickHandler}></Block>
                    })
                }
            </div>
            <div className={styles.codeText}>
                <div>Send this code to your friend if you are playing this online.</div>
                <div>1050</div>
            </div>
            { showPopover && <Popover confirmationText={confirmationText} confirmHandler={confirmhandler} cancelHandler={cancelHandler} confirmText="Yes, Restart" cancelText="Exit" />}
        </React.Fragment>
    )
}


const mapStoreToProps = (store) => {
    return {
        currentTurn: store.BoardS.currentTurn,
        boardState: store.BoardS.boardState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        initBoard: () => dispatch(actions.initBoard()),
        setValue: (index, value) => dispatch(actions.setValue(index))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Board);