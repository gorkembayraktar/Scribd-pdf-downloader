import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * URL'den dosya adını çıkarır
 * @param {string} url - Scribd document URL
 * @returns {string} - Temizlenmiş dosya adı
 */
export function extractDocumentName(url) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const documentName = pathParts[pathParts.length - 1];
    // URL decode ve özel karakterleri temizle
    return decodeURIComponent(documentName).replace(/[<>:"/\\|?*]/g, '_');
  } catch (error) {
    return 'scribd-document';
  }
}

/**
 * Klasör oluşturur (yoksa)
 * @param {string} dirPath - Klasör yolu
 */
export async function ensureDirectory(dirPath) {
  await fs.ensureDir(dirPath);
}

/**
 * Delay fonksiyonu (rate limiting için)
 * @param {number} ms - Milisaniye
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Dosya uzantısını kontrol eder
 * @param {string} url - URL
 * @returns {string} - Uzantı
 */
export function getFileExtension(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const ext = path.extname(pathname).toLowerCase();
    return ext || '.jpg';
  } catch {
    return '.jpg';
  }
}

