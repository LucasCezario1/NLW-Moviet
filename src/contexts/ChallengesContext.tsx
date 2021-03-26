import {createContext, useState , ReactNode, useEffect} from 'react'
import Coockies from 'js-cookie';
import chanllenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number

}

interface ChallengesContextData{
  level: number;
 startNewChallenge: () => void,
 currentExperience: number,
 challengsCompleted: number ,  
 levelUp: () => void,
 activeChallenge: Challenge
 resetChallenge: () => void,
 experienceToNextLevel: number,
 completeChallenge: () => void,
 closeLevelUpModal: () => void

}

interface ChallengesProviderProps{
  children: ReactNode;
  level: number; 
  currentExperience: number;
  challengesCompleted: number;
}





export const ChallengesContext = createContext({} as ChallengesContextData)



export function ChallengesProvider({ 
    children,
    ...rest
  }: ChallengesProviderProps){
  const [level , setLevel] = useState(rest.level ?? 1)
  const [currentExperience , setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengsCompleted , setChallengsCompleted] = useState(rest.challengesCompleted ?? 0)
  
  const [activeChallenge , setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen , setIsLevelUpModalOpen] = useState(false)


  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  } , [])

  useEffect(() => {
      Coockies.set('level' , String(level))
      Coockies.set('currentExperience' , String(currentExperience))
      Coockies.set('challengsCompleted' , String(challengsCompleted))
  } , [level , currentExperience , challengsCompleted])

  function levelUp(){
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }
  

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge(){
    const randomChanllengeIndex = Math.floor(Math.random() * chanllenges.length)
    const chanllenge = chanllenges[randomChanllengeIndex]

    setActiveChallenge(chanllenge)
    
    new Audio('/notification.mp3').play()
    
    if(Notification.permission === 'granted' ){
      new Notification('Novo Desafio ✨'  ,{
        body: `Valendo ${chanllenge.amount} xp` 
      })
    }
  }


  function resetChallenge(){
    setActiveChallenge(null)
  }


    function completeChallenge(){
        if(!activeChallenge){
          return;
        }

        const { amount } = activeChallenge
        
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
          finalExperience = finalExperience - experienceToNextLevel
          levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengsCompleted(challengsCompleted + 1)

      }


    return(
      <ChallengesContext.Provider 
      value={{
        level,
        experienceToNextLevel,
        activeChallenge , 
        startNewChallenge,
        currentExperience,
        challengsCompleted ,  
        levelUp,
        completeChallenge,
        resetChallenge,
        closeLevelUpModal
        
        }}>

        {children}
         { isLevelUpModalOpen && <LevelUpModal/>}

        
      </ChallengesContext.Provider>
    );

}