# Discord Audio Bot

A Discord bot that can play various audio formats from local files and YouTube links.

## Features
- Play local audio files (Supports MP3)
- Stream YouTube videos
- Basic audio controls (play, pause, resume, volume)
- Easy to use command system

## Supported Audio Formats
- MP3


## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Discord account and its token

## Installation

1. Clone this repository:
git clone https://github.com/YOUR_USERNAME/discord-audio-bot.git
cd discord-audio-bot

2. Copy `config.example.json` to `config.json` and fill in your details:
{
    "token": "YOUR_DISCORD_TOKEN_HERE",
    "voiceChannelId": "YOUR_VOICE_CHANNEL_ID_HERE"
}

3. Install dependencies:
npm install

4. upload your mp3 files to the 'Sounds' folder

5. Start the bot:
node index.js

## Commands
- `join` - Join the configured voice channel
- `play [YouTube URL]` - Play audio from a YouTube link
- `upload [filename]` - Play an audio file from the Sounds folder
- `pause` - Pause current playback
- `resume` - Resume paused playback
- `volume [0-2]` - Adjust volume (0 = silent, 1 = normal, 2 = twice as loud)
- `leave` - Leave the voice channel

## Project Structure
discord-audio-bot/
├── index.js           # Main bot code

├── config.json        # Bot configuration (not included in repo)

├── config.example.json # Example configuration

├── package.json       # Project dependencies

├── .gitignore        # Git ignore rules

└── Sounds/           # Folder for audio files
    └── (your audio files)

## Contributing
Feel free to submit issues and pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
