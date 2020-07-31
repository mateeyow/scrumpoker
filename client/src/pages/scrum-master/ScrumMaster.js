import React from 'react'
import HTMLTitle from '../../components/HTMLTitle'
import Container from '../../components/Container'
import Label from '../../components/texts/Label'
import Input from '../../components/forms/Input'
import Button from '../../components/buttons/Button'
import CardWithDetails from '../../components/card/CardWithDetails'

const members = [
  {
    id: '1',
    name: 'Matthew',
    score: 'S',
  },
  {
    id: '2',
    name: 'Aldrin',
    score: 'M',
  },
  {
    id: '3',
    name: 'John',
    score: 'L',
  },
  {
    id: '4',
    name: 'Doe',
    score: 'XL',
  },
  {
    id: '5',
    name: 'Doe',
  },
]

const SessionMaster = () => (
  <div className='prose max-w-none flex flex-col items-center mt-6'>
    <HTMLTitle title='SCRUM Session' />
    <Container className='pt-5'>
      <Button className='self-start bg-red-600' kind='danger'>
        Delete Session
      </Button>
      <div className='flex mt-6 w-full justify-center'>
        <div className='w-8/12 lg:w-9/12 mr-2'>
          <Label htmlFor='title'>Room URL:</Label>
          <Input
            id='title'
            placeholder='Monday SCRUM planning'
            readOnly
            value='http://scrumpoker.mateeyow.com/room/random-room-id'
          />
        </div>
        <div className='w-4/12 lg:w-3/12 self-end'>
          <Button size='small' className='w-full' kind='reverse'>
            Copy URL
          </Button>
        </div>
      </div>
    </Container>
    <div className='flex items-center flex-wrap flex-col justify-center lg:flex-row'>
      <h1 className='pt-6 mr-4'>Sunday Morning SCRUM Party </h1>
      <Button>Start Voting</Button>
    </div>
    <Container className='lg:w-10/12'>
      <div className='flex justify-around w-full flex-wrap'>
        {members.map((member) => (
          <CardWithDetails key={member.id} data={member} />
        ))}
      </div>
    </Container>
  </div>
)

export default SessionMaster
