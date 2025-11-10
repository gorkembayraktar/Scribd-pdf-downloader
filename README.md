# Scribd PDF Downloader 📚

Scribd dokümanlarını indirip PDF formatına dönüştüren basit ve kullanışlı bir Node.js uygulaması.

## 📋 İçindekiler

- [Hızlı Başlangıç](#hızlı-başlangıç) ⚡
- [Nedir Bu Uygulama?](#nedir-bu-uygulama)
- [Gereksinimler](#gereksinimler)
- [Nasıl Kullanılır?](#nasıl-kullanılır)
- [Örnek Kullanım](#örnek-kullanım)
- [Sık Sorulan Sorular](#sık-sorulan-sorular)
- [Sorun Giderme](#sorun-giderme)
- [Detaylı Kurulum Rehberi](#detaylı-kurulum-rehberi) 📖

---

## ⚡ Hızlı Başlangıç

Programlama deneyiminiz varsa, hızlıca başlamak için:

### Gereksinimler
- Node.js (v14+)
- npm (Node.js ile birlikte gelir)

### Windows Kullanıcıları İçin (Kolay Yol)

**En kolay yöntem:** `run.bat` dosyasına çift tıklayın! 

Bu dosya otomatik olarak:
- Bağımlılıkları kontrol eder ve gerekirse yükler
- Uygulamayı başlatır

### Manuel Kurulum

```bash
# Proje klasörüne gidin
cd Scribd-pdf-downloader

# Bağımlılıkları yükleyin
npm install

# Uygulamayı başlatın
npm start
```

### Kullanım

1. Uygulama başladığında Scribd doküman URL'sini girin
2. İşlem tamamlanana kadar bekleyin
3. PDF dosyası `output/` klasöründe oluşturulur

> 💡 **Detaylı açıklamalar için aşağıdaki bölümlere bakın.**

---

## 🤔 Nedir Bu Uygulama?

Bu uygulama, Scribd'de bulunan bir dokümanın linkini alıp, o dokümanın tüm sayfalarını otomatik olarak indirerek tek bir PDF dosyası haline getirir. 

**Örnek:** Scribd'de bir kitap veya ders notu görüyorsunuz ve bunu PDF olarak bilgisayarınıza kaydetmek istiyorsunuz. Bu uygulama tam olarak bunu yapar!

---

## 📦 Gereksinimler

Bu uygulamayı kullanmak için bilgisayarınızda şunların yüklü olması gerekir:

1. **Node.js** (v14 veya üzeri)
2. **npm** (Node.js ile birlikte gelir)

Node.js yüklü değilse, [Detaylı Kurulum Rehberi](#detaylı-kurulum-rehberi) bölümüne bakın.

---

## 📖 Nasıl Kullanılır?

### Adım 1: Uygulamayı Başlatın

#### Windows Kullanıcıları (Kolay Yol):

**Yöntem 1: run.bat Dosyası (Önerilen)**
1. Proje klasöründe `run.bat` dosyasını bulun
2. Dosyaya **çift tıklayın**
3. Otomatik olarak bağımlılıklar kontrol edilir ve uygulama başlatılır ✅

**Yöntem 2: Terminal ile**
1. Proje klasörüne sağ tıklayın
2. **"PowerShell'de Aç"** veya **"Terminal'de Aç"** seçeneğini seçin
3. Şu komutu yazın:
   ```bash
   npm start
   ```

#### Mac/Linux Kullanıcıları:

1. **Terminal'de proje klasöründe olduğunuzdan emin olun**

2. **Şu komutu yazın ve Enter'a basın:**
   ```bash
   npm start
   ```

3. **Ne olacak?**
   - Terminal'de birkaç satır yazı görünecek
   - Sonra uygulama sizden bir URL girmenizi isteyecek
   - Bu normal! Uygulama çalışıyor demektir ✅

> 💡 **Not:** `npm start` komutu, `package.json` dosyasındaki ayarlara göre uygulamayı başlatır. Bu komut `node index.js` komutunun kısa yoludur.

### Adım 2: Scribd Linkini Girin

Uygulama başladığında şöyle bir mesaj göreceksiniz:

```
========================================
   Scribd Document Downloader
========================================

Scribd document URL'sini girin: 
```

Burada Scribd'deki dokümanın linkini yapıştırın. Örnek:

```
https://www.scribd.com/document/123456789/dokuman-adi
```

Enter'a basın.

### Adım 3: İşlemin Tamamlanmasını Bekleyin

Uygulama şu adımları otomatik olarak gerçekleştirir:

1. ✅ **HTML kaynağı alınıyor...** - Scribd sayfasından bilgiler çekiliyor
2. ✅ **Content URL'leri çıkarılıyor...** - Sayfa içindeki linkler bulunuyor
3. ✅ **JSONP'lerden resim URL'leri çıkarılıyor...** - Her sayfanın resim linkleri toplanıyor
4. ✅ **PDF oluşturuluyor...** - Tüm sayfalar birleştirilip PDF oluşturuluyor

Her adımda ilerleme bilgisi gösterilir. İşlem dokümanın boyutuna göre birkaç dakika sürebilir.

### Adım 4: Resimleri Kaydetme (İsteğe Bağlı)

PDF oluşturulduktan sonra şöyle bir soru sorulur:

```
Resimleri de kaydetmek ister misiniz? (e/h): 
```

- **`e` veya `evet`** yazarsanız: Tüm sayfa resimleri ayrı ayrı `images` klasörüne kaydedilir
- **`h` veya başka bir şey** yazarsanız: Sadece PDF kaydedilir

### Adım 5: Sonuç

İşlem tamamlandığında şöyle bir mesaj göreceksiniz:

```
✅ Başarılı! PDF oluşturuldu: C:\Users\gorkem\Desktop\Scribd-pdf-downloader\output\DENEME\DENEME.pdf
```

PDF dosyası `output` klasörü içinde, doküman adıyla oluşturulan bir klasörde bulunur.

---

## 💡 Örnek Kullanım

### Tam Ekran Örnek:

```bash
C:\Users\gorkem\Desktop\Scribd-pdf-downloader> npm start

========================================
   Scribd Document Downloader
========================================

Scribd document URL'sini girin: https://www.scribd.com/document/123456789/dokuman-adi

[1/4] HTML kaynağı alınıyor...
[2/4] Content URL'leri çıkarılıyor...
   15 adet content URL bulundu.
[3/4] JSONP'lerden resim URL'leri çıkarılıyor...
   [1/15] İşleniyor: https://html.scribdassets.com/abc123/pages/3-xyz.jsonp...
   [2/15] İşleniyor: https://html.scribdassets.com/abc123/pages/4-abc.jsonp...
   ...
   150 adet resim URL'si bulundu.
[4/4] PDF oluşturuluyor...
   [1/150] PDF'e ekleniyor...
   [2/150] PDF'e ekleniyor...
   ...

✅ Başarılı! PDF oluşturuldu: C:\Users\gorkem\Desktop\Scribd-pdf-downloader\output\DENEME\DENEME.pdf

Resimleri de kaydetmek ister misiniz? (e/h): h
```

---

## ❓ Sık Sorulan Sorular

### Q: "npm: command not found" veya "node: command not found" hatası alıyorum. Ne yapmalıyım?

**A:** Bu hata, Node.js'in düzgün kurulmadığı veya sistem PATH'ine eklenmediği anlamına gelir.

**Çözüm adımları:**
1. Node.js'i yeniden kurun ([Detaylı Kurulum Rehberi](#detaylı-kurulum-rehberi) bölümüne bakın)
2. Kurulum sırasında **"Add to PATH"** seçeneğinin işaretli olduğundan emin olun
3. Bilgisayarınızı **yeniden başlatın** (çok önemli!)
4. Terminal'i kapatıp yeniden açın
5. Tekrar deneyin

**Hala çalışmıyorsa:**
- Windows'ta: Node.js'i kurduktan sonra PATH değişkenini manuel olarak eklemeniz gerekebilir
- Mac/Linux'ta: Terminal'i yeniden başlatmayı deneyin

### Q: "npm install" çok uzun sürüyor. Normal mi?

**A:** Evet, normal. İlk kurulumda tüm kütüphaneler indirilir, bu birkaç dakika sürebilir. İnternet hızınıza bağlıdır.

### Q: PDF oluşturulurken hata alıyorum. Ne yapmalıyım?

**A:** 
- İnternet bağlantınızı kontrol edin
- Scribd linkinin doğru olduğundan emin olun
- Dokümanın herkese açık olduğundan emin olun (bazı dokümanlar üyelik gerektirebilir)

### Q: PDF dosyası nerede bulunur?

**A:** Proje klasörünüzün içinde `output` klasöründe, doküman adıyla oluşturulan bir klasörde bulunur.

Örnek yol:
```
Scribd-pdf-downloader/
└── output/
    └── DENEME/
        ├── DENEME.pdf
        └── images/  (eğer resimleri kaydettirdiyseniz)
```

### Q: Terminal/komut satırı nedir ve nasıl kullanılır?

**A:** Terminal, bilgisayarınıza metin komutları yazarak işlem yaptığınız bir penceredir. 

**Temel komutlar:**
- `cd klasör_adı` → Bir klasöre girer
- `cd ..` → Bir üst klasöre çıkar
- `dir` (Windows) veya `ls` (Mac/Linux) → Klasördeki dosyaları listeler
- `node --version` → Node.js versiyonunu gösterir
- `npm --version` → npm versiyonunu gösterir

**Korkmayın!** Bu uygulamayı kullanmak için sadece `npm install` ve `npm start` komutlarını bilmeniz yeterli. Diğer komutlar otomatik çalışır.

### Q: Aynı dokümanı tekrar indirebilir miyim?

**A:** Evet, ancak önceki çıktıların üzerine yazılabilir. Farklı bir yere kaydetmek isterseniz, `output` klasöründeki eski klasörü silin veya taşıyın.

### Q: Uygulama çalışırken kapatabilir miyim?

**A:** Hayır, işlem tamamlanana kadar terminal penceresini açık tutun. İşlem sırasında kapatırsanız PDF eksik olabilir.

---

## 🔧 Sorun Giderme

### Problem: "Cannot find module" hatası

**Çözüm:**
```bash
npm install
```
komutunu tekrar çalıştırın.

### Problem: "ECONNREFUSED" veya bağlantı hatası

**Çözüm:**
- İnternet bağlantınızı kontrol edin
- Firewall veya antivirüs programınızın uygulamayı engellemediğinden emin olun
- Birkaç dakika bekleyip tekrar deneyin

### Problem: PDF boş veya eksik sayfalar var

**Çözüm:**
- Scribd dokümanının tamamen yüklendiğinden emin olun
- Linkin doğru olduğundan emin olun
- Uygulamayı tekrar çalıştırın

### Problem: "Permission denied" hatası

**Çözüm (Windows):**
- Terminal'i "Yönetici olarak çalıştır" seçeneğiyle açın

**Çözüm (Mac/Linux):**
- Klasör izinlerini kontrol edin:
```bash
chmod -R 755 .
```

---

## 📁 Proje Yapısı

Uygulama modüler bir yapıya sahiptir:

```
Scribd-pdf-downloader/
├── src/
│   ├── htmlParser.js      # HTML'den link çıkarma
│   ├── jsonpFetcher.js    # Resim linklerini toplama
│   ├── imageDownloader.js # Resim indirme
│   ├── pdfGenerator.js    # PDF oluşturma
│   └── utils.js           # Yardımcı fonksiyonlar
├── index.js               # Ana uygulama
├── package.json           # Proje ayarları ve bağımlılıklar
├── run.bat                # Windows için hızlı başlatma dosyası
├── README.md              # Bu dosya
└── output/                # Oluşturulan PDF'ler buraya kaydedilir
```

---

## ⚠️ Önemli Notlar

1. **Yasal Uyarı:** Bu uygulama sadece eğitim amaçlıdır. Telif hakkı korumalı içerikleri indirirken yasal sorumluluğu size aittir.

2. **Rate Limiting:** Scribd'in sunucularını korumak için istekler arasında kısa bekleme süreleri vardır. Bu yüzden işlem biraz zaman alabilir.

3. **Korumalı İçerik:** Bazı Scribd dokümanları üyelik veya özel erişim gerektirebilir. Bu durumda uygulama çalışmayabilir.

4. **İnternet Bağlantısı:** Uygulama çalışırken aktif bir internet bağlantısı gereklidir.

---

## 📞 Destek

Sorun yaşarsanız veya öneriniz varsa, proje sayfasında issue açabilirsiniz.

---

## 📄 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.

---

## 📖 Detaylı Kurulum Rehberi

Eğer Node.js'i hiç duymadıysanız veya kurulumda sorun yaşıyorsanız, bu bölüm size yardımcı olacaktır.

### 🎓 Node.js Nedir?

**Node.js**, JavaScript programlama dilini bilgisayarınızda çalıştırmak için kullanılan bir yazılımdır. 

**Basit bir benzetme:** 
- Bilgisayarınızda bir Word belgesi açmak için Microsoft Word programına ihtiyacınız var, değil mi?
- Bu uygulamayı çalıştırmak için de Node.js'e ihtiyacınız var. Node.js, bu uygulamanın çalışması için gerekli olan "motor"dur.

### npm Nedir?

**npm** (Node Package Manager), Node.js ile birlikte gelen bir araçtır. Bu araç sayesinde uygulamanın ihtiyaç duyduğu küçük program parçalarını (kütüphaneler) otomatik olarak indirip kurarız.

**Basit bir benzetme:**
- Bir oyun oynamak istiyorsunuz ve oyunun çalışması için bazı ek dosyalar gerekiyor
- npm, bu ek dosyaları otomatik olarak indirip kurar

### Terminal/Komut Satırı Nedir?

**Terminal** (veya Komut Satırı), bilgisayarınıza komutlar yazarak işlem yaptığınız bir penceredir.

**Windows'ta:** CMD veya PowerShell  
**Mac/Linux'ta:** Terminal

**Nasıl açılır?**
- **Windows:** `Win + R` tuşlarına basın, `cmd` yazıp Enter'a basın
- **Mac:** `Cmd + Space` tuşlarına basın, "Terminal" yazıp Enter'a basın
- **Linux:** `Ctrl + Alt + T` tuşlarına basın

> 💡 **Not:** Terminal'i ilk kez kullanıyorsanız korkmayın! Sadece komutları kopyalayıp yapıştırmanız yeterli.

---

## 📥 Node.js Kurulumu (Detaylı Adımlar)

### Adım 1: Node.js'in Yüklü Olup Olmadığını Kontrol Edin

Önce Node.js'in zaten yüklü olup olmadığını kontrol edelim:

1. **Terminal'i açın** (yukarıdaki yönergelere göre)
2. Şu komutu yazın ve Enter'a basın:
   ```bash
   node --version
   ```
3. **Eğer bir versiyon numarası görürseniz** (örnek: `v18.17.0` veya `v20.10.0`):
   - ✅ Harika! Node.js zaten yüklü. Bir sonraki bölüme geçebilirsiniz.
4. **Eğer "komut bulunamadı" veya benzeri bir hata görürseniz**:
   - ❌ Node.js yüklü değil. Aşağıdaki adımları takip edin.

### Adım 2: Node.js'i İndirin

1. **Tarayıcınızda şu adrese gidin:**
   ```
   https://nodejs.org/
   ```

2. **Sayfada iki buton göreceksiniz:**
   - **LTS** (Long Term Support - Uzun Süreli Destek) - **BUNU SEÇİN!** ✅
   - Current (Güncel) - Bunu seçmeyin

   > 💡 **Neden LTS?** LTS versiyonu daha kararlı ve güvenilirdir. Yeni başlayanlar için idealdir.

3. **İndirme otomatik olarak başlayacaktır.** 
   - Windows için: `.msi` uzantılı bir dosya indirilecek
   - Mac için: `.pkg` uzantılı bir dosya indirilecek
   - Linux için: `.tar.xz` veya paket yöneticisi ile kurulum yapılabilir

### Adım 3: Node.js'i Kurun

#### Windows'ta:

1. İndirdiğiniz `.msi` dosyasına çift tıklayın
2. Kurulum sihirbazı açılacak
3. **"Next" (İleri)** butonlarına tıklayarak ilerleyin
4. Kurulum sırasında **"Add to PATH"** seçeneğinin işaretli olduğundan emin olun (genellikle varsayılan olarak işaretlidir)
5. **"Install" (Kur)** butonuna tıklayın
6. Kurulum tamamlandığında **"Finish" (Bitir)** butonuna tıklayın
7. **Bilgisayarınızı yeniden başlatın** (önerilir)

#### Mac'te:

1. İndirdiğiniz `.pkg` dosyasına çift tıklayın
2. Kurulum sihirbazını takip edin
3. Gerekirse şifrenizi girin
4. Kurulum tamamlandığında Terminal'i yeniden açın

#### Linux'ta:

Ubuntu/Debian için:
```bash
sudo apt update
sudo apt install nodejs npm
```

Fedora için:
```bash
sudo dnf install nodejs npm
```

### Adım 4: Kurulumu Doğrulayın

Kurulumun başarılı olduğunu kontrol edelim:

1. **Terminal'i açın** (yeni bir terminal penceresi açın, eğer açıksa kapatıp yeniden açın)
2. Şu komutları sırayla yazın ve her birinden sonra Enter'a basın:

   ```bash
   node --version
   ```
   
   **Beklenen çıktı:** `v18.17.0` veya benzeri bir versiyon numarası
   
   ```bash
   npm --version
   ```
   
   **Beklenen çıktı:** `9.8.0` veya benzeri bir versiyon numarası

3. **Her iki komut da versiyon numarası gösteriyorsa:**
   - ✅ **Mükemmel!** Node.js başarıyla kuruldu. Bir sonraki bölüme geçebilirsiniz.

4. **Hata alıyorsanız:**
   - Bilgisayarınızı yeniden başlatmayı deneyin
   - Node.js'i yeniden kurmayı deneyin
   - [Sorun Giderme](#sorun-giderme) bölümüne bakın

> 🎉 **Tebrikler!** Node.js kurulumunu tamamladınız. Artık uygulamayı kullanmaya hazırsınız!

---

## 🚀 Detaylı Kurulum (Adım Adım)

### 1. Projeyi İndirin

Proje dosyalarını bilgisayarınıza indirin veya klonlayın.

### 2. Proje Klasörüne Gidin

Terminal (komut satırı) açın ve proje klasörüne gidin.

#### Yöntem 1: Terminal'de Komut Kullanarak

**Windows'ta:**
1. Terminal'i açın (CMD veya PowerShell)
2. Proje klasörünüzün tam yolunu yazın. Örnek:
   ```bash
   cd C:\Users\gorkem\Desktop\Scribd-pdf-downloader
   ```
   > ⚠️ **Önemli:** `C:\Users\gorkem\Desktop\Scribd-pdf-downloader` kısmını kendi klasör yolunuzla değiştirin!
3. Enter'a basın

**Mac/Linux'ta:**
1. Terminal'i açın
2. Şu komutu yazın (eğer Desktop'taysa):
   ```bash
   cd ~/Desktop/Scribd-pdf-downloader
   ```
   Veya tam yolu kullanın:
   ```bash
   cd /Users/gorkem/Desktop/Scribd-pdf-downloader
   ```
3. Enter'a basın

#### Yöntem 2: Klasörden Direkt Açma (Daha Kolay!)

**Windows'ta:**
1. Proje klasörünü bulun (örnek: `C:\Users\gorkem\Desktop\Scribd-pdf-downloader`)
2. Klasöre **sağ tıklayın**
3. **"PowerShell'de Aç"** veya **"Terminal'de Aç"** seçeneğini seçin
4. Terminal otomatik olarak o klasörde açılacak! ✅

**Mac'ta:**
1. Proje klasörünü bulun
2. Klasöre **sağ tıklayın** (veya `Ctrl + tıklayın`)
3. **"Yeni Terminal Sekmesi"** veya **"Terminal'de Aç"** seçeneğini seçin

**Linux'ta:**
1. Proje klasörünü bulun
2. Klasöre **sağ tıklayın**
3. **"Terminal'de Aç"** seçeneğini seçin

> 💡 **Hangi yöntemi seçmeliyim?** Yöntem 2 daha kolaydır! Eğer klasör yolunu bilmiyorsanız, Yöntem 2'yi kullanın.

#### Klasörde Olduğunuzu Nasıl Anlarsınız?

Terminal'de şu komutu yazın:
```bash
dir
```
(Windows'ta) veya
```bash
ls
```
(Mac/Linux'ta)

Eğer `package.json`, `index.js`, `src` gibi dosya ve klasörleri görüyorsanız, doğru klasördesiniz! ✅

### 3. Bağımlılıkları Yükleyin

**"Bağımlılık" ne demek?** Bu uygulamanın çalışması için bazı ek program parçalarına (kütüphanelere) ihtiyacı var. `npm install` komutu bu parçaları otomatik olarak indirir ve kurar.

#### Adımlar:

1. **Terminal'de proje klasöründe olduğunuzdan emin olun** (yukarıdaki adımları takip ettiyseniz zaten oradasınız)

2. **Şu komutu yazın ve Enter'a basın:**
   ```bash
   npm install
   ```

3. **Ne olacak?**
   - Terminal'de birçok satır yazı görünecek
   - `axios`, `cheerio`, `pdf-lib` gibi isimler göreceksiniz
   - Bu normal! npm, gerekli kütüphaneleri indiriyor
   - İşlem **2-5 dakika** sürebilir (internet hızınıza bağlı)

4. **Başarılı oldu mu?**
   - İşlem bittiğinde terminal'de hata mesajı yoksa başarılıdır
   - Proje klasöründe `node_modules` adında yeni bir klasör oluşmuş olmalı
   - Bu klasörü görmek için klasörü yenileyin (F5) veya `dir`/`ls` komutunu kullanın

#### Örnek Çıktı:

Başarılı bir kurulum şöyle görünür:
```
added 245 packages, and audited 246 packages in 45s
```

> ✅ **Başarılı!** Artık uygulamayı çalıştırmaya hazırsınız!

#### Hata Alırsanız:

- **"npm: command not found"** → Node.js düzgün kurulmamış. [Node.js Kurulumu](#nodejs-kurulumu-detaylı-adımlar) bölümüne tekrar bakın.
- **"EACCES" veya "permission denied"** → Terminal'i yönetici olarak açmayı deneyin (Windows'ta sağ tıklayıp "Yönetici olarak çalıştır")
- **İnternet hatası** → İnternet bağlantınızı kontrol edin ve tekrar deneyin

---

**İyi kullanımlar! 🎉**
