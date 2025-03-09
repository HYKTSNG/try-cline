import { useState } from 'react';
import { MangaPanel, View } from './types';
import UploadScreen from './components/UploadScreen';
import PreviewScreen from './components/PreviewScreen';

function App() {
  const [currentView, setCurrentView] = useState<View>('upload');
  const [panels, setPanels] = useState<MangaPanel[]>([]);

  // Panel management functions
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

  const addPanels = (newPanels: MangaPanel[]) => {
    setPanels([...panels, ...newPanels]);
  };

  // Navigation functions
  const goToUploadScreen = () => setCurrentView('upload');
  const goToPreviewScreen = () => setCurrentView('preview');

  // Render the current view
  return currentView === 'upload' ? (
    <UploadScreen 
      panels={panels}
      onGoToPreview={goToPreviewScreen}
      onUpdatePanelText={updatePanelText}
      onRemovePanel={removePanel}
      onMovePanelUp={movePanelUp}
      onMovePanelDown={movePanelDown}
      onAddPanels={addPanels}
    />
  ) : (
    <PreviewScreen 
      panels={panels}
      onGoToUpload={goToUploadScreen}
    />
  );
}

export default App;
