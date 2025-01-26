import React from 'react';
import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '9vw', display: 'flex', flexDirection: 'column', gap:'3vw', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" color="black" sx={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: '2rem'}}>
        Sorry, page not found!
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1rem', width: '25%', alignSelf: 'center' }}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling. 
      </Typography>
      <Box sx={{ mb: 3 }}>
        <img 
          src="https://free.minimals.cc/assets/illustrations/illustration-404.svg"  // Replace with your actual image URL
          alt="404 Not Found"
          style={{ width: '80%', maxWidth: '400px', height: 'auto' }}
        />
      </Box>
    </Box>
  );
}

export default NotFound;