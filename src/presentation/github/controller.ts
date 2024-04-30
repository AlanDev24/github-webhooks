import { Request, Response } from "express";
import { GithubService, DiscordService } from "../services";

export class githubController {
  constructor(
    private readonly githubservice = new GithubService(),
    private readonly discordService = new DiscordService()
  ) {}

  webHookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknown";
    // const signature = req.header('x-hub-signature-256') ?? 'unknown';
    const payload = req.body;
    let message: string;

    switch (githubEvent) {
      case "star":
        message = this.githubservice.onStar(payload);
        break;
      case "issues":
        message = this.githubservice.onIssue(payload);
        break;

      default:
        message = `unknown github event ${githubEvent}`;
    }

    this.discordService
      .notufy(message)
      .then(() => res.status(202).send("Accepted"))
      .catch(() => res.status(500).json({ error: "internal server error" }));
  };
}
