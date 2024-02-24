const cloudinary = require("cloudinary").v2;
const fs = require("fs")


cloudinary.config({
    cloud_name: 'dnl6pr0wl',
    api_key: '188424162371118',
    api_secret: 'TdRIfUCNBHqW0b_TDoFnXf9ATQ4'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        // fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        // fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



module.exports = uploadOnCloudinary