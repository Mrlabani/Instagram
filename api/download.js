const axios = require('axios');
const instagramUrlDirect = require('instagram-url-direct');

module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing Instagram URL" });
    }

    try {
        const result = await instagramUrlDirect(url);
        if (!result || !result.url_list || result.url_list.length === 0) {
            return res.status(404).json({ error: "No media found" });
        }

        res.json({ media: result.url_list });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch media", details: error.message });
    }
};
