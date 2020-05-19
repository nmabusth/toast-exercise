import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { fetchLikedFormSubmissions } from "./service/mockServer";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "24px",
  },
  p: {
    fontStyle: "italic",
  },
}));

export default function Content() {
  const classes = useStyles();
  const [likedFormSubs, setLikedFormSubs] = useState([]);

  // Set polling for liked form submissions on mount
  useEffect(() => {
    // get data right away
    getFormSubs();

    const submissionPolling = setInterval(() => {
      getFormSubs();
    }, 3000);

    return function cleanup() {
      clearInterval(submissionPolling);
    };
  }, []);

  function getFormSubs() {
    fetchLikedFormSubmissions()
      .then((results) => {
        setLikedFormSubs(results.formSubmissions);
      })
      .catch((error) => {
        console.log("Error fetching form submissions: " + error.message);
      });
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <List>
        {likedFormSubs.map((submission) => (
          <ListItem key={submission.id}>
            <ListItemText
              primary={
                submission.data.firstName + " " + submission.data.lastName
              }
              secondary={submission.data.email}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
