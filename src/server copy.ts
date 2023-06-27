import express, { Request, Response } from 'express';

const app = express();
const port = 3333;

interface Recipe {
    id: number;
    title: string;
    making_time: string;
    serves: string;
    ingredients: string;
    cost: string;
    created_at: string;
    updated_at: string;
}

let recipes: Recipe[] = [
    {
      id: 1,
      title: 'Pasta',
      making_time: '20 min',
      serves: '2 people',
      ingredients: 'Pasta, Tomato sauce, Cheese',
      cost: '10',
      created_at: '2021-06-01 10:00:00',
      updated_at: '2021-06-01 10:00:00',
    },
    {
      id: 2,
      title: 'Salad',
      making_time: '10 min',
      serves: '1 person',
      ingredients: 'Lettuce, Tomatoes, Cucumbers, Dressing',
      cost: '5',
      created_at: '2021-06-02 15:30:00',
      updated_at: '2021-06-02 15:30:00',
    },
];

app.use(express.json());


app.post('/recipes', (req: Request, res: Response) => {
    const { title, making_time, serves, ingredients, cost } = req.body;
    if (!title || !making_time || !serves || !ingredients || !cost) {
        res.status(400).json({
            message: 'Recipe creation failed!',
            required: 'title, making_time, serves, ingredients, cost',
        });
    } else {
        const id = recipes.length + 1;
        const created_at = new Date().toISOString();
        const updated_at = created_at;
        const newRecipe: Recipe = {
            id,
            title,
            making_time,
            serves,
            ingredients,
            cost,
            created_at,
            updated_at,
        };
        recipes.push(newRecipe);
        const response = {
            message: 'Recipe successfully created!',
            recipe: [newRecipe],
        };
        res.status(201).json(response);
    }
});

app.get('/recipes', (req: Request, res: Response) => {
    const response = {
        recipes: recipes.map((recipe) => {
            const { id, title, making_time, serves, ingredients, cost } = recipe;
            return {
                id,
                title,
                making_time,
                serves,
                ingredients,
                cost,
            };
        }),
    };
    res.json(response);
});


app.get('/recipes/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
        const response = {
            message: 'Recipe details by id',
            recipe: [recipe],
        };
        res.json(response);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

app.patch('/recipes/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, making_time, serves, ingredients, cost } = req.body;
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
        recipe.title = title || recipe.title;
        recipe.making_time = making_time || recipe.making_time;
        recipe.serves = serves || recipe.serves;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.cost = cost || recipe.cost;
        const response = {
            message: 'Recipe successfully updated!',
            recipe: [recipe],
        };
        res.json(response);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});


app.delete('/recipes/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = recipes.findIndex((r) => r.id === id);
    if (index !== -1) {
        recipes.splice(index, 1);
        res.json({ message: 'Recipe successfully removed!' });
    } else {
        res.status(404).json({ message: 'No recipe found' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });