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
  label = "Hue"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newValue = Math.max(min, Math.min(max, min + percentage * (max - min)));
    
    onChange(Math.round(newValue / step) * step);
    setDragOffset(e.movementX * 0.5);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset(0);
  };

  const hueColor = `hsl(${value}, 70%, 50%)`;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full p-4">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {label}: {value}°
      </label>
      <div 
        className="relative h-8 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 rounded-lg cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          className="absolute top-0 w-6 h-8 rounded-lg border-2 border-white shadow-lg"
          style={{
            backgroundColor: hueColor,
            left: `calc(${percentage}% - 12px)`,
          }}
          animate={{
            scale: isDragging ? 1.2 : 1,
            x: dragOffset,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>
    </div>
  );
};

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
      console.error('WebGL not supported');
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

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        uv.x += uXOffset * 0.1;
        
        float time = iTime * uSpeed;
        float lightning = 0.0;
        
        for (int i = 0; i < 5; i++) {
          float fi = float(i);
          vec2 pos = vec2(uv.x + sin(time + fi) * 0.1, uv.y + fi * 0.2);
          float branch = noise(pos * 10.0 + time) * uIntensity;
          lightning += branch * exp(-length(pos - vec2(0.5, 0.5)) * uSize);
        }
        
        vec3 color = hsv2rgb(vec3(uHue / 360.0, 0.8, lightning));
        fragColor = vec4(color, lightning * 0.8);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
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

interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position }) => {
  return (
    <div className={`absolute ${position} z-10 group transition-all duration-300 hover:scale-110`}>
      <div className="flex items-center gap-2 relative">
        <div className="relative">
          <div className="w-2 h-2 bg-white rounded-full group-hover:animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping opacity-20"></div>
        </div>
        <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 text-xs text-white">
          <div className="font-semibold">{name}</div>
          <div className="text-gray-300">{value}</div>
        </div>
      </div>
    </div>
  );
};

interface HeroOdysseyProps {
  className?: string;
}

export const HeroOdyssey: React.FC<HeroOdysseyProps> = ({ className = "" }) => {
  const [hue, setHue] = useState(230);

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      <div className="absolute inset-0">
        <Lightning 
          hue={hue}
          xOffset={0}
          speed={1.2}
          intensity={0.8}
          size={2}
        />
      </div>
      
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-8">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Solar
            </span>
            <br />
            <span className="text-white">Odyssey</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Embark on a journey through renewable energy innovation with our cutting-edge solar solutions.
          </p>
          
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <ElasticHueSlider
          value={hue}
          onChange={setHue}
          min={0}
          max={360}
          label="Lightning Hue"
        />
      </div>

      <FeatureItem name="Efficiency" value="95.2%" position="top-20 left-20" />
      <FeatureItem name="Capacity" value="25kW" position="top-32 right-32" />
      <FeatureItem name="Savings" value="$2,400/yr" position="bottom-32 left-32" />
      <FeatureItem name="ROI" value="6.2 years" position="bottom-20 right-20" />

      <div
        className="absolute inset-0 opacity-30"
        style={{ 
          filter: `hue-rotate(${hue - 60}deg)`,
          transition: 'filter 0.5s ease'
        }}
      >
      </div>
    </div>
  );
};