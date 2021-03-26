import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import sytles from '../styles/components/Profile.module.css'

export function Profile(){
  const {level } = useContext(ChallengesContext)

  return(
    <div className={sytles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/49817182?s=460&u=e4c3d79b01ccc4151866aeb2b205f01d03dd9c76&v=4" alt="Lucas "/>
    <div>
  
      <strong>Luca Cezario</strong>
      <p>
        <img src="icons/level.svg" alt="Level"/>
        Level {level}
        </p>
      </div>
    </div>
  )
}