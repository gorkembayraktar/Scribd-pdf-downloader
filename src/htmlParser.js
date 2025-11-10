import * as cheerio from 'cheerio';
import axios from 'axios';

/**
 * Scribd sayfasından HTML'i çeker
 * @param {string} url - Scribd document URL
 * @returns {Promise<string>} - HTML içeriği
 */
export async function fetchHtml(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`HTML çekilemedi: ${error.message}`);
  }
}

/**
 * HTML'den tüm docManager.addPage contentUrl'lerini çıkarır
 * @param {string} html - HTML içeriği
 * @returns {Array<string>} - contentUrl listesi
 */
export function extractContentUrls(html) {
  const contentUrls = [];
  
  // Regex ile docManager.addPage çağrılarını bul
  const addPageRegex = /docManager\.addPage\s*\(\s*\{[^}]*contentUrl\s*:\s*["']([^"']+)["'][^}]*\}/g;
  
  let match;
  while ((match = addPageRegex.exec(html)) !== null) {
    const contentUrl = match[1];
    if (contentUrl && !contentUrls.includes(contentUrl)) {
      contentUrls.push(contentUrl);
    }
  }
  
  // Alternatif: JSON benzeri yapıları da kontrol et
  const jsonLikeRegex = /contentUrl["']?\s*:\s*["']([^"']+)["']/g;
  while ((match = jsonLikeRegex.exec(html)) !== null) {
    const contentUrl = match[1];
    if (contentUrl.includes('scribdassets.com') && !contentUrls.includes(contentUrl)) {
      contentUrls.push(contentUrl);
    }
  }
  
  return contentUrls;
}

