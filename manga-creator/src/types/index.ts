export interface MangaPanel {
  id: string;
  imageUrl: string;
  text: string;
}

export interface PreviewImage {
  id: string;
  file: File;
  previewUrl: string;
}

export type View = 'upload' | 'preview';
