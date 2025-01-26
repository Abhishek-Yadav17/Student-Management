import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

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
      backgroundColor: '#DDD1F3',  
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
          p: 3,
          boxShadow: 7,
          borderRadius: 6,
          bgcolor: '#F0F2F3', 
          width: '100%',
          height: '270px',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#000', mb: 3, fontWeight: 'bold', }}>
          Login
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
            input: { color: '#000' },
            label: { color: '#757185' }, 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#999', 
              },
              '&:hover fieldset': {
                borderColor: '#000', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000', 
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000',
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            input: { color: '#000' },
            label: { color: '#757185' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#999',
              },
              '&:hover fieldset': {
                borderColor: '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000',
            },
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4D35E2',  
            color: '#fff',  
            width: '80%',              
            '&:hover': {
              backgroundColor: '#288CE1', 
            },
          }}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
