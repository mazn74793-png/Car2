/**
 * Dual Image Uploader:
 * 1. Cloudinary Direct Unsigned Upload (if cloudName & uploadPreset set)
 * 2. Instant Local Canvas Compression & Base64 DataURL fallback
 * This ensures 100% reliable image changes from device in any environment!
 */

export interface UploadResult {
  url: string;
  source: 'cloudinary' | 'local_compressed';
  error?: string;
}

export async function uploadImageFromDevice(
  file: File,
  cloudinaryConfig?: { cloudName: string; uploadPreset: string }
): Promise<UploadResult> {
  // If Cloudinary credentials are provided, attempt direct upload
  if (
    cloudinaryConfig?.cloudName &&
    cloudinaryConfig?.uploadPreset &&
    cloudinaryConfig.cloudName.trim() !== '' &&
    cloudinaryConfig.uploadPreset.trim() !== ''
  ) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset.trim());

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName.trim()}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.secure_url) {
          return {
            url: data.secure_url,
            source: 'cloudinary',
          };
        }
      }
      console.warn('Cloudinary upload responded with non-200, falling back to local compressed reader.');
    } catch (err) {
      console.warn('Cloudinary upload network error, falling back to local compressed reader.', err);
    }
  }

  // Native Local Canvas Compression (max 1920x1080 at 0.85 quality)
  // Provides instant, zero-dependency, device-native image upload!
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1920;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            url: e.target?.result as string,
            source: 'local_compressed',
          });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.86);
        resolve({
          url: dataUrl,
          source: 'local_compressed',
        });
      };

      img.onerror = () => {
        resolve({
          url: e.target?.result as string,
          source: 'local_compressed',
        });
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
