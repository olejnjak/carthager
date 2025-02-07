import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/data", (req: Request, res: Response) => {
  const data = { message: "Hello, World!", status: "success" };
  res.json(data);
});

app.get("/repo/:user/:repo", (req: Request, res: Response) => {
  const data = { user: req.params["user"], repo: req.params["repo"] };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
