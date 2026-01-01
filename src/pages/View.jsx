import React, { useState, useEffect } from 'react';
import { 
  Upload, Download, Settings, Play, Pause, RotateCcw, Trash2, Eye, EyeOff, 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Grid3X3, List, Filter, Search, 
  X, Check, AlertCircle, Clock, Zap, Sparkles, Image as ImageIcon, Layers, 
  Palette, Wand2, Save, Share2, RefreshCcw, FileImage, FolderOpen, Star, Heart, 
  Tag, Calendar, User, BarChart3, TrendingUp, Activity, Home, Building, 
  ShoppingCart, Package, Cpu, HardDrive, Menu, Monitor, Smartphone, Tablet, 
  Camera, Mic, Lock, Shield, Globe, MapPin, Sun, Moon, Cloud, ChevronDown, ExternalLink
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import AmazonScraper from '../components/AmazonScraper';
import EbayScraper from '../components/EbayScraper';
import ShopifyScraper from '../components/ShopifyScraper';
import BackgroundRemoval from '../components/BackgroundRemoval';
import ImageOptimization from '../components/ImageOptimization';
import BackgroundGeneration from '../components/BackgroundGeneration';
import Merge from '../components/Merge';
import Report from '../components/Report';
import axios from 'axios';

const View = () => {
  const [searchParams] = useSearchParams();
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeSection, setActiveSection] = useState('gallery');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [url, setUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [scrapedImages, setScrapedImages] = useState([]);
  const [validScrapedImages, setValidScrapedImages] = useState([]);
  const [maxProducts, setMaxProducts] = useState(30);
  const [scrapingComplete, setScrapingComplete] = useState(false);
  const [platform, setPlatform] = useState('amazon');
  const [whiteBackground, setWhiteBackground] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [optimizationOptions, setOptimizationOptions] = useState({
    upscale: true,
    denoise: true
  });
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedImages, setOptimizedImages] = useState([]);
  const [optimizationResults, setOptimizationResults] = useState({
    original: null,
    optimized: null
  });
  const [backgroundPrompt, setBackgroundPrompt] = useState('studio product background, soft light');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [imageSize, setImageSize] = useState('1024x1024');
  const [quality, setQuality] = useState('hd');
  const [generatingBackground, setGeneratingBackground] = useState(false);
  const [generatedBackgrounds, setGeneratedBackgrounds] = useState([]);
  const [validGeneratedBackgrounds, setValidGeneratedBackgrounds] = useState([]);

  // Auto-detect platform from URL if available
  useEffect(() => {
    const urlPlatform = searchParams.get('platform');
    if (urlPlatform && ['amazon', 'ebay', 'shopify'].includes(urlPlatform)) {
      setPlatform(urlPlatform);
    }
  }, [searchParams]);

  // Add log message
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toISOString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  // Validate image URLs
  const validateImageUrl = async (url, type) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout
      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        addLog(`⚠️ Invalid ${type} image URL: ${url}. Status: ${response.status}.`, 'warning');
        return false;
      }
      return true;
    } catch (error) {
      if (error.name === 'AbortError') {
        addLog(`⚠️ Timeout validating ${type} image URL: ${url}.`, 'warning');
      } else {
        addLog(`⚠️ Error validating ${type} image URL: ${url}. ${error.message}`, 'warning');
      }
      return false;
    }
  };

  // Fetch and validate images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch scraped images
        addLog('ℹ️ Fetching scraped images...', 'info');
        const scraperEndpoints = [
          { url: 'http://127.0.0.1:8000/api/scrapers/amazon', platform: 'amazon' },
          { url: 'http://127.0.0.1:8000/api/scrapers/ebay', platform: 'ebay' },
          { url: 'http://127.0.0.1:8000/api/scrapers/shopify', platform: 'shopify' },
        ];

        const allScrapedImages = [];
        for (const { url, platform } of scraperEndpoints) {
          try {
            const response = await axios.get(url, {
              headers: { 'Content-Type': 'application/json' },
              timeout: 10000
            });
            const images = response.data.image_urls?.map((imgUrl, index) => ({
              id: `${platform}-${index}`,
              url: imgUrl,
              name: `${platform}-img-${index}.jpg`,
              timestamp: new Date().toISOString(),
              selected: false
            })) || [];
            allScrapedImages.push(...images);
            addLog(`✅ Fetched ${images.length} ${platform} images`, 'success');
          } catch (error) {
            addLog(`❌ Failed to fetch ${platform} images: ${error.message}`, 'error');
          }
        }

        // Validate scraped images
        const validScraped = [];
        for (const img of allScrapedImages) {
          const isValid = await validateImageUrl(img.url, 'scraped');
          if (isValid) {
            validScraped.push(img);
          } else {
            addLog(`⚠️ Excluding invalid scraped image: ${img.url}`, 'warning');
          }
        }
        setScrapedImages(allScrapedImages);
        setValidScrapedImages(validScraped);

        // Fetch generated backgrounds
        addLog('ℹ️ Fetching generated backgrounds...', 'info');
        try {
          const bgResponse = await axios.get('http://127.0.0.1:8000/api/generation/backgrounds', {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
          });
          const backgrounds = bgResponse.data.backgrounds?.map((url, index) => ({
            id: `bg-${index}`,
            url,
            name: `background-${index}.jpg`,
            timestamp: new Date().toISOString()
          })) || [];
          
          // Validate generated backgrounds
          const validBackgrounds = [];
          for (const bg of backgrounds) {
            const isValid = await validateImageUrl(bg.url, 'background');
            if (isValid) {
              validBackgrounds.push(bg);
            } else {
              addLog(`⚠️ Excluding invalid background image: ${bg.url}`, 'warning');
            }
          }
          setGeneratedBackgrounds(backgrounds);
          setValidGeneratedBackgrounds(validBackgrounds);

          if (validScraped.length === 0 || validBackgrounds.length === 0) {
            addLog('⚠️ No valid images available. Check scraper endpoints (/api/scrapers/amazon, /api/scrapers/ebay, /api/scrapers/shopify) or static file server at http://localhost:8000/static/.', 'warning');
          }
        } catch (error) {
          addLog(`❌ Failed to fetch generated backgrounds: ${error.message}`, 'error');
        }
      } catch (error) {
        addLog(`❌ Error fetching images: ${error.message}`, 'error');
      }
    };

    fetchImages();
  }, []);

  // Toggle select all/none images
  const toggleSelectAll = () => {
    if (selectedImages.length === validScrapedImages.length) {
      clearSelections();
    } else {
      selectAllImages();
    }
  };

  // Select all images
  const selectAllImages = () => {
    const allIds = validScrapedImages.map(img => img.id);
    setSelectedImages(allIds);
    setValidScrapedImages(prev => prev.map(img => ({ ...img, selected: true })));
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedImages([]);
    setValidScrapedImages(prev => prev.map(img => ({ ...img, selected: false })));
  };

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'gallery', label: 'Image Gallery', icon: ImageIcon },
    { id: 'background-removal', label: 'Background Removal', icon: Layers },
    { id: 'optimization', label: 'Image Optimization', icon: Wand2 },
    { id: 'background-generation', label: 'Background Generation', icon: Palette },
    { id: 'merge', label: 'Image Merge', icon: Layers },
    { id: 'report', label: 'Task Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Render the appropriate scraper component based on platform
  const renderScraper = () => {
    const commonProps = {
      platform,
      url,
      setUrl,
      isScraping,
      setIsScraping,
      scrapedImages: validScrapedImages,
      setScrapedImages: setValidScrapedImages,
      selectedImages,
      setSelectedImages,
      progress,
      setProgress,
      logs,
      setLogs,
      addLog,
      scrapingComplete,
      setScrapingComplete,
      toggleSelectAll,
      clearSelections
    };

    switch (platform) {
      case 'amazon':
        return <AmazonScraper {...commonProps} />;
      case 'ebay':
        return <EbayScraper {...commonProps} maxProducts={maxProducts} setMaxProducts={setMaxProducts} />;
      case 'shopify':
        return <ShopifyScraper {...commonProps} />;
      default:
        return <AmazonScraper {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c54] via-[#2d2e7a] to-[#4c0d73] pt-20">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E6B] from-10% via-[#2E1E6B]/60 via-60% to-transparent"></div>

      <div className="relative z-10 flex min-h-[calc(100vh-5rem)]">
        {/* Left Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white/10 backdrop-blur-sm border-r border-white/20 transition-all duration-300 flex flex-col`}>
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    PixelLift
                  </h1>
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeSection === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isScraping}
                >
                  <option value="amazon">Amazon</option>
                  <option value="ebay">eBay</option>
                  <option value="shopify">Shopify</option>
                </select>
              </div>
              {renderScraper()}
              <BackgroundRemoval
                selectedImages={selectedImages}
                scrapedImages={validScrapedImages}
                setScrapedImages={setValidScrapedImages}
                setSelectedImages={setSelectedImages}
                platform={platform}
                whiteBackground={whiteBackground}
                setWhiteBackground={setWhiteBackground}
                processing={processing}
                setProcessing={setProcessing}
                processedImage={processedImage}
                setProcessedImage={setProcessedImage}
                toggleSelectAll={toggleSelectAll}
                clearSelections={clearSelections}
              />
              <ImageOptimization
                selectedImages={selectedImages}
                scrapedImages={validScrapedImages}
                optimizationOptions={optimizationOptions}
                setOptimizationOptions={setOptimizationOptions}
                optimizing={optimizing}
                setOptimizing={setOptimizing}
                optimizationResults={optimizationResults}
                setOptimizationResults={setOptimizationResults}
                optimizedImages={optimizedImages}
                setOptimizedImages={setOptimizedImages}
                addLog={addLog}
                toggleSelectAll={toggleSelectAll}
                clearSelections={clearSelections}
                platform={platform}
              />
              <BackgroundGeneration
                selectedImages={selectedImages}
                scrapedImages={validScrapedImages}
                backgroundPrompt={backgroundPrompt}
                setBackgroundPrompt={setBackgroundPrompt}
                negativePrompt={negativePrompt}
                setNegativePrompt={setNegativePrompt}
                numImages={numImages}
                setNumImages={setNumImages}
                imageSize={imageSize}
                setImageSize={setImageSize}
                quality={quality}
                setQuality={setQuality}
                generatingBackground={generatingBackground}
                setGeneratingBackground={setGeneratingBackground}
                generatedBackgrounds={validGeneratedBackgrounds}
                setGeneratedBackgrounds={setValidGeneratedBackgrounds}
                addLog={addLog}
                toggleSelectAll={toggleSelectAll}
                clearSelections={clearSelections}
                platform={platform}
              />
              <Merge
                scrapedImages={validScrapedImages}
                generatedBackgrounds={validGeneratedBackgrounds}
                addLog={addLog}
                toggleSelectAll={toggleSelectAll}
                clearSelections={clearSelections}
                platform={platform}
              />
            </div>
          )}

          {activeSection === 'background-removal' && (
            <div className="space-y-6">
              <BackgroundRemoval
                selectedImages={selectedImages}
                scrapedImages={validScrapedImages}
                setScrapedImages={setValidScrapedImages}
                setSelectedImages={setSelectedImages}
                platform={platform}
                whiteBackground={whiteBackground}
                setWhiteBackground={setWhiteBackground}
                processing={processing}
                setProcessing={setProcessing}
                processedImage={processedImage}
                setProcessedImage={setProcessedImage}
                toggleSelectAll={toggleSelectAll}
                clearSelections={clearSelections}
              />
            </div>
          )}

          {activeSection === 'optimization' && (
            <div className="space-y-6">
              <ImageOptimization
                selectedImages={selectedImages}
                scrapedImages={validScrapedImages}
                optimizationOptions={optimizationOptions}
                setOptimizationOptions={setOptimizationOptions}
                optimizing={optimizing}
                setOptimizing={setOptimizing}
                optimizationResults={optimizationResults}
                setOptimizationResults={setOptimizationResults}
                optimizedImages={optimizedImages}
                setOptimizedImages={setOptimizedImages}
                addLog={addLog}
                toggleSelectAll={toggleSelectAll}
                clearSelections={clearSelections}
                platform={platform}
              />
            </div>
          )}

          {activeSection === 'background-generation' && (
            <div className="space-y-6">
              <BackgroundGeneration
                selectedImages={selectedImages}
                scrapedImages={validScrapedImages}
                backgroundPrompt={backgroundPrompt}
                setBackgroundPrompt={setBackgroundPrompt}
                negativePrompt={negativePrompt}
                setNegativePrompt={setNegativePrompt}
                numImages={numImages}
                setNumImages={setNumImages}
                imageSize={imageSize}
                setImageSize={setImageSize}
                quality={quality}
                setQuality={setQuality}
                generatingBackground={generatingBackground}
                setGeneratingBackground={setGeneratingBackground}
                generatedBackgrounds={validGeneratedBackgrounds}
                setGeneratedBackgrounds={setValidGeneratedBackgrounds}
                addLog={addLog}
                toggleSelectAll={toggleSelectAll}
                clearSelections={clearSelections}
                platform={platform}
              />
            </div>
          )}

          {activeSection === 'merge' && (
            <div className="space-y-6">
              <Merge
                scrapedImages={validScrapedImages}
                generatedBackgrounds={validGeneratedBackgrounds}
                addLog={addLog}
                toggleSelectAll={toggleSelectAll}
                clearSelections={clearSelections}
                platform={platform}
              />
            </div>
          )}

          {activeSection === 'report' && (
            <div className="space-y-6">
              <Report addLog={addLog} />
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🚧</div>
              <h3 className="text-xl font-medium text-white mb-2">Under Construction</h3>
              <p className="text-gray-400">This section is coming soon!</p>
            </div>
          )}

          {/* Logs */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-medium text-white mb-4">Logs</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {logs.map(log => (
                <div
                  key={log.timestamp}
                  className={`text-sm p-2 rounded ${
                    log.type === 'error'
                      ? 'bg-red-500/20 text-red-300'
                      : log.type === 'warning'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-gray-800/50 text-gray-300'
                  }`}
                >
                  [{new Date(log.timestamp).toLocaleString()}] {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;