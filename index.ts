import express, { Request, Response } from "express";
import { Octokit } from "@octokit/rest";
import { getReleaseAssets } from "./github-api";

const app = express();
const port = process.env.PORT || 3000;

app.get("/data", (req: Request, res: Response) => {
  const data = { message: "Hello, World!", status: "success" };
  res.json(data);
});

app.get("/repo/:user/:repo", async (req: Request, res: Response) => {
  const user = req.params["user"]
  const repo = req.params["repo"]
  const binaries = await getReleaseAssets(user, repo)

  res.json(binaries);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
