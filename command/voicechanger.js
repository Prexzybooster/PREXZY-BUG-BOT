const { exec } = require("child_process")
const fs = require("fs");
const { getRandom } = require('../start/lib/myfunction');

let handler = async (m, { mime, client, reaction, quoted, command, reply, prefix }) => {
    if (!/audio/.test(mime)) return reply(`audio reply, with caption ${prefix + command}`);
    let set;
    if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';      
    if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';       
    if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';     
    if (/earrape/.test(command)) set = '-af volume=12';      
    if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';      
    if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';     
    if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';        
    if (/reverse/.test(command)) set = '-filter_complex "areverse"';      
    if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';   
   if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'; 
   if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';    
   if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
   if (/audio/.test(mime)) {
       let media = await client.downloadAndSaveMediaMessage(quoted);
       await reaction(m.chat, "⚡")
       let ran = getRandom('.mp3');
       exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
           fs.unlinkSync(media);
           if (err) return reply(err);
           let buff = fs.readFileSync(ran);        
           client.sendMessage(m.chat, { 
               audio: buff,
               mimetype: 'audio/mpeg',
               ptt: true  
           });
           fs.unlinkSync(ran);
       });
   }
}

handler.help = ['voice changer'];
handler.tags = ['voice'];
handler.command = ["tupai", "smooth", "slow", "robot", "reverse", "nightcore", "fat", "fast", "earrape", "deep", "blown", "bass"];

module.exports = handler;
