import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type UploadType = 'image' | 'pdf';

const ALLOWED: Record<UploadType, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  pdf:   ['application/pdf'],
};

const MAX_SIZE: Record<UploadType, number> = {
  image:  5 * 1024 * 1024,   // 5 MB
  pdf:   20 * 1024 * 1024,   // 20 MB
};

export interface UploadResult {
  url:      string;
  filename: string;
  size:     string;
}

function formatSize(bytes: number): string {
  const kb = bytes / 1024;
  return kb >= 1024
    ? `${(kb / 1024).toFixed(1)} MB`
    : `${kb.toFixed(0)} KB`;
}

export async function saveUpload(
  file: File,
  type: UploadType
): Promise<UploadResult> {
  if (!ALLOWED[type].includes(file.type)) {
    throw new Error(
      `Invalid file type "${file.type}". Allowed: ${ALLOWED[type].join(', ')}`
    );
  }
  if (file.size > MAX_SIZE[type]) {
    throw new Error(
      `File too large. Max size: ${MAX_SIZE[type] / 1024 / 1024} MB`
    );
  }

  const bytes        = await file.arrayBuffer();
  const buffer       = Buffer.from(bytes);
  const folder       = type === 'pdf' ? 'zru-pdfs' : 'zru-images';
  const resourceType = (type === 'pdf' ? 'raw' : 'image') as 'raw' | 'image';

  return new Promise<UploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType, use_filename: true },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary upload failed'));
        } else {
          resolve({
            url:      result.secure_url,
            filename: result.public_id,
            size:     formatSize(result.bytes),
          });
        }
      }
    );
    stream.end(buffer);
  });
}
