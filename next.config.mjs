/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/api/todos/route.js", 
          destination: "http://localhost:8080/todos", 
        },
      ];
    },
  };
  
  export default nextConfig;