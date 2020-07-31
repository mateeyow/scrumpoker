import React from 'react'
import Container from '../../components/Container'
import Card from '../../components/card/Card'

const cards = [
  {
    size: 'XS',
    weight: 1,
  },
  {
    size: 'S',
    weight: 2,
  },
  {
    size: 'M',
    weight: 3,
  },
  {
    size: 'L',
    weight: 4,
  },
  {
    size: 'XL',
    weight: 5,
  },
  {
    size: 'XXL',
    weight: 6,
  },
]

const Member = () => {
  return (
    <div className='prose max-w-none flex flex-col items-center'>
      <h1 className='py-8'>Some Scrum Title</h1>

      <Container className='lg:w-10/12'>
        <div className='flex justify-around w-full flex-wrap'>
          {cards.map((card, idx) => (
            <Card key={idx} score={card.size} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Member
