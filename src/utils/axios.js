import axios from 'axios'

const axiosConfig = {
  timeout: 30000
}

const instance = axios.create(axiosConfig)

export default instance
