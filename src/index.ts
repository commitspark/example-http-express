import { getApiService } from '@contentlab/contentlab'
import {
  createAdapter,
  GitHubRepositoryOptions,
} from '@contentlab/git-adapter-github'
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
app.use(express.json())

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000

app.post(
  '/:ref/graphql',
  async (req: Request, res: Response): Promise<void> => {
    const ref = req.params['ref']

    const adapter = createAdapter()
    await adapter.setRepositoryOptions(getRepositoryOptions())
    const api = await getApiService()
    const response = await api.postGraphQL(adapter, ref, req.body)

    const body = {
      data: response.data,
      errors: response.errors,
    }
    res.set({
      'content-type': 'application/graphql+json',
      'X-Ref': response.ref,
    })
    res.status(200)
    res.json(body)
  },
)

app.get('/:ref/schema', async (req: Request, res: Response): Promise<void> => {
  const ref = req.params['ref']

  const adapter = createAdapter()
  await adapter.setRepositoryOptions(getRepositoryOptions())
  const api = await getApiService()
  const response = await api.getSchema(adapter, ref)

  res.set({
    'content-type': 'application/graphql+json',
    'X-Ref': response.ref,
  })
  res.status(200)
  res.send(response.data)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

const getRepositoryOptions = (): GitHubRepositoryOptions => {
  if (
    !process.env.GITHUB_REPOSITORY_OWNER ||
    !process.env.GITHUB_REPOSITORY_NAME ||
    !process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  ) {
    throw new Error('Missing environment variables')
  }

  return {
    repositoryOwner: process.env.GITHUB_REPOSITORY_OWNER,
    repositoryName: process.env.GITHUB_REPOSITORY_NAME,
    personalAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  }
}
