import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import fetch from '../../utils/fetch'
import Label from '../../components/texts/Label'
import Input from '../../components/forms/Input'
import Select from '../../components/forms/Select'
import Button from '../../components/buttons/Button'

const validation = { required: 'This field is required' }

const CreateRoom = () => {
  const { register, errors, handleSubmit } = useForm()
  const history = useHistory()

  const onCreateRoom = async (data) => {
    try {
      const { data: responseData } = await fetch.post('room/create', data)
      history.push(`/session/${responseData.roomId}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form className='w-full flex flex-col items-center' onSubmit={handleSubmit(onCreateRoom)}>
      <div className='w-11/12'>
        <Label htmlFor='title'>Title:</Label>
        <Input
          id='title'
          placeholder='Monday SCRUM planning'
          name='title'
          register={register}
          validation={validation}
          errors={errors}
          autoFocus
        />
      </div>

      <div className='w-11/12 pt-4' onSubmit={handleSubmit(onCreateRoom)}>
        <Label htmlFor='card-type'>Card Type:</Label>
        <Select
          register={register}
          name='type'
          id='card-type'
          options={[
            { name: 'Fibonacci', value: 'fibonacci' },
            { name: 'Shirt sizes', value: 'shirt-sizes' },
          ]}
        />
      </div>

      <Button className='mt-6 w-11/12 lg:w-4/12' type='submit'>
        Create New Room
      </Button>
    </form>
  )
}

export default CreateRoom
