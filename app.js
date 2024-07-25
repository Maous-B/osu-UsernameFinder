const proc = require('node:process');
require('dotenv').config();

console.log(process.env)

//console.log(proc.argv.length)

//console.log(proc.argv)

console.clear()

if(proc.argv.length < 3){
    console.log(`\x1b[38;5;196m⚠️ Error \x1b[38;5;255m : Please run the script like this : node ${proc.argv[1]} [username to check]`);
    return;
}



const banner = 
`
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                                                                          ║
║  \x1b[38;5;205m██████╗ ███████╗██╗   ██╗██╗    \x1b[38;5;255m██╗   ██╗███████╗███████╗██████╗ ███╗   ██╗ █████╗ ███╗   ███╗███████╗    ███████╗██╗███╗   ██╗██████╗ ███████╗██████╗  ║
║ \x1b[38;5;205m██╔═══██╗██╔════╝██║   ██║██║    \x1b[38;5;255m██║   ██║██╔════╝██╔════╝██╔══██╗████╗  ██║██╔══██╗████╗ ████║██╔════╝    ██╔════╝██║████╗  ██║██╔══██╗██╔════╝██╔══██╗ ║
║ \x1b[38;5;169m██║   ██║███████╗██║   ██║██║    \x1b[38;5;255m██║   ██║███████╗█████╗  ██████╔╝██╔██╗ ██║███████║██╔████╔██║█████╗      █████╗  ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝ ║
║ \x1b[38;5;169m██║   ██║╚════██║██║   ██║╚═╝    \x1b[38;5;255m██║   ██║╚════██║██╔══╝  ██╔══██╗██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══╝      ██╔══╝  ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗ ║
║ \x1b[38;5;133m╚██████╔╝███████║╚██████╔╝██╗    \x1b[38;5;255m╚██████╔╝███████║███████╗██║  ██║██║ ╚████║██║  ██║██║ ╚═╝ ██║███████╗    ██║     ██║██║ ╚████║██████╔╝███████╗██║  ██║ ║
║  \x1b[38;5;133m╚═════╝ ╚══════╝ ╚═════╝ ╚═╝     \x1b[38;5;255m╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝ ║
║                                                                                                                                                          ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝                                                                                                                                                        
`


async function checkUsernameAvailability(username) {
    const url = `https://osu.ppy.sh/users/check-username-availability`;
    const body = `username=${encodeURIComponent(username)}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Host': 'osu.ppy.sh',
            'Cookie': `XSRF-TOKEN=${process.env.XSRF_TOKEN}; osu_session=${process.env.OSU_SESSION}`,
            'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126"',
            'X-Csrf-Token': `${process.env.XSRF_TOKEN}`,
            'Accept-Language': 'fr-FR',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.127 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Origin': 'https://osu.ppy.sh',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://osu.ppy.sh/store/products/username-change',
            'Accept-Encoding': 'gzip, deflate, br',
            'Priority': 'u=1, i'
        },
        body: body
    });

    const data = await response.json();
    console.log(data)
    return data;
    
}

const main = async () => {

    console.clear();
    console.log(banner);
    const username = proc.argv.slice(2).join(' ').trim();
    console.log(`🔎 Checking username ${username} ...`);
    const data = await checkUsernameAvailability(username);
    //console.log(data);
    console.log(`📝 Informations about ${username} : `);
    data['available'] == true ?  console.log(`\x1b[38;5;46m✅ Available !\x1b[38;5;255m`) : (console.log(`\x1b[38;5;196m❌ Not available !\x1b[38;5;255m`));

    if(!data['available'])
    {

        if(data['message'] == `Username is already in use!`)
        {
            console.log(`\x1b[38;5;196m❌ Already in use !\x1b[38;5;255m`)
        }
        else if (data['message'] == `This username choice is not allowed.`)
        {
            console.log(`\x1b[38;5;196m❌ Not allowed !\x1b[38;5;255m`)
        }
        else if (data['message'] == `The requested username contains invalid characters.`)
            {
                console.log(`\x1b[38;5;196m❌ The requested username contains invalid characters !\x1b[38;5;255m`)
            }
        else if (data['message'] == `Please use either underscores or spaces, not both!`)
        {
            console.log(`\x1b[38;5;226m❓ Please use either underscores or spaces, not both\x1b[38;5;255m`);
        }
        else
        {
            const regex = /This username will be available for use in (.+)$/;
            const match = data['message'].match(regex);
            remainingTime = match[1];
            console.log(`\x1b[38;5;226m🟨 Username will be available in ${remainingTime}\x1b[38;5;255m`);
        }
    }
    
    console.log();
}

main();