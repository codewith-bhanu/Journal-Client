export interface AudioRecorderOptions {
  onDataAvailable?: (event: BlobEvent) => void;
  onAnalyser?: (analyser: AnalyserNode) => void;
  mimeType?: string;
}

const MIME_TYPE_CANDIDATES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
];

export function getSupportedMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  return MIME_TYPE_CANDIDATES.find((mime) => MediaRecorder.isTypeSupported(mime)) ?? "";
}

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private chunks: Blob[] = [];
  private mimeType = "";
  private stopped = false;

  constructor(private options: AudioRecorderOptions = {}) {}

  get state(): string {
    return this.mediaRecorder?.state ?? "inactive";
  }

  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  getMimeType(): string {
    return this.mimeType;
  }

  async start(): Promise<void> {
    this.stopped = false;
    this.chunks = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.stream = stream;

    this.setupAnalyser(stream);

    const mimeType = this.options.mimeType ?? getSupportedMimeType();
    this.mimeType = mimeType;
    const mediaRecorder = new MediaRecorder(
      stream,
      mimeType ? { mimeType } : undefined,
    );
    this.mediaRecorder = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.chunks.push(event.data);
        this.options.onDataAvailable?.(event);
      }
    };

    mediaRecorder.start(250);
  }

  pause(): void {
    this.mediaRecorder?.pause();
  }

  resume(): void {
    this.mediaRecorder?.resume();
  }

  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      const recorder = this.mediaRecorder;
      if (!recorder || recorder.state === "inactive" || this.stopped) {
        this.cleanup();
        resolve(new Blob([], { type: this.mimeType }));
        return;
      }
      this.stopped = true;
      recorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: this.mimeType });
        this.cleanup();
        resolve(blob);
      };
      recorder.stop();
    });
  }

  private setupAnalyser(stream: MediaStream): void {
    try {
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return;
      const audioContext = new Ctx();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      this.audioContext = audioContext;
      this.analyser = analyser;
      this.options.onAnalyser?.(analyser);
    } catch {
      this.audioContext = null;
      this.analyser = null;
    }
  }

  private cleanup(): void {
    this.mediaRecorder = null;
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.audioContext && this.audioContext.state !== "closed") {
      void this.audioContext.close().catch(() => {});
    }
    this.audioContext = null;
    this.analyser = null;
  }
}