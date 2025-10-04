const ShaderBackground = () => {
  return (
    <>
      {/* Black base background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated wave layers - visible against black */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wave 1 - Purple */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.7) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
            animation: 'wave1 8s ease-in-out infinite',
          }}
        />
        
        {/* Wave 2 - Blue */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            background: 'linear-gradient(-45deg, transparent 30%, rgba(59, 130, 246, 0.7) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
            animation: 'wave2 12s ease-in-out infinite',
          }}
        />
        
        {/* Wave 3 - Violet */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent 30%, rgba(167, 139, 250, 0.6) 50%, transparent 70%)',
            backgroundSize: '300% 300%',
            animation: 'wave3 15s ease-in-out infinite',
          }}
        />
      </div>

      {/* Pulsing orbs for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)',
            animation: 'float1 10s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-1/3 right-0 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
            animation: 'float2 14s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.8) 0%, transparent 70%)',
            animation: 'float3 12s ease-in-out infinite',
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <style>{`
        @keyframes wave1 {
          0%, 100% {
            background-position: 0% 50%;
            transform: translateY(0) scale(1);
          }
          50% {
            background-position: 100% 50%;
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes wave2 {
          0%, 100% {
            background-position: 100% 50%;
            transform: translateX(0) scale(1);
          }
          50% {
            background-position: 0% 50%;
            transform: translateX(20px) scale(1.05);
          }
        }
        
        @keyframes wave3 {
          0%, 100% {
            background-position: 50% 0%;
            transform: rotate(0deg);
          }
          50% {
            background-position: 50% 100%;
            transform: rotate(2deg);
          }
        }
        
        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
        
        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(1.05);
          }
          66% {
            transform: translate(20px, -20px) scale(0.9);
          }
        }
        
        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -40px) scale(1.1);
          }
        }
      `}</style>
    </>
  );
};

export default ShaderBackground;
