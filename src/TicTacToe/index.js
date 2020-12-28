import styles from './index.module.css'
import Logo from './Components/Logo'
import Board from './Board'

const TicTacToe = (props) => {
    return (
        <div className={styles.TicTacToeWrapper}>
            <Logo/>
            <Board/>
        </div>
    )
}

export default TicTacToe;