import chalk from "chalk";

async function questList(tokenaccess) {
    const url = "https://testnet-api.x1.one/quests"

    const headers = {
        'accept': '*/*',
        'accept-language': 'en,en-US;q=0.9,id;q=0.8',
        'areyouahuman': 'true',
        'authorization': tokenaccess,
        'content-type': 'application/json',
        'dnt': '1',
        'origin': 'https://testnet.x1ecochain.com',
        'priority': 'u=1, i',
        'referer': 'https://testnet.x1ecochain.com/',
        'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(chalk.red(`⛔ Error to get quest list: ${err.message}`))
        }
    }
}

async function completeQuest(questid, tokenaccess) {
    const url = `https://testnet-api.x1.one/quests?quest_id=${questid}`

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'areyouahuman': 'true',
        'authorization': tokenaccess,
        'content-length': '0',
        'content-type': 'application/json',
        'origin': 'https://testnet.x1ecochain.com',
        'priority': 'u=1, i',
        'referer': 'https://testnet.x1ecochain.com/',
        'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
    }

     while(true) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(chalk.red(`⛔ Error to complete quest: ${err.message}`))
        }
    }
}

export { questList, completeQuest }