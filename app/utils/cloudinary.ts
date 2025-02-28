export const uploadImageToCloudinary = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "devlink-profile");
  
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/diwwumns4/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
  
    const data = await response.json();
    return data.secure_url;
  };
  