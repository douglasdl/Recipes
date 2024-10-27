import express from "express"
import recipeRoutes from './routes/recipes'

const app = express()
const port = process.env || 3000

app.use(express.json());
app.use('/recipes', recipeRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})