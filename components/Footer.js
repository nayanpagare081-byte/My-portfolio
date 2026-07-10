export default function Footer({ data }) {
  const currentYear = new Date().getFullYear();
  const links = data?.socialLinks ? Object.entries(data.socialLinks) : [];
  
  return (
    <footer className="w-full border-t border-[#222] bg-[#050505] py-8">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#a0a0a0] text-sm text-center md:text-left">
          © {currentYear} {data?.name || "Nayan Pagare"}. All rights reserved.
        </p>
        <div className="flex gap-6">
          {links.map(([key, url], i) => {
            const href = key === 'email' && url.includes('@') && !url.startsWith('http') && !url.startsWith('mailto:') 
              ? `mailto:${url}` 
              : url;
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-[#a0a0a0] hover:text-primary-green transition-colors text-sm font-medium capitalize">
                {key}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
