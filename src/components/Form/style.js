import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    // overflowY: 'auto',
    maxHeight: '70vh',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    overflow: 'auto',  // Make the container scrollable
    // maxHeight: '80vh', 

    '& > *': {
      marginBottom: theme.spacing(2), // Add spacing between form cards
    },
  },
  paper: {
    padding: theme.spacing(3),
    margin: 5,
    maxWidth: 800,
    width: '100%', 
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Grid: {
    marginBottom: theme.spacing(2),
  },
  TextField: {
    marginBottom: theme.spacing(2),
  },
  LongTextField: {
    marginBottom: theme.spacing(2),
  },
  fileInput: {
    marginTop: theme.spacing(2),
  },
  buttonSubmit: {
    margin: theme.spacing(3, 0),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  draggerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    textAlign: 'left',
},
}));