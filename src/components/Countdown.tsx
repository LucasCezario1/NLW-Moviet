import { useState , useEffect, useContext } from 'react'
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'




export function Countdown(){
 
  const { 
     minutes ,
     seconds , 
     hasFinished , 
     startCountdown , 
     resetCountdown , 
     isActive} = useContext(CountdownContext)

  const [minutesLeft , minutesRight] = String(minutes).padStart(2,'0').split('');  
  const [secondsLeft , secondsRight] = String(seconds).padStart(2,'0').split(''); 

 

  return(

    <div>
    <div className={styles.countdownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>

        </div>
        <span>:</span>

        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
    </div>

    {hasFinished ? (
    <button 
    disabled
      className={styles.countdownButton}
      >
      Ciclo Terminado
      
    </button>

    ) : (
      <>
       {isActive ? (
        <button 
        type="button"
          className={`${styles.countdownButton}  ${styles.countdownButtonActive}`}
          onClick={resetCountdown}
          >
          Abondonar ciclo
          
        </button>
    ) :(
      <button 
      type="button"
       className={styles.countdownButton}
       onClick={startCountdown}
       >
        Iniciar um ciclo
        
      </button>
    )}

   
      </>
    )}

   


    
   
    </div>
  )
}