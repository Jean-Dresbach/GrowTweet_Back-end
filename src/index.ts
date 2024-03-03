import express from "express"
import cors from "cors"

import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"

const app = express()
app.use(express.json())
app.use(cors())

app.use(userRoutes)
app.use(authRoutes)

app.listen(3333, () => {
  console.log("🚀 Server ready at: http://localhost:3333 🚀")
})
