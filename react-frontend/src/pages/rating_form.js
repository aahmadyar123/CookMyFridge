import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useIngredients } from '../components/context/ingredients_context';
import { useAuth } from '../components/context/AuthProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Abhaya Libre Bold, sans-serif',
    backgroundColor: '#fcfcfc',
    overflow: 'hidden',
  },

  container: {
    fontFamily: 'Abhaya Libre Bold, sans-serif',
    width: '100%',
    padding: theme.spacing(4),
    backgroundColor: '#fcfcfc',
    borderRadius: '0px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },

  form: {
    marginBottom: theme.spacing(3),
    height: '100%',
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
      margin: theme.spacing(2, 0), // Adjust the margins to create space between elements
      width: "100%",
      borderRadius: '70px',
      color: 'white',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: '#1a1a1a',
      },
    },
  },

  reviewSection: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2), // Adjust the padding to prevent overflow
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "100%", // Set the width to 100% to occupy the entire space
    },
    "& .MuiButton-root": {
      margin: theme.spacing(2, 0), // Adjust the margins to create space between elements
      borderRadius: '70px',
      color: 'white',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: '#1a1a1a',
      },
    },
  },

  reviewsContainer: {
    maxHeight: '250px', // Set the maximum height for scrollable behavior
    overflowY: 'scroll', // Enable vertical scrolling
    marginBottom: theme.spacing(1),
  },

  reviewItem: {
    marginBottom: theme.spacing(2),
  },

  loadMoreButton: {
    margin: theme.spacing(2, 0),
  },

  averageRating: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    textAlign: 'center', // Center align the text
  }
}));

function ReviewPage({recipeId}) {
  const classes = useStyles();
  const {Auth} = useAuth();
  const {value} = useIngredients();
  const [newRating, setNewRating] = useState({ score: null, name: '', comment: '' });
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [allRating, setAllRating] = useState([]);

  useEffect(()=> {
    async function getAvg(recipeId) {
      const new_avg = await value.getRatings(recipeId, Auth.token);
      setAvgRating(new_avg.rating.toFixed(2));
      setAllRating(new_avg.ratings);
    }

    getAvg(recipeId);
    // eslint-disable-next-line
  }, [recipeId, Auth.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await value.updateRatings(recipeId, newRating, Auth.token);
    setNewRating({ score: null, name: '', comment: '' });
    const new_avg = await value.getRatings(recipeId, Auth.token);
    setAvgRating(new_avg.rating.toFixed(2));
    setAllRating(new_avg.ratings);
  };

  // Shows the rest of reviews
  const handleLoadMoreReviews = () => {
    setShowAllReviews(true);
  };

  const renderSubmitForm = () => {
    return (
      <form className={classes.form}  onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Submit Your Rating
        </Typography>
        <div>
          <Rating
            name="rating"
            value={newRating.score}
            onChange={(event, value) => setNewRating({ ...newRating, score: value })}
          />
        </div>
        <div>
          <TextField
            required
            label="Name"
            name="user"
            value={newRating.name}
            onChange={(event) => setNewRating({ ...newRating, name: event.target.value })}
          />
        </div>
        <div>
          <TextField
            required
            variant='outlined'
            placeholder='Write your review here'
            multiline
            rows={4}
            rowsMax={4}
            value={newRating.comment}
            onChange={(event) => setNewRating({ ...newRating, comment: event.target.value })}
            label="Recipe Review"
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
    // store only the first two reviews in a variable
    const reviewsToShow = showAllReviews ? allRating : allRating.slice(0, 1);
    return (
      <Box className={classes.reviewSection}>
        <Typography variant="h6" gutterBottom>
          User Reviews
        </Typography>
        <div className={classes.reviewsContainer}> {/* Wrap the reviews list in a scrollable container */}
          {reviewsToShow.length === 0 ? (
            <Typography variant="body1">No reviews yet</Typography>
          ) : (
            <List>
              {reviewsToShow.map((review) => (
                <React.Fragment key={review.id}>
                  <ListItem alignItems="flex-start" className={classes.reviewItem}>
                    <ListItemText
                      primary={`${review.score}/5 by ${review.name}`}
                      secondary={review.comment}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          )}
        </div>
        {!showAllReviews && allRating.length > 1 && (
          <Button
            variant="outlined"
            color="primary"
            className={classes.loadMoreButton}
            onClick={handleLoadMoreReviews}
          >
            Load More
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box className={classes.container}>
      <h1> Reviews </h1>
      <Box className={classes.averageRating}>
        <Typography variant="h5">
          <Rating value={avgRating} readOnly />
        </Typography>
        <Typography variant="h5">
          Average Rating: {avgRating}
        </Typography>
      </Box>
      <Box>
        {renderSubmitForm()}
      </Box>
      {renderUserReviews()}
    </Box>
  );
}

export default ReviewPage;
