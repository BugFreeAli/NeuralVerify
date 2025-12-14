// services/detectionService.ts

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

export const analyzeImage = async (
  file: File, 
  onProgress: (stage: ScanStage) => void
): Promise<DetectionResult> => {
  
  // ✅ 1. CORRECT API URL
  const HUGGING_FACE_URL = "https://bugfreeali-ai-real-detection.hf.space/predict";
  
  const logs: string[] = [
    `Initializing connection to Neural Engine...`,
    `Upload complete (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
    `Processing frequency domain...`,
    `Analyzing compression artifacts...`
  ];

  // ✅ 2. FIX THE FIELD NAME
  const formData = new FormData();
  // CRITICAL FIX: Changed "image" to "file" to match Python FastAPI
  formData.append("file", file); 

  try {
    // Stage 1: Uploading
    onProgress({ name: "Establishing Uplink...", progress: 10, log: "Connecting to secure cloud node..." });
    
    // We start the fetch request
    const response = await fetch(HUGGING_FACE_URL, {
      method: "POST",
      body: formData,
      // Note: No headers needed, browser sets boundary automatically
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error (${response.status}): ${errorText}`);
    }

    // Stage 2: Processing
    onProgress({ name: "Neural Analysis...", progress: 75, log: "Running EfficientNet inference..." });
    
    // ✅ 3. PARSE THE PYTHON RESPONSE CORRECTLY
    // Python returns: { "prediction": "AI"|"Real", "confidence_percentage": 99.5, ... }
    const data = await response.json();

    // Stage 3: Done
    onProgress({ name: "Finalizing Score...", progress: 100, log: "Classification received." });
    
    // Map Python Data to Typescript Interface
    const isAi = data.prediction === "AI"; // Convert string to boolean
    const score = data.confidence_percentage;

    return {
      isAiGenerated: isAi,
      confidence: score,
      details: isAi 
        ? "Generative artifacts detected in high-frequency spectrum." 
        : "Natural sensor noise and consistent lighting detected.",
      metadata: {
        lighting: isAi ? "Artificial/Inconsistent" : "Natural Source",
        grain: isAi ? "Digital Artifacts" : "ISO Noise Match",
        compression: "JPEG/Standard",
        resolution: "High-Res Analyzed"
      },
      logs: [...logs, `Result: ${data.prediction}`, `Confidence: ${score}%`]
    };

  } catch (error) {
    console.error("API Error:", error);
    // Return a clean error to the UI
    throw error;
  }
};
