import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import {
    AccessTimeOutlined,
    RestaurantOutlined,
} from "@mui/icons-material";
import { useAuth } from "../components/context/AuthProvider";
import IconButton from '@mui/material/IconButton';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useIngredients } from "../components/context/ingredients_context";
import { Markup } from 'interweave';
import ReviewForm from "./rating_form";
import Grid from '@mui/material/Grid';
import styled from "styled-components";
import {red, grey} from '@mui/material/colors';

const CenteredListIngredients = styled.ol`
  list-style-position: inside;
  list-style-type: disc;
`;

function ShowRecipe() {
    const targetId = useParams();
    const {value} = useIngredients();
    const {Auth} = useAuth();

    let targetRecipe = null;

    for (let i = 0; i < value.recipes.length; i++) {
        if (value.recipes[i]._id === targetId.id) {
            targetRecipe = value.recipes[i];
            break;
        }
    }

    if (targetRecipe === null) {
        for (let i = 0; i < value.favorite_list.length; i++) {
            if (value.favorite_list[i]._id === targetId.id) {
                targetRecipe = value.favorite_list[i];
                break;
            }
        }
    }
    
    const RecipeID = targetRecipe._id;
    const [favorite, setFavorite] = React.useState(targetRecipe.favorite);

    const handleFavorite = async (recipe_id, recipe) => {
        if (recipe.favorite === false) {
          value.addFavorite(recipe);
          await value.favoriteRecipe(recipe_id, Auth.token);
          recipe.favorite = true;
        } else {
          value.delFavorite(recipe.id);
          await value.unfavoriteRecipe(recipe_id, Auth.token);
          recipe.favorite = false;
        }
    
        setFavorite(recipe.favorite);
    }
    
    return (
        <>
        <Box borderRadius="15px" p="20px" bgcolor="#fcfcfc" width="100%">
           <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
                <Typography fontSize={25} fontWeight={700} color="#11142d">
                    {targetRecipe.name}
                </Typography>
                <Box
                    mt="20px"
                    display="flex"
                    flexDirection={{ xs: "column", lg: "row" }}
                    gap={4}
                    alignItems={{ xs: "center", lg: "normal" }}
                >
                    <Box flex={1} maxWidth={764}>
                        <img
                            src={targetRecipe.image}
                            alt={targetRecipe.name}
                            height={546}
                            style={{ objectFit: "cover", borderRadius: "10px" }}
                            className="recipe_details-img"
                        />
                        {/* Time, Servings, Save, and kcal */}
                        <Box mt="15px">
                            <Stack direction="row" gap={0.5} alignItems="center">
                                <AccessTimeOutlined
                                    sx={{
                                        fontSize: 20,
                                        color: "#11142d",
                                    }}
                                />
                                <Typography fontSize={16} color="#808191">
                                    {targetRecipe.readyInMinutes} mins
                                </Typography>
                                <RestaurantOutlined
                                    sx={{
                                        fontSize: 20,
                                        color: "#11142d",
                                        ml: 1,
                                    }}
                                />
                                <Typography fontSize={16} color="#808191">
                                    {targetRecipe.servings} servings
                                </Typography>

                                <IconButton aria-label="add to favorites" disabled={false} onClick={() => handleFavorite(targetRecipe._id, targetRecipe)}>
                                    <FavoriteIcon sx={{color: favorite ? red[500] : grey[500]}}/>
                                </IconButton>

                                <Typography fontSize={16} color="#808191">
                                    Click to Save 
                                </Typography>
                                <ElectricBoltIcon
                                    sx={{
                                        fontSize: 20,
                                        color: "#11142d",
                                    }}
                                />
                                <Typography fontSize={16} color="#808191">
                                    kcal per serving: {targetRecipe.kcal} 
                                </Typography>
                            </Stack>
                        </Box>
                        {/* Description */}
                        <Box mt="15px">
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    color: "#11142d",
                                }}
                            >
                                Description
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{ whiteSpace: "pre-wrap" }}
                            >
                                <Markup content={targetRecipe.summary} />
                            </Typography>
                        </Box>
                        {/* Ingredients */}
                        <Box mt="15px">
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    color: "#11142d",
                                }}
                            >
                                Ingredients
                            </Typography>
                            <Stack direction="column">

                                <Stack
                                    direction="row"
                                    gap="10px"
                                >
                                    <Typography paragraph no wrap>
                                    <CenteredListIngredients>
                                        {targetRecipe.ingredients.map((step, index) => (
                                            <li key={index} >{step}</li>
                                        ))}
                                    </CenteredListIngredients>
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                        {/* Steps */}
                        <Box mt="15px">
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    color: "#11142d",
                                }}
                            >
                                Steps
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{ whiteSpace: "pre-wrap" }}
                            >
                                <Typography paragraph no wrap>
                                <ol>
                                    {targetRecipe.steps.map((step, index) => (
                                        <li key={index} >{step}</li>
                                    ))}
                                </ol>
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
        </Grid>
            {/* <ReviewForm /> */}
        </Box>
        <ReviewForm recipeId={RecipeID} />
        </>

    );
}

export default ShowRecipe;