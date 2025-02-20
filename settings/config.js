const fs = require('fs')
//~~~~~~~~~SETTING BOT~~~~~~~~~~//
global.owner = "263785335562"
global.name = "Prexzy"
global.ch = 'https://whatsapp.com/channel/0029VapyPnMKAwEk3YuHAb3s'
global.status = true

global.mess = {
    owner: "no, this is for owners only",
    group: "this is for groups only",
    private: "this is specifically for private chat"
}

global.packname = 'PREXZY-BUG-V4'
global.author = 'Precious Ayomide'

global.pairing = "PREXZY"

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
  
