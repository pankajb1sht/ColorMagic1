import React from 'react';

interface AdPlacementProps {
  id: string;
  className?: string;
}

export function AdPlacement({ id, className = '' }: AdPlacementProps) {
  React.useEffect(() => {
    // Initialize ad after component mounts
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('Error loading ad:', err);
    }
  }, []);

  return (
    <div className={`ad-placement ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_AD_CLIENT_ID"
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}