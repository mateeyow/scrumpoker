import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFetch, useWS } from 'utils/hooks'
import fetch from 'utils/fetch'
import HTMLTitle from 'components/HTMLTitle'
import Container from 'components/Container'
import Label from 'components/texts/Label'
import Input from 'components/forms/Input'
import Button from 'components/buttons/Button'
import CardWithDetails from 'components/card/CardWithDetails'
import actions from 'constants/actions'

const SessionMaster = () => {
  const { roomId } = useParams()
  const history = useHistory()
  const [btnText, setBtnText] = useState('Copy URL')
  const [members, setMembers] = useState([])
  const [room, isLoading, error] = useFetch(`room/${roomId}`)
  const socket = useWS(room)

  const { protocol, host } = window.location
  const roomUrl = `${protocol}//${host}/room/${roomId}`

  socket.onmessage = (evt) => {
    const { data } = evt
    const msg = JSON.parse(data)

    if (msg.action === actions.JOIN) {
      setMembers(msg.data)
    }
  }

  useEffect(() => {
    if (btnText !== 'Copied!') {
      return () => {}
    }

    const timeout = 2000
    const timer = setTimeout(() => {
      setBtnText('Copy URL')
    }, timeout)

    return () => clearTimeout(timer)
  }, [btnText])

  const copyToClipboard = () => {
    const input = document.getElementById('title')
    input.select()

    navigator.clipboard.writeText(roomUrl)
    setBtnText('Copied!')
  }

  const onDeleteRoom = async () => {
    try {
      await fetch.delete(`room/${roomId}`)
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (error?.response?.status === 404) {
    return <h1>Not Found</h1>
  }

  if (isLoading || !room) {
    return null
  }

  return (
    <div className='prose max-w-none flex flex-col items-center mt-6'>
      <HTMLTitle title={room.title} />
      <Container className='pt-5'>
        <Button className='self-start bg-red-600' kind='danger' onClick={onDeleteRoom}>
          Delete Session
        </Button>
        <div className='flex mt-6 w-full justify-center'>
          <div className='w-8/12 lg:w-9/12 mr-2'>
            <Label htmlFor='title'>Room URL:</Label>
            <Input
              id='title'
              placeholder='Monday SCRUM planning'
              readOnly
              value={`${protocol}//${host}/room/${roomId}`}
              name='title'
            />
          </div>
          <div className='w-4/12 lg:w-3/12 self-end'>
            <Button size='small' className='w-full' kind='reverse' onClick={copyToClipboard}>
              {btnText}
            </Button>
          </div>
        </div>
      </Container>
      <div className='flex items-center flex-wrap flex-col justify-center lg:flex-row'>
        <h1 className='pt-6 mr-4'>{room.title}</h1>
        <Button
          onClick={() => {
            socket.send('YOWWW')
          }}
        >
          Start Voting
        </Button>
      </div>
      <Container className='lg:w-10/12'>
        <div className='flex justify-around w-full flex-wrap'>
          {members.map((member) => (
            <div className='w-1/6' key={member.id}>
              <CardWithDetails data={member} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default SessionMaster
