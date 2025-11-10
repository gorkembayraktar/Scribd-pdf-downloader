import { PDFDocument } from 'pdf-lib';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Resmi PDF sayfasına ekler
 * @param {PDFDocument} pdfDoc - PDF dokümanı
 * @param {string} imagePath - Resim dosya yolu
 * @returns {Promise<void>}
 */
async function addImageToPdf(pdfDoc, imagePath) {
  try {
    const imageBytes = await fs.readFile(imagePath);
    
    // Resim formatını belirle
    let image;
    const ext = path.extname(imagePath).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg') {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (ext === '.png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      // Varsayılan olarak JPG dene
      try {
        image = await pdfDoc.embedJpg(imageBytes);
      } catch {
        image = await pdfDoc.embedPng(imageBytes);
      }
    }
    
    // PDF sayfası oluştur ve resmi ekle
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  } catch (error) {
    throw new Error(`Resim PDF'e eklenemedi (${imagePath}): ${error.message}`);
  }
}

/**
 * URL'den resmi indirip PDF'e ekler
 * @param {PDFDocument} pdfDoc - PDF dokümanı
 * @param {string} imageUrl - Resim URL'i
 * @returns {Promise<void>}
 */
async function addImageUrlToPdf(pdfDoc, imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.scribd.com/'
      },
      timeout: 30000
    });
    
    const imageBytes = Buffer.from(response.data);
    
    // Resim formatını belirle
    let image;
    const ext = path.extname(new URL(imageUrl).pathname).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg') {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (ext === '.png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      // Varsayılan olarak JPG dene
      try {
        image = await pdfDoc.embedJpg(imageBytes);
      } catch {
        image = await pdfDoc.embedPng(imageBytes);
      }
    }
    
    // PDF sayfası oluştur ve resmi ekle
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  } catch (error) {
    throw new Error(`Resim URL'den PDF'e eklenemedi (${imageUrl}): ${error.message}`);
  }
}

/**
 * Resim dosyalarından PDF oluşturur
 * @param {Array<string>} imagePaths - Resim dosya yolları
 * @param {string} outputPath - Çıktı PDF yolu
 * @param {Function} onProgress - İlerleme callback'i
 * @returns {Promise<string>} - Oluşturulan PDF yolu
 */
export async function createPdfFromImages(imagePaths, outputPath, onProgress = null) {
  const pdfDoc = await PDFDocument.create();
  
  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    
    if (onProgress) {
      onProgress(i + 1, imagePaths.length, imagePath);
    }
    
    try {
      await addImageToPdf(pdfDoc, imagePath);
    } catch (error) {
      console.error(`PDF oluşturma hatası: ${error.message}`);
      // Hata olsa bile devam et
    }
  }
  
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);
  
  return outputPath;
}

/**
 * Resim URL'lerinden direkt PDF oluşturur (indirme yapmadan)
 * @param {Array<string>} imageUrls - Resim URL listesi
 * @param {string} outputPath - Çıktı PDF yolu
 * @param {Function} onProgress - İlerleme callback'i
 * @returns {Promise<string>} - Oluşturulan PDF yolu
 */
export async function createPdfFromImageUrls(imageUrls, outputPath, onProgress = null) {
  const pdfDoc = await PDFDocument.create();
  
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    
    if (onProgress) {
      onProgress(i + 1, imageUrls.length, imageUrl);
    }
    
    try {
      await addImageUrlToPdf(pdfDoc, imageUrl);
      // Rate limiting
      if (i < imageUrls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`PDF oluşturma hatası: ${error.message}`);
      // Hata olsa bile devam et
    }
  }
  
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);
  
  return outputPath;
}

