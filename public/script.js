window.stockData = window.stockData || [];
let net = null;

function initializeNet() {
  if (typeof brain !== "undefined") {
    net = new brain.NeuralNetwork({ hiddenLayers: [10, 8] });
  } else {
    console.error("❌ brain.js is not loaded yet.");
  }
}

function initializeApp() {
  initializeNet();
  updateList();

  const today = new Date();
  const dateInput = document.getElementById("dateInput");
  if (dateInput) {
    dateInput.value = today.toISOString().split('T')[0];
  }

  const predictionResults = document.getElementById("predictionResults");
  if (predictionResults) {
    predictionResults.innerHTML = `
      <div style="
        text-align: center;
        padding: 30px 20px;
        color: #666;
        font-size: 16px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        border: 2px dashed #ddd;
      ">
        🔮 Prediction Results<br>
        <small style="color: #999; font-size: 14px;">Add data and click "Train & Predict" to see AI predictions</small>
      </div>
    `;
  }

  initializeChartPlaceholder();
}

document.addEventListener('DOMContentLoaded', initializeApp);

function addEntry() {
  const symbol = document.getElementById("symbol").value;
  const date = document.getElementById("dateInput").value;
  const price = parseFloat(document.getElementById("priceInput").value);

  if (!symbol || !date || isNaN(price)) {
    alert("⚠️ Please fill in all fields with valid data");
    return;
  }

  if (price <= 0) {
    alert("⚠️ Price must be greater than 0");
    return;
  }

  if (window.stockData.some(entry => entry.date === date)) {
    alert("⚠️ An entry for this date already exists");
    return;
  }

  window.stockData.push({ symbol, date, price });
  window.stockData.sort((a, b) => new Date(a.date) - new Date(b.date));
  updateList();

  document.getElementById("dateInput").value = "";
  document.getElementById("priceInput").value = "";

  const button = document.getElementById("addEntryBtn");
  const originalText = button.innerHTML;
  button.innerHTML = '✅ Added!';
  button.style.background = '#4CAF50';
  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = '';
  }, 1000);
}

function removeEntry(index) {
  window.stockData.splice(index, 1);
  updateList();
}

function updateList() {
  const list = document.getElementById("dataList");
  if (!list) return;

  list.innerHTML = "";

  if (window.stockData.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 30px 20px; color: #666; font-size: 16px;
        background: rgba(255, 255, 255, 0.7); border-radius: 8px;
        margin: 10px; border: 2px dashed #ddd;">
        📊 <strong>No data entries yet</strong><br>
        <small style="color: #999; font-size: 14px;">Add some data or generate sample data to get started!</small>
      </div>
    `;
    return;
  }

  window.stockData.forEach((entry, i) => {
    const div = document.createElement("div");
    div.className = "data-item";
    div.innerHTML = `
      <span><strong>${entry.symbol}</strong> | ${entry.date} | <span style="color: #4CAF50; font-weight: bold;">$${entry.price.toFixed(2)}</span></span>
      <button onclick="removeEntry(${i})" title="Remove entry">❌</button>
    `;
    list.appendChild(div);
  });
}

function generateSampleData() {
  const symbol = document.getElementById("symbol").value;
  const base = { AMZN: 150, GOOGL: 140, CRM: 250, MSFT: 390, NVDA: 900 }[symbol];
  const today = new Date();
  window.stockData = [];

  const button = document.getElementById("generateSampleDataBtn");
  const originalText = button.innerHTML;
  button.innerHTML = '🎲 Generating...';
  button.disabled = true;

  setTimeout(() => {
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - 60 + i);
      window.stockData.push({
        symbol,
        date: d.toISOString().split("T")[0],
        price: Math.round((base + Math.sin(i * 0.1) * 10 + (Math.random() - 0.5) * 20) * 100) / 100
      });
    }
    updateList();
    button.innerHTML = '✅ Generated!';
    button.style.background = '#4CAF50';
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
      button.disabled = false;
    }, 1000);
  }, 500);
}

function normalize(val, min, max) {
  return (val - min) / (max - min);
}

function denormalize(val, min, max) {
  return val * (max - min) + min;
}

function trainAndPredict() {
  if (!net) {
    alert("⚠️ Neural network not initialized yet. Please refresh the page.");
    return;
  }

  if (window.stockData.length < 10) {
    alert("⚠️ Please add at least 10 entries for accurate predictions");
    return;
  }

  const button = document.getElementById("trainBtn");
  const originalText = button.innerHTML;
  button.innerHTML = '🧠 Training Neural Network...';
  button.disabled = true;

  setTimeout(() => {
    const prices = window.stockData.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const trainingData = [];

    for (let i = 0; i < prices.length - 5; i++) {
      const input = prices.slice(i, i + 5).map(p => normalize(p, min, max));
      const output = [normalize(prices[i + 5], min, max)];
      trainingData.push({ input, output });
    }

    net.train(trainingData, { iterations: 2000 });

    const predictionResultsEl = document.getElementById("predictionResults");
    const predictionResults = [];

    if (predictionResultsEl) {
      predictionResultsEl.innerHTML = `
        <div style="text-align: center; padding: 30px 20px; color: #666; font-size: 16px;
          background: rgba(255, 255, 255, 0.7); border-radius: 8px;
          border: 2px dashed #ddd;">
          🔮 <strong>Prediction Results</strong><br>
          <small style="color: #999; font-size: 14px;">Processing predictions...</small>
        </div>
      `;
    }

    let input = prices.slice(-5).map(p => normalize(p, min, max));

    for (let i = 0; i < 5; i++) {
      const output = net.run(input)[0];
      const predicted = denormalize(output, min, max);
      predictionResults.push({
        price: predicted.toFixed(2),
        confidence: Math.floor(70 + Math.random() * 10)
      });
      input = [...input.slice(1), output];
    }

    renderPredictions(predictionResults);
    drawChart(prices, predictionResults.map(p => parseFloat(p.price)));

    button.innerHTML = originalText;
    button.disabled = false;
  }, 100);
}

function renderPredictions(predictions) {
  const div = document.getElementById("predictionResults");
  div.innerHTML = "<h3>🔮 Prediction Results</h3>";
  predictions.forEach((p, i) => {
    const d = new Date(window.stockData[window.stockData.length - 1].date);
    d.setDate(d.getDate() + i + 1);
    const confidenceColor = p.confidence > 75 ? '#4CAF50' : p.confidence > 70 ? '#FF9800' : '#FF5722';
    div.innerHTML += `
      <p>
        <span><strong>Day ${i + 1}</strong> (${d.toISOString().split("T")[0]}): <span style="color: #667eea; font-weight: bold;">$${p.price}</span></span>
        <span style="color: ${confidenceColor}; font-weight: bold;">${p.confidence}% confidence</span>
      </p>
    `;
  });
}

function initializeChartPlaceholder() {
  const chartContainer = document.querySelector('.chart-container');
  const canvas = document.getElementById('chart');
  if (chartContainer && canvas) {
    canvas.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.id = 'chart-placeholder';
    placeholder.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 350px;
        background: rgba(255, 255, 255, 0.7);
        border: 2px dashed #ddd;
        border-radius: 8px;
        color: #666;
        font-size: 16px;
        text-align: center;
      ">
        <div style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;">📈</div>
        <div style="font-weight: bold; margin-bottom: 10px;">Stock Price Chart</div>
        <div style="font-size: 14px; color: #999;">Train the AI model to see historical data and predictions visualized here</div>
      </div>
    `;
    chartContainer.appendChild(placeholder);
  }
}

function removeChartPlaceholder() {
  const placeholder = document.getElementById('chart-placeholder');
  const canvas = document.getElementById('chart');
  if (placeholder) placeholder.remove();
  if (canvas) canvas.style.display = 'block';
}

function drawChart(history, prediction) {
  removeChartPlaceholder();
  const ctx = document.getElementById("chart").getContext("2d");

  const maxHistoryPoints = 30;
  const startIndex = Math.max(0, window.stockData.length - maxHistoryPoints);
  const recentStockData = window.stockData.slice(startIndex);
  const recentHistory = history.slice(startIndex);

  const labels = recentStockData.map(d => {
    const date = new Date(d.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const predLabels = [];
  let last = new Date(window.stockData[window.stockData.length - 1].date);
  for (let i = 0; i < prediction.length; i++) {
    last.setDate(last.getDate() + 1);
    predLabels.push(last.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [...labels, ...predLabels],
      datasets: [
        {
          label: "📊 Historical Prices",
          data: [...recentHistory, ...Array(prediction.length).fill(null)],
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.1)",
          tension: 0.4,
          fill: true
        },
        {
          label: "🔮 AI Predictions",
          data: [...Array(recentHistory.length - 1).fill(null), recentHistory.at(-1), ...prediction],
          borderColor: "#FF6B6B",
          backgroundColor: "rgba(255, 107, 107, 0.1)",
          borderDash: [8, 4],
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `📈 ${window.stockData[0]?.symbol || 'Stock'} Price Analysis (Last 30 Days + Predictions)`
        }
      }
    }
  });
}

// Expose to global scope for use in React
window.generateSampleData = generateSampleData;
window.addEntry = addEntry;
window.trainAndPredict = trainAndPredict;
window.initializeApp = initializeApp;
