import mongoose from "mongoose";

export default async function connectDb() {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(res.connection.host);
  } catch (error) {
    console.error(`Error while connecting to database ${error}`)
  }
}
