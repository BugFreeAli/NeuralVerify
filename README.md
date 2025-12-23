<div align="center">

  <h1>🛡️ NeuralVerify: The Client</h1>
  <h3>Enterprise-Grade AI Detection Dashboard</h3>

  <p>
    <strong>A modern, responsive React application for forensic image analysis.</strong>
  </p>

  <p>
    <a href="https://real-neural.vercel.app/"><strong>🔴 Live Demo</strong></a> •
    <a href="#-features"><strong>✨ Features</strong></a> •
    <a href="#-tech-stack"><strong>🛠️ Tech Stack</strong></a>
  </p>

  <!-- BADGES -->
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />

</div>

<br />

<!-- ⚠️ REPLACE THIS URL WITH A SCREENSHOT OF YOUR BEAUTIFUL UI -->
<img src="https://github.com/user-attachments/assets/81dac666-cb50-4089-964c-3935f27e677c" alt="Dashboard Screenshot" width="100%" />

---

## 💡 Overview

**NeuralVerify Client** is the user-facing interface for the NeuralVerify ecosystem. It provides a seamless, secure, and responsive way for users to interact with the deep learning backend.

Built with **Vite** and **TypeScript**, it prioritizes speed and type safety, ensuring a crash-free experience even when handling large image payloads.

---

## ✨ Key Features

### 🔍 Precision Analysis UI
*   **Real-Time Inference:** Connects to the Python microservice for millisecond-latency predictions.
*   **Smart Confidence Thresholds:**
    *   🟢 **Real (99-60%):** Verified Authentic.
    *   🟡 **Inconclusive (40-60%):** Flagged for manual review (Reduces false positives).
    *   🔴 **AI Generated (60-99%):** Detected synthetic artifacts.
*   **Probability Breakdown:** Visual progress bars showing the exact tensor output from the model.

### ⚡ Modern Architecture
*   **Drag & Drop Zone:** Intuitive file upload handling.
*   **Cold-Boot Handling:** Intelligent UI states that inform the user if the server is waking up from sleep mode (common in serverless/cloud environments).
*   **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile via Tailwind CSS.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Component-based UI architecture. |
| **Vite** | Next-generation build tool for instant HMR (Hot Module Replacement). |
| **TypeScript** | Strict typing for robust API integration and error handling. |
| **Tailwind CSS** | Utility-first styling for Glassmorphism effects and layout. |
| **Axios / Fetch** | Asynchronous communication with the FastAPI backend. |

---

## 🚀 Usage

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/neural-verify-frontend.git

# Enter directory
cd neural-verify-frontend

# Install dependencies
npm install
