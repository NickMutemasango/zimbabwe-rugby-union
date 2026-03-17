import fs from 'fs';
import path from 'path';

const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directories exist
['images', 'pdfs'].forEach((dir) => {
  const full = path.join(UPLOAD_ROOT, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

export type UploadType = 'image' | 'pdf';

const ALLOWED: Record<UploadType, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  pdf: ['application/pdf'],
};

const MAX_SIZE: Record<UploadType, number> = {
  image: 5 * 1024 * 1024,  // 5 MB
  pdf: 20 * 1024 * 1024,   // 20 MB
};

export interface UploadResult {
  url: string;
  filename: string;
  size: string;
}

export async function saveUpload(
  file: File,
  type: UploadType
): Promise<UploadResult> {
  // Validate MIME
  if (!ALLOWED[type].includes(file.type)) {
    throw new Error(
      `Invalid file type "${file.type}". Allowed: ${ALLOWED[type].join(', ')}`
    );
  }

  // Validate size
  if (file.size > MAX_SIZE[type]) {
    throw new Error(
      `File too large. Max size: ${MAX_SIZE[type] / 1024 / 1024} MB`
    );
  }

  const ext = file.name.split('.').pop() ?? (type === 'pdf' ? 'pdf' : 'jpg');
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const subDir = type === 'pdf' ? 'pdfs' : 'images';
  const savePath = path.join(UPLOAD_ROOT, subDir, filename);

  const bytes = await file.arrayBuffer();
  fs.writeFileSync(savePath, Buffer.from(bytes));

  const kb = file.size / 1024;
  const sizeStr = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(0)} KB`;

  return {
    url: `/uploads/${subDir}/${filename}`,
    filename,
    size: sizeStr,
  };
}
