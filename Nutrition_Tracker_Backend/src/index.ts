import express from 'express'
import dotenv from 'dotenv'
import dbtestRoutes from './routes/dbtestRoute'
import registrationRoutes from './routes/registrationRoute'
import authRoutes from './routes/authRotues'
import { setupSwagger } from "./swagger";

const app = express()
dotenv.config()

app.use(express.json())
app.use('/api',dbtestRoutes)
app.use('/api',registrationRoutes)
app.use('/api/auth/',authRoutes)
setupSwagger(app);

app.listen(3002, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
  console.log(`📘 Swagger docs ready at http://localhost:3002/api-docs`);
});
export default app