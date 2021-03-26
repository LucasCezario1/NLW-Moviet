import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompleteChallenges.module.css'

export function CompletedChallengs(){
  const {challengsCompleted } = useContext(ChallengesContext)

  return(
    <div className={styles.completeChallengesContainer}>
      <span>Dessafios Completos</span>
      <span>{challengsCompleted}</span>
    </div>
  )
  
}