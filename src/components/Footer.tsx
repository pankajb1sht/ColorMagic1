import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Twitter, Linkedin, Mail, Instagram, Share2, Globe } from 'lucide-react';

export function Footer() {
  const { t, i18n } = useTranslation();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ];

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent('Check out this amazing color palette generator!');

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${shareTitle}&body=${shareUrl}`
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: `https://www.instagram.com/`
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('navigation')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
                  {t('explore')}
                </Link>
              </li>
              <li>
                <Link to="/image-extractor" className="text-base text-gray-500 hover:text-gray-900">
                  {t('aiColorExtractor')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('tools')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
                  {t('textToColor')}
                </Link>
              </li>
              <li>
                <Link to="/image-extractor" className="text-base text-gray-500 hover:text-gray-900">
                  {t('imageExtractor')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Share */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('share')}
            </h3>
            <div className="mt-4 flex space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {t('language')}
            </h3>
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Embed Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            {t('embedPalette')}
          </h3>
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                readOnly
                value={`<a href="${window.location.href}" target="_blank" rel="dofollow">Generated with TextToColor</a>`}
                className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`<a href="${window.location.href}" target="_blank" rel="dofollow">Generated with TextToColor</a>`);
                  toast.success(t('codeCopied'));
                }}
                className="absolute inset-y-0 right-0 px-3 flex items-center bg-gray-50 rounded-r-md border-l hover:bg-gray-100"
              >
                <Share2 className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} TextToColor. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}