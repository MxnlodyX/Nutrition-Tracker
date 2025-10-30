import express from 'express';
import type { Request,Response } from 'express';
import pool from '../utils/db'
const router = express.Router()

router.get('/testdb',async (_:Request,res:Response)=>{
    try{
        const client = await pool.connect()
        const result = await client.query("SELECT NOW()")
        if(result){
            client.release()
            res.status(200).json({
                message: "Nutrition Database Connection Successfully"
            })
        }
    }catch(error){
        // 💡 แก้ไข: ส่งเฉพาะข้อความ Error เพื่อป้องกัน Server Crash
        res.status(500).json({
            message: "Database Connection Failed",
            error: (error as Error).message // 👈 ดึงแค่ message
        })
    }
})
export default router
