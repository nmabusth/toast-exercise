import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { saveFormSubmission } from "./service/mockServer";

import Chance from "chance";
const chance = new Chance();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const [openToast, setOpenToast] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState([]);

  // handle form submit
  function handleFormSubmit() {
    //create mock form data
    const formSubmission = {
      id: chance.guid(),
      data: {
        email: chance.email(),
        firstName: chance.first(),
        lastName: chance.last(),
        liked: false,
      },
    };

    // set current form data and display toast
    setCurrentSubmission(formSubmission);
    setOpenToast(true);
  }

  // Close toast and clear current form
  function handleClose() {
    setOpenToast(false);
    setCurrentSubmission([]);
  }

  // Save "liked" forms
  function handleLike() {
    saveFormSubmission({
      ...currentSubmission,
      data: { ...currentSubmission.data, liked: true },
    })
      .then(() => {
        // close toast and clear form
        setOpenToast(false);
        setCurrentSubmission([]);
      })
      .catch((error) => {
        alert("Error occured liking form: " + error.message);
      });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Toasts Exercise
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => handleFormSubmit()}
          >
            New Submission
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openToast}
        autoHideDuration={12000}
        onClose={handleClose}
        message={
          currentSubmission.data &&
          `${currentSubmission.data.firstName} ${currentSubmission.data.lastName} 
          ${currentSubmission.data.email}
          `
        }
        action={
          <>
            <Button color="inherit" onClick={handleLike}>
              Like
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
