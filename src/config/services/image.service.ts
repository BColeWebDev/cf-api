import { v2 as cloudinary } from "cloudinary";

// Cloudinary Config Connection
export async function configConnectionImg() {
  // Configuration
  cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
    secure: true,
  });
  console.log("| Cloudinary Connected ✅");
}

/** Upload Image To Cloudinary
 * @param imagePath Image Path Name
 * @param userId user id
 */
export async function uploadImage(imagePath: string, userid: string) {
  const uploadResult = await cloudinary.uploader
    .upload(imagePath, {
      public_id: userid,
    })
    .then((value) => {
      return value;
    })
    .catch((error) => {
      return error;
    });
  console.log("UPLOAD", uploadResult);
  return uploadResult;
}
