import express from 'express'
import { envs } from './config'
import { GithubController } from './presentation/github/controller'
import { GitHubService } from './presentation/services/github.service'
import { DiscordService } from './presentation/services/discord.service'
import { Github256Middleware } from './presentation/middleware/github-256.middleware'

( () => {
    main()
})()

function main() {

    const app = express()

    app.use( express.json())
    
    app.use( Github256Middleware.verifySignature)
    
    const gitHubService = new GitHubService()
    const serviceService = new DiscordService()
    const controller = new GithubController(gitHubService, serviceService);
    
    app.post('/api/github', controller.webhookHandler)

    app.listen( envs.PORT, () => {

        console.log(`Listening to port ${ envs.PORT}`)
    })
}