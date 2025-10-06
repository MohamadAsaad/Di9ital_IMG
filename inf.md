# تعليمات تشغيل واختبار سريعة

## هيكل المجلدات

image-compress/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── worker.js
├── assets/
│   ├── logo.png              (شعار ImageCompress)
│   └── di9ital-logo.png      (شعار DI9ITAL)
├── robots.txt
├── sitemap.xml
└── package.json (اختياري لـ Vercel)


## خطوات التشغيل

1. **التشغيل المحلي**:
   - افتح `index.html` مباشرة في المتصفح للتجربة الأساسية
   - للتجربة الكاملة (بما في ذلك Web Workers)، شغل الموقع عبر خادم محلي:
     ```bash
     # باستخدام Python
     python -m http.server 8000
     
     # أو باستخدام Node.js
     npx http-server
     
     # أو باستخدام PHP
     php -S localhost:8000
     ```

2. **الاختبار**:
   - اختبر رفع الصور بالسحب والإفلات والنقر
   - جرب إعدادات الضغط المختلفة
   - اختبر تحميل الصور الفردية ومضغوط ZIP
   - تحقق من عمل الترجمة بين اللغات
   - اختبر دليل المساعدة

3. **النشر**:
   - استبدل `ca-pub-XXXXXXXX` بمفاتيح AdSense الحقيقية
   - عدل `yourdomain.example` إلى اسم النطاق الفعلي
   - تأكد من ضغط CSS/JS للإنتاج

## المميزات المحدثة

✅ **اللغة الافتراضية الإنجليزية**  
✅ **إزالة معاينة الصور**  
✅ **تصميم محسن للتحكم وبطاقات الصور**  
✅ **تلميحات توضيحية**  
✅ **رسائل خطأ محسنة**  
✅ **دليل استخدام تفاعلي**  
✅ **كلمات مفتاحية لتحسين SEO**  
✅ **تحسينات إضافية للأداء والتجربة**

## دعم المتصفحات

- Chrome 80+
- Firefox 75+
- Safari 14+
- Edge 80+

## ملاحظات تقنية

- يستخدم Web Workers لمعالجة غير متزامنة
- يدعم تنسيقات PNG, JPEG, WebP
- يحافظ على الشفافية في PNG وWebP
- الحد الأقصى لحجم الملف: 10MB
- الحد الأقصى لعدد الصور: 20 صورة
- المعالجة محلية بالكامل (لا توجد حاجة للخادم)


<!-- جاهز لـ AdSense -->

أماكن الإعلانات المضمنة:
html
<!-- في head -->
<script data-ad-client="ca-pub-XXXXXXXX" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

<!-- في body -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXX"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>



<!-- خطوات النشر على Vercel -->

الطريقة 1: رفع مباشر
انشئ حساب على vercel.com

انقر "New Project"

اسحب مجلد المشروع كله إلى واجهة الرفع

Vercel سيتعرف تلقائياً على أنه موقع static

الطريقة 2: عبر Git
انشئ مستودع Git (GitHub/GitLab)

اربط Vercel بحساب Git

اختر المستودع وسيتم النشر تلقائياً

📝 خطوات تفعيل AdSense

1. إعداد الموقع النهائي:
html
<!-- استبدل في index.html -->

<meta property="og:url" content="https://your-actual-domain.vercel.app/">
<link rel="canonical" href="https://your-actual-domain.vercel.app/">

2. إضافة صفحات إضافية:
html
<!-- privacy.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Privacy Policy - ImageCompress</title>
    <meta name="description" content="Privacy Policy for ImageCompress - Your images are processed locally and never leave your computer.">
</head>
<body>
    <h1>Privacy Policy</h1>
    <p>All image processing happens locally in your browser. We do not store or transmit your images to any server.</p>
</body>
</html>

3. تطبيق AdSense:
سجل في AdSense

أضف النطاق الخاص بك (your-domain.vercel.app)

ضع كود التحقق في الموقع

بعد الموافقة، استبدل ca-pub-XXXXXXXX بمعرفك الفعلي

🎯 نصائح لزيادة الربح
تحسينات إضافية للإيرادات:
html
<!-- إضافة المزيد من أماكن الإعلانات -->
<div class="ad-section">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-format="fluid"
         data-ad-layout-key="-gw-3+1f-3d+2z"
         data-ad-client="ca-pub-XXXXXXXX"
         data-ad-slot="YYYYYYYYYY"></ins>
</div>
تحسين SEO للمزيد من الزيارات:
html
<!-- إضافة المزيد من الكلمات المفتاحية -->
<meta name="keywords" content="compress images, reduce image size, free image optimizer, online photo compressor, batch image compression, PNG compressor, WebP converter, JPEG optimizer, image size reducer, photo size reducer, free image tools, web image optimizer, social media image compressor, email image compressor, website image optimizer">