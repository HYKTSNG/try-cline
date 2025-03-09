import { MangaPanel as MangaPanelType } from '../../types';
import Layout from '../Layout';

interface PreviewScreenProps {
  panels: MangaPanelType[];
  onGoToUpload: () => void;
}

const PreviewScreen = ({ panels, onGoToUpload }: PreviewScreenProps) => {
  return (
    <Layout
      title="プレビュー"
      actionButtonText="編集画面に戻る"
      onActionButtonClick={onGoToUpload}
      actionButtonVariant="primary"
    >
      {panels.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="max-w-2xl mx-auto">
            {panels.map((panel, index) => (
              <div key={panel.id} className="mb-6 relative">
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
      ) : (
        <div className="text-center p-12 bg-gray-800 rounded-lg">
          <p className="text-xl">まだパネルがありません。編集画面に戻って画像を追加してください。</p>
        </div>
      )}
    </Layout>
  );
};

export default PreviewScreen;
