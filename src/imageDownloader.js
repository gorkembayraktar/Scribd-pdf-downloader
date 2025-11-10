import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { ensureDirectory, getFileExtension, delay } from './utils.js';

/**
 * Tek bir resmi indirir
 * @param {string} imageUrl - Resim URL'i
 * @param {string} savePath - Kayıt yolu
 * @returns {Promise<string>} - İndirilen dosya yolu
 */
export async function downloadImage(imageUrl, savePath) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.scribd.com/'
      },
      timeout: 30000
    });
    
    await fs.writeFile(savePath, response.data);
    return savePath;
  } catch (error) {
    throw new Error(`Resim indirilemedi (${imageUrl}): ${error.message}`);
  }
}

/**
 * Tüm resimleri indirir
 * @param {Array<string>} imageUrls - Resim URL listesi
 * @param {string} outputDir - Çıktı klasörü
 * @param {Function} onProgress - İlerleme callback'i
 * @returns {Promise<Array<string>>} - İndirilen dosya yolları
 */
export async function downloadAllImages(imageUrls, outputDir, onProgress = null) {
  await ensureDirectory(outputDir);
  
  const downloadedPaths = [];
  
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    
    if (onProgress) {
      onProgress(i + 1, imageUrls.length, imageUrl);
    }
    
    try {
      const extension = getFileExtension(imageUrl);
      const fileName = `page_${String(i + 1).padStart(4, '0')}${extension}`;
      const savePath = path.join(outputDir, fileName);
      
      await downloadImage(imageUrl, savePath);
      downloadedPaths.push(savePath);
      
      // Rate limiting
      if (i < imageUrls.length - 1) {
        await delay(300);
      }
    } catch (error) {
      console.error(`Resim indirme hatası: ${error.message}`);
      // Hata olsa bile devam et
    }
  }
  
  return downloadedPaths;
}

