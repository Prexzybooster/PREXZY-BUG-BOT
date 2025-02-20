const fetch = require('node-fetch');

const handler = async (m, { text }) => {
    if (!text) {
        return m.reply('Please enter text for AI!');
    }

    try {
        const response = await fetch(`https://api.ryzendesu.vip/api/ai/claude?text=${encodeURIComponent(text)}`);
        const result = await response.json();

        if (!result || !result.response) {
            throw new Error('Failed to get reply from fire.');
        }

        m.reply(result.response); 
    } catch (error) {
        console.error(error);
        m.reply('An error occurred while answering😹😹. Please try again later.');
    }
};

handler.help = ['claude <teks>'];
handler.tags = ['ai'];
handler.command = ['aiclaude'];

module.exports = handler;