import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Markup } from 'interweave';
import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useIngredients } from '../components/context/ingredients_context';

const ShowRecipe = () => {

    const targetId = useParams();
    const {value} = useIngredients();
    let targetRecipe = null;

    for (let i = 0; i < value.recipes.length; i++) {
        if (Number(value.recipes[i].id) === Number(targetId.id)) {
            targetRecipe = value.recipes[i];
            break;
        }
    }

    return (
        <Container>
            <img src={targetRecipe.image} alt={targetRecipe.name} />
        </Container>
    ); 
  }
  
  export default ShowRecipe;