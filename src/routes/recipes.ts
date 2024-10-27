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
    response.status(201).json(newRecipe);
  } catch (error) {
    response.status(500).json({ error: 'An error has occured while creating the recipe!' });    
  }
})

// Return a list of all the recipes
router.get('/', async (request: Request, response: Response) => {
  try {
    const recipes = await prisma.recipes.findMany();
    response.json(recipes);
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
      }
    });
    if(recipe) {
      response.json(recipe);
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
        id: parseInt(request.params.id)
      },
      data: { title, making_time, serves, ingredients, cost }
    });
    response.json(updatedRecipe);
  } catch (error) {
    response.status(404).json({ error: 'Recipe not found or update failed!' });    
  }
})

// Delete the selected recipe
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const deletedRecipe = await prisma.recipes.delete({
      where: {
        id: parseInt(request.params.id)
      }
    });
    response.json(deletedRecipe);
  } catch (error) {
    response.status(404).json({ error: 'Recipe not found or deletion failed!' });    
  }
})

export default router;