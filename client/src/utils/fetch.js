import axios from 'axios'

axios.defaults.baseURL = '/v1'

if (window.location.hostname !== 'localhost') {
  const { protocol } = window.location
  axios.defaults.baseURL = `${protocol}//api.scrumpoker.mateeyow.com/v1`
}

export default axios
