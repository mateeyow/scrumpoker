import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Container from 'components/Container'
import Card from 'components/card/Card'
import HTMLTitle from 'components/HTMLTitle'
import cardTypes from 'constants/cardTypes'
import Modal from 'components/modal/Modal'
import Input from 'components/forms/Input'
import Label from 'components/texts/Label'
import Button from 'components/buttons/Button'
import { useFetch, useWS } from 'utils/hooks'
import { generateID, getName, sendAction } from 'utils/utils'
import actions from 'constants/actions'

const Member = () => {
  const { roomId } = useParams()
  const history = useHistory()
  const [room, isLoading, error] = useFetch(`room/${roomId}`)
  const socket = useWS(room)
  const [nameValue, setNameValue] = useState(getName())
  const [isOpen, setIsOpen] = useState(false)
  const cards = room?.type ? cardTypes[room.type] : []

  const sendDetails = () => {
    if (nameValue) {
      const id = localStorage.getItem('id') || generateID()
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(sendAction(actions.JOIN, { name: nameValue, uuid: id }))
      }
    }
  }

  const saveName = () => {
    localStorage.setItem('name', nameValue)
    generateID()
    setIsOpen(false)
    setNameValue(nameValue)
    sendDetails()
  }

  socket.onopen = sendDetails
  socket.onmessage = (evt) => {
    const { data } = evt
    const msg = JSON.parse(data)

    switch (msg.action) {
      case actions.KICK:
        const id = localStorage.getItem('id')

        if (msg?.metadata?.uuid === id) {
          history.push('/')
        }
        break
      default:
        console.error('Not part of the action')
    }
  }

  useEffect(() => {
    const name = getName()
    if (!name) {
      setIsOpen(true)
    }
  }, [])

  const onVote = (score) => {
    const id = localStorage.getItem('id')
    socket.send(sendAction(actions.VOTE, { name: nameValue, uuid: id, score }))
  }

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
              <Card score={card.score} onClick={onVote} />
            </div>
          ))}
        </div>
      </Container>
      <Modal
        isOpen={isOpen}
        title='Name Required!'
        buttons={
          <Button size='small' onClick={saveName}>
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
