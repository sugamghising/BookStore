import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/users.route.js'
import bookRoute from './routes/book.route.js'
import orderRoute from './routes/order.route.js'
import reviewRoute from './routes/review.route.js'


const app = express()
dotenv.config()


const port = process.env.PORT || 3000
const DB_URI = process.env.MONGO_URI

app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true
}))
app.use(express.json())

try{
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected!')
}catch(err){
    console.log(err)
}

app.use('/api/book', bookRoute);
app.use('/api/user', userRoute);
app.use('/api/order', orderRoute);
app.use('/api/review', reviewRoute);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})