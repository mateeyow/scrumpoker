import React from 'react'
import Label from '../../components/texts/Label'
import Input from '../../components/forms/Input'
import Select from '../../components/forms/Select'
import Button from '../../components/buttons/Button'
import './home.css'
import HTMLTitle from '../../components/HTMLTitle'

const Home = () => (
  <div className="prose max-w-none flex flex-col items-center">
    <HTMLTitle title='Create/Join Room' />
    <h1 className="uppercase text-center py-6">
      <a href="/">SCRUM Poker</a>
    </h1>

    <div className="w-full lg:w-6/12 bg-gray-200 flex flex-col items-center rounded px-4 py-8">
      <div className="w-11/12">
        <Label htmlFor="master-name">Name:</Label>
        <Input id="master-name" placeholder='Jane Doe' />
      </div>

      <div className="w-11/12 pt-4">
        <Label htmlFor="card-type">Card Type:</Label>
        <Select id="card-type" options={['Shirt Sizes', 'Fibonacci']} />
      </div>

      <Button className='mt-6 w-11/12 lg:w-4/12'>Create New Room</Button>
    </div>

    <hr className='relative w-full lg:w-6/12 divider' />

    <div className="w-full lg:w-6/12 bg-gray-200 flex flex-col items-center rounded px-4 py-8 mt-6">
      <div className="w-11/12">
        <Label htmlFor="member-name">Name:</Label>
        <Input id="member-name" placeholder='Jone Doe' />
      </div>

      <div className="w-11/12 pt-4">
        <Label htmlFor="room-number">Room Number:</Label>
        <Input id="room-number" placeholder='Am618ymo16' />
      </div>

      <Button className='mt-6 w-11/12 lg:w-4/12'>Join Room</Button>
    </div>
  </div>
)

export default Home