import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

export async function Auth(){
  const {value} = useAuth();
  const token = {
    'token': value.token
  }

  console.log("IN AUTH");
  const response = await axios.post("http://localhost:8000/services", token);
  console.log("user Id in auth: ", response.id);
  return response.id;
};