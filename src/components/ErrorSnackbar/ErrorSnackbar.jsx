import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ErrorSnackbar = ({ open, message }) => {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
