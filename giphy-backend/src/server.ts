import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);

// Handle all the errors thrown in any of the routes
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3333, () => console.log("Server is running on port 3333"));
