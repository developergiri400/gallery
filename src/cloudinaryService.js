export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: publicId,
          api_key: 'YOUR_API_KEY',
          timestamp: Math.round((new Date).getTime()/1000),
          signature: 'GENERATE_THIS_SERVER_SIDE' // For security
        })
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};