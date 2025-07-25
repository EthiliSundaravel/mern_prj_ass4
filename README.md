# 📈 Stock Market Predictor

A modern full-stack web application that uses a neural network (via Brain.js) to predict stock prices based on historical data. Built with **Next.js 15**, **Tailwind CSS**, **Chart.js**, and vanilla **JavaScript**.

---

## 🚀 Features

- Upload or generate stock price data
- Train a neural network model in the browser
- Predict the next 5 days of prices
- View predictions on an interactive chart
- Responsive, clean UI with Tailwind CSS

---

## 🧑‍💻 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/EthiliSundaravel/mern_prj_ass4
   cd mern_prj_ass4
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser.

---

## 📊 Dataset Format & Usage

You can either:
- Add entries manually using the UI
- Use the **Generate Sample Data** button to prefill 60 days of stock data

Each entry must follow this structure:

```json
{
  "symbol": "AMZN",
  "date": "2025-07-01",
  "price": 145.23
}
```

✅ Minimum **10 entries** are required to enable predictions.

---

## 🧠 Model Logic

- Neural network built using [Brain.js](https://brain.js.org/)
- Architecture:
  - **Input:** Last 5 days of normalized stock prices
  - **Output:** Predicted price for the next day
  - **Hidden Layers:** `[10, 8]`
- Training:
  - 2000 iterations
  - Runs fully in the browser (no backend required)

---

## 🧩 Third-Party Libraries Used

| Library        | Purpose                           |
|----------------|-----------------------------------|
| `brain.js`     | Neural network model              |
| `chart.js`     | Visualizing historical/predicted data |
| `next.js`      | React framework with routing      |
| `tailwindcss`  | Modern utility-first CSS styling  |

---

## 🌐 Deployed Version

👉 [Live Demo on Vercel]https://mern-prj-ass4.vercel.app/

---

## 🔐 Demo Credentials

```
Username: ethiliadmin@gmail.com
Password: ethili
```
