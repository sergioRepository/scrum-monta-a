import { config } from 'dotenv'
config()

export const PORT = process.env.PORT || 4000
export const MONGODB_URI =
 process.env.MONGODB_URI ||
 "mongodb+srv://sergioflorez422:florez123@florez.ekdojea.mongodb.net/scrum-recreacional'"