import React, { useState, useEffect } from 'react';
import { Palette, Wand2, Book, Lightbulb, Compass, Sparkles } from 'lucide-react';
import { generatePalette } from '../utils/colorGenerator';
import { ColorCard } from '../components/ColorCard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const [text, setText] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (text) {
      setColors(generatePalette(text));
    }
  }, [text]);

  const colorTheoryGuide = [
    {
      title: 'Monochromatic',
      description: 'Different shades and tints of a single color',
      example: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe']
    },
    {
      title: 'Complementary',
      description: 'Colors opposite each other on the color wheel',
      example: ['#ef4444', '#fca5a5', '#ffffff', '#93c5fd', '#2563eb']
    },
    {
      title: 'Analogous',
      description: 'Colors adjacent to each other on the color wheel',
      example: ['#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Transform Text into Beautiful Colors
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-indigo-100 sm:text-2xl md:mt-5 md:max-w-3xl">
              Create stunning color palettes from any text, powered by AI
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Color Generator Section */}
        <section className="mb-16">
          <div className="relative max-w-xl mx-auto">
            <Wand2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter any text to generate a palette..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {colors.length > 0 && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[300px]">
                {colors.map((color, index) => (
                  <ColorCard key={color} color={color} index={index} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/image-extractor" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Compass className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Color Extractor</h3>
                <p className="text-gray-600">Extract beautiful color palettes from any image using AI technology</p>
              </div>
            </Link>
            <Link to="/random-palette" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Random Generator</h3>
                <p className="text-gray-600">Generate random, harmonious color combinations instantly</p>
              </div>
            </Link>
            <Link to="/" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Wand2 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Text to Color</h3>
                <p className="text-gray-600">Transform any text into a unique color palette</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Color Theory Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Color Theory Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {colorTheoryGuide.map((scheme) => (
              <div key={scheme.title} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{scheme.title}</h3>
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                <div className="grid grid-cols-5 gap-2 h-8">
                  {scheme.example.map((color) => (
                    <div
                      key={color}
                      className="rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Learn About Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-white p-6 rounded-lg shadow-md">
              <Book className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Color Psychology</h3>
              <p className="text-gray-600">
                Colors can significantly influence emotions and behavior. Understanding color psychology
                is crucial for creating effective designs that resonate with your audience.
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-md">
              <Lightbulb className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Color Accessibility</h3>
              <p className="text-gray-600">
                Learn how to create color combinations that are accessible to all users, including
                those with color vision deficiencies.
              </p>
            </article>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Start Creating Your Perfect Palette</h2>
          <p className="text-xl mb-8">Join our community of designers and creators today</p>
          <Link
            to="/signup"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200"
          >
            Get Started
          </Link>
        </section>
      </main>
    </div>
  );
}