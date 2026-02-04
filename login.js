import chalk from "chalk";

async function signMessage(address) {
    const url = `https://testnet-api.x1.one/signin?address=${address}`

    const headers = {
        'accept': '*/*',
        'accept-language': 'en,en-US;q=0.9,id;q=0.8',
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
            console.log(chalk.red(`⛔ Error to sign message: ${err.message}`))
        }
    }
}

async function logIn(signature, address) {
    const url = "https://testnet-api.x1.one/signin"

    const payload = JSON.stringify({
        "signature": signature,
        "address": address,
        "ref_code": ""
    })

    const headers = {
        'accept': '*/*',
        'accept-language': 'en,en-US;q=0.9,id;q=0.8',
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
                method: 'POST',
                headers: headers,
                body: payload
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(chalk.red(`⛔ Error to login: ${err.message}`))
        }
    }
}

export { signMessage, logIn }