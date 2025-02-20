const fetch = require('node-fetch');

const handler = async (m, { text, client }) => {
    if (!text) {
        return client.sendMessage(
            m.chat,
            { text: 'Enter a city name or time zone to check the local time!' },
            { quoted: m }
        );
    }

    try {
        const apiKey = '7VOSSFOJP5RX'; // API key Anda
        const response = await fetch(
            `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${text}`
        );

        if (!response.ok) throw new Error('Failed to retrieve time data.');

        const result = await response.json();

        if (result.status !== 'OK') {
            return client.sendMessage(
                m.chat,
                { text: `Time zone "${text}" not found. Try again!` },
                { quoted: m }
            );
        }

        const { formatted, zoneName } = result;
        await client.sendMessage(
            m.chat,
            {
                text: `🕒 *Local Time*\n\n📍 Time Zone: ${zoneName}\n⏰ Time: ${formatted}`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        client.sendMessage(
            m.chat,
            { text: 'Oops, an error occurred while fetching local time. Please try again later!' },
            { quoted: m }
        );
    }
};

handler.help = ['time <zona_waktu>'];
handler.tags = ['utility'];
handler.command = ['time', 'waktu'];

module.exports = handler;