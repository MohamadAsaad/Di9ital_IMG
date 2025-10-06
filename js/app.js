// js/app.js
class ImageCompressor {
    constructor() {
        this.MAX_IMAGES = 20;
        this.MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
        this.uploadedImages = [];
        this.compressionQuality = 0.8;
        this.maxWidth = null;
        this.currentLang = 'en';
        this.useWorker = (typeof OffscreenCanvas !== 'undefined') && (typeof Worker !== 'undefined');
        this.worker = null;
        this._pending = {};

        this.translations = {
            en: {
                "title": "Di9ital IMG",
                "tagline": "Smart Image Compression",
                "upload-title": "Drag & Drop Images Here",
                "upload-subtitle": "Or click to select files (up to 20 images)",
                "select-files": "Select Images",
                "images-selected": "images selected",
                "quality-label": "Compression Quality:",
                "low": "Low",
                "high": "High",
                "max-width-label": "Max Width (optional)",
                "compress": "Start Compression",
                "reset": "Clear All",
                "download": "Download",
                "remove": "Remove",
                "compressing": "Compressing...",
                "original-size": "Original Size",
                "compressed-size": "Compressed Size",
                "total-savings": "Total Savings",
                "saved": "Saved",
                "results-title": "Compression Results",
                "compression-message": "Your images are now",
                "smaller": "smaller!",
                "download-all": "Download All",
                "footer": "© 2023 ImageCompress. All rights reserved. | Free Online Image Compression Tool",
                "footer-tagline": "Free Online Image Optimization",
                "footer-description": "Free online image compressor that reduces file sizes while preserving quality. 100% local processing - your images never leave your device.",
                "features": "Features",
                "feature1": "Batch Image Compression",
                "feature2": "PNG, WebP, JPEG Support",
                "feature3": "Transparency Preservation",
                "feature4": "ZIP Download",
                "supported-formats": "Supported Formats",
                "powered-by": "Powered by",
                "all-rights-reserved": "All rights reserved",
                "images-processed": "10K+ Images Processed",
                "users-trusted": "5K+ Users Trusted",
                "max-images": `You can upload up to ${this.MAX_IMAGES} images only`,
                "processing": "Processing...",
                "download-success": "Image downloaded successfully",
                "compression-complete": "Image compression completed",
                "file-type-error": "Please upload image files only!",
                "file-too-large": "File size is too large. Please select images under 10MB each.",
                "network-error": "Network error occurred. Please check your connection.",
                "browser-support": "Your browser doesn't support some features. Please use Chrome, Firefox, or Edge.",
                "compression-failed": "Compression failed for some images. Please try again.",
                "help": "Help Guide",
                "compression-settings": "Compression Settings",
                "settings-tooltip": "Adjust compression quality and output format",
                "quality-tooltip": "Higher quality = larger file size, Lower quality = smaller file size",
                "width-tooltip": "Resize images to specified maximum width while maintaining aspect ratio",
                "format-tooltip": "Choose output format based on your needs. WebP offers best compression",
                "help-guide": "Help Guide",
                "step1-title": "Step 1: Upload Images",
                "guide-step1": "Drag and drop your images or click to select files. You can upload up to 20 images at once. Supported formats: PNG, JPEG, WebP.",
                "step2-title": "Step 2: Adjust Settings",
                "guide-step2": "Choose compression quality, maximum width, and output format according to your needs. Use tooltips for guidance.",
                "step3-title": "Step 3: Compress",
                "guide-step3": "Click 'Start Compression' to process your images. The compression happens locally in your browser - your files never leave your computer.",
                "step4-title": "Step 4: Download",
                "guide-step4": "Download individual images or all compressed files as a ZIP archive. Each download includes compression statistics.",
                "pro-tips": "Pro Tips:",
                "tip1": "Use WebP format for best compression with transparency support",
                "tip2": "Set max width to reduce dimensions for web use (recommended: 1200-2000px)",
                "tip3": "Quality 70-80% usually provides good balance between size and quality",
                "tip4": "All processing happens locally - your images never leave your computer",
                "tip5": "Use PNG format when you need transparency preservation",
                "no-images": "No images selected",
                "compression-started": "Compression started...",
                "all-compressed": "All images compressed successfully",
                "zip-downloading": "Preparing ZIP download...",
                "zip-ready": "ZIP file ready for download"
            },
            ar: {
                "title": "Di9ital IMG",
                "tagline": "ضغط الصور الذكي",
                "upload-title": "اسحب وأفلت الصور هنا",
                "upload-subtitle": "أو انقر لاختيار الملفات (حتى 20 صورة)",
                "select-files": "اختر الصور",
                "images-selected": "صورة محددة",
                "quality-label": "جودة الضغط:",
                "low": "منخفضة",
                "high": "عالية",
                "max-width-label": "أقصى عرض (اختياري)",
                "compress": "بدء الضغط",
                "reset": "مسح الكل",
                "download": "تحميل",
                "remove": "إزالة",
                "compressing": "جاري الضغط...",
                "original-size": "الحجم الأصلي",
                "compressed-size": "الحجم المضغوط",
                "total-savings": "إجمالي التوفير",
                "saved": "محفوظ",
                "results-title": "نتائج الضغط",
                "compression-message": "صورك أصبحت الآن",
                "smaller": "أصغر حجماً!",
                "download-all": "تحميل الكل",
                "footer": "© 2023 ImageCompress. جميع الحقوق محفوظة. | أداة ضغط الصور المجانية",
                "footer-tagline": "تحسين الصور عبر الإنترنت مجاناً",
                "footer-description": "أداة ضغط الصور المجانية التي تقلل حجم الملفات مع الحفاظ على الجودة. معالجة محلية 100% - صورك لا تترك جهازك.",
                "features": "المميزات",
                "feature1": "ضغط الصور الدفعي",
                "feature2": "دعم PNG, WebP, JPEG",
                "feature3": "الحفاظ على الشفافية",
                "feature4": "تحميل ZIP",
                "supported-formats": "الصيغ المدعومة",
                "powered-by": "تشغيل بواسطة",
                "all-rights-reserved": "جميع الحقوق محفوظة",
                "images-processed": "+10K صورة معالجة",
                "users-trusted": "+5K مستخدم وثق بنا",
                "max-images": `يمكنك رفع حتى ${this.MAX_IMAGES} صورة فقط`,
                "processing": "جاري المعالجة...",
                "download-success": "تم تحميل الصورة بنجاح",
                "compression-complete": "اكتمل ضغط الصور",
                "file-type-error": "الرجاء رفع ملفات صور فقط!",
                "file-too-large": "حجم الملف كبير جداً. الرجاء اختيار صور أقل من 10 ميجابايت.",
                "network-error": "حدث خطأ في الشبكة. الرجاء التحقق من الاتصال.",
                "browser-support": "متصفحك لا يدعم بعض الميزات. الرجاء استخدام Chrome أو Firefox أو Edge.",
                "compression-failed": "فشل ضغط بعض الصور. الرجاء المحاولة مرة أخرى.",
                "help": "دليل المساعدة",
                "compression-settings": "إعدادات الضغط",
                "settings-tooltip": "اضبط جودة الضغط وصيغة الإخراج",
                "quality-tooltip": "جودة أعلى = حجم ملف أكبر، جودة أقل = حجم ملف أصغر",
                "width-tooltip": "غير حجم الصور إلى أقصى عرض محدد مع الحفاظ على النسبة",
                "format-tooltip": "اختر صيغة الإخراج بناءً على احتياجاتك. WebP يوفر أفضل ضغط",
                "help-guide": "دليل المساعدة",
                "step1-title": "الخطوة 1: رفع الصور",
                "guide-step1": "اسحب وأفلت الصور أو انقر لاختيار الملفات. يمكنك رفع حتى 20 صورة في once. الصيغ المدعومة: PNG, JPEG, WebP.",
                "step2-title": "الخطوة 2: ضبط الإعدادات",
                "guide-step2": "اختر جودة الضغط، أقصى عرض، وصيغة الإخراج حسب احتياجاتك. استخدم التلميحات للإرشاد.",
                "step3-title": "الخطوة 3: الضغط",
                "guide-step3": "انقر 'بدء الضغط' لمعالجة الصور. الضغط يحدث محلياً في متصفحك - ملفاتك لا تترك جهازك.",
                "step4-title": "الخطوة 4: التحميل",
                "guide-step4": "حمّل الصور individually أو جميع الملفات المضغوطة كمحفوظة ZIP. كل تحميل يتضمن إحصائيات الضغط.",
                "pro-tips": "نصائح احترافية:",
                "tip1": "استخدم صيغة WebP لأفضل ضغط مع دعم الشفافية",
                "tip2": "اضبط أقصى عرض لتقليل الأبعاد للاستخدام على الويب (الموصى به: 1200-2000 بكسل)",
                "tip3": "الجودة 70-80% عادة توفر توازن جيد بين الحجم والجودة",
                "tip4": "جميع المعالجات تحدث محلياً - صورك لا تترك جهازك",
                "tip5": "استخدم صيغة PNG عندما تحتاج للحفاظ على الشفافية"
            },
            tr: {
                "title": "Di9ital IMG",
                "tagline": "Akıllı Görsel Sıkıştırma",
                "upload-title": "Görselleri Buraya Sürükleyin",
                "upload-subtitle": "Veya dosya seçmek için tıklayın (en fazla 20 görsel)",
                "select-files": "Görselleri Seç",
                "images-selected": "görsel seçildi",
                "quality-label": "Sıkıştırma Kalitesi:",
                "low": "Düşük",
                "high": "Yüksek",
                "max-width-label": "Maksimum Genişlik (isteğe bağlı)",
                "compress": "Sıkıştırmayı Başlat",
                "reset": "Hepsini Temizle",
                "download": "İndir",
                "remove": "Kaldır",
                "compressing": "Sıkıştırılıyor...",
                "original-size": "Orijinal Boyut",
                "compressed-size": "Sıkıştırılmış Boyut",
                "total-savings": "Toplam Tasarruf",
                "saved": "Kaydedildi",
                "results-title": "Sıkıştırma Sonuçları",
                "compression-message": "Görselleriniz şimdi",
                "smaller": "daha küçük!",
                "download-all": "Tümünü İndir",
                "footer": "© 2023 ImageCompress. Tüm hakları saklıdır. | Ücretsiz Çevrimiçi Görsel Sıkıştırma Aracı",
                "footer-tagline": "Ücretsiz Çevrimiçi Görsel Optimizasyonu",
                "footer-description": "Dosya boyutlarını kaliteyi koruyarak azaltan ücretsiz çevrimiçi görsel sıkıştırıcı. %100 yerel işleme - görselleriniz cihazınızı asla terk etmez.",
                "features": "Özellikler",
                "feature1": "Toplu Görsel Sıkıştırma",
                "feature2": "PNG, WebP, JPEG Desteği",
                "feature3": "Şeffaflık Koruma",
                "feature4": "ZIP İndirme",
                "supported-formats": "Desteklenen Formatlar",
                "powered-by": "Destekleyen",
                "all-rights-reserved": "Tüm hakları saklıdır",
                "images-processed": "10K+ İşlenen Görsel",
                "users-trusted": "5K+ Güvenen Kullanıcı",
                "max-images": `Yalnızca en fazla ${this.MAX_IMAGES} görsel yükleyebilirsiniz`,
                "processing": "İşleniyor...",
                "download-success": "Görsel başarıyla indirildi",
                "compression-complete": "Görsel sıkıştırma tamamlandı",
                "file-type-error": "Lütfen yalnızca görsel dosyaları yükleyin!",
                "file-too-large": "Dosya boyutu çok büyük. Lütfen 10MB'tan küçük görseller seçin.",
                "network-error": "Ağ hatası oluştu. Lütfen bağlantınızı kontrol edin.",
                "browser-support": "Tarayıcınız bazı özellikleri desteklemiyor. Lütfen Chrome, Firefox veya Edge kullanın.",
                "compression-failed": "Bazı görsellerin sıkıştırılması başarısız oldu. Lütfen tekrar deneyin.",
                "help": "Yardım Kılavuzu",
                "compression-settings": "Sıkıştırma Ayarları",
                "settings-tooltip": "Sıkıştırma kalitesini ve çıktı formatını ayarlayın",
                "quality-tooltip": "Yüksek kalite = büyük dosya boyutu, Düşük kalite = küçük dosya boyutu",
                "width-tooltip": "En-boy oranını koruyarak görselleri belirtilen maksimum genişliğe yeniden boyutlandırın",
                "format-tooltip": "İhtiyaçlarınıza göre çıktı formatını seçin. WebP en iyi sıkıştırmayı sunar",
                "help-guide": "Yardım Kılavuzu",
                "step1-title": "Adım 1: Görselleri Yükleyin",
                "guide-step1": "Görsellerinizi sürükleyip bırakın veya dosya seçmek için tıklayın. Aynı anda en fazla 20 görsel yükleyebilirsiniz. Desteklenen formatlar: PNG, JPEG, WebP.",
                "step2-title": "Adım 2: Ayarları Yapın",
                "guide-step2": "İhtiyaçlarınıza göre sıkıştırma kalitesi, maksimum genişlik ve çıktı formatını seçin. Rehberlik için ipuçlarını kullanın.",
                "step3-title": "Adım 3: Sıkıştırın",
                "guide-step3": "Görsellerinizi işlemek için 'Sıkıştırmayı Başlat'ı tıklayın. Sıkıştırma tarayıcınızda yerel olarak gerçekleşir - dosyalarınız bilgisayarınızı asla terk etmez.",
                "step4-title": "Adım 4: İndirin",
                "guide-step4": "Tekil görselleri veya tüm sıkıştırılmış dosyaları ZIP arşivi olarak indirin. Her indirme sıkıştırma istatistiklerini içerir.",
                "pro-tips": "Uzman İpuçları:",
                "tip1": "Şeffaflık desteği ile en iyi sıkıştırma için WebP formatını kullanın",
                "tip2": "Web kullanımı için boyutları küçültmek üzere maksimum genişlik ayarlayın (önerilen: 1200-2000px)",
                "tip3": "%70-80 kalite genellikle boyut ve kalite arasında iyi bir denge sağlar",
                "tip4": "Tüm işlemler yerel olarak gerçekleşir - görselleriniz bilgisayarınızı asla terk etmez",
                "tip5": "Şeffaflık korumasına ihtiyacınız olduğunda PNG formatını kullanın"
            }
        };

        this.init();
    }

    init() {
        this.initializeElements();
        this.initializeEventListeners();
        this.changeLanguage(this.currentLang);

        if (this.useWorker) {
            try {
                this.worker = new Worker('js/worker.js');
                this.worker.addEventListener('message', this.onWorkerMessage.bind(this));
            } catch (err) {
                console.warn('Worker unavailable, falling back to main thread.', err);
                this.useWorker = false;
                this.showNotification(this.translations[this.currentLang]['browser-support'], 'warning');
            }
        }
    }

    initializeElements() {
        this.elements = {
            uploadArea: document.getElementById('uploadArea'),
            fileInput: document.getElementById('fileInput'),
            selectFilesBtn: document.getElementById('selectFilesBtn'),
            controlsSection: document.getElementById('controlsSection'),
            resultsSection: document.getElementById('resultsSection'),
            imagesList: document.getElementById('imagesList'),
            imageCount: document.getElementById('imageCount'),
            countText: document.getElementById('countText'),
            qualitySlider: document.getElementById('quality'),
            qualityValue: document.getElementById('qualityValue'),
            maxWidthInput: document.getElementById('maxWidth'),
            compressBtn: document.getElementById('compressBtn'),
            resetBtn: document.getElementById('resetBtn'),
            downloadAllBtn: document.getElementById('downloadAllBtn'),
            savingsPercent: document.getElementById('savingsPercent'),
            originalTotalSize: document.getElementById('originalTotalSize'),
            compressedTotalSize: document.getElementById('compressedTotalSize'),
            totalSavings: document.getElementById('totalSavings'),
            resultsMessage: document.getElementById('resultsMessage'),
            dynamicPercent: document.getElementById('dynamicPercent'),
            langButtons: document.querySelectorAll('.lang-btn'),
            notificationContainer: document.getElementById('notificationContainer'),
            outputFormat: document.getElementById('outputFormat'),
            helpBtn: document.getElementById('helpBtn'),
            helpModal: document.getElementById('helpModal'),
            closeHelpBtn: document.getElementById('closeHelpBtn'),
            globalProgress: document.getElementById('globalProgress')
        };

        this.validateElements();
    }

    validateElements() {
        const requiredElements = [
            'uploadArea', 'fileInput', 'selectFilesBtn', 'imagesList'
        ];

        for (const elementName of requiredElements) {
            if (!this.elements[elementName]) {
                console.error(`Element not found: ${elementName}`);
            }
        }
    }

    initializeEventListeners() {
        const { uploadArea, fileInput, selectFilesBtn, qualitySlider, compressBtn, resetBtn, downloadAllBtn, langButtons, helpBtn, closeHelpBtn, helpModal } = this.elements;

        if (selectFilesBtn) {
            selectFilesBtn.addEventListener('click', () => fileInput.click());
        }

        if (uploadArea) {
            uploadArea.addEventListener('click', (e) => {
                if (e.target !== selectFilesBtn && !e.target.closest('.btn')) {
                    fileInput.click();
                }
            });

            uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
            uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
            uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        }

        if (fileInput) {
            fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }

        if (qualitySlider) {
            qualitySlider.addEventListener('input', this.updateQuality.bind(this));
        }

        if (compressBtn) {
            compressBtn.addEventListener('click', this.compressAllImages.bind(this));
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', this.resetApp.bind(this));
        }

        if (downloadAllBtn) {
            downloadAllBtn.addEventListener('click', this.downloadAllImages.bind(this));
        }

        if (langButtons && langButtons.length > 0) {
            langButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.changeLanguage(btn.dataset.lang);
                });
            });
        }

        if (helpBtn) {
            helpBtn.addEventListener('click', () => this.showHelpModal());
        }

        if (closeHelpBtn) {
            closeHelpBtn.addEventListener('click', () => this.hideHelpModal());
        }

        if (helpModal) {
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) {
                    this.hideHelpModal();
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !helpModal.classList.contains('hidden')) {
                this.hideHelpModal();
            }
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        this.elements.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        if (!this.elements.uploadArea.contains(e.relatedTarget)) {
            this.elements.uploadArea.classList.remove('dragover');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        this.elements.uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        this.handleFiles(files);
    }

    handleFileSelect() {
        const files = this.elements.fileInput.files;
        this.handleFiles(files);
    }

    handleFiles(files) {
        if (!files || files.length === 0) return;

        if (this.uploadedImages.length + files.length > this.MAX_IMAGES) {
            this.showNotification(this.translations[this.currentLang]['max-images'], 'error');
            return;
        }

        let validFiles = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (!file.type.match('image.*')) {
                this.showNotification(this.translations[this.currentLang]['file-type-error'], 'error');
                continue;
            }

            if (file.size > this.MAX_FILE_SIZE) {
                this.showNotification(this.translations[this.currentLang]['file-too-large'], 'error');
                continue;
            }

            const imageObj = {
                file: file,
                originalSize: file.size,
                compressedBlob: null,
                compressedSize: 0,
                previewUrl: URL.createObjectURL(file),
                name: file.name,
                id: Date.now() + Math.floor(Math.random() * 100000) + i,
                status: 'pending'
            };

            this.uploadedImages.push(imageObj);
            this.createImageCard(imageObj);
            validFiles++;
        }

        if (validFiles > 0) {
            this.elements.controlsSection.classList.remove('hidden');
            this.elements.imageCount.classList.remove('hidden');
            this.updateImageCount();
            this.showNotification(`${validFiles} image(s) added successfully`, 'success');
        }
    }

    createImageCard(imageObj) {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        imageCard.id = `image-card-${imageObj.id}`;

        imageCard.innerHTML = `
            <div class="image-card-header">
                <div class="image-name" title="${this.escapeHtml(imageObj.name)}">${this.escapeHtml(imageObj.name)}</div>
                <div class="image-actions">
                    <button class="btn btn-success download-btn hidden" id="downloadBtn-${imageObj.id}">
                        <i class="fas fa-download"></i>
                        <span class="btn-text">${this.translations[this.currentLang]['download']}</span>
                    </button>
                    <button class="btn btn-outline remove-btn" id="removeBtn-${imageObj.id}">
                        <i class="fas fa-trash"></i>
                        <span class="btn-text">${this.translations[this.currentLang]['remove']}</span>
                    </button>
                </div>
            </div>
            <div class="image-stats">
                <div class="stat-row">
                    <span class="stat-label">${this.translations[this.currentLang]['original-size']}</span>
                    <span class="stat-value original">${this.formatFileSize(imageObj.originalSize)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">${this.translations[this.currentLang]['compressed-size']}</span>
                    <span class="stat-value compressed" id="compressedSize-${imageObj.id}">-</span>
                </div>
            </div>
            <div class="compression-ratio" id="ratio-${imageObj.id}">-</div>
            <div class="progress-container">
                <div class="progress-info">
                    <span>${this.translations[this.currentLang]['processing']}</span>
                    <span id="progressText-${imageObj.id}">0%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" id="progress-${imageObj.id}"></div>
                </div>
            </div>
        `;

        this.elements.imagesList.appendChild(imageCard);

        const removeBtn = document.getElementById(`removeBtn-${imageObj.id}`);
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.removeImage(imageObj.id);
            });
        }
    }

    updateQuality() {
        this.compressionQuality = parseInt(this.elements.qualitySlider.value) / 100;
        if (this.elements.qualityValue) {
            this.elements.qualityValue.textContent = `${this.elements.qualitySlider.value}%`;
        }
    }

    async compressAllImages() {
        if (this.uploadedImages.length === 0) {
            this.showNotification(this.translations[this.currentLang]['no-images'], 'warning');
            return;
        }

        this.maxWidth = this.elements.maxWidthInput.value ? parseInt(this.elements.maxWidthInput.value) : null;

        if (this.elements.compressBtn) {
            this.elements.compressBtn.disabled = true;
            this.elements.compressBtn.classList.add('loading');
            this.elements.compressBtn.innerHTML = `<i class="fas fa-compress-alt"></i> ${this.translations[this.currentLang]['compressing']}`;
        }

        // Show global progress bar
        if (this.elements.globalProgress) {
            this.elements.globalProgress.classList.remove('hidden');
        }

        this.showNotification(this.translations[this.currentLang]['compression-started'], 'info');

        const compressionPromises = [];
        for (let i = 0; i < this.uploadedImages.length; i++) {
            if (this.uploadedImages[i].status !== 'compressed') {
                compressionPromises.push(this.compressImage(this.uploadedImages[i].id));
            }
        }

        try {
            await Promise.all(compressionPromises);
            this.showNotification(this.translations[this.currentLang]['all-compressed'], 'success');
        } catch (error) {
            console.error('Compression error:', error);
            this.showNotification(this.translations[this.currentLang]['compression-failed'], 'error');
        } finally {
            if (this.elements.compressBtn) {
                this.elements.compressBtn.disabled = false;
                this.elements.compressBtn.classList.remove('loading');
                this.elements.compressBtn.innerHTML = `<i class="fas fa-compress-alt"></i> ${this.translations[this.currentLang]['compress']}`;
            }

            // Hide global progress bar
            if (this.elements.globalProgress) {
                this.elements.globalProgress.classList.add('hidden');
            }
        }

        this.updateResults();
    }

    compressImage(imageId) {
        return new Promise(async (resolve) => {
            const imageObj = this.uploadedImages.find(img => img.id === imageId);
            if (!imageObj) return resolve();

            const progressBar = document.getElementById(`progress-${imageId}`);
            const progressText = document.getElementById(`progressText-${imageId}`);
            const downloadBtn = document.getElementById(`downloadBtn-${imageId}`);
            const compressedSizeSpan = document.getElementById(`compressedSize-${imageId}`);
            const ratioSpan = document.getElementById(`ratio-${imageId}`);
            const imageCard = document.getElementById(`image-card-${imageId}`);

            const desiredOutput = this.elements.outputFormat ? this.elements.outputFormat.value : 'keep';
            const outputType = desiredOutput;

            const options = {
                maxWidth: this.maxWidth,
                quality: this.compressionQuality,
                outputType: outputType,
                originalType: imageObj.file.type
            };

            let progress = 0;
            const interval = setInterval(() => {
                progress = Math.min(progress + 5, 90);
                if (progressBar) progressBar.style.width = `${progress}%`;
                if (progressText) progressText.textContent = `${progress}%`;
            }, 100);

            if (this.useWorker && this.worker) {
                try {
                    const buffer = await imageObj.file.arrayBuffer();
                    this._pending[imageId] = {
                        resolve,
                        imageObj,
                        progressBar,
                        progressText,
                        downloadBtn,
                        compressedSizeSpan,
                        ratioSpan,
                        imageCard,
                        interval
                    };
                    this.worker.postMessage({ id: imageId, arrayBuffer: buffer, options }, [buffer]);
                } catch (err) {
                    console.warn('Worker processing failed, falling back to main thread:', err);
                    clearInterval(interval);
                    this._processOnMainThread(imageObj, options, {
                        progressBar,
                        progressText,
                        downloadBtn,
                        compressedSizeSpan,
                        ratioSpan,
                        imageCard
                    }).then(resolve);
                }
            } else {
                clearInterval(interval);
                await this._processOnMainThread(imageObj, options, {
                    progressBar,
                    progressText,
                    downloadBtn,
                    compressedSizeSpan,
                    ratioSpan,
                    imageCard
                });
                resolve();
            }
        });
    }

    async _processOnMainThread(imageObj, options, uiRefs) {
        return new Promise((resolve) => {
            const { progressBar, progressText, downloadBtn, compressedSizeSpan, ratioSpan, imageCard } = uiRefs;
            const img = new Image();
            img.src = imageObj.previewUrl;

            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (options.maxWidth && width > options.maxWidth) {
                    height = Math.round((height * options.maxWidth) / width);
                    width = options.maxWidth;
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                // Draw white background for JPEG format
                if (options.outputType === 'image/jpeg') {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, width, height);
                }

                ctx.drawImage(img, 0, 0, width, height);

                let mime = options.outputType === 'keep' ? imageObj.file.type || 'image/jpeg' : options.outputType;
                const quality = mime === 'image/png' ? undefined : options.quality;

                canvas.toBlob((blob) => {
                    if (!blob) {
                        console.error('toBlob returned null');
                        this.showNotification('Compression failed for ' + imageObj.name, 'error');
                        resolve();
                        return;
                    }
                    imageObj.compressedBlob = blob;
                    imageObj.compressedSize = blob.size;
                    imageObj.status = 'compressed';

                    if (compressedSizeSpan) compressedSizeSpan.textContent = this.formatFileSize(blob.size);
                    if (downloadBtn) {
                        downloadBtn.classList.remove('hidden');
                        downloadBtn.onclick = () => this.downloadImage(imageObj.id);
                    }
                    if (ratioSpan) ratioSpan.textContent = this.computeRatio(imageObj.originalSize, imageObj.compressedSize);
                    if (progressBar) progressBar.style.width = '100%';
                    if (progressText) progressText.textContent = '100%';
                    if (imageCard) imageCard.classList.add('compressed');

                    resolve();
                }, mime, quality);
            };
            img.onerror = () => {
                console.error('Failed to load image for compression (main thread).');
                this.showNotification('Failed to load: ' + imageObj.name, 'error');
                resolve();
            };
        });
    }

    onWorkerMessage(e) {
        const { id, success, blob, error } = e.data;
        const pending = this._pending[id];
        if (!pending) return;

        const { resolve, imageObj, progressBar, progressText, downloadBtn, compressedSizeSpan, ratioSpan, imageCard, interval } = pending;

        if (interval) clearInterval(interval);

        if (success && blob) {
            imageObj.compressedBlob = blob;
            imageObj.compressedSize = blob.size;
            imageObj.status = 'compressed';

            if (compressedSizeSpan) compressedSizeSpan.textContent = this.formatFileSize(blob.size);
            if (downloadBtn) {
                downloadBtn.classList.remove('hidden');
                downloadBtn.onclick = () => this.downloadImage(id);
            }
            if (ratioSpan) ratioSpan.textContent = this.computeRatio(imageObj.originalSize, imageObj.compressedSize);
            if (progressBar) progressBar.style.width = '100%';
            if (progressText) progressText.textContent = '100%';
            if (imageCard) imageCard.classList.add('compressed');
        } else {
            console.error('Worker failed for', id, error);
            this.showNotification('Compression failed for ' + imageObj.name, 'error');
            this._processOnMainThread(imageObj, {
                maxWidth: this.maxWidth,
                quality: this.compressionQuality,
                outputType: this.elements.outputFormat ? this.elements.outputFormat.value : 'keep'
            }, { progressBar, progressText, downloadBtn, compressedSizeSpan, ratioSpan, imageCard }).then(() => {
                // Fallback completed
            });
        }

        delete this._pending[id];
        if (typeof resolve === 'function') resolve();
    }

    downloadImage(imageId) {
        const imageObj = this.uploadedImages.find(img => img.id === imageId);
        if (!imageObj || !imageObj.compressedBlob) {
            this.showNotification('Image not ready for download', 'error');
            return;
        }

        const ext = this.getExtensionFromBlob(imageObj.compressedBlob);
        const url = URL.createObjectURL(imageObj.compressedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compressed_${imageObj.name.split('.').slice(0, -1).join('.') || imageObj.name}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => {
            URL.revokeObjectURL(url);
            this.showNotification(this.translations[this.currentLang]['download-success'], 'success');
        }, 100);
    }

    downloadAllImages() {
        const compressedImages = this.uploadedImages.filter(img => img.compressedBlob);
        if (compressedImages.length === 0) {
            this.showNotification('No compressed images available for download', 'warning');
            return;
        }

        this.showNotification(this.translations[this.currentLang]['zip-downloading'], 'info');

        const zip = new JSZip();
        const folder = zip.folder('compressed_images');
        const addPromises = [];

        compressedImages.forEach((img) => {
            if (img.compressedBlob) {
                const nameBase = img.name.split('.').slice(0, -1).join('.') || img.name;
                const ext = this.getExtensionFromBlob(img.compressedBlob);
                const filename = `compressed_${nameBase}.${ext}`;
                addPromises.push(img.compressedBlob.arrayBuffer().then(buf => folder.file(filename, buf)));
            }
        });

        Promise.all(addPromises).then(() => {
            return zip.generateAsync({ type: 'blob' });
        }).then((content) => {
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `imagecompress_${new Date().getTime()}.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            setTimeout(() => {
                URL.revokeObjectURL(url);
                this.showNotification(this.translations[this.currentLang]['zip-ready'], 'success');
            }, 1000);
        }).catch(err => {
            console.error('ZIP generation failed', err);
            this.showNotification('Failed to create ZIP file', 'error');
        });
    }

    getExtensionFromBlob(blob) {
        const type = blob.type || 'image/jpeg';
        if (type === 'image/png') return 'png';
        if (type === 'image/webp') return 'webp';
        if (type === 'image/jpeg' || type === 'image/jpg') return 'jpg';
        return 'jpg';
    }

    removeImage(imageId) {
        const imageIndex = this.uploadedImages.findIndex(img => img.id === imageId);
        if (imageIndex === -1) return;

        try {
            URL.revokeObjectURL(this.uploadedImages[imageIndex].previewUrl);
        } catch (e) { }

        this.uploadedImages.splice(imageIndex, 1);

        const imageCard = document.getElementById(`image-card-${imageId}`);
        if (imageCard) imageCard.remove();

        this.updateImageCount();

        if (this.uploadedImages.length === 0) {
            this.elements.controlsSection.classList.add('hidden');
            this.elements.imageCount.classList.add('hidden');
            this.elements.resultsSection.classList.add('hidden');
        } else {
            this.updateResults();
        }
    }

    updateImageCount() {
        if (this.elements.countText) {
            this.elements.countText.textContent = this.uploadedImages.length;
        }
    }

    updateResults() {
        if (this.uploadedImages.length === 0) return;

        const compressedImages = this.uploadedImages.filter(img => img.compressedBlob);
        if (compressedImages.length === 0) return;

        const totalOriginal = compressedImages.reduce((sum, img) => sum + (img.originalSize || 0), 0);
        const totalCompressed = compressedImages.reduce((sum, img) => sum + (img.compressedSize || 0), 0);

        if (totalCompressed === 0) return;

        const savings = totalOriginal - totalCompressed;
        const savingsPercent = totalOriginal > 0 ? ((savings / totalOriginal) * 100).toFixed(1) : 0;

        if (this.elements.savingsPercent) {
            this.elements.savingsPercent.textContent = `${savingsPercent}%`;
        }

        if (this.elements.dynamicPercent) {
            this.elements.dynamicPercent.textContent = `${savingsPercent}%`;
        }

        if (this.elements.originalTotalSize) {
            this.elements.originalTotalSize.textContent = this.formatFileSize(totalOriginal);
        }

        if (this.elements.compressedTotalSize) {
            this.elements.compressedTotalSize.textContent = this.formatFileSize(totalCompressed);
        }

        if (this.elements.totalSavings) {
            this.elements.totalSavings.textContent = this.formatFileSize(savings);
        }

        this.elements.resultsSection.classList.remove('hidden');
    }

    resetApp() {
        this.uploadedImages.forEach(imageObj => {
            try {
                URL.revokeObjectURL(imageObj.previewUrl);
            } catch (e) { }
        });

        this.uploadedImages = [];
        this.elements.imagesList.innerHTML = '';
        this.elements.controlsSection.classList.add('hidden');
        this.elements.imageCount.classList.add('hidden');
        this.elements.resultsSection.classList.add('hidden');
        if (this.elements.fileInput) this.elements.fileInput.value = '';

        if (this.elements.qualitySlider) this.elements.qualitySlider.value = 80;
        if (this.elements.qualityValue) this.elements.qualityValue.textContent = '80%';
        if (this.elements.maxWidthInput) this.elements.maxWidthInput.value = '';
        if (this.elements.outputFormat) this.elements.outputFormat.value = 'keep';

        this.compressionQuality = 0.8;
        this.maxWidth = null;

        this.showNotification('All images cleared', 'info');
    }

    changeLanguage(lang) {
        this.currentLang = lang;

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (this.translations[lang] && this.translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = this.translations[lang][key];
                } else if (element.tagName === 'SELECT') {
                    // Handle select options if needed
                } else {
                    element.textContent = this.translations[lang][key];
                }
            }
        });

        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = lang;
        }

        if (this.elements.langButtons) {
            this.elements.langButtons.forEach(btn => {
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        this.updateImageCount();
    }

    showHelpModal() {
        if (this.elements.helpModal) {
            this.elements.helpModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    hideHelpModal() {
        if (this.elements.helpModal) {
            this.elements.helpModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        this.elements.notificationContainer.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    computeRatio(originalBytes, compressedBytes) {
        if (!originalBytes || !compressedBytes) return '-';
        const saved = originalBytes - compressedBytes;
        const percent = ((saved / originalBytes) * 100).toFixed(1);
        return `${percent}% smaller`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ImageCompressor();
});