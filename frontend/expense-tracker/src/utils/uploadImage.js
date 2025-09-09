import { API_PATHS } from "./apiPath.js";
import axiosInstance from "./axiosInstance.js";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // Append the image file to the form data
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Assuming the API returns { imageUrl: "http://..." }
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error;
    }
};

export default uploadImage;