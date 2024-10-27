import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express"

const router = Router();
const prisma = new PrismaClient();

// Create a recipe
router.post('/', async (request: Request, response: Response) => {
  try {
    const { title, making_time, serves, ingredients, cost } = request.body;
    const newRecipe = await prisma.recipes.create({
      data: { title, making_time, serves, ingredients, cost }
    });
    response.status(201).json({
      message: "Recipe successfully created!",
      recipe: [ newRecipe ] 
    });
  } catch (error) {
    response.status(500).json({
      message: "Recipe creation failed!",
      required: "title, making_time, serves, ingredients, cost"
    });    
  }
})

// Return a list of all the recipes
router.get('/', async (request: Request, response: Response) => {
  try {
    const recipes = await prisma.recipes.findMany({
      select: {
        id: true,
        title: true,
        making_time: true,
        serves: true,
        ingredients: true,
        cost: true
      }
    });
    response.json({
      recipes: recipes 
    });
  } catch (error) {
    response.status(500).json({ error: 'An error has occured while fetching recipes!' });    
  }
})

// Return the selected recipe
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const recipe = await prisma.recipes.findUnique({
      where: {
        id: parseInt(request.params.id)
      },
      select: {
        id: true,
        title: true,
        making_time: true,
        serves: true,
        ingredients: true,
        cost: true
      }
    });
    if(recipe) {
      response.json({
        message: "Recipe details by id",
        recipe: [ recipe ]
      });
    } else {
      response.status(404).json({ message: 'Recipe not found!' });
    }
  } catch (error) {
    response.status(500).json({ error: 'An error has occured while fetching recipe!' });    
  }
})

// Update the selected recipe
router.patch('/:id', async (request: Request, response: Response) => {
  try {
    const { title, making_time, serves, ingredients, cost } = request.body;
    const updatedRecipe = await prisma.recipes.update({
      where: {
        id: parseInt(request.params.id),
      },
      data: { title, making_time, serves, ingredients, cost },
      select: {
        title: true,
        making_time: true,
        serves: true,
        ingredients: true,
        cost: true
      }
    });
    response.json({
      message: "Recipe successfully updated!",
      recipe: [ updatedRecipe ] 
    });
  } catch (error) {
    response.status(404).json({ error: 'Recipe not found or update failed!' });    
  }
})

// Delete the selected recipe
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    await prisma.recipes.delete({
      where: {
        id: parseInt(request.params.id)
      }
    });
    response.json({
      message: "Recipe successfully removed!"
    });
  } catch (error) {
    response.status(404).json({ message: "No recipe found" });
  }
})

export default router;