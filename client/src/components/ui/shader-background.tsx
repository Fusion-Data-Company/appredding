const ShaderBackground = () => {
  return (
    <>
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900 via-blue-900 to-black animate-gradient-shift" />
      
      {/* Animated waves overlay */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-blue-600/40 to-purple-600/40"
          style={{
            backgroundSize: '200% 200%',
            animation: 'wave 15s ease infinite',
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-l from-blue-600/30 via-purple-600/30 to-blue-600/30"
          style={{
            backgroundSize: '200% 200%',
            animation: 'wave 20s ease-in-out infinite',
            animationDelay: '-5s',
          }}
        />
      </div>

      {/* Radial gradient accents */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Add custom keyframes in style tag */}
      <style>{`
        @keyframes wave {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }
      `}</style>
    </>
  );
};

export default ShaderBackground;
