import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

export async function Auth(){
  const {Auth} = useAuth();

  const token = {
    'token': Auth.token
  }

  console.log("BEFORE AUTH");
  
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/services/recipes`,
      token
    )
    console.log("GOT BACK RESPONSE IN AUTH");
    console.log("Auth response status: ", response.status);
    return response
  }

  catch (error) {
    return false;
  }
};
