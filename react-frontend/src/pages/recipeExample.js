import React from "react";
import { useState, useEffect } from "react";
import { Typography, Box, Stack, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import {
    AccessTimeOutlined,
    RestaurantOutlined,
} from "@mui/icons-material";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useIngredients } from "../components/context/ingredients_context";
import { Markup } from 'interweave';
import ReviewForm from "./rating_form";


function ShowRecipe() {

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
        <Box borderRadius="15px" p="20px" bgcolor="#fcfcfc" width="100%">
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
                    {/* Time, Servings and Save */}
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
                            <FavoriteIcon
                                sx={{
                                    fontSize: 20,
                                    color: "#11142d",
                                }}
                            />
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
                                        <Typography>
                                        <ol style={{ padding: 0, margin: 0 }}>
                                            {targetRecipe.ingredients.map((step, index) => (
                                            <li key={index} >{step}</li>
                                            ))}
                                        </ol>
                                        </Typography>
                                    </Stack>
                        </Stack>
                    </Box>
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
                            <ol style={{ padding: 0, margin: 0 }}>
                                {targetRecipe.steps.map((step, index) => (
                                <li key={index} >{step}</li>
                                ))}
                            </ol>
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box>
                <ReviewForm />
            </Box>
        </Box>

    );
}

export default ShowRecipe;