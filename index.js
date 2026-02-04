import { Web3 } from "web3";
import { logIn, signMessage } from "./login";
import chalk from "chalk";
import { completeQuest, questList } from "./quest";
import fs from "fs";

const web3 = new Web3("http://localhost:8545")

async function setupWallet(privatekey) {
    const pkey = privatekey
    const wallet = web3.eth.accounts.privateKeyToAccount(pkey)
    return wallet
}

async function setupLogin(privatekey, messages) {
    const pkey = privatekey
    const wallet = web3.eth.accounts.privateKeyToAccount(pkey)
    const message = messages
    // const msg_convert = `0x${Buffer.from(message, "utf8")}`

    const sign = web3.eth.accounts.sign(message, wallet.privateKey)
    // console.log(sign)
    // console.log(`ini dari kita:`, sign.signature)

    return sign.signature
}

async function main() {
    console.log("𝕏 X1T Ecochain Send X1T & Daily Check-in\n")
    try {
        // read tokens.txt
        const data = fs.readFileSync('datas.txt', 'utf-8');
        const datas = data.split('\n')

        for (const data of datas) {
            if(data!='') {
                const privates = data.trim()
                const wallet = await setupWallet(privates)
                // console.log(wallet)

                // sign
                const message = await signMessage(wallet.address)
                // console.log(message.message)
                const sign = await setupLogin(wallet.privateKey, message.message)
                // console.log(sign)

                const login = await logIn(sign, wallet.address)
                // console.log(login)
                if ('token' in login) {
                    const tokenaccess = login.token
                    const address = login.user.address
                    const points = login.user.points

                    // quest list
                    const qList = await questList(tokenaccess)
                    let idquest1 = 0
                    let id1compelted = false
                    let idquest2 = 0
                    let id2compelted = false
                    for (const quest of qList) {
                        // console.log(quest)
                        if (quest.id === "691fd151814608a47a30e4a4") { // send x1t
                            idquest1 = quest.id
                            id1compelted = quest.is_completed_today
                        }

                        if (quest.id === "691fd172814608a47a30e4a8") { //daily login
                            idquest2 = quest.id
                            id2compelted = quest.is_completed_today
                        }
                    }

                    // console.log(idquest1, id1compelted)
                    // console.log(idquest2, id2compelted)

                    // cek
                    let statussend = "-"
                    if (idquest1!=0 && !id1compelted) {
                        const completesend = await completeQuest(idquest1, tokenaccess)
                        statussend = chalk.green(completesend.message)
                    } else {
                        statussend = chalk.red("Completed")
                    }

                    let statusdaily = "-"
                    if (idquest2!=0 && !id2compelted) {
                        const completedaily = await completeQuest(idquest2, tokenaccess)
                        statusdaily = chalk.green(completedaily.message)
                    } else {
                        statusdaily = chalk.red("Completed")
                    }

                    console.log(`[>] EVM address: ${chalk.green(`${String(address).slice(0,5)}xxx${String(address).slice(-5)}`)} | Points: ${chalk.yellow(points)} | Status send: ${statussend} | Status daily: ${statusdaily}`)
                } else {
                    console.log(`[!] Error to login! Try again...`)
                }   
            }

            await new Promise(resolve => setTimeout(resolve, 5000)) // delay 5 detik
        }

        console.log("\nSudah diproses hingga wallet/email terakhir...")
    } catch (e) {
        // jika tokens.txt not exist
        if (e.code == 'ENOENT') {
            console.log('📝 Fill the datas.txt first!');
            fs.writeFileSync('datas.txt', "0xxxxprivatekey1\n0xxxxprivatekey2\netc...")
            process.exit()
        } else {
            throw e
        }
    }

}

main()