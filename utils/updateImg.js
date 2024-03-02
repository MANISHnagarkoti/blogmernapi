const cloudinary = require("cloudinary").v2;
const fs = require("fs")

cloudinary.config({
    cloud_name: 'dnl6pr0wl',
    api_key: '188424162371118',
    api_secret: 'TdRIfUCNBHqW0b_TDoFnXf9ATQ4'
});

const updateImageToCloudinary = async (localFilePath, imageId, usedFor) => {

    try {
        if (usedFor === "profile") {

            const result = await cloudinary.uploader.upload(localFilePath, {
                public_id: imageId,
                invalidate: true,
                overwrite: true,
                quality: 60, width: 200, height: 200, crop: "fit",
                fetch_format: "webp",       // Automatic format selection
                progressive: "true",        // Progressive rendering
                strip_metadata: true,       // Strip metadata
                quality_analysis: "true"
            });

            return result;
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            public_id: imageId,
            invalidate: true,
            overwrite: true,
            quality: 60, width: 300, height: 300, crop: "fit",
            fetch_format: "webp",       // Automatic format selection
            progressive: "true",        // Progressive rendering
            strip_metadata: true,       // Strip metadata
        });

        return result;
        // fs.unlinkSync(localFilePath)

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.error("Error updating image:", error);
        throw error;
    }
};




module.exports = updateImageToCloudinary