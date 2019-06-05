/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on("pull_request.opened", async context => {
    const issueNumber = context.payload.pull_request.number;
    const bucket = "jobber-atlantis";

    const issueComment = context.issue({
      body: `
Hi Frend. I'm preparing a preview of the docs for this branch. It will be up momentarily.

[![Preview](https://img.shields.io/badge/&#8599;-Preview-28a745.svg)](http://${bucket}.s3-website-us-east-1.amazonaws.com/${issueNumber})`
    });

    return context.github.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
