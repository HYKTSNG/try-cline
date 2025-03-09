import { useState, useRef, ChangeEvent } from 'react';
import { MangaPanel as MangaPanelType, PreviewImage as PreviewImageType } from '../../types';
import Layout from '../Layout';
import MangaPanel from '../MangaPanel';
import PreviewImage from '../PreviewImage';
import Button from '../Button';

interface UploadScreenProps {
  panels: MangaPanelType[];
  onGoToPreview: () => void;
  onUpdatePanelText: (id: string, text: string) => void;
  onRemovePanel: (id: string) => void;
  onMovePanelUp: (index: number) => void;
  onMovePanelDown: (index: number) => void;
  onAddPanels: (newPanels: MangaPanelType[]) => void;
}

const UploadScreen = ({
  panels,
  onGoToPreview,
  onUpdatePanelText,
  onRemovePanel,
  onMovePanelUp,
  onMovePanelDown,
  onAddPanels
}: UploadScreenProps) => {
  const [currentText, setCurrentText] = useState('');
  const [previewImages, setPreviewImages] = useState<PreviewImageType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Create preview images
    const newPreviewImages: PreviewImageType[] = Array.from(e.target.files).map((file, index) => ({
      id: `preview-${Date.now()}-${index}`,
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    
    setPreviewImages(newPreviewImages);
  };
  
  const handleAddSelectedImages = () => {
    if (previewImages.length === 0) return;
    
    // Create new panels from preview images
    const newPanels: MangaPanelType[] = previewImages.map((preview, index) => ({
      id: `panel-${Date.now()}-${index}`,
      imageUrl: preview.previewUrl,
      text: index === 0 ? currentText : ''
    }));
    
    // Add all new panels to the existing panels
    onAddPanels(newPanels);
    
    // Clear preview and text
    setPreviewImages([]);
    setCurrentText('');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const removePreviewImage = (id: string) => {
    setPreviewImages(previewImages.filter(image => image.id !== id));
  };
  
  const movePreviewImageUp = (index: number) => {
    if (index === 0) return;
    const newPreviewImages = [...previewImages];
    [newPreviewImages[index], newPreviewImages[index - 1]] = [newPreviewImages[index - 1], newPreviewImages[index]];
    setPreviewImages(newPreviewImages);
  };
  
  const movePreviewImageDown = (index: number) => {
    if (index === previewImages.length - 1) return;
    const newPreviewImages = [...previewImages];
    [newPreviewImages[index], newPreviewImages[index + 1]] = [newPreviewImages[index + 1], newPreviewImages[index]];
    setPreviewImages(newPreviewImages);
  };

  return (
    <Layout
      title="画像アップロード"
      actionButtonText="プレビュー画面へ"
      onActionButtonClick={onGoToPreview}
      actionButtonDisabled={panels.length === 0}
      actionButtonVariant="secondary"
    >
      <div className="mb-8 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">新しいパネルを追加</h2>
        
        <div className="mb-4">
          <label className="block mb-2">セリフ/テキスト (オプション):</label>
          <textarea 
            className="w-full p-2 bg-gray-700 rounded text-white"
            rows={3}
            value={currentText}
            onChange={handleTextChange}
            placeholder="セリフやテキストを入力してください..."
          />
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              ref={fileInputRef}
              className="hidden"
              id="image-upload"
            />
            <label 
              htmlFor="image-upload"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
            >
              画像を選択（複数可）
            </label>
          </div>
          
          {previewImages.length > 0 && (
            <div className="w-full mt-4">
              <h3 className="text-lg font-medium mb-2">選択された画像 ({previewImages.length}枚)</h3>
              
              <div className="space-y-4 mb-4">
                {previewImages.map((image, index) => (
                  <PreviewImage
                    key={image.id}
                    image={image}
                    index={index}
                    isLast={index === previewImages.length - 1}
                    onMoveUp={movePreviewImageUp}
                    onMoveDown={movePreviewImageDown}
                    onRemove={removePreviewImage}
                  />
                ))}
              </div>
              
              <Button
                onClick={handleAddSelectedImages}
                className="w-full py-2"
                variant="success"
              >
                選択した画像をマンガに追加
              </Button>
            </div>
          )}
        </div>
      </div>

      {panels.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">パネル編集</h2>
          
          <div className="space-y-6">
            {panels.map((panel, index) => (
              <MangaPanel
                key={panel.id}
                panel={panel}
                index={index}
                isLast={index === panels.length - 1}
                onMoveUp={onMovePanelUp}
                onMoveDown={onMovePanelDown}
                onRemove={onRemovePanel}
                onTextChange={onUpdatePanelText}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UploadScreen;
