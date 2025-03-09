import { useState, useRef, ChangeEvent } from 'react'

interface MangaPanel {
  id: string;
  imageUrl: string;
  text: string;
}

interface PreviewImage {
  id: string;
  file: File;
  previewUrl: string;
}

function App() {
  const [panels, setPanels] = useState<MangaPanel[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Create preview images
    const newPreviewImages: PreviewImage[] = Array.from(e.target.files).map((file, index) => ({
      id: `preview-${Date.now()}-${index}`,
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    
    setPreviewImages(newPreviewImages);
  };
  
  const handleAddSelectedImages = () => {
    if (previewImages.length === 0) return;
    
    // Create new panels from preview images
    const newPanels: MangaPanel[] = previewImages.map((preview, index) => ({
      id: `panel-${Date.now()}-${index}`,
      imageUrl: preview.previewUrl,
      text: index === 0 ? currentText : ''
    }));
    
    // Add all new panels to the existing panels
    setPanels([...panels, ...newPanels]);
    
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

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value);
  };

  const updatePanelText = (id: string, text: string) => {
    setPanels(panels.map(panel => 
      panel.id === id ? { ...panel, text } : panel
    ));
  };

  const removePanel = (id: string) => {
    setPanels(panels.filter(panel => panel.id !== id));
  };

  const movePanelUp = (index: number) => {
    if (index === 0) return;
    const newPanels = [...panels];
    [newPanels[index], newPanels[index - 1]] = [newPanels[index - 1], newPanels[index]];
    setPanels(newPanels);
  };

  const movePanelDown = (index: number) => {
    if (index === panels.length - 1) return;
    const newPanels = [...panels];
    [newPanels[index], newPanels[index + 1]] = [newPanels[index + 1], newPanels[index]];
    setPanels(newPanels);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">マンガクリエーター</h1>
      
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
                  <div key={image.id} className="flex bg-gray-700 rounded-lg overflow-hidden">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={image.previewUrl} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow p-2 flex items-center">
                      <span className="text-sm font-medium">画像 {index + 1}</span>
                    </div>
                    <div className="p-2 flex items-center space-x-1">
                      <button 
                        onClick={() => movePreviewImageUp(index)}
                        disabled={index === 0}
                        className="px-2 py-1 bg-gray-600 rounded disabled:opacity-50"
                        title="上に移動"
                      >
                        ↑
                      </button>
                      <button 
                        onClick={() => movePreviewImageDown(index)}
                        disabled={index === previewImages.length - 1}
                        className="px-2 py-1 bg-gray-600 rounded disabled:opacity-50"
                        title="下に移動"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removePreviewImage(image.id)}
                        className="px-2 py-1 bg-red-600 rounded"
                        title="削除"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleAddSelectedImages}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                選択した画像をマンガに追加
              </button>
            </div>
          )}
        </div>
      </div>

      {panels.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">パネル編集</h2>
          
          <div className="space-y-6">
            {panels.map((panel, index) => (
              <div key={panel.id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">パネル {index + 1}</span>
                  <div className="space-x-2">
                    <button 
                      onClick={() => movePanelUp(index)}
                      disabled={index === 0}
                      className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button 
                      onClick={() => movePanelDown(index)}
                      disabled={index === panels.length - 1}
                      className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                    >
                      ↓
                    </button>
                    <button 
                      onClick={() => removePanel(panel.id)}
                      className="px-2 py-1 bg-red-600 rounded"
                    >
                      削除
                    </button>
                  </div>
                </div>
                
                <div className="mb-2">
                  <img 
                    src={panel.imageUrl} 
                    alt={`Panel ${index + 1}`} 
                    className="max-w-full h-auto rounded"
                  />
                </div>
                
                <div>
                  <label className="block mb-1">セリフ/テキスト:</label>
                  <textarea 
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    rows={2}
                    value={panel.text}
                    onChange={(e) => updatePanelText(panel.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {panels.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">プレビュー</h2>
          <div className="bg-white p-4 rounded-lg">
            <div className="max-w-2xl mx-auto">
              {panels.map((panel, index) => (
                <div key={panel.id} className="mb-4 relative">
                  <img 
                    src={panel.imageUrl} 
                    alt={`Panel ${index + 1}`} 
                    className="w-full h-auto"
                  />
                  {panel.text && (
                    <div className="absolute top-4 right-4 max-w-[70%] bg-white text-black p-3 rounded-lg border-2 border-black">
                      {panel.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
