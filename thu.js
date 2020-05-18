require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

async function upload() {
    var result = await cloudinary.uploader.upload('./public/uploads/75fced8dc0e21b3b7d06522af65a8dbe');
    console.log(result);
}

upload();

