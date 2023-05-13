import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  inner: {
    maxWidth: 800,
    margin: "0 auto",
    flexGrow: 1,
    padding: theme.spacing(4), 
  },
  ratingSection: {
    marginBottom: theme.spacing(4),
  },
  formSection: {
    marginBottom: theme.spacing(4),
  },
  olderReviewsSection: {
    marginTop: theme.spacing(4),
  },
  reviewItem: {
    marginBottom: theme.spacing(2),
  },
}));

const initialRatings = [
  { id: 1, user: "John Doe", rating: 4, comment: "Great product!" },
  { id: 2, user: "Jane Smith", rating: 3, comment: "Good but could be better." },
];

function ReviewPage() {
    const classes = useStyles();

    const [ratings, setRatings] = useState(initialRatings);
    const [newRating, setNewRating] = useState({ user: "", rating: "", comment: "" });

    const [formData, setFormData] = useState({
        name: "",
        rating: 0,
        review: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = ratings.length + 1;
        const ratingWithId = { ...newRating, id: newId };
        setRatings([...ratings, ratingWithId]);
        setNewRating({ user: "", rating: "", comment: "" });
        };

        const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRating({ ...newRating, [name]: value });
    };

    const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

    const renderSubmitForm = () => {
        return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
            Submit Your Rating
            </Typography>
            <div>
                <Rating
                    name="userRating"
                    value={formData.userRating}
                    onChange={handleInputChange}
                    precision={0.5}
                />
            </div>

            <div>
                <TextField
                    required
                    label="Name"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className={classes.textField}
                />
            </div>
            <div>
                <TextField
                    required
                    label="Review"
                    name="userReview"
                    value={formData.userReview}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    className={classes.textField}
                />
            </div>

            <div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                >
                Submit
                </Button>
            </div>
        </form>
        );
    };

    const renderUserRatings = () => {
        return (
        <React.Fragment>
        <Divider className={classes.divider} />
        <Typography variant="h4" gutterBottom>
        User Ratings
        </Typography>
        {ratings.length === 0 ? (
        <Typography variant="body1">No ratings yet</Typography>
        ) : (
        <List>
        {ratings.map((rating) => (
            <React.Fragment key={rating.id}>
            <ListItem alignItems="flex-start">
                <ListItemText
                primary={`${rating.rating}/5 by ${rating.user}`}
                secondary={rating.comment}
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            </React.Fragment>
        ))}
        </List>
        )}
        </React.Fragment>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.inner}>
                <Typography variant="h3" gutterBottom>
                Product Reviews
                </Typography>
                <div className={classes.averageRating}>
                <Typography variant="h5" gutterBottom>
                Average Rating: {averageRating}/5
                </Typography>
                <Rating value={averageRating} readOnly />
                </div>
                {renderSubmitForm()}
                {renderUserRatings()}
            </div>
        </div>
    );
}

export default ReviewPage;