'use client';

import { useEffect } from 'react';
import './style.css';

// ✅ Extend global Window for script methods
declare global {
  interface Window {
    initializeApp: () => void;
    addEntry: () => void;
    generateSampleData: () => void;
    trainAndPredict: () => void;
  }
}

export default function StockPredictorPage() {
  useEffect(() => {
    const loadScript = (src: string) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script;
    };

    // Load dependencies and custom script
    const brainScript = loadScript('https://cdn.jsdelivr.net/npm/brain.js@2.0.0-beta.2/dist/brain-browser.min.js');
    const chartScript = loadScript('https://cdn.jsdelivr.net/npm/chart.js');
    const customScript = loadScript('/script.js'); // Must be in public folder

    return () => {
      document.body.removeChild(brainScript);
      document.body.removeChild(chartScript);
      document.body.removeChild(customScript);
    };
  }, []);

  // Delay initialization until script is ready
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        typeof window.initializeApp === 'function' &&
        typeof window.addEntry === 'function' &&
        typeof window.generateSampleData === 'function' &&
        typeof window.trainAndPredict === 'function'
      ) {
        window.initializeApp();
        clearInterval(interval);
      }
    }, 100); // retry every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>📈 AI Stock Market Predictor</h1>

      <div className="controls">
        <select id="symbol">
          <option value="AMZN">Amazon</option>
          <option value="GOOGL">Google</option>
          <option value="CRM">Salesforce</option>
          <option value="MSFT">Microsoft</option>
          <option value="NVDA">NVIDIA</option>
        </select>
        <input type="date" id="dateInput" />
        <input type="number" step="0.01" placeholder="Price ($)" id="priceInput" />
        <button id="addEntryBtn" onClick={() => window.addEntry?.()}>➕ Add Entry</button>
        <button id="generateSampleDataBtn" onClick={() => window.generateSampleData?.()}>
          🎲 Sample Data
        </button>
      </div>

      <div className="data-list" id="dataList"></div>

      <button id="trainBtn" className="train-button" onClick={() => window.trainAndPredict?.()}>
        🤖 Train & Predict
      </button>

      <div id="predictionResults" className="prediction-results"></div>

      <div className="chart-container">
        <canvas id="chart"></canvas>
      </div>
    </div>
  );
}
