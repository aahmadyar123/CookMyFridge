import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import backgroundImage from '../images/bowtiepasta.jpg';
import "../css/login.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Abhaya Libre Bold, sans-serif',
    backgroundColor: '#f2f2f2',
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'absolute',
    overflow: 'hidden',
  },
  container: {
    border: 'solid',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '1000px',
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    padding: '30px',
  },
  form: {
    border: 'solid',
    marginBottom: theme.spacing(4),
    maxHeight: '500px',
    height: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Abhaya Libre, sans-serif',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: theme.spacing(2), // Adjust the padding to prevent overflow
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%", // Set the width to 100% to occupy the entire space
    },
    "& .MuiButton-root": {
      margin: theme.spacing(2, 0, 1), // Adjust the margins to create space between elements
      borderRadius: '70px',
      color: 'white',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: '#1a1a1a',
      },
    },
  },
  reviewSection: {
    border: 'solid',
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2), // Adjust the padding to prevent overflow
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%", // Set the width to 100% to occupy the entire space
    },
    "& .MuiButton-root": {
      margin: theme.spacing(2, 0, 1), // Adjust the margins to create space between elements
      borderRadius: '70px',
      color: 'white',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: '#1a1a1a',
      },
    },
  },
  reviewItem: {
    marginBottom: theme.spacing(2),
  },
  loadMoreButton: {
    margin: theme.spacing(2, 0),
  },
  averageRating: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center', // Center align the text
  },
}));

const initialRatings = [
  { id: 1, user: "John Doe", rating: 4, comment: "Great product!" },
  { id: 2, user: "Jane Smith", rating: 3, comment: "Good but could be better." },
  { id: 3, user: "Bob Johnson", rating: 5, comment: "Excellent experience!" },
  { id: 4, user: "Bob Johnson", rating: 5, comment: "Tight experience!" },
];

function ReviewPage() {
  const classes = useStyles();

  const [ratings, setRatings] = useState(initialRatings);
  const [newRating, setNewRating] = useState({ user: "", rating: null, comment: "" });
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = ratings.length + 1;
    const ratingWithId = { ...newRating, id: newId };
    setRatings([...ratings, ratingWithId]);
    setNewRating({ user: "", rating: null, comment: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRating({ ...newRating, [name]: value });
  };

  const handleLoadMoreReviews = () => {
    setShowAllReviews(true);
  };

  const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

  const renderSubmitForm = () => {
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h6" gutterBottom>
          Submit Your Rating
        </Typography>
        <div>
          <Rating
            name="rating"
            value={newRating.rating}
            onChange={(event, value) => setNewRating({ ...newRating, rating: value })}
          />
        </div>
        <div>
          <TextField
            required
            label="Name"
            name="user"
            value={newRating.user}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            required
            label="Review"
            name="comment"
            value={newRating.comment}
            onChange={handleInputChange}
            multiline
          />
        </div>
        <Button 
          type="submit" 
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    );
  };

  const renderUserReviews = () => {
    const reviewsToShow = showAllReviews ? ratings : ratings.slice(0, 1);
    return (
      <div className={classes.reviewSection}>
        <Typography variant="h8" gutterBottom>
          User Reviews
        </Typography>
        {reviewsToShow.length === 0 ? (
          <Typography variant="body1">No reviews yet</Typography>
        ) : (
          <List>
            {reviewsToShow.map((review) => (
              <React.Fragment key={review.id}>
                <ListItem alignItems="flex-start" className={classes.reviewItem}>
                  <ListItemText
                    primary={`${review.rating}/5 by ${review.user}`}
                    secondary={review.comment}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
        {!showAllReviews && ratings.length > 2 && (
          <Button
            variant="outlined"
            color="primary"
            className={classes.loadMoreButton}
            onClick={handleLoadMoreReviews}
          >
            Load More
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.averageRating}>
          <Typography variant="h5" gutterBottom>
            Average Rating: {averageRating.toFixed(1)}/5
          </Typography>
          <Rating value={averageRating} readOnly />
        </div>
        {renderSubmitForm()}
        {renderUserReviews()}
      </div>
    </div>
  );
}

export default ReviewPage;
