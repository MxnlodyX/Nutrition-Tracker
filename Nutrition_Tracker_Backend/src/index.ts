import express from 'express'
import dotenv from 'dotenv'
import dbtestRoutes from './routes/dbtestRoute'
import registrationRoutes from './routes/registrationRoute'
import authRoutes from './routes/authRotues'
import nutritionRotue from './routes/nutritionRoute'
import { setupSwagger } from "./swagger";
import cors from "cors";

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // พอร์ตของ React/Vite
  credentials: true, // ถ้าจะส่ง cookie/token ข้ามโดเมน
}));
app.use('/api', dbtestRoutes)
app.use('/api', registrationRoutes)
app.use('/api/auth/', authRoutes)
app.use("/api/nutrition", nutritionRotue);

setupSwagger(app);

app.listen(3002, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
  console.log(`📘 Swagger docs ready at http://localhost:3002/api-docs`);
});
export default app