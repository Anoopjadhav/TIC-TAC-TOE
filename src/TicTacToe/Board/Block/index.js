import styles from './index.module.css'
import React from 'react'

const Block = (props) => {
    return (
        <div data-index={props.index} className={`${styles.block} ${styles[props.type]}`} onClick={props.onClick}>
                <React.Fragment>
                    { props.type === 'O' && <div className={styles.zeroIcon} />} 
                    { props.type === 'X' && <div className={styles.crossIcon} />}
                </React.Fragment>
            
        </div>
    )
}

export default Block;