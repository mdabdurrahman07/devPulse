import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors"
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5000/"
}))

// root

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to DevPulse REST API Server",
    author: "MD Abdur Rahman Nur Jamil",
    error: false,
  });
});

export default app;
