import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import backgroundImage from './images/bowtiepasta.jpg';
import logo from './images/Logo.png';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <a href="/">
          <img className={classes.logo} src={logo} alt="Logo" />
        </a>
        {isRegister ? ( // use ternary operator to switch between login and register form
          <div>
            <div className={classes.inputIcon}>
              <MailOutlineIcon />
              <TextField label="Email" variant="outlined" inputProps={{ style: { paddingLeft: '12px' } }} />
            </div>
            <div className={classes.inputIcon}>
              <LockOutlinedIcon />
              <TextField label="Password" type="password" variant="outlined" inputProps={{ style: { paddingLeft: '12px' } }} />
            </div>
            <div className={classes.inputIcon}>
              <LockOutlinedIcon />
              <TextField label="Confirm Password" type="password" variant="outlined" inputProps={{ style: { paddingLeft: '12px' } }} />
            </div>
            <Button variant="contained" color="primary">
              Register
            </Button>
            <div className="forgot-password" onClick={() => setIsRegister(false)}>Already have an account? Log in</div>
          </div>
        ) : (
          <div>
            <div className={classes.inputIcon}>
              <MailOutlineIcon />
              <TextField label="Email" variant="outlined" inputProps={{ style: { paddingLeft: '12px' } }} />
            </div>
            <div className={classes.inputIcon}>
              <LockOutlinedIcon />
              <TextField label="Password" type="password" variant="outlined" inputProps={{ style: { paddingLeft: '12px' } }} />
            </div>
            <div className="forgot-password">Forgot Password?</div>
            <Button variant="contained" color="primary">
              Log in
            </Button>
            <div className="forgot-password" onClick={() => setIsRegister(true)}>Don't have an account? Register</div>
          </div>
        )}
      </form>
      <div className={classes.footer}>
        <a href="#">Terms and Conditions</a>
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
}

export default LoginForm;



