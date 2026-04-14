export type FileStatus = "idle" | "converting" | "success" | "error";

export interface FileItem {
  id: string;
  file: File;
  previewUrl: string | null;
  status: FileStatus;
  progress: number;
  formatOut: string;
}

export interface WorkerMessage {
  id: string;
  progress?: number;
  status?: FileStatus;
}
