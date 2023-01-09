import axios from 'axios';
import { baseURL } from './constants';

const instance = axios.create({
    baseURL: baseURL,
 
  });

  export default instance;
