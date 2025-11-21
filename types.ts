export interface PhotoMemory {
  id: string;
  file: File;
  previewUrl: string;
  base64: string;
  title?: string;
}

export interface GeneratedVideo {
  uri: string;
  prompt: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}