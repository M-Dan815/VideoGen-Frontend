import React, { useState } from 'react';
import { Download, Layers, AlertCircle } from 'lucide-react';

const BackgroundRemoval = ({
  selectedImages,
  scrapedImages,
  setScrapedImages,
  setSelectedImages,
  platform,
  whiteBackground,
  setWhiteBackground,
  processing,
  setProcessing,
  processedImage,
  setProcessedImage,
  toggleSelectAll,
  clearSelections,
  addLog // Optional prop
}) => {
  const [error, setError] = useState('');

  // Fallback logging function
  const log = (message, type = 'info') => {
    if (typeof addLog === 'function') {
      addLog(message, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  };

  // Validate image URL accessibility
 const validateImageUrl = (url, type = 'processed') => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      log(`✅ Validated ${type} image URL: ${url}`, 'info');
      resolve(true);
    };
    img.onerror = () => {
      log(`⚠️ Error validating ${type} image URL: ${url}. Image failed to load.`, 'warning');
      resolve(false);
    };
    img.src = url + '?t=' + new Date().getTime(); // Cache buster to avoid cached errors
    setTimeout(() => {
      log(`⚠️ Timeout validating ${type} image URL: ${url}.`, 'warning');
      resolve(false);
    }, 3000);
  });
};

  // Process background removal for selected images
 const processBackgroundRemoval = async () => {
  if (selectedImages.length === 0) {
    setError('No images selected for background removal.');
    log('⚠️ No images selected for background removal.', 'warning');
    return;
  }

  setProcessing(true);
  setProcessedImage(null);
  setError('');

  try {
    const imageId = selectedImages[0];
    const image = scrapedImages.find(img => img.id === imageId);
    if (!image) {
      throw new Error('Selected image not found');
    }

    let imageUrl = image.url;
    let filename = imageUrl.split(/[/\\]/).pop() || 'image.png';
    // Optional: Strip platform prefix if present (only if files are saved without it)
    // Remove this block if files are confirmed to have 'ebay_' prefix
    // if (filename.startsWith(`${platform}_`)) {
    //   filename = filename.substring(platform.length + 1); // e.g., '74034acc...' instead of 'ebay_74034acc...'
    // }
    let localPath = `images/${platform}/${filename}`; // e.g., images/ebay/ebay_74034acc... or images/ebay/74034acc...
    log(`ℹ️ Constructed localPath: ${localPath}`, 'info');

    if (!imageUrl.startsWith('http')) {
      imageUrl = `http://localhost:8000/static/${platform}/${filename}`; // e.g., http://localhost:8000/static/ebay/ebay_74034acc...
      log(`ℹ️ Constructed imageUrl: ${imageUrl}`, 'info');
    }

    const isInputValid = await validateImageUrl(imageUrl, 'input');
    if (!isInputValid) {
      throw new Error(`Input image is inaccessible: ${imageUrl}. Ensure the image exists on the server.`);
    }

    const extension = filename.split('.').pop().toLowerCase();
    const supportedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    if (!supportedExtensions.includes(extension)) {
      throw new Error(
        `Unsupported image format (.${extension}). Supported formats: JPEG, PNG, WebP.`
      );
    }

    const payload = {
      image_paths: [localPath],
      add_white_bg: whiteBackground
    };

    log(`ℹ️ Sending background removal request for ${localPath}`, 'info');
    console.log('Sending request with:', payload);

    const apiResponse = await fetch('http://127.0.0.1:8000/api/background/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('API Response Status:', apiResponse.status);

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(`API Error: ${JSON.stringify(errorData)}.`);
    }

    const result = await apiResponse.json();
    console.log('API Response:', result);
    log(`ℹ️ Received API response: ${JSON.stringify(result)}`, 'info');

    if (result.successful > 0 && result.results && result.results.length > 0) {
      const processedImagePath = result.results[0];
      log(`ℹ️ Raw processed image path from backend: ${processedImagePath}`, 'info');
      let processedImageUrl;

      if (result.cloudinary_urls && result.cloudinary_urls.length > 0) {
        processedImageUrl = result.cloudinary_urls[0];
        log(`ℹ️ Using Cloudinary URL: ${processedImageUrl}`, 'info');
      } else if (processedImagePath.startsWith('data:image')) {
        processedImageUrl = processedImagePath;
        log('ℹ️ Using base64 image data', 'info');
      } else {
        let normalizedPath = processedImagePath.replace(/\\/g, '/');
        normalizedPath = normalizedPath.replace(/^(images\/)+/, '');
        processedImageUrl = `http://localhost:8000/static/${normalizedPath}`;
        log(`ℹ️ Constructed local URL: ${processedImageUrl}`, 'info');
      }

      const isProcessedValid = processedImageUrl.startsWith('data:image') || (await validateImageUrl(processedImageUrl, 'processed'));
      if (!isProcessedValid) {
        throw new Error(
          `Processed image is inaccessible: ${processedImageUrl}. Ensure the file exists at images/background_removed/no_bg_${filename} and is accessible at http://localhost:8000/static/background_removed/no_bg_${filename}.`
        );
      }

      setProcessedImage({
        original: imageUrl,
        processed: processedImageUrl,
        fileName: `no_bg_${filename}`,
        taskId: result.task_id || 'unknown'
      });
      log(`✅ Background removal completed for ${filename}. Task ID: ${result.task_id}`, 'success');
    } else {
      const errorMsg = result.errors && result.errors.length > 0 
        ? `Background removal failed: ${JSON.stringify(result.errors)}`
        : `Background removal failed: No valid results returned. Response: ${JSON.stringify(result)}`;
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error('Error processing image:', error);
    setError(`Error processing image: ${error.message}`);
    log(`❌ Error processing image: ${error.message}`, 'error');
  } finally {
    setProcessing(false);
  }
};

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-400" />
            Background Removal
          </h2>
          <p className="text-gray-400 text-sm mt-1">Remove background from selected images</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center mb-6">
          <AlertCircle className="w-5 h-5 text-red-300 mr-2" />
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Selected Images</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSelectAll}
              className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
            >
              {selectedImages.length === scrapedImages.length ? 'Deselect All' : 'Select All'}
            </button>
            <button
              onClick={clearSelections}
              className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
              disabled={selectedImages.length === 0}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={whiteBackground}
                onChange={() => setWhiteBackground(!whiteBackground)}
              />
              <div className={`block w-10 h-6 rounded-full ${whiteBackground ? 'bg-purple-500' : 'bg-gray-600'}`}></div>
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${whiteBackground ? 'transform translate-x-4' : ''}`}
              ></div>
            </div>
            <div className="ml-3 text-sm text-gray-300">
              White Background
            </div>
          </label>

          <button
            onClick={processBackgroundRemoval}
            disabled={selectedImages.length === 0 || processing}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all duration-300 text-sm ${
              selectedImages.length === 0 || processing
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
            }`}
          >
            {processing ? 'Processing...' : 'Remove Background'}
          </button>
        </div>

        {processedImage && (
          <div className="mt-6 bg-black/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">Processed Image</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Original</h4>
                <div className="bg-white/5 p-2 rounded-lg">
                  <img
                    src={processedImage.original}
                    alt="Original"
                    className="w-full h-auto max-h-80 object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-300">Processed</h4>
                  <a
                    href={processedImage.processed}
                    download={`${processedImage.fileName}`}
                    className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <img
                    src={processedImage.processed}
                    alt="Processed"
                    className="w-full h-auto max-h-80 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const errorMsg = `Failed to load processed image: ${processedImage.processed}. Check the file at images/background_removed/no_bg_${processedImage.fileName}.`;
                      setError(errorMsg);
                      log(errorMsg, 'error');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundRemoval;