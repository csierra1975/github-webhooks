import { envs } from "../../config";
import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";


export class DiscordService {

    private readonly discordWebhookUrl: string = envs.DISCORT_WEBHOOK_URL

    constructor(){}

    async notify(message: string) {

        const body = {
            content: message,
            embeds: [
                {
                    image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG9mc3Iybjh1dzVnY2FmamthMmp4dXFnMjE3dzhva3FsMWk2bHFvNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FnsyaPjzV7ZdNLB9sx/giphy.gif'}
                }
            ]
        }

        const response = await fetch(this.discordWebhookUrl,  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            console.log('Error sending message to discord')
            return false
        }

        return true
    }
}