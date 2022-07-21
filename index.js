const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

// Get numbers
async function sendPeople(){
  let chats = [
    "521XXXXXXXXXX@c.us", // Internacional format
    "521XXXXXXXXXX@c.us",
  ]
  for (var x = 0; x < chats.length; x++){
    await sendToChat(chats[x]);
  }
}

// Senad all mesagges for one number
async function sendToChat(chatID){
  let lastNum = 20;
  var sound = MessageMedia.fromFilePath("./sources/sound.mp3");
  await client.sendMessage(chatID, `*== Transformaciones de Goku del 1 al ${lastNum} ==*`);
  await client.sendMessage(chatID, sound);
  for (var x = 1; x <= lastNum; x++){
    let media = MessageMedia.fromFilePath(`./sources/images/ssj${x}.jpg`)
    await client.sendMessage(chatID, media, { caption: `SSJ ${x}` })
  }
}

// Login QR
client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => sendPeople());

client.initialize();