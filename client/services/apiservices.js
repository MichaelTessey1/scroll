import axios from 'axios';

const BASE_URL = "http://localhost:3001";
const getPosts = async () => {
  const resp = await axios.get(`${BASE_URL}/posts`);
  return resp.data;
}

module.exports = {
  getPosts
}
