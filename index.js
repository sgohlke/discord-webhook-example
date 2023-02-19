// Used as example to get rooms on stackstream
const stackstreamRoomURL = 'https://api.stack-stream.com/case-backend/api/v1/case?sort_by=-start_date'

// Set your webhook url here. Check https://support.discord.com/hc/en-us/articles/360045093012 for help
const discordWebhookURL = 'https://discord.com/api/webhooks/webhook_id/webhook_token'

fetch(stackstreamRoomURL)
.then( response => {
    //console.log('response is', response)
    return response.json()
})
.then( responseAsJson => {
    //console.log('responseAsJson is', responseAsJson)
    if (responseAsJson.data) {
        // We will just get the first room from the response here as an example
        const room = responseAsJson.data[0]
        // console.log('room is', room)

        // Execute webhook format, see https://discord.com/developers/docs/resources/webhook#execute-webhook
        const notification = {
            username: 'Stackstream Notification',
            avatar_url: '',
            content: `There is a new planned or live room:\nDate: ${room.startDate}\nTitle: ${room.title}\nLanguage: ${room.language}\nLink: https://stack-stream.com/case/${room.slug}`
        }

        fetch(discordWebhookURL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notification)
        }
        ).then(responseForNotification => {
            //console.log('responseForNotification is', responseForNotification)
            console.log('Notification sent.')
        })
        .catch( errorForDiscordRequest => {
            console.log('errorForDiscordRequest is', errorForDiscordRequest)
        })
    }
})
.catch( error => {
    console.log('error is', error)
})
