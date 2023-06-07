import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

export async function Auth(){
  const {Auth} = useAuth();

  const token = {
    'token': Auth.token
  }

  
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/services/recipes`,
      token
    )
    return response
  }

  catch (error) {
    return false;
  }
};
