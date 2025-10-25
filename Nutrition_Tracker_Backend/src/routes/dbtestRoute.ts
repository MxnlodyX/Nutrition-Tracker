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
        res.status(500).json({
            message: "Database Connection Failed",
            error : error
        })
    }
})
export default router