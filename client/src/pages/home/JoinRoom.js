import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Label from 'components/texts/Label'
import Input from 'components/forms/Input'
import Button from 'components/buttons/Button'
import { generateID } from 'utils/utils'
import fetch from 'utils/fetch'

const validation = { required: 'This field is required' }

const JoinRoom = () => {
  const { register, errors, handleSubmit, setError, setValue } = useForm()
  const history = useHistory()

  const onJoinRom = async (data) => {
    try {
      const { data: responseData } = await fetch.get(`room/${data.roomId}`)
      localStorage.setItem('name', data.name)
      generateID()
      history.push(`/room/${responseData.roomId}`)
    } catch (err) {
      if (err.response.status === 404) {
        return setError('roomId', { type: 'manual', message: 'Room number not found' })
      }

      console.error(err)
    }
  }

  useEffect(() => {
    const name = localStorage.getItem('name')
    setValue('name', name)
  }, [setValue])

  return (
    <form className='w-full flex flex-col items-center' onSubmit={handleSubmit(onJoinRom)}>
      <div className='w-11/12'>
        <Label htmlFor='member-name'>Name:</Label>
        <Input
          id='member-name'
          placeholder='Jone Doe'
          name='name'
          register={register}
          validation={validation}
          errors={errors}
        />
      </div>

      <div className='w-11/12 pt-4'>
        <Label htmlFor='roomId'>Room Number:</Label>
        <Input
          id='roomId'
          placeholder='Am618ymo16'
          name='roomId'
          register={register}
          validation={validation}
          errors={errors}
        />
      </div>

      <Button className='mt-6 w-11/12 lg:w-4/12' type='submit'>
        Join Room
      </Button>
    </form>
  )
}

export default JoinRoom
