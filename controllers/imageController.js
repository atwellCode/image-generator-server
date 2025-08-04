const User = require('../models/userModels');
const axios = require('axios');
const FormData = require('form-data'); // capital "F" in FormData

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        const user = await User.findById(userId);

        if (!user || !prompt) {
            return res.status(400).json({ message: "Missing Details" });
        }

        if (user.creditBalance <= 0) {
            return res.status(403).json({
                message: "Not enough credits to generate image",
                creditBalance: user.creditBalance
            });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-api-key': process.env.CLIPDROP_API,
                },
                responseType: 'arraybuffer',
            }
        );

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        await User.findByIdAndUpdate(user._id, {
            creditBalance: user.creditBalance - 1
        });

        return res.status(200).json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImage
        });
    } catch (error) {
        return res.status(400).json({
            error: "Error in generating Image",
            message: error.message
        });
    }
};

module.exports = { generateImage };
