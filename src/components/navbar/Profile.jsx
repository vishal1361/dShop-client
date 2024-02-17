import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    display: 'flex',
    flexDirection: 'column', // Stack elements vertically
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3), // Add some padding
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(1),
  },
  name: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  detailBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1), // Add padding inside each box
    borderRadius: 4, // Add border-radius for a rounded appearance
    textAlign: 'center', // Center text
  },
  fieldName: {
    fontWeight: 'bold',
    color: '#fff', // White color for field names
    backgroundColor: '#2196F3', // Blue color for field names
    padding: theme.spacing(0.5), // Add padding for the field names
    borderRadius: 4, // Add border-radius for a rounded appearance
    marginBottom: theme.spacing(0.5), // Add some margin between field names and values
  },
  value: {
    color: '#333', // Dark grey color for values
    backgroundColor: '#f0f0f0', // Light grey color for values
    padding: theme.spacing(0.5), // Add padding for the values
    borderRadius: 4, // Add border-radius for a rounded appearance
  },
}));

const Profile = ({ user }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.popover} elevation={0}>
      <Avatar
        className={classes.avatar}
        alt={user.result.name}
        src={user.result.imageUrl}
      >
        {user.result.name.charAt(0)}
      </Avatar>

      <Typography variant="subtitle1" className={classes.name}>
        {user.result.name}
      </Typography>

      <Box className={classes.detailBox}>
        <Typography variant="body2" className={classes.fieldName}>User ID</Typography>
        <Typography variant="body2" className={classes.value}>{user.result.id}</Typography>
      </Box>

      <Box className={classes.detailBox}>
        <Typography variant="body2" className={classes.fieldName}>Email</Typography>
        <Typography variant="body2" className={classes.value}>{user.result.email}</Typography>
      </Box>

      <Box className={classes.detailBox}>
        <Typography variant="body2" className={classes.fieldName}>User Type</Typography>
        <Typography variant="body2" className={classes.value}>{user.result.userType}</Typography>
      </Box>
      
      <Box className={classes.detailBox}>
        <Typography variant="body2" className={classes.fieldName}>Account</Typography>
        <Typography variant="body2" className={classes.value}>{user.result.account}</Typography>
      </Box>
      
      
      {/* Add more user details as needed */}
    </Paper>
  );
};

export default Profile;
