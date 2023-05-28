import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

export const Auth = async () => {
  const {value} = useAuth();
  const headers = {
    Authorization: 'Bearer ' + value.token
  }
  console.log("IN AUTH");
  const response = await axios.post("http://localhost:8000/services", {headers});
  if (response.status == 200) {
    console.log("user Id in auth: ", response.id);
    return response.id;
  }
  return null;
};