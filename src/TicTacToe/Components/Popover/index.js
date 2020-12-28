import styles from './Popover.module.css'
import Button from '../Button'
import { useState } from 'react'

const Popover = (props) => {

     useState(()=>{
        document.body.style.overflow = "hidden";
    },[])

    function confirmHandler(){
        try{
            document.body.style.overflow = "scroll";
            props.confirmHandler();
        }catch(e){
            document.body.style.overflow = "scroll";
            console.log(e);
        }
    }
    function cancelHandler(){
        try{
            document.body.style.overflow = "scroll";
            props.cancelHandler();
        }catch(e){
            document.body.style.overflow = "scroll";
            console.log(e);
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.elements}>
                <div className={styles.text}>
                    {props.confirmationText}
                </div>
                

                <Button className={styles.marginTop1} type="primary" onClick={confirmHandler}>{props.confirmText}</Button>
                <Button type="neutral" onClick={cancelHandler}>{props.cancelText}</Button>
            </div>
        </div>
    )
}
export default Popover;