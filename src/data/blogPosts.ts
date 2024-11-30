export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'color-psychology-in-design',
    title: 'The Psychology of Colors in Design',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    excerpt: 'Understanding how colors affect human emotions and behavior is crucial for creating effective designs.',
    content: `
      <h2>Understanding Color Psychology</h2>
      <p>Color psychology is the study of how colors affect human behavior and emotions. In design, understanding these psychological effects is crucial for creating impactful and effective visual experiences.</p>

      <h3>The Emotional Impact of Primary Colors</h3>
      <p>Red often evokes feelings of excitement, passion, and urgency. It's commonly used to grab attention and create a sense of immediacy.</p>
      <p>Blue typically represents trust, stability, and professionalism. It's a popular choice for corporate designs and websites that want to convey reliability.</p>
      <p>Yellow is associated with optimism, creativity, and warmth. It can be used to create a cheerful and energetic atmosphere.</p>

      <h3>Using Color Psychology in Design</h3>
      <p>When designing, consider the following aspects of color psychology:</p>
      <ul>
        <li>Cultural significance of colors</li>
        <li>Target audience preferences</li>
        <li>Industry standards and expectations</li>
        <li>Brand personality and values</li>
      </ul>

      <h2>Practical Applications</h2>
      <p>Understanding color psychology can help you:</p>
      <ul>
        <li>Create more effective call-to-action buttons</li>
        <li>Design more persuasive marketing materials</li>
        <li>Improve user experience on websites</li>
        <li>Develop stronger brand identities</li>
      </ul>
    `,
    coverImage: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Color Psychology', 'Design Theory', 'UX Design', 'Brand Identity']
  },
  {
    slug: 'color-accessibility-guide',
    title: 'A Complete Guide to Color Accessibility',
    author: 'Michael Chen',
    date: 'March 14, 2024',
    excerpt: 'Learn how to create color schemes that are accessible to all users, including those with color vision deficiencies.',
    content: `
      <h2>Why Color Accessibility Matters</h2>
      <p>Color accessibility ensures that your designs are usable by everyone, including the approximately 300 million people worldwide with color vision deficiency.</p>

      <h3>Key Principles of Color Accessibility</h3>
      <p>When designing for accessibility, consider these important principles:</p>
      <ul>
        <li>Maintain sufficient color contrast</li>
        <li>Never use color alone to convey information</li>
        <li>Provide alternative text for color-based information</li>
        <li>Test your designs with color blindness simulators</li>
      </ul>

      <h3>Color Contrast Guidelines</h3>
      <p>The Web Content Accessibility Guidelines (WCAG) provide specific requirements for color contrast:</p>
      <ul>
        <li>Normal text: minimum contrast ratio of 4.5:1</li>
        <li>Large text: minimum contrast ratio of 3:1</li>
        <li>UI components and graphical objects: minimum contrast ratio of 3:1</li>
      </ul>

      <h2>Tools for Testing Color Accessibility</h2>
      <p>Several tools can help you ensure your color choices are accessible:</p>
      <ul>
        <li>WebAIM Contrast Checker</li>
        <li>Colorable</li>
        <li>Stark</li>
        <li>Color Oracle</li>
      </ul>
    `,
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Accessibility', 'Web Design', 'Color Theory', 'WCAG']
  },
  {
    slug: 'color-trends-2024',
    title: 'Color Trends in 2024: What\'s Hot in Design',
    author: 'Emily Rodriguez',
    date: 'March 13, 2024',
    excerpt: 'Explore the latest color trends shaping design in 2024 and learn how to incorporate them into your projects.',
    content: `
      <h2>2024 Color Trends</h2>
      <p>This year's color trends reflect a blend of digital innovation and environmental consciousness, featuring both vibrant digital-inspired hues and nature-derived palettes.</p>

      <h3>Digital Neo-Mint</h3>
      <p>A fresh, futuristic shade that combines technology and nature. This color represents the growing intersection of digital and natural worlds.</p>

      <h3>Cosmic Purple</h3>
      <p>Deep, mysterious purples are making a comeback, inspired by space exploration and digital realms.</p>

      <h3>Earth Tones 2.0</h3>
      <p>Updated versions of classic earth tones, featuring richer, more sophisticated variations of browns, tans, and greens.</p>

      <h2>Applying Trends in Design</h2>
      <p>Tips for incorporating 2024 color trends:</p>
      <ul>
        <li>Use trending colors as accents</li>
        <li>Combine trends with timeless colors</li>
        <li>Consider your brand's personality</li>
        <li>Test color combinations thoroughly</li>
      </ul>
    `,
    coverImage: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Color Trends', '2024 Design', 'Creative Direction', 'Design Inspiration']
  }
];