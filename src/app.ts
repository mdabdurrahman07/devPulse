import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { authRoute } from "./modules/auth/auth.route";
import globalErrorHandler from "./utils/globalErrorHandler";
import { issuesRoute } from "./modules/issues/issues.route";
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://vercel.app", "http://localhost:5000"],
    credentials: true
  })
);

// root

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to DevPulse REST API Server",
    author: "MD Abdur Rahman Nur Jamil",
    error: false,
  });
});

// auth route
app.use("/api/auth", authRoute);
app.use("/api/issues", issuesRoute);

app.use(globalErrorHandler);
export default app;
