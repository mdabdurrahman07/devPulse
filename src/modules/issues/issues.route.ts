import { Router } from "express";
import { issuesController } from "./issues.controller";
import { auth } from "../../middleware/authMiddleware";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

router.post("/", auth, checkRole("contributor", "maintainer"), issuesController.createIssue);
router.get("/", issuesController.getAllIssues);
router.get("/:id", issuesController.getSingleIssue);
router.put("/:id" , issuesController.updateIssue);
router.delete("/:id", issuesController.deleteIssue);

export const issuesRoute = router;
