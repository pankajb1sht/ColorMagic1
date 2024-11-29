import React from 'react';

interface ContentSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ title, description, children, className = '' }: ContentSectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {description && (
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}