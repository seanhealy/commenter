import { Application } from "probot"; // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on("issues.opened", async context => {
    const issueNumber = context.payload.issue.number;
    const bucket = "jobber-atlantis";

    const issueComment = context.issue({
      body: `
Hi Frend. I'm preparing a preview of the docs for this branch. It will be up momentarily.

[![Preview](https://img.shields.io/badge/&#8599;-Preview-28a745.svg)](http://${bucket}.s3-website-us-east-1.amazonaws.com/${issueNumber})`
    });

    await context.github.issues.createComment(issueComment);
  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
