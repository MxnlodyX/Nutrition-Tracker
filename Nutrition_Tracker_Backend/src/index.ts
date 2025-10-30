import express from 'express'
import dotenv from 'dotenv'
import dbtestRoutes from './routes/dbtestRoute'
import registrationRoutes from './routes/registrationRoute'
import authRoutes from './routes/authRotues'
import nutritionRotue from './routes/nutritionRoute'
import mealRoute from './routes/mealRoute' // Import meal route
import { setupSwagger } from "./swagger";
import cors from "cors";

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({
  origin: [
    "https://nutrition-tracker-frontend-9a3e.onrender.com", // frontend URL จริงของคุณ
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));
app.use('/api', dbtestRoutes)
app.use('/api', registrationRoutes)
app.use('/api/auth', authRoutes)
app.use("/api/nutrition", nutritionRotue);
app.use("/api/meals", mealRoute); // Use meal route

setupSwagger(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`✅ Server running on port ${process.env.SERVER_PORT}`);
  console.log(`📘 Swagger docs ready at http://localhost:3002/api-docs`);
});
export default app