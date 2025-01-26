import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, TextField, Box, Typography, Container, Link, IconButton, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(''); 
      navigate('/students');
    } catch (err) {
      setError('Failed to log in');
    }
  };

  return (
    <Container component="main" maxWidth={false} sx={{ 
      backgroundColor: '#EBF1F1',
      background: 'linear-gradient(to right bottom, #EDF2F2,#DDE8EB,rgb(243, 231, 225))',  
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
     }}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '40px 24px',
          borderRadius: 5   ,
          bgcolor: '#F9FAFB', 
          width: '100%',
          height: 'auto',
          maxWidth: 375,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', fontSize: '1.3rem'}}>
          Sign In
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, mb: 5, color: '#63738D'}}>
            Do you have an account? 
            <Link 
                href="#" 
                sx={{ 
                color: '#1877F2', 
                textDecoration: 'none',
                ml: '5px',
                '&:hover': { 
                    textDecoration: 'underline' 
                } 
                }}>
                Get Started
            </Link>
        </Typography>
        
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2, color: '#000' }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            input: { color: '#000', fontSize: '0.875rem' },
            label: { color: '#757185', fontSize: '0.875rem' }, 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px',
                borderColor: '#C6C9CB', 
              },
              '&:hover fieldset': {
                borderColor: '#C6C9CB', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1877F2', 
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#1877F2',
            },
          }}
        />
        <Typography 
        sx={{
            display: 'flex', 
            justifyContent: 'flex-end', 
            width: '100%', 
            mb: 1
        }}
        >
        <Link 
            href="#" 
            sx={{
            color: 'black', 
            fontSize: '0.85rem',
            my: '0.5vw',
            textDecoration: 'none', 
            '&:hover': { 
                textDecoration: 'underline' 
            }
            }}
        >
            Forgot Password?
        </Link>
        </Typography>
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3.5,
            input: { color: '#000', fontSize: '0.875rem' },
            label: { color: '#757185', fontSize: '0.875rem' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px',
                borderColor: '#C6C9CB',
              },
              '&:hover fieldset': {
                borderColor: '#C6C9CB',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1877F2',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#1877F2',
            },
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1C252E',  
            color: '#fff',  
            width: '100%',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '12px 22px',
          }}
          fullWidth
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Divider sx={{ width: '100%', mb: 2, position: 'relative', mt: 5 }}>
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '-10px',
            transform: 'translateX(-50%)',
            color: '#757185',
            fontSize: '0.75rem',
            mx: '2'
          }}
        >
          OR
        </Typography>
      </Divider>

      <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
        <IconButton color="primary" aria-label="google">
          <GoogleIcon />
        </IconButton>
        <IconButton color="primary" aria-label="github">
          <GitHubIcon />
        </IconButton>
        <IconButton color="primary" aria-label="twitter">
          <TwitterIcon />
        </IconButton>
      </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
