import React from 'react';

interface AdPlacementProps {
  id: string;
  className?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
}

export function AdPlacement({ id, className = '', format = 'auto' }: AdPlacementProps) {
  React.useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('Error loading ad:', err);
    }
  }, []);

  const getAdSize = () => {
    switch (format) {
      case 'horizontal':
        return { width: '728px', height: '90px' };
      case 'vertical':
        return { width: '160px', height: '600px' };
      case 'rectangle':
        return { width: '300px', height: '250px' };
      default:
        return { display: 'block' };
    }
  };

  return (
    <div className={`ad-placement ${className}`}>
      <ins
        className="adsbygoogle"
        style={getAdSize()}
        data-ad-client="ca-pub-8990270107417757"
        data-ad-slot={id}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}