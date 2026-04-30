import React from "react";

const BlogPreview = () => {
  const blogs = [
    {
      title: "10 Tips for Minimalist Living Room Design",
      excerpt: "Discover how to create a clean, uncluttered space that still feels warm and inviting.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      date: "Oct 12, 2026",
      category: "Interior Design"
    },
    {
      title: "Choosing the Right Fabric for Your Sofa",
      excerpt: "A comprehensive guide to selecting durable and beautiful fabrics for your everyday furniture.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      date: "Sep 28, 2026",
      category: "Buying Guide"
    },
    {
      title: "The Return of Mid-Century Modern",
      excerpt: "Why this timeless aesthetic is making a massive comeback in contemporary homes.",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      date: "Sep 15, 2026",
      category: "Trends"
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="blog">
      <div className="flex justify-between items-end mb-12">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Design Inspiration
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            Tips, trends, and inspiration from our interior design experts.
          </p>
        </div>
        <button className="hidden md:flex btn btn-outline border-base-300 hover:bg-base-200 hover:text-base-content hover:border-base-300">
          Read All Articles
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="card bg-base-100 border border-base-200 overflow-hidden group cursor-pointer">
            <figure className="aspect-[4/3] overflow-hidden relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="badge badge-primary font-bold shadow-md">{blog.category}</span>
              </div>
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </figure>
            <div className="card-body p-6">
              <p className="text-sm text-base-content/50 font-medium mb-1">{blog.date}</p>
              <h3 className="card-title text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-base-content/70 line-clamp-2">{blog.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <button className="btn btn-outline border-base-300 w-full">Read All Articles</button>
      </div>
    </section>
  );
};

export default BlogPreview;
