import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  }
}));

const FixedCenter = props => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      position="fixed"
      left={0}
      top={0}
      right={0}
      bottom={0}
      alignItems="center"
      justifyContent="center"
      pointerEvents="none"
      {...props}
    />
  );
};

export default FixedCenter;
