import shortid from 'shortid'

export const generateID = () => {
  let id = localStorage.getItem('id')

  if (!id) {
    id = shortid.generate()
    localStorage.setItem('id', id)
  }

  return id
}

export const noop = () => {}

export const getName = () => localStorage.getItem('name')

export const sendAction = (action, data) => {
  return JSON.stringify({ action, data })
}
