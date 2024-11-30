import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Book, Clock, User, Tag } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { AdPlacement } from '../components/AdPlacement';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  const { slug } = useParams();
  
  const post = slug ? blogPosts.find(p => p.slug === slug) : null;

  if (slug && !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Blog post not found</h2>
          <Link to="/blog" className="mt-4 text-indigo-600 hover:text-indigo-500">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  if (post) {
    return (
      <>
        <SEOHead
          title={`${post.title} - ColorMagic Blog`}
          description={post.excerpt}
          keywords={post.tags.join(', ')}
        />
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <article className="prose lg:prose-xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>
            <div className="mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            <div className="mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  <Tag className="w-4 h-4 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <AdPlacement id="blog-content-ad" className="my-8" />

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts
                .filter(p => p.slug !== post.slug)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                      />
                      <div className="p-6">
                        <h4 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="mt-2 text-gray-600">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="ColorMagic Blog - Color Theory and Design Insights"
        description="Explore articles about color theory, design principles, and practical tips for creating beautiful color palettes."
        keywords="color theory, design blog, color psychology, color accessibility, web design"
      />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Book className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">ColorMagic Blog</h1>
          <p className="mt-2 text-xl text-gray-600">
            Insights and inspiration for working with colors
          </p>
        </div>

        <AdPlacement id="blog-header-ad" className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}