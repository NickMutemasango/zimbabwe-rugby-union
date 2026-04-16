import { put } from '@vercel/blob';

export type UploadType = 'image' | 'pdf';

const ALLOWED: Record<UploadType, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  pdf:   [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

const MAX_SIZE: Record<UploadType, number> = {
  image: 50 * 1024 * 1024,   // 50 MB
  pdf:   50 * 1024 * 1024,   // 50 MB
};

/** Derive a short file type label from a MIME type */
export function mimeToFileType(mime: string): 'pdf' | 'doc' | 'docx' {
  if (mime === 'application/pdf') return 'pdf';
  if (mime === 'application/msword') return 'doc';
  return 'docx';
}

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

  // Use a folder prefix in the pathname to keep files organised
  const folder   = type === 'pdf' ? 'zru-pdfs' : 'zru-images';
  const pathname = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

  const blob = await put(pathname, file, {
    access:      'public',
    contentType: file.type,
  });

  return {
    url:      blob.url,
    filename: blob.pathname,
    size:     formatSize(file.size),
  };
}
