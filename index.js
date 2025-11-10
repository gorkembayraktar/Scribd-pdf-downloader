import readline from 'readline';
import { fetchHtml, extractContentUrls } from './src/htmlParser.js';
import { fetchAllImagesFromJsonpUrls } from './src/jsonpFetcher.js';
import { downloadAllImages } from './src/imageDownloader.js';
import { createPdfFromImageUrls, createPdfFromImages } from './src/pdfGenerator.js';
import { extractDocumentName, ensureDirectory } from './src/utils.js';
import path from 'path';
import fs from 'fs-extra';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Kullanıcıdan input alır
 * @param {string} question - Soru
 * @returns {Promise<string>} - Cevap
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Tek bir PDF indirme işlemi
 */
async function downloadPdf() {
  try {
    // Kullanıcıdan URL al
    const scribdUrl = await askQuestion('Scribd document URL\'sini girin: ');
    
    if (!scribdUrl) {
      console.error('URL boş olamaz!');
      return false;
    }
    
    console.log('\n[1/4] HTML kaynağı alınıyor...');
    const html = await fetchHtml(scribdUrl);
    
    console.log('[2/4] Content URL\'leri çıkarılıyor...');
    const contentUrls = extractContentUrls(html);
    
    if (contentUrls.length === 0) {
      console.error('Hata: Content URL bulunamadı!');
      return false;
    }
    
    console.log(`   ${contentUrls.length} adet content URL bulundu.`);
    
    console.log('[3/4] JSONP\'lerden resim URL\'leri çıkarılıyor...');
    const imageUrls = await fetchAllImagesFromJsonpUrls(
      contentUrls,
      (current, total, url) => {
        console.log(`   [${current}/${total}] İşleniyor: ${url.substring(0, 60)}...`);
      }
    );
    
    if (imageUrls.length === 0) {
      console.error('Hata: Resim URL\'si bulunamadı!');
      return false;
    }
    
    console.log(`   ${imageUrls.length} adet resim URL\'si bulundu.`);
    
    // Çıktı klasörü oluştur
    const documentName = extractDocumentName(scribdUrl);
    const outputDir = path.join(process.cwd(), 'output', documentName);
    await ensureDirectory(outputDir);
    
    // Kullanıcıya seçenek sun
    console.log('\n[4/4] PDF oluşturuluyor...');
    const pdfPath = path.join(outputDir, `${documentName}.pdf`);
    
    // Direkt URL'lerden PDF oluştur (daha hızlı)
    await createPdfFromImageUrls(
      imageUrls,
      pdfPath,
      (current, total, url) => {
        console.log(`   [${current}/${total}] PDF'e ekleniyor...`);
      }
    );
    
    console.log(`\n✅ Başarılı! PDF oluşturuldu: ${pdfPath}`);
    
    // İsteğe bağlı: Resimleri de kaydet
    const saveImages = await askQuestion('\nResimleri de kaydetmek ister misiniz? (e/h): ');
    if (saveImages.toLowerCase() === 'e' || saveImages.toLowerCase() === 'evet') {
      const imagesDir = path.join(outputDir, 'images');
      console.log('\nResimler indiriliyor...');
      await downloadAllImages(
        imageUrls,
        imagesDir,
        (current, total, url) => {
          console.log(`   [${current}/${total}] İndiriliyor...`);
        }
      );
      console.log(`✅ Resimler kaydedildi: ${imagesDir}`);
    }
    
    return true;
  } catch (error) {
    console.error('\n❌ Hata:', error.message);
    return false;
  }
}

/**
 * Ana uygulama
 */
async function main() {
  console.log('========================================');
  console.log('   Scribd Document Downloader');
  console.log('========================================\n');
  
  let continueDownloading = true;
  
  while (continueDownloading) {
    const success = await downloadPdf();
    
    if (success) {
      // Başka bir PDF indirmek isteyip istemediğini sor
      const anotherPdf = await askQuestion('\nBaşka bir PDF indirmek ister misiniz? (e/h): ');
      
      if (anotherPdf.toLowerCase() === 'e' || anotherPdf.toLowerCase() === 'evet') {
        console.log('\n' + '='.repeat(40) + '\n');
        continueDownloading = true;
      } else {
        console.log('\n👋 İyi günler!');
        continueDownloading = false;
      }
    } else {
      // Hata durumunda tekrar denemek isteyip istemediğini sor
      const retry = await askQuestion('\nTekrar denemek ister misiniz? (e/h): ');
      
      if (retry.toLowerCase() === 'e' || retry.toLowerCase() === 'evet') {
        console.log('\n' + '='.repeat(40) + '\n');
        continueDownloading = true;
      } else {
        console.log('\n👋 İyi günler!');
        continueDownloading = false;
      }
    }
  }
  
  rl.close();
}

// Uygulamayı başlat
main().catch((error) => {
  console.error('\n❌ Beklenmeyen hata:', error.message);
  rl.close();
  process.exit(1);
});

