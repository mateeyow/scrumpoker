import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from 'utils/hooks'
import Container from 'components/Container'
import Card from 'components/card/Card'
import HTMLTitle from 'components/HTMLTitle'
import cardTypes from 'constants/cardTypes'

// TODO: Ask user to set name if no name is found on localStorage
const Member = () => {
  const { roomId } = useParams()
  const [room, isLoading, error] = useFetch(`room/${roomId}`)
  const cards = room?.type ? cardTypes[room.type] : []

  if (error?.response?.status === 404) {
    return <h1>Not Found</h1>
  }

  if (isLoading || !room) {
    return null
  }

  return (
    <div className='prose max-w-none flex flex-col items-center'>
      <HTMLTitle title={room.title} />
      <h1 className='py-8'>{room.title}</h1>

      <Container className='lg:w-10/12'>
        <div className='flex justify-around w-full flex-wrap'>
          {cards.map((card, idx) => (
            <Card key={idx} score={card.score} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Member
