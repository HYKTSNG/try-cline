import { PreviewImage as PreviewImageType } from '../../types';
import Button from '../Button';

interface PreviewImageProps {
  image: PreviewImageType;
  index: number;
  isLast: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (id: string) => void;
}

const PreviewImage = ({
  image,
  index,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove
}: PreviewImageProps) => {
  return (
    <div className="flex bg-gray-700 rounded-lg overflow-hidden">
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
        <Button 
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
          className="px-2 py-1 bg-gray-600"
          variant="primary"
          title="上に移動"
        >
          ↑
        </Button>
        <Button 
          onClick={() => onMoveDown(index)}
          disabled={isLast}
          className="px-2 py-1 bg-gray-600"
          variant="primary"
          title="下に移動"
        >
          ↓
        </Button>
        <Button
          onClick={() => onRemove(image.id)}
          className="px-2 py-1"
          variant="danger"
          title="削除"
        >
          ×
        </Button>
      </div>
    </div>
  );
};

export default PreviewImage;
