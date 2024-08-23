# Commitspark Example: Expose the Commitspark GraphQL API over HTTP using Express

[Commitspark](https://commitspark.com) is a set of tools to manage structured data with Git through a GraphQL API.

This repository contains example code that exposes
the [Commitspark GraphQL API](https://github.com/commitspark/graphql-api) over HTTP
using [Express](https://expressjs.com) and GitHub as Git provider.

## Getting Started

1. Run `npm install`.
1. Obtain a GitHub access token (classic or fine-grained) according to
   the [GitHub adapter documentation](https://github.com/commitspark/git-adapter-github).
1. Get the repository owner and repository name for your targeted repository.

   For example, a repository at `https://github.com/my-org/my-repository` has owner `my-org` and repository
   name `my-repository`.
1. Copy `.env.dist` to `.env` and fill in your repository owner, name, and GitHub access token.
1. Compile the code with `npm run build`.
1. Run your server with `npm run start`.

## Usage

After starting the server, the Commitspark GraphQL endpoint is available
under [http://localhost:3000/main/graphql](http://localhost:3000/main/graphql)
and the generated GraphQL schema as plaintext
under [http://localhost:3000/main/schema](http://localhost:3000/main/schema) .

In both cases, `main` can be replaced with any URL-encoded ref (commit hash),
branch name or tag name to traverse to any point in your repository's commit tree. See
the [GraphQL API](https://github.com/commitspark/graphql-api) for more information on making API calls.
