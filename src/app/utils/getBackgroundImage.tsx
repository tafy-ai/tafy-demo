"use client";

export async function getBackgroundImage(description: string) {
  try {
    const response = await fetch(`/api/text2image?text=${encodeURIComponent(description)}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Failed to fetch background image');
    }
    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error('Error fetching image:', error);
    return '/default-image.png';  // fallback image in case of error
  }
}
