const cloudinary = require("cloudinary").v2;
const fs = require("fs")

cloudinary.config({
    cloud_name: 'dnl6pr0wl',
    api_key: '188424162371118',
    api_secret: 'TdRIfUCNBHqW0b_TDoFnXf9ATQ4'
});

const updateImageToCloudinary = async (localFilePath, imageId) => {

    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            public_id: imageId,
            invalidate: true,
            overwrite: true,
        });
        fs.unlinkSync(localFilePath)
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.error("Error updating image:", error);
        throw error;
    }
};




module.exports = updateImageToCloudinary