const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dnl6pr0wl',
    api_key: '188424162371118',
    api_secret: 'TdRIfUCNBHqW0b_TDoFnXf9ATQ4'
});

const deleteOnCloudinary = async (public_id) => {
    try {

        await cloudinary.uploader.destroy(public_id)

    } catch (error) {
        return null;
    }
}



module.exports = deleteOnCloudinary