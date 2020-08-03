import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from 'utils/hooks'
import Container from 'components/Container'
import Card from 'components/card/Card'
import HTMLTitle from 'components/HTMLTitle'
import cardTypes from 'constants/cardTypes'
import Modal from 'components/modal/Modal'
import Input from 'components/forms/Input'
import Label from 'components/texts/Label'
import Button from 'components/buttons/Button'

// TODO: Ask user to set name if no name is found on localStorage
const Member = () => {
  const { roomId } = useParams()
  const [room, isLoading, error] = useFetch(`room/${roomId}`)
  const [nameValue, setNameValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const cards = room?.type ? cardTypes[room.type] : []

  const saveName = () => {
    localStorage.setItem('name', nameValue)
    setIsOpen(false)
  }

  useEffect(() => {
    const name = localStorage.getItem('name')
    if (!name) {
      setIsOpen(true)
    }
  }, [])

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
            <div className='w-1/4 mt-6' key={idx}>
              <Card score={card.score} />
            </div>
          ))}
        </div>
      </Container>
      <Modal
        isOpen={isOpen}
        title='Name Required!'
        buttons={
          <Button size='sm' onClick={saveName}>
            Save
          </Button>
        }
        divider={false}
      >
        <div className='w-full'>
          <Label>Name:</Label>
          <Input
            name='name'
            placeholder='Juan'
            autoFocus
            onChange={(evt) => setNameValue(evt.target.value)}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Member
