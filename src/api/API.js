import axios from 'axios';

// 모든 axios 요청에서 자동으로 쿠키 포함
axios.defaults.withCredentials = true;

// const serverURL = `${window.location.origin}`;
const serverURL = 'http://localhost:8000';

const API = async (endpoint, method, data) => {
  const headers = {
    'Content-type': 'application/json',
  };

  const options = {
    url: serverURL + endpoint,
    method: method,
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    if (error.response) {
      console.log('Error status:', error.response.status);
    }
    throw error;
  }
};

export default API;
