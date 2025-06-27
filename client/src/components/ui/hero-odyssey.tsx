import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ElasticHueSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

const ElasticHueSlider: React.FC<ElasticHueSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 360,
  step = 1,
  label = 'Adjust Hue',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const progress = ((value - min) / (max - min));
  const thumbPosition = progress * 100; // Percentage

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative w-full max-w-sm flex flex-col items-center p-4 bg-black/20 rounded-lg backdrop-blur-sm border border-white/10" ref={sliderRef}>
      {label && <label htmlFor="hue-slider-native" className="text-white text-sm mb-2 font-medium tracking-wide">{label}</label>}
      <div className="relative w-full h-5 flex items-center">
        <input
          id="hue-slider-native"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-20"
          style={{ WebkitAppearance: 'none' }}
        />

        <div className="absolute left-0 w-full h-1 bg-gray-700 rounded-full z-0"></div>

        <div
            className="absolute left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-10 transition-all duration-200"
            style={{ 
              width: `${thumbPosition}%`,
              filter: `hue-rotate(${value}deg)`
            }}
        ></div>

        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-30 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-500"
          style={{ 
            left: `${thumbPosition}%`,
            borderColor: `hsl(${value}, 70%, 60%)`
          }}
          animate={{ scale: isDragging ? 1.3 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: isDragging ? 20 : 30 }}
        >
          <div 
            className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full m-auto mt-0.5"
            style={{ filter: `hue-rotate(${value}deg)` }}
          ></div>
        </motion.div>
      </div>

       <div className="text-sm text-white/80 mt-3 font-mono">
         {value}°
       </div>
    </div>
  );
};

interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
}

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.8, 0.9));
          vec3 glowColor = hsv2rgb(vec3(uHue / 360.0, 0.4, 0.6));
          
          // Enhanced glow/mist effect
          float glowRadius = 0.15;
          float mistEffect = exp(-dist * 8.0) * 0.3;
          float coreIntensity = pow(mix(0.0, 0.12, hash11(iTime * uSpeed)) / dist, 1.0);
          
          vec3 col = baseColor * coreIntensity * uIntensity + glowColor * mistEffect;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (
      source: string,
      type: number
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");

    const startTime = performance.now();
    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      const currentTime = performance.now();
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
      gl.uniform1f(uHueLocation, hue);
      gl.uniform1f(uXOffsetLocation, xOffset);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, intensity);
      gl.uniform1f(uSizeLocation, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className="w-full h-full relative" />;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position }) => {
  return (
    <div className={`absolute ${position} z-10 group transition-all duration-300 hover:scale-110`}>
      <div className="flex items-center gap-2 relative">
        <div className="relative">
          <div className="w-2 h-2 bg-white rounded-full group-hover:animate-pulse"></div>
          <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className=" text-white relative">
          <div className="font-medium group-hover:text-white transition-colors duration-300">{name}</div>
          <div className="text-white/70 text-sm group-hover:text-white/70 transition-colors duration-300">{value}</div>
          <div className="absolute -inset-2 bg-white/10 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  // Interactive hue control state
  const [hue, setHue] = useState(230);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* Interactive Lightning Effects */}
      <div className="absolute inset-0 z-10">
        <Lightning 
          hue={hue} 
          xOffset={-0.3} 
          speed={0.8} 
          intensity={1.2} 
          size={1.5}
        />
        <Lightning 
          hue={hue + 30} 
          xOffset={0.3} 
          speed={1.2} 
          intensity={0.8} 
          size={1.2}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-screen">
        {/* Interactive Controls */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center justify-center h-full"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
              PRAETORIAN
            </h1>
            <p className="text-xl md:text-2xl text-center text-gray-300 mb-8">
              Advanced Energy Solutions
            </p>
          </motion.div>

          {/* Interactive Hue Slider */}
          <motion.div variants={itemVariants} className="mb-12">
            <ElasticHueSlider
              value={hue}
              onChange={setHue}
              label="Adjust Hue"
            />
          </motion.div>

          {/* Feature Points */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FeatureItem 
              name="Fire Protection" 
              value="Class A Rating" 
              position="relative"
            />
            <FeatureItem 
              name="Energy Efficiency" 
              value="40% Reduction" 
              position="relative"
            />
            <FeatureItem 
              name="Thermal Barrier" 
              value="Advanced Ceramic" 
              position="relative"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Dynamic Brand Element */}
      <motion.div 
        className="absolute top-8 right-8 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div 
          className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full w-20 h-20 flex items-center justify-center text-white font-bold text-sm shadow-lg"
          style={{ 
            filter: `hue-rotate(${hue - 45}deg)`,
            transition: 'filter 0.3s ease'
          }}
        >
          APR
        </div>
      </motion.div>



      {/* Dynamic Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute top-[55%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-b from-blue-400/30 to-purple-500/20 blur-[100px]"
          style={{ 
            filter: `hue-rotate(${hue}deg)`,
            transition: 'filter 0.5s ease'
          }}
        ></div>
        <div 
          className="absolute top-0 w-[100%] left-[40%] transform -translate-x-1/2 h-full bg-gradient-to-b from-yellow-400/10 to-orange-400/10"
          style={{ 
            filter: `hue-rotate(${hue - 60}deg)`,
            transition: 'filter 0.5s ease'
          }}
        >
        </div>
      </motion.div>
    </div>
  );
};