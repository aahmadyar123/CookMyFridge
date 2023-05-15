import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import backgroundImage from '../images/bowtiepasta.jpg';
import logo from '../images/logo.png';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from "react-hook-form";
import "../css/login.css"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    fontFamily: 'Abhaya Libre Bold, sans-serif',
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    overflow: 'hidden',
  },
  form: {
    fontFamily: 'Abhaya Libre, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    width: '400px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(2, 16, 1),
      borderRadius: '70px', 
      color: 'white',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: '#1a1a1a',
      },
    },
    "& .forgot-password": {
      textAlign: 'center',
      marginTop: '10px',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  inputIcon: {
    display: 'flex',
    alignItems: 'center',
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    }
  },
  logo: {
    width: '300px',
    height: '110px',
    marginBottom: '20px'
  },
  footer: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& a': {
      color: 'white',
      textDecoration: 'underline',
      marginLeft: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '10px',
      borderRadius: '10px',
      textAlign: 'right',
      fontSize: '14px'
    },
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // add new state variable

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async data => {
    await sleep(2000);
    if (data.email === "cool") {
      console.log(data);
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
    }
  };


  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}> 
        <a href="/">
          <img className={classes.logo} src={logo} alt="Logo" />
        </a>
        <div>
          <div className={classes.inputIcon}>
            <MailOutlineIcon />
            <TextField 
              label="Email" 
              variant="outlined" 
              inputProps={{ style: { paddingLeft: '12px' } }}
              {...register("email")} // Register the "email" input
            />
          </div>
          <div className={classes.inputIcon}>
            <LockOutlinedIcon />
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              inputProps={{ style: { paddingLeft: '12px' } }} 
              {...register("password")} // Register the "password" input
            />
          </div>
          <div className="forgot-password">Forgot Password?</div>
          <Button type="submit" variant="contained" color="primary">
            Log in
          </Button>
          <div className="forgot-password" onClick={() => setIsRegister(true)}>
            <a href="/Login" style={{ color: "black" }}>                
              Don't have an account? Register
            </a>
          </div>
        </div>
      </form>
      <div className={classes.footer}>
        <a href="#">Terms and Conditions</a>
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
}

export default LoginForm;



