export class AppConfig {
  // Server Side
  public static readonly HF_INFERENCE_API_BASE_URL =
    process.env.HF_INFERENCE_API_BASE_URL;
  public static readonly HF_INFERENCE_API_KEY =
    process.env.HF_INFERENCE_API_KEY;
}
