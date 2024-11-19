const { Client } = require('discord.js-selfbot-v13');
const ytdl = require('@distube/ytdl-core');
const fs = require('fs');
const config = require('./config.json');




// Configuration for a single account
const token = config.token; // Replace the hardcoded token
const voiceChannelId = config.voiceChannelId; // Replace the hardcoded channel ID

const client = new Client();
let dispatcher; // This will hold the audio dispatcher
let connection; // This will hold the voice connection

// YouTube URL
const youtubeUrl = ''; // Replace with your YouTube link

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
  console.log('Commands: join, play, pause, resume, volume <level>, leave, upload <file>');
});
//upload loud.mp3 upload loud.mp3
// Function to handle commands
const handleCommand = async (command) => {

  const args = command.trim().split(' ');
  const cmd = args.shift().toLowerCase();

  switch (cmd) {
    case 'join':
      if (connection) {
        console.log('Already connected to a voice channel!');
        return;
      }
      const channel = client.channels.cache.get(voiceChannelId);
      if (!channel) {
        console.error('Voice channel not found!');
        return;
      }
      connection = await client.voice.joinChannel(channel, {
        selfMute: true,
        selfDeaf: true,
        selfVideo: false,
      });
      console.log('Connected to voice channel');
      break;

    case 'play':
      if (!connection) {
        console.log('Not connected to a voice channel! Use the join command first.');
        return;
      }
      if (dispatcher) {
        console.log('Audio is already playing!');
        return;
      }
      dispatcher = connection.playAudio(
        ytdl(youtubeUrl, { quality: 'highestaudio' })
      );

      dispatcher.on('start', () => {
        console.log('Audio is now playing!');
      });

      dispatcher.on('finish', () => {
        console.log('Audio has finished playing!');
        dispatcher = null;
      });

      dispatcher.on('error', console.error);
      break;

    case 'pause':
      if (!dispatcher) {
        console.log('No audio is playing!');
        return;
      }
      dispatcher.pause();
      console.log('Paused');
      break;

    case 'resume':
      if (!dispatcher) {
        console.log('No audio is playing!');
        return;
      }
      dispatcher.resume();
      console.log('Resumed');
      break;

    case 'volume':
      if (!dispatcher) {
        console.log('No audio is playing!');
        return;
      }
      const volume = parseFloat(args[0]);
      if (isNaN(volume) || volume < 0 || volume > 2) {
        console.log('Invalid volume level. Must be between 0 and 2.');
        return;
      }
      dispatcher.setVolume(volume);
      console.log(`Volume set to ${volume}`);
      break;

    case 'leave':
      if (!connection) {
        console.log('Not connected to a voice channel!');
        return;
      }
      connection.disconnect();
      dispatcher = null;
      connection = null;
      console.log('Disconnected');
      break;

    case 'upload':
      if (!connection) {
        console.log('Not connected to a voice channel! Use the join command first.');
        return;
      }
      if (args.length === 0) {
        console.log('No file name provided!');
        return;
      }
      const fileName = args.join(' ');
      const filePath = `./Sounds/${fileName}`; // Look in Sounds folder
      if (!fs.existsSync(filePath)) {
        console.log('File not found in Sounds folder!');
        return;
      }
      const fileStream = fs.createReadStream(filePath);
      dispatcher = connection.playAudio(fileStream);
      dispatcher.on('start', () => {
        console.log(`Now playing: ${fileName}`);
      });
      dispatcher.on('finish', () => {
        console.log('Audio from file has finished playing!');
        dispatcher = null;
      });
      dispatcher.on('error', console.error);
      break;

    default:
      console.log('Unknown command');
      break;
  }
};

// Set up the readline interface
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Start the command prompt
rl.setPrompt('> ');
rl.prompt();

rl.on('line', handleCommand);

// Login to Discord
client.login(token).catch(console.error);
