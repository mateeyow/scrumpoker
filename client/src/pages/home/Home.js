import React from 'react'
import HTMLTitle from '../../components/HTMLTitle'
import Container from '../../components/Container'
import CreateRoom from './CreateRoom'
import './home.css'
import JoinRoom from './JoinRoom'

const Home = () => {
  return (
    <div className='prose max-w-none flex flex-col items-center'>
      <HTMLTitle title='Create/Join Room' />
      <h1 className='uppercase text-center py-6'>
        <a href='/'>SCRUM Poker</a>
      </h1>

      <Container>
        <CreateRoom />
      </Container>

      <hr className='relative w-full lg:w-6/12 divider' />

      <Container>
        <JoinRoom />
      </Container>
    </div>
  )
}

export default Home
