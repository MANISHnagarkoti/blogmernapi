const cloudinary = require("cloudinary").v2;
const fs = require("fs")


cloudinary.config({
    cloud_name: 'dnl6pr0wl',
    api_key: '188424162371118',
    api_secret: 'TdRIfUCNBHqW0b_TDoFnXf9ATQ4'
});

const uploadOnCloudinary = async (localFilePath, uploadFor) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        if (uploadFor === "profile") {

            const response = await cloudinary.uploader.upload(localFilePath, {

                quality:60, width: 200, height: 200, crop: "fit",
                fetch_format: "webp",       // Automatic format selection
                progressive: "true",        // Progressive rendering
                strip_metadata: true,       // Strip metadata


            })
            // file has been uploaded successfull
            //console.log("file is uploaded on cloudinary ", response.url);
            // fs.unlinkSync(localFilePath)
            return response;

        }

        const response = await cloudinary.uploader.upload(localFilePath, {

            quality: 90, width: 500, height: 500, crop: "fit",
            fetch_format: "webp",       // Automatic format selection
            progressive: "true",        // Progressive rendering
            strip_metadata: true,       // Strip metadata

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