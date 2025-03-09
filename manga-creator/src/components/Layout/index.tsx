import { ReactNode } from 'react';
import Button from '../Button';

interface LayoutProps {
  title: string;
  actionButtonText: string;
  onActionButtonClick: () => void;
  actionButtonDisabled?: boolean;
  actionButtonVariant?: 'primary' | 'secondary';
  children: ReactNode;
}

const Layout = ({
  title,
  actionButtonText,
  onActionButtonClick,
  actionButtonDisabled = false,
  actionButtonVariant = 'primary',
  children
}: LayoutProps) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">マンガクリエーター</h1>
      
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Button 
          onClick={onActionButtonClick}
          disabled={actionButtonDisabled}
          variant={actionButtonVariant}
        >
          {actionButtonText}
        </Button>
      </div>
      
      {children}
    </div>
  );
};

export default Layout;
