/**
 * ARASS EVENTS — Storage Abstraction Provider & Security Guard
 */

import path from 'path';

export interface UploadOptions {
  bucket: 'event-assets' | 'event-documents' | 'submissions' | 'certificates' | 'avatars';
  filename: string;
  mimeType: string;
  buffer: Buffer;
  isPrivate?: boolean;
}

export interface StorageProvider {
  upload(options: UploadOptions): Promise<{ url: string; storageKey: string; size: number }>;
  getSignedUrl(storageKey: string, expiresInSeconds?: number): Promise<string>;
  delete(storageKey: string): Promise<boolean>;
  validate(filename: string, mimeType: string, sizeBytes: number): boolean;
}

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'image/jpeg',
  'image/png',
  'image/webp',
  'text/plain',
  'application/json',
]);

const DANGEROUS_EXTENSIONS = new Set([
  '.exe',
  '.bat',
  '.cmd',
  '.sh',
  '.bin',
  '.js',
  '.ts',
  '.vbs',
  '.msi',
]);

export class LocalStorageProvider implements StorageProvider {
  validate(filename: string, mimeType: string, sizeBytes: number): boolean {
    return validateFileSecurity(filename, mimeType, sizeBytes);
  }

  async upload(options: UploadOptions) {
    const cleanName = sanitizeFilename(options.filename);
    this.validate(cleanName, options.mimeType, options.buffer.length);

    const storageKey = `${options.bucket}/${Date.now()}-${cleanName}`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return {
      url: `${baseUrl}/uploads/${storageKey}`,
      storageKey,
      size: options.buffer.length,
    };
  }

  async getSignedUrl(storageKey: string, expiresInSeconds = 3600): Promise<string> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${baseUrl}/uploads/${storageKey}?signature=${Date.now() + expiresInSeconds * 1000}`;
  }

  async delete(storageKey: string): Promise<boolean> {
    return true;
  }
}

export class S3CompatibleStorageProvider implements StorageProvider {
  private endpoint: string;
  private bucket: string;
  private region: string;
  private accessKey: string;
  private secretKey: string;

  constructor() {
    this.endpoint = process.env.STORAGE_ENDPOINT || 'https://s3.amazonaws.com';
    this.bucket = process.env.STORAGE_BUCKET || 'arass-events-artifacts';
    this.region = process.env.STORAGE_REGION || 'us-east-1';
    this.accessKey = process.env.STORAGE_ACCESS_KEY || '';
    this.secretKey = process.env.STORAGE_SECRET_KEY || '';
  }

  validate(filename: string, mimeType: string, sizeBytes: number): boolean {
    return validateFileSecurity(filename, mimeType, sizeBytes);
  }

  async upload(options: UploadOptions) {
    const cleanName = sanitizeFilename(options.filename);
    this.validate(cleanName, options.mimeType, options.buffer.length);

    const storageKey = `${options.bucket}/${Date.now()}-${cleanName}`;
    const cdnDomain = process.env.STORAGE_CDN_URL || `https://${this.bucket}.${this.region}.r2.cloudflarestorage.com`;

    return {
      url: `${cdnDomain}/${storageKey}`,
      storageKey,
      size: options.buffer.length,
    };
  }

  async getSignedUrl(storageKey: string, expiresInSeconds = 3600): Promise<string> {
    const cdnDomain = process.env.STORAGE_CDN_URL || `https://${this.bucket}.${this.region}.r2.cloudflarestorage.com`;
    return `${cdnDomain}/${storageKey}?X-Amz-Expires=${expiresInSeconds}&X-Amz-Signature=auth`;
  }

  async delete(storageKey: string): Promise<boolean> {
    return true;
  }
}

export function sanitizeFilename(filename: string): string {
  // Strip path traversal and non-safe characters
  const base = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
  // Check for dangerous double extensions (e.g. payload.exe.pdf, malware.sh.zip)
  const parts = base.split('.');
  if (parts.length > 2) {
    for (let i = 1; i < parts.length - 1; i++) {
      const intermediateExt = `.${parts[i].toLowerCase()}`;
      if (DANGEROUS_EXTENSIONS.has(intermediateExt)) {
        throw new Error(`Security Exception: Prohibited disguised extension '${intermediateExt}' detected in filename.`);
      }
    }
  }
  return base;
}

export function validateFileSecurity(filename: string, mimeType: string, sizeBytes: number): boolean {
  const ext = path.extname(filename).toLowerCase();

  // 1. Block dangerous executables & scripts
  if (DANGEROUS_EXTENSIONS.has(ext)) {
    throw new Error(`Security Exception: Upload of executable extension '${ext}' is prohibited.`);
  }

  // 2. Disallow double extension attack patterns
  const parts = filename.split('.');
  if (parts.length > 2) {
    for (let i = 1; i < parts.length - 1; i++) {
      const intermediateExt = `.${parts[i].toLowerCase()}`;
      if (DANGEROUS_EXTENSIONS.has(intermediateExt)) {
        throw new Error(`Security Exception: Prohibited disguised extension '${intermediateExt}' detected.`);
      }
    }
  }

  // 3. Validate MIME
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error(`Unsupported media format '${mimeType}'. Allowed formats: PDF, ZIP, PNG, JPEG, WEBP.`);
  }

  // 4. Max Size (25MB limit)
  const MAX_SIZE = 25 * 1024 * 1024;
  if (sizeBytes > MAX_SIZE) {
    throw new Error(`Payload exceeds maximum allowed size of 25MB (Received ${(sizeBytes / 1048576).toFixed(1)}MB).`);
  }

  return true;
}

export class MemoryStorageProvider implements StorageProvider {
  private store = new Map<string, { buffer: Buffer; mimeType: string; isPrivate: boolean }>();

  validate(filename: string, mimeType: string, sizeBytes: number): boolean {
    return validateFileSecurity(filename, mimeType, sizeBytes);
  }

  async upload(options: UploadOptions) {
    const cleanName = sanitizeFilename(options.filename);
    this.validate(cleanName, options.mimeType, options.buffer.length);

    const storageKey = `${options.bucket}/${Date.now()}-${cleanName}`;
    this.store.set(storageKey, {
      buffer: options.buffer,
      mimeType: options.mimeType,
      isPrivate: !!options.isPrivate,
    });

    const cdnDomain = process.env.STORAGE_CDN_URL || 'https://storage.arass.technology';
    return {
      url: `${cdnDomain}/${storageKey}`,
      storageKey,
      size: options.buffer.length,
    };
  }

  async getSignedUrl(storageKey: string, expiresInSeconds = 3600): Promise<string> {
    const item = this.store.get(storageKey);
    if (!item) throw new Error('File not found in storage');
    const cdnDomain = process.env.STORAGE_CDN_URL || 'https://storage.arass.technology';
    return `${cdnDomain}/${storageKey}?token=signed-${Date.now() + expiresInSeconds * 1000}`;
  }

  async delete(storageKey: string): Promise<boolean> {
    return this.store.delete(storageKey);
  }
}

// Retain backwards compatibility for SecureMemoryStorageProvider
export class SecureMemoryStorageProvider extends MemoryStorageProvider {}

export function createStorageProvider(): StorageProvider {
  const provider = process.env.STORAGE_PROVIDER?.toLowerCase();
  if (provider === 's3' || provider === 'r2') {
    return new S3CompatibleStorageProvider();
  }
  if (provider === 'local') {
    return new LocalStorageProvider();
  }
  return new MemoryStorageProvider();
}

export const storage: StorageProvider = createStorageProvider();
