import axios from 'axios';

/**
 * JSONP response'unu parse eder
 * @param {string} jsonpText - JSONP response metni
 * @returns {Array<string>} - img orig URL'leri
 */
function parseJsonpResponse(jsonpText) {
  const imageUrls = [];
  
  // JSONP callback fonksiyonunu bul ve içeriği çıkar
  // Format: window.pageX_callback([...]) veya callback([...])
  const callbackRegex = /(?:window\.\w+_callback|callback)\s*\(\s*(\[[\s\S]*?\])\s*\)/;
  const match = jsonpText.match(callbackRegex);
  
  if (!match) {
    // Eğer direkt JSON array ise
    try {
      const jsonMatch = jsonpText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        if (Array.isArray(data) && data.length > 0) {
          const htmlContent = data[0];
          const imgUrls = extractImageUrlsFromHtml(htmlContent);
          imageUrls.push(...imgUrls);
        }
      }
    } catch (e) {
      // JSON parse edilemezse HTML içinde ara
      const imgUrls = extractImageUrlsFromHtml(jsonpText);
      imageUrls.push(...imgUrls);
    }
  } else {
    try {
      const jsonData = JSON.parse(match[1]);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        const htmlContent = jsonData[0];
        const imgUrls = extractImageUrlsFromHtml(htmlContent);
        imageUrls.push(...imgUrls);
      }
    } catch (e) {
      // JSON parse edilemezse direkt HTML içinde ara
      const imgUrls = extractImageUrlsFromHtml(match[1]);
      imageUrls.push(...imgUrls);
    }
  }
  
  return imageUrls;
}

/**
 * HTML string'den img tag'lerindeki orig değerlerini çıkarır
 * @param {string} html - HTML içeriği
 * @returns {Array<string>} - Image URL'leri
 */
function extractImageUrlsFromHtml(html) {
  const imageUrls = [];
  
  // img tag'lerindeki orig attribute'unu bul
  const imgRegex = /<img[^>]*orig=["']([^"']+)["'][^>]*>/gi;
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    const imageUrl = match[1];
    if (imageUrl && !imageUrls.includes(imageUrl)) {
      imageUrls.push(imageUrl);
    }
  }
  
  // Eğer orig yoksa src attribute'unu dene
  if (imageUrls.length === 0) {
    const srcRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
    while ((match = srcRegex.exec(html)) !== null) {
      const imageUrl = match[1];
      if (imageUrl && !imageUrls.includes(imageUrl)) {
        imageUrls.push(imageUrl);
      }
    }
  }
  
  return imageUrls;
}

/**
 * JSONP URL'ine istek atar ve image URL'lerini döndürür
 * @param {string} jsonpUrl - JSONP URL
 * @returns {Promise<Array<string>>} - Image URL listesi
 */
export async function fetchJsonpAndExtractImages(jsonpUrl) {
  try {
    const response = await axios.get(jsonpUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.scribd.com/'
      },
      timeout: 30000
    });
    
    const imageUrls = parseJsonpResponse(response.data);
    return imageUrls;
  } catch (error) {
    console.error(`JSONP fetch hatası (${jsonpUrl}):`, error.message);
    return [];
  }
}

/**
 * Birden fazla JSONP URL'inden tüm image URL'lerini toplar
 * @param {Array<string>} jsonpUrls - JSONP URL listesi
 * @param {Function} onProgress - İlerleme callback'i
 * @returns {Promise<Array<string>>} - Tüm image URL'leri
 */
export async function fetchAllImagesFromJsonpUrls(jsonpUrls, onProgress = null) {
  const allImageUrls = [];
  
  for (let i = 0; i < jsonpUrls.length; i++) {
    const jsonpUrl = jsonpUrls[i];
    
    if (onProgress) {
      onProgress(i + 1, jsonpUrls.length, jsonpUrl);
    }
    
    const imageUrls = await fetchJsonpAndExtractImages(jsonpUrl);
    allImageUrls.push(...imageUrls);
    
    // Rate limiting için kısa bir bekleme
    if (i < jsonpUrls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return allImageUrls;
}

