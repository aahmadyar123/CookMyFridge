import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

export async function Auth(){
  const {value} = useAuth();
  const token = {
    'token': value.token
  }

  console.log("IN AUTH");
  const response = await axios.post(
    `${process.env.BACKEND_URL}/services/recipes`,
    token
  )
  // const response = await axios.post("http://localhost:8000/services/recipes", token);
  console.log(response);
  console.log("Auth response status: ", response.status);
  console.log("Auth response text: ", response.statusText)
  return response
};
