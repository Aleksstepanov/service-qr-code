import AxiosMockAdapter from 'axios-mock-adapter'
import { axios } from 'src/utils'

const axiosMockAdapter = new AxiosMockAdapter(axios)

export default axiosMockAdapter
