import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '24px',
  },
  p: {
    fontStyle: 'italic',
  },
}));

export default function Content() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" className={classes.p}>
        TODO: List of liked submissions here (delete this line)
      </Typography>
    </div>
  );
}
