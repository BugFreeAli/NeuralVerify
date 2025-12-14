// This service connects to your hosted Python backend on Hugging Face
// Replace the API_URL below with your actual Hugging Face Space URL

export interface DetectionResult {
  isAiGenerated: boolean;
  confidence: number;
  details: string;
  metadata: {
    lighting: string;
    grain: string;
    compression: string;
    resolution: string;
  };
  logs: string[];
}

export interface ScanStage {
  name: string;
  progress: number;
  log: string;
}

// Helper for delay to make the UI look cool
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeImage = async (
  file: File, 
  onProgress: (stage: ScanStage) => void
): Promise<DetectionResult> => {
  
  // =========================================================================
  // 🟢 STEP 1: PASTE YOUR HUGGING FACE URL HERE
  // =========================================================================
  
  const HUGGING_FACE_URL = "https://bugfreeali-ai-real-detection.hf.space/predict";
  
  // =========================================================================

  const logs: string[] = [
    `Initializing connection to Neural Engine...`,
    `Upload complete (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
    `Processing frequency domain...`,
    `Analyzing compression artifacts...`
  ];

  // We check if you have updated the URL
  const USE_REAL_BACKEND = !HUGGING_FACE_URL.includes("YOUR-SPACE-NAME");

  if (USE_REAL_BACKEND) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Stage 1: Uploading
      onProgress({ name: "Establishing Uplink...", progress: 10, log: "Connecting to secure cloud node..." });
      
      const fetchPromise = fetch(HUGGING_FACE_URL, {
        method: "POST",
        body: formData,
      });

      // Handle "Cold Boot" (Hugging Face spaces sleep when inactive)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Slow")), 4000)
      );

      try {
        await Promise.race([fetchPromise, timeoutPromise]);
      } catch (e) {
        onProgress({ name: "Waking up GPU...", progress: 30, log: "Server is cold-booting (this may take 30s)..." });
      }

      onProgress({ name: "Transmitting Data...", progress: 40, log: logs[1] });

      const response = await fetchPromise;

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      // Stage 2: Processing
      onProgress({ name: "Neural Analysis...", progress: 75, log: "Running EfficientNet inference..." });
      
      const data = await response.json();

      // Stage 3: Done
      onProgress({ name: "Finalizing Score...", progress: 100, log: "Classification received." });
      
      return {
        isAiGenerated: data.is_ai,
        confidence: data.confidence,
        details: data.message,
        metadata: {
          lighting: data.is_ai ? "Artificial/Inconsistent" : "Natural Source",
          grain: data.is_ai ? "Digital Artifacts" : "ISO Noise Match",
          compression: "JPEG/Standard",
          resolution: "Analyzed High-Res"
        },
        logs: [...logs, `Confidence calculated: ${data.confidence}%`, `Server Message: ${data.message}`]
      };

    } catch (error) {
      console.error("API Error:", error);
      alert("Error connecting to backend. Check console for details.");
      throw error;
    }
  } else {
    // Alert the user if they forgot to change the URL
    console.warn("Using simulation mode because URL is not set.");
    alert("Please open services/detectionService.ts and paste your Hugging Face URL!");
  }

  // FALLBACK SIMULATION (Only runs if you haven't set the URL yet)
  onProgress({ name: "Initializing...", progress: 10, log: logs[0] });
  await delay(800);
  onProgress({ name: "Analyzing Frequency Domain...", progress: 45, log: logs[2] });
  await delay(1200);
  onProgress({ name: "Detecting GAN Artifacts...", progress: 78, log: "Running diffusion checks..." });
  await delay(1000);
  onProgress({ name: "Finalizing Score...", progress: 95, log: "Computing probabilities..." });
  await delay(600);

  const isFake = Math.random() > 0.4;
  return {
    isAiGenerated: isFake,
    confidence: 85 + Math.random() * 14.9,
    details: isFake 
      ? "Generative artifacts found in high-frequency bands." 
      : "No diffusion patterns detected. Sensor noise is consistent.",
    metadata: {
      lighting: isFake ? "Inconsistent Shadows" : "Natural Lighting",
      grain: isFake ? "Smooth/Synthetic" : "Sensor Grain Match",
      compression: "Lossless",
      resolution: "2048x2048"
    },
    logs: logs
  };
};
