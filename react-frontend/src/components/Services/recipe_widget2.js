import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
//import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import MoreVertIcon from '@mui/icons-material/MoreVert';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

function RecipeReviewCard({recipe}) {
  const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" sx={{ fontSize: 20}}>
            Shrimp and Chorizo Paella
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fgrecipes%2Fpublic%2Fpictures%2Frecipes%2F1035809%2Fpaella_big.jpg&f=1&nofb=1&ipt=f3a82793c8588fcc7157574e26b359d02fe3703cf79a4349d63e193d4988e6ae&ipo=images"
        alt="Paella dish"
      />
      <CardContent>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={7}>
            Cook Time: 30 min
          </Grid>
          <Grid item xs={4}>
            Servings: 4 
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12}>
            kcal Per Serving: 500
          </Grid>
        </Grid>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}



export default function RecipeGrid() {

  const recipes = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Dummy data for now

    const numGridRows = Math.ceil(recipes.length / 3); // Calculate the number of grid rows needed

    return (
      <Grid sx={{ flexGrow: 1, marginTop: 1 }} container spacing={4}>
        {Array.from({ length: numGridRows }, (_, rowIndex) => (
          <Grid key={rowIndex} item xs={12}>
            <Grid container justifyContent="center" spacing={7}>
              {recipes.slice(rowIndex * 3, (rowIndex + 1) * 3).map((recipe, index) => (
                <Grid key={index} item>
                  <RecipeReviewCard recipe={recipe} title={recipe.title} image={recipe.image} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>

    // <Grid sx={{ flexGrow: 1, marginTop: 2}} container spacing={4}>
    //   <Grid item xs={12}>
    //     <Grid container justifyContent="center" spacing={7}>
    //       {[0, 1, 2].map((value) => (
    //         <Grid key={value} item>
    //           <RecipeReviewCard />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Grid>
    // </Grid>

  );
}

