import axios from 'axios';

const api = axios.create({
  baseURL:'https://pilates-cintia.herokuapp.com',
});

export { api };

