import { v2 as cloudinary } from "cloudinary";

// Cloudinary Config Connection
export async function configConnectionImg() {
  console.log("CONFIG IMG");
  // Configuration
  cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
  });
  console.log("| Cloudinary Connected ✅");

  //   // Upload an image
  //   const uploadResult = await cloudinary.uploader
  //     .upload(
  //       "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1778820/capsule_616x353.jpg?t=1724990385",
  //       {
  //         public_id: "shoes",
  //       }
  //     )
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   console.log(uploadResult);

  //   // Optimize delivery by resizing and applying auto-format and auto-quality
  //   const optimizeUrl = cloudinary.url("shoes", {
  //     fetch_format: "auto",
  //     quality: "auto",
  //   });

  //   console.log(optimizeUrl);

  //   // Transform the image: auto-crop to square aspect_ratio
  //   const autoCropUrl = cloudinary.url("shoes", {
  //     crop: "auto",
  //     gravity: "auto",
  //     width: 500,
  //     height: 500,
  //   });

  //   console.log(autoCropUrl);
}
