import express from 'express'
import dotenv from 'dotenv'
import dbtestRoutes from './routes/dbtestRoute'
import registrationRoutes from './routes/registrationRoute'
const app = express()
dotenv.config()

app.use(express.json())
app.use('/api',dbtestRoutes)
app.use('/api',registrationRoutes)

app.listen(3002,() => {
    console.log("Server is running on port 3002")
})
export default app