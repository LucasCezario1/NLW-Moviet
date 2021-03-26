import Head from 'next/head';
import {GetServerSideProps} from 'next'

import { CompletedChallengs } from '../components/CompleteChallenges';
import { ExpericeBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import {Countdown} from '../components/Countdown'

import styles from '../styles/page/home.module.css'
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
      level: number, 
      currentExperience: number,
      challengesCompleted: number
}

export default function Home(props:HomeProps ) {
  return (
    <ChallengesProvider 
    level ={props.level}
    currentExperience = {props.currentExperience}
    challengesCompleted = {props.challengesCompleted}
    
    >
   <div className={styles.container}>
     <Head>
       <title>Inicio | Move.it</title>
     </Head>
     <ExpericeBar />

    <CountdownProvider>
     <section>
       <div>
      <Profile />
      <CompletedChallengs />
      <Countdown />
       </div>
       <div>
        
        <ChallengeBox />
       </div>
     </section>
     </CountdownProvider>
    </div>
    </ChallengesProvider>
  )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level , currentExperience , challengesCompleted} = ctx.req.cookies ;

  return{
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

