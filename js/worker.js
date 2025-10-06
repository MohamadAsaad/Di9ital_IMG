// js/worker.js
self.addEventListener('message', async (e) => {
    const { id, arrayBuffer, options } = e.data;
    try {
        const blob = new Blob([arrayBuffer], { type: options.originalType || 'image/jpeg' });

        // createImageBitmap works in workers
        const bitmap = await createImageBitmap(blob);

        let width = bitmap.width;
        let height = bitmap.height;

        if (options.maxWidth && width > options.maxWidth) {
            height = Math.round((height * options.maxWidth) / width);
            width = options.maxWidth;
        }

        // OffscreenCanvas usage
        let canvas;
        if (typeof OffscreenCanvas !== 'undefined') {
            canvas = new OffscreenCanvas(width, height);
        } else {
            canvas = new OffscreenCanvas(width, height);
        }

        const ctx = canvas.getContext('2d');

        // Draw white background for JPEG format
        if (options.outputType === 'image/jpeg') {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(bitmap, 0, 0, width, height);

        // Determine mime type
        let mime = options.outputType;
        if (mime === 'keep') mime = options.originalType || 'image/jpeg';

        // For PNG (lossless) quality param is ignored
        const quality = mime === 'image/png' ? undefined : options.quality;

        // convertToBlob (supported on OffscreenCanvas)
        let blobResult;
        if (canvas.convertToBlob) {
            blobResult = await canvas.convertToBlob({ type: mime, quality: quality });
        } else {
            throw new Error('OffscreenCanvas.convertToBlob not supported in this worker');
        }

        // Post back the blob (structured clone will copy)
        self.postMessage({ id, success: true, blob: blobResult });
    } catch (err) {
        self.postMessage({ id, success: false, error: err.message || String(err) });
    }
});