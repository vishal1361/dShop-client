import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(10),
    margin: 25
  },
  Grid: {
    display: 'flex',
    justifyContent: 'center'
  },
  TextField: {
    width: 750
  },
  LongTextField: {
    width: 1515
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10
  },
  fileInput: {
    width: '97%',
    margin: '10px 10px',
  },
  buttonSubmit: {
    width: 300,
    height: 50,
    marginRight: 10,
  }
}));