import axios from 'axios'

// Set baseUrl to ApiURL provided in env json file
const instance = axios.create({
  baseURL: 'http://54.79.111.71:1337/api/'
})

export default instance