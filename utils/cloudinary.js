import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import { asynchandler } from './asynchandler';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload =  async (localfilepath)=>{
       try {
           if(!localfilepath) return null
          const response =  cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
           })
           console.log("file is uploaded on cloudinary",(await response).url);
           return response

       } catch (error) {
          fs.unlinkSync(localfilepath) // remove the locally saved temporary file as the upload operation got failed
          console.log(error);
           
       }
}

export {upload}