const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const chalk = require('chalk');
const fs = require('fs');

function randStr(length) {
    var result = '';
    var character = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var characterLength = character.length;
    for (let i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
}

const createSpotify = (email, password) => new Promise((resolve, reject) => {

    fetch('https://spclient.wg.spotify.com/signup/public/v1/account', {
        method: 'POST',
        headers: {
            'authority': 'spclient.wg.spotify.com',
            'sec-ch-ua': '^\^',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded',
            'accept': '*/*',
            'origin': 'https://www.spotify.com',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.spotify.com/',
            'accept-language': 'en-US,en;q=0.9'
        },
        body: `birth_day=12&birth_month=10&birth_year=1987&collect_personal_info=undefined&creation_flow=&creation_point=https^%^3A^%^2F^%^2Fwww.spotify.com^%^2Fid^%^2F&displayname=HeHeHe&gender=male&iagree=1&key=a1e486e2729f46d6bb368d6b2bcda326&platform=www&referrer=&send-email=0&thirdpartyemail=0&email=${email}&password=${password}&password_repeat=${password}&fb=0`
    })
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
});

(async () => {

    try {

        console.log(`
   _____             _   _  __       
  / ____|           | | (_)/ _|      
 | (___  _ __   ___ | |_ _| |_ _   _ 
  \___ \| '_ \ / _ \| __| |  _| | | |
  ____) | |_) | (_) | |_| | | | |_| |
 |_____/| .__/ \___/ \__|_|_|  \__, |
        | |                     __/ |
        |_|                    |___/ 
                                                                                                  
??????????????????????????????????????????
1. ??????????????????????????????????????????
2. ????????????????????????????????????????????????????????????
`);

    const toolsNumb = await readlineSync.question('????????????????????????: ');
    console.log('');

    if (toolsNumb == '1') {

        const email = await readlineSync.question('?????????Email : ');
        const password = await readlineSync.question('??????????????? : ');

        const resultCreateSpotify = await createSpotify(email, password);
        const username = resultCreateSpotify.username;
        const token = resultCreateSpotify.login_token;

        if (username && token) {
            console.log(chalk.green(`\nOK | ${email} | ${password}`));
            fs.appendFileSync('result.txt', `${email} | ${password}\n`);
            fs.appendFileSync('token.txt', `${token}\n`)
        } else if (!username && !token) {
            const errorMsgCreate = resultCreateSpotify.errors.email;
            console.log(chalk.red(`No OK | ${errorMsgCreate}`));
        } else {
            console.log(chalk.yellow('????????????????????????'));
        }

    } else if (toolsNumb == '2') {

        while (true) {

            var email = `${randStr(10)}@kmail.com`;
            var password = '32FS6zJm';
            const resultCreateSpotify = await createSpotify(email, password);
            const username = resultCreateSpotify.username;
            const token = resultCreateSpotify.login_token;
            
            if (username && token) {
                console.log(chalk.green(`OK | ${email} | ${password}`));
                fs.appendFileSync('result.txt', `${email} | ${password}\n`);
                fs.appendFileSync('token.txt', `${token}\n`)
            } else if (!username && !token) {
                const errorMsgCreate = resultCreateSpotify.errors.email;
                console.log(chalk.red(`No OK | ${errorMsgCreate}`));
            } else {
                console.log(chalk.yellow('?????????'));
            }
        }

        
    } else {
        console.log('?????? 1 ?????? 2 ??????');
    }
        
    } catch (e) {
        console.log(e);
    }

})();
