import { ChangeEvent } from 'react';
import { MangaPanel as MangaPanelType } from '../../types';
import Button from '../Button';

interface MangaPanelProps {
  panel: MangaPanelType;
  index: number;
  isLast: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (id: string) => void;
  onTextChange: (id: string, text: string) => void;
}

const MangaPanel = ({
  panel,
  index,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
  onTextChange
}: MangaPanelProps) => {
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(panel.id, e.target.value);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="font-medium">パネル {index + 1}</span>
        <div className="space-x-2">
          <Button 
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            className="px-2 py-1 bg-gray-700"
            variant="primary"
          >
            ↑
          </Button>
          <Button 
            onClick={() => onMoveDown(index)}
            disabled={isLast}
            className="px-2 py-1 bg-gray-700"
            variant="primary"
          >
            ↓
          </Button>
          <Button 
            onClick={() => onRemove(panel.id)}
            className="px-2 py-1"
            variant="danger"
          >
            削除
          </Button>
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
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};

export default MangaPanel;
