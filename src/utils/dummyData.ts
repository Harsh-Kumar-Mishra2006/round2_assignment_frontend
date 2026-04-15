// Define Post type locally instead of importing
interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  likes: string[];
  comments?: any[];
  createdAt: string;
}

export const dummyPosts: Post[] = [
  {
    _id: '1',
    title: 'Getting Started with React and TypeScript',
    content: 'React and TypeScript are a powerful combination for building robust applications. Learn how to leverage TypeScript with React to build type-safe applications that are easier to maintain and debug.',
    author: { _id: 'dummy1', name: 'Sarah Johnson', email: 'sarah@example.com' },
    likes: ['user1', 'user2'],
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    _id: '2',
    title: 'The Beauty of Tailwind CSS',
    content: 'Tailwind CSS makes styling fun and efficient with its utility-first approach. No more context switching between CSS files and components. Build beautiful interfaces faster than ever before.',
    author: { _id: 'dummy2', name: 'Michael Chen', email: 'michael@example.com' },
    likes: ['user3'],
    createdAt: new Date('2024-01-12').toISOString(),
  },
  {
    _id: '3',
    title: 'Understanding JWT Authentication',
    content: 'JSON Web Tokens are the backbone of modern web authentication. Learn how JWT works, how to implement it securely, and best practices for token storage and refresh mechanisms.',
    author: { _id: 'dummy3', name: 'Emily Rodriguez', email: 'emily@example.com' },
    likes: ['user1', 'user4', 'user5'],
    createdAt: new Date('2024-01-14').toISOString(),
  },
  {
    _id: '4',
    title: 'Mastering MongoDB Aggregation',
    content: 'Aggregation pipelines in MongoDB allow complex data processing and analysis. Learn how to use stages like $match, $group, $project, and $lookup for powerful data transformations.',
    author: { _id: 'dummy1', name: 'Sarah Johnson', email: 'sarah@example.com' },
    likes: [],
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    _id: '5',
    title: '10 Tips for Better UI Design',
    content: 'Great design is about solving problems and creating delightful experiences. Discover 10 actionable tips to improve your UI design skills and create more engaging user interfaces.',
    author: { _id: 'dummy4', name: 'David Kim', email: 'david@example.com' },
    likes: ['user2', 'user3', 'user4'],
    createdAt: new Date('2024-01-16').toISOString(),
  },
  {
    _id: '6',
    title: 'Introduction to Node.js Streams',
    content: 'Streams in Node.js help handle large amounts of data efficiently without loading everything into memory. Learn how to use readable, writable, and transform streams for optimal performance.',
    author: { _id: 'dummy5', name: 'Lisa Wang', email: 'lisa@example.com' },
    likes: ['user1'],
    createdAt: new Date('2024-01-17').toISOString(),
  },
  {
    _id: '7',
    title: 'Building RESTful APIs Best Practices',
    content: 'Follow these best practices to create scalable and maintainable RESTful APIs. Learn about proper HTTP methods, status codes, versioning, documentation, and error handling.',
    author: { _id: 'dummy2', name: 'Michael Chen', email: 'michael@example.com' },
    likes: ['user5', 'user6'],
    createdAt: new Date('2024-01-18').toISOString(),
  },
  {
    _id: '8',
    title: 'The Future of Web Development',
    content: 'Explore emerging trends and technologies shaping the future of web development. From WebAssembly to Edge Computing, discover what\'s next for the web platform.',
    author: { _id: 'dummy3', name: 'Emily Rodriguez', email: 'emily@example.com' },
    likes: ['user1', 'user2', 'user3', 'user4'],
    createdAt: new Date('2024-01-19').toISOString(),
  },
  {
    _id: '9',
    title: 'State Management in React: Context vs Redux',
    content: 'Choosing the right state management solution for your React application can be challenging. Compare Context API and Redux to understand when to use each approach.',
    author: { _id: 'dummy4', name: 'David Kim', email: 'david@example.com' },
    likes: ['user2', 'user5'],
    createdAt: new Date('2024-01-20').toISOString(),
  },
  {
    _id: '10',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    content: 'Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Learn when to use Grid for 2D layouts and Flexbox for 1D arrangements.',
    author: { _id: 'dummy5', name: 'Lisa Wang', email: 'lisa@example.com' },
    likes: ['user1', 'user3', 'user4'],
    createdAt: new Date('2024-01-21').toISOString(),
  },
  {
    _id: '11',
    title: 'Introduction to GraphQL',
    content: 'GraphQL is a query language for APIs that allows clients to request exactly the data they need. Learn the basics of schemas, queries, mutations, and subscriptions.',
    author: { _id: 'dummy1', name: 'Sarah Johnson', email: 'sarah@example.com' },
    likes: ['user2', 'user4', 'user6'],
    createdAt: new Date('2024-01-22').toISOString(),
  },
  {
    _id: '12',
    title: 'Debugging JavaScript Like a Pro',
    content: 'Master the art of debugging JavaScript applications. Learn to use browser devtools, breakpoints, console methods, and advanced debugging techniques.',
    author: { _id: 'dummy2', name: 'Michael Chen', email: 'michael@example.com' },
    likes: ['user1', 'user5'],
    createdAt: new Date('2024-01-23').toISOString(),
  },
  {
    _id: '13',
    title: 'Responsive Design with Tailwind CSS',
    content: 'Build responsive websites effortlessly with Tailwind CSS. Learn how to use breakpoints, responsive utilities, and mobile-first design principles.',
    author: { _id: 'dummy3', name: 'Emily Rodriguez', email: 'emily@example.com' },
    likes: ['user2', 'user3', 'user4', 'user5'],
    createdAt: new Date('2024-01-24').toISOString(),
  },
  {
    _id: '14',
    title: 'Security Best Practices for Web Apps',
    content: 'Protect your web applications from common vulnerabilities. Learn about XSS, CSRF, SQL injection, and how to implement proper security measures.',
    author: { _id: 'dummy4', name: 'David Kim', email: 'david@example.com' },
    likes: ['user1', 'user6'],
    createdAt: new Date('2024-01-25').toISOString(),
  },
  {
    _id: '15',
    title: 'Performance Optimization in React',
    content: 'Make your React applications faster with these performance optimization techniques. Learn about memoization, code splitting, lazy loading, and virtual scrolling.',
    author: { _id: 'dummy5', name: 'Lisa Wang', email: 'lisa@example.com' },
    likes: ['user3', 'user4'],
    createdAt: new Date('2024-01-26').toISOString(),
  },
];