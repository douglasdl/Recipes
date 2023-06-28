import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { z } from 'zod';

const app = fastify();
const port = 3333;

const prisma = new PrismaClient()

app.post('/recipes', async (request, reply) => {
    const createRecipeSchema = z.object({
        title: z.string(), 
        making_time: z.string(),
        serves: z.string(),
        ingredients: z.string(),
        cost: z.number(),
    })
    const { title, making_time, serves, ingredients, cost  } = createRecipeSchema.parse(request.body)

    await prisma.recipe.create({
        data: {
            title, 
            making_time, 
            serves, 
            ingredients, 
            cost
        }
    })
    return reply.status(201).send();

    // error

    // if (!title || !making_time || !serves || !ingredients || !cost) {
    //     res.status(400).json({
    //         message: 'Recipe creation failed!',
    //         required: 'title, making_time, serves, ingredients, cost',
    //     });
    // } else {
        
    //     const response = {
    //         message: 'Recipe successfully created!',
    //         recipe: [newRecipe],
    //     };
        
    // }
});

app.get('/recipes', async () => {
    const recipes = await prisma.recipe.findMany();
 
    return { recipes }
});


// app.get('/recipes/:id', (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const recipe = recipes.find((r) => r.id === id);
//     if (recipe) {
//         const response = {
//             message: 'Recipe details by id',
//             recipe: [recipe],
//         };
//         res.json(response);
//     } else {
//         res.status(404).json({ message: 'Recipe not found' });
//     }
// });

// app.patch('/recipes/:id', (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const { title, making_time, serves, ingredients, cost } = req.body;
//     const recipe = recipes.find((r) => r.id === id);
//     if (recipe) {
//         recipe.title = title || recipe.title;
//         recipe.making_time = making_time || recipe.making_time;
//         recipe.serves = serves || recipe.serves;
//         recipe.ingredients = ingredients || recipe.ingredients;
//         recipe.cost = cost || recipe.cost;
//         const response = {
//             message: 'Recipe successfully updated!',
//             recipe: [recipe],
//         };
//         res.json(response);
//     } else {
//         res.status(404).json({ message: 'Recipe not found' });
//     }
// });


// app.delete('/recipes/:id', (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const index = recipes.findIndex((r) => r.id === id);
//     if (index !== -1) {
//         recipes.splice(index, 1);
//         res.json({ message: 'Recipe successfully removed!' });
//     } else {
//         res.status(404).json({ message: 'No recipe found' });
//     }
// });

app.listen({
    host: '192.168.10.113',
    port: process.env.PORT ? Number(process.env.PORT) : port,
}).then(() => {
    console.log(`Server is listening on port ${port}`);
});