import axios from 'axios';
import domains from '../api/domains'

const obj = {
  axiosUserService: axios.create({
    baseURL: domains.US
  }),
  axiosUploadService: axios.create({
    baseURL: domains.UPS
  }),
  axiosTodoService: axios.create({
    baseURL: domains.TS
  }),
  axiosBlogService: axios.create({
    baseURL: domains.BS
  }),
  axiosMessageService: axios.create({
    baseURL: domains.MS
  }),
  axiosExpenseService: axios.create({
    baseURL: domains.EXS
  })
}


export default obj;
