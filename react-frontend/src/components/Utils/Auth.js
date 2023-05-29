import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

export async function Auth(){
  const {value} = useAuth();
  const token = {
    'token': value.token
  }

  console.log("IN AUTH");
  const response = await axios.post("http://localhost:8000/services/recipes", token);
  console.log("user Id in auth: ", response.id);
  console.log(response.status);
  console.log(response.statusText)
  return response
};
