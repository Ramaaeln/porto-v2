import { useState, useRef, useEffect } from "react";
import "remixicon/fonts/remixicon.css";

import runIcon from "../../assets/icons/run.png";
import cursor1Icon from "../../assets/icons/cursor1.png";
import cursor2Icon from "../../assets/icons/cursor2.png";
import cursor3Icon from "../../assets/icons/cursor3.png";
import heroIcon from "../../assets/icons/hero.png";

export default function FavoriteSection() {
  const [frame, setFrame] = useState("white");
  const [filter, setFilter] = useState("none");
  const [stream, setStream] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (e) {
      alert("Kamera tidak diizinkan atau tidak ditemukan.");
    }
  };

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  const triggerCaptureSession = () => {
    if (!stream || isCapturing) return;
    setIsCapturing(true);
    setCapturedPhotos([]);
    startCountdownSequence(0, []);
  };

  const startCountdownSequence = (photoIndex, accumulatedPhotos) => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);

        const video = videoRef.current;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 480;
        tempCanvas.height = 480;
        const tempCtx = tempCanvas.getContext("2d");

        const size = Math.min(video.videoWidth, video.videoHeight);
        const sx = (video.videoWidth - size) / 2;
        const sy = (video.videoHeight - size) / 2;

        tempCtx.drawImage(video, sx, sy, size, size, 0, 0, 480, 480);
        
        const photoData = tempCanvas.toDataURL("image/png");
        const nextPhotos = [...accumulatedPhotos, photoData];
        setCapturedPhotos(nextPhotos);

        if (photoIndex < 2) {
          setTimeout(() => {
            startCountdownSequence(photoIndex + 1, nextPhotos);
          }, 800);
        } else {
          setIsCapturing(false);
        }
      }
    }, 1000);
  };

  const applyFilterToContext = (ctx, currentFilter, x, y, width, height) => {
    if (currentFilter === "none") return;
    
    if (currentFilter === "blur") {
      ctx.save();
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.drawImage(ctx.canvas, x, y, width, height, 0, 0, width, height);
      
      ctx.filter = "blur(4px)";
      ctx.drawImage(tempCanvas, x, y, width, height);
      ctx.restore();
      return;
    }

    if (currentFilter === "pixel") {
      const size = 0.1;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width * size;
      tempCanvas.height = height * size;
      const tempCtx = tempCanvas.getContext("2d");

      tempCtx.imageSmoothingEnabled = false;
      tempCtx.drawImage(ctx.canvas, x, y, width, height, 0, 0, tempCanvas.width, tempCanvas.height);

      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, x, y, width, height);
      ctx.restore();
      return;
    }

    const imgData = ctx.getImageData(x, y, width, height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (currentFilter === "grayscale") {
        const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        data[i] = data[i + 1] = data[i + 2] = v;
      } else if (currentFilter === "sepia") {
        data[i] = r * 0.393 + g * 0.769 + b * 0.189;
        data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
        data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
      } else if (currentFilter === "vintage") {
        data[i] = r * 0.9;
        data[i + 1] = g * 0.85;
        data[i + 2] = b * 0.7;
      } else if (currentFilter === "warm") {
        data[i] = r * 1.3;
        data[i + 1] = g * 1.1;
        data[i + 2] = b * 0.9;
      } else if (currentFilter === "blue") {
        data[i] = r * 0.5;
        data[i + 1] = g * 0.7;
        data[i + 2] = b * 1.4;
      }
    }
    ctx.putImageData(imgData, x, y);
  };

  const loadSingleImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  };

  const downloadPhoto = () => {
    if (capturedPhotos.length < 3) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const pW = 400;
    const pH = 400;
    const gap = 45;          
    const topMargin = 120;   
    const bottomMargin = 160; 
    const sideMargin = 60;    

    canvas.width = pW + sideMargin * 2; 
    canvas.height = (pH * 3) + (gap * 2) + topMargin + bottomMargin; 

    const frameConfig = frameColors[frame] || frameColors.white;
    ctx.fillStyle = frameConfig.hex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const photoPromises = capturedPhotos.map(loadSingleImage);
    const iconPromises = [runIcon, cursor1Icon, cursor2Icon, cursor3Icon, heroIcon].map(loadSingleImage);

    Promise.all([...photoPromises, ...iconPromises]).then((allImgs) => {
      const imgs = allImgs.slice(0, 3);
      const [runImg, cur1Img, cur2Img, cur3Img, heroImg] = allImgs.slice(3);

      let currentY = topMargin;

      imgs.forEach((img, idx) => {
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 8;

        ctx.fillStyle = frame === "black" ? "#27272a" : "#e4e4e7";
        ctx.fillRect(sideMargin, currentY - 28, pW, 28);
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = frameConfig.borderHex;
        ctx.strokeRect(sideMargin, currentY - 28, pW, 28);

        const dotColors = ["#ef4444", "#eab308", "#22c55e"];
        dotColors.forEach((color, dIdx) => {
          ctx.beginPath();
          ctx.arc(sideMargin + 16 + (dIdx * 14), currentY - 14, 4, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.stroke();
        });

        ctx.fillStyle = frame === "black" ? "#a1a1aa" : "#71717a";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "right";
        ctx.fillText(`CAPTURE_0${idx + 1}.BMP`, sideMargin + pW - 12, currentY - 10);

        ctx.shadowColor = "transparent";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.drawImage(img, sideMargin, currentY, pW, pH);
        applyFilterToContext(ctx, filter, sideMargin, currentY, pW, pH);
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = frameConfig.borderHex;
        ctx.strokeRect(sideMargin, currentY, pW, pH);
        
        currentY += pH + gap;
      });

      ctx.shadowColor = "rgba(0, 0, 0, 1)";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 6;
      ctx.shadowOffsetY = 6;

      ctx.drawImage(runImg, sideMargin - 25, topMargin - 65, 75, 75);
      ctx.drawImage(heroImg, canvas.width - sideMargin - 50, topMargin - 65, 75, 75);
      
      const foto2Y = topMargin + pH + gap;
      ctx.drawImage(cur3Img, canvas.width - sideMargin - 45, foto2Y + 80, 72, 72);

      const footerY = canvas.height - 125;
      ctx.drawImage(cur1Img, sideMargin - 15, footerY, 70, 70);
      ctx.drawImage(cur2Img, canvas.width - sideMargin - 55, footerY - 10, 75, 75);

      ctx.shadowColor = "transparent";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.strokeStyle = frameConfig.textHex;
      ctx.lineWidth = 2;
      const drawCross = (cx, cy) => {
        ctx.beginPath(); ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8); ctx.stroke();
      };
      drawCross(30, 40);
      drawCross(canvas.width - 30, 40);

      ctx.fillStyle = frameConfig.borderHex;
      ctx.font = "black 20px monospace";
      ctx.textAlign = "center";
      ctx.fillText("RAMA.EXE", canvas.width / 2, canvas.height - 65);
      
      ctx.fillStyle = frameConfig.textHex;
      ctx.font = "bold 11px monospace";
      ctx.fillText("[ SYSTEM PHOTOBOOTH V2.0 ]", canvas.width / 2, canvas.height - 45);

      const link = document.createElement("a");
      link.download = `photostrip-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const filterStyles = {
    none: "",
    grayscale: "grayscale",
    sepia: "sepia",
    vintage: "contrast-125 brightness-90 hue-rotate-15 sepia-[20%]",
    warm: "sepia-[30%] saturate-125 brightness-105",
    blur: "blur-[3px]",
    pixel: "[image-rendering:pixelated] contrast-125 [filter:url(#pixelate)] scale-x-[-1]",
    blue: "hue-rotate-[190deg] saturate-150 brightness-90"
  };

  const frameColors = {
    white: { hex: "#ffffff", borderHex: "#09090b", textHex: "#71717a", bgClass: "bg-white text-zinc-950 border-zinc-950" },
    black: { hex: "#18181b", borderHex: "#ffffff", textHex: "#a1a1aa", bgClass: "bg-zinc-900 text-white border-zinc-700" },
    blue: { hex: "#3b82f6", borderHex: "#09090b", textHex: "#eff6ff", bgClass: "bg-blue-500 text-white border-blue-600" },
    pink: { hex: "#ec4899", borderHex: "#09090b", textHex: "#fdf2f8", bgClass: "bg-pink-500 text-white border-pink-600" },
    red: { hex: "#ef4444", borderHex: "#09090b", textHex: "#fef2f2", bgClass: "bg-red-500 text-white border-red-600" }
  };

  return (
    <section id="favorites" className="pt-22 md:pt-22 relative w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0c0c0e] p-6 md:p-12 transition-colors duration-500 overflow-hidden selection:bg-indigo-500/30">
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none select-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />
      <svg className="hidden">
        <filter id="pixelate" x="0%" y="0%" width="100%" height="100%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComponentTransfer in="blur" result="pixel">
            <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
            <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
            <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
          </feComponentTransfer>
        </filter>
      </svg>

      <div className="w-full max-w-5xl z-10 space-y-10">
        
        <div className="flex flex-col items-center text-center space-y-2 select-none">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 border border-dashed border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <i className="ri-heart-3-line"></i> 04 . Favorites
          </div>
          <h2 className="text-2xl sm:text-5xl font-black font-mono uppercase text-zinc-950 dark:text-zinc-50">Preferences.log</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] transition-all">
            <div className="bg-zinc-950 dark:bg-zinc-800 px-4 py-3 flex items-center gap-2 border-b-4 border-zinc-950 select-none">
              <i className="ri-music-2-fill text-emerald-500"></i>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">Vibe_Check.sh</span>
            </div>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/50">
              <iframe 
                src="https://open.spotify.com/embed/playlist/1QIWHGE1toYUn4HZpZ4iTD?utm_source=generator&si=4eb6f09d191a4db6" 
                width="100%" 
                height="500" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "500px", border: "0" }}
              />
            </div>
          </div>

          <div className="md:col-span-7 bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] transition-all">
            <div className="bg-zinc-950 dark:bg-zinc-800 px-4 py-3 flex items-center justify-between border-b-4 border-zinc-950 select-none">
              <div className="flex items-center gap-2">
                <i className="ri-camera-3-fill text-indigo-500"></i>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">Photobooth.exe</span>
              </div>
              <button onClick={startCamera} className="text-zinc-400 hover:text-white transition-colors">
                <i className="ri-refresh-line text-sm"></i>
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
                <div className="relative w-full aspect-square bg-zinc-950 border-4 border-zinc-950 dark:border-zinc-800 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className={`w-full h-full object-cover scale-x-[-1] ${filterStyles[filter]}`} 
                  />
                  
                  {countdown !== null && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/70 select-none">
                      <span className="font-mono text-6xl font-black text-white animate-ping">{countdown}</span>
                    </div>
                  )}

                  {!stream && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900 font-mono text-center p-4">
                      <i className="ri-camera-off-line text-4xl mb-2"></i>
                      <p className="text-xs uppercase font-bold tracking-wider">Camera Terminated</p>
                      <button onClick={startCamera} className="mt-4 px-4 py-2 border-2 border-zinc-500 text-zinc-300 font-bold uppercase text-[10px] hover:bg-zinc-800">Initialize Device</button>
                    </div>
                  )}
                </div>

                <div className="space-y-2 font-mono text-[10px] font-bold uppercase select-none">
                  <span className="text-zinc-500 tracking-wider">Color Filters:</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {Object.keys(filterStyles).map((f) => (
                      <button 
                        key={f} 
                        onClick={() => setFilter(f)}
                        className={`py-1.5 border-2 border-zinc-950 dark:border-zinc-700 font-bold text-[9px] transition-all ${filter === f ? "bg-indigo-600 text-white" : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"}`}
                      >
                        {f === "none" ? "Normal" : f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 font-mono text-[10px] font-bold uppercase select-none">
                  <span className="text-zinc-500 tracking-wider">Select Layout Frame:</span>
                  <div className="grid grid-cols-5 gap-1">
                    {Object.keys(frameColors).map((color) => (
                      <button 
                        key={color}
                        onClick={() => setFrame(color)}
                        className={`py-1.5 border-2 text-[8px] font-bold uppercase transition-all ${frame === color ? "bg-indigo-600 text-white border-zinc-950" : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs select-none">
                  <button 
                    onClick={triggerCaptureSession}
                    disabled={!stream || isCapturing}
                    className="py-3 border-2 border-zinc-950 dark:border-zinc-700 bg-zinc-950 dark:bg-zinc-800 text-white font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800"
                  >
                    <i className="ri-shut-down-line mr-1"></i> Capture Strip
                  </button>
                  <button 
                    onClick={downloadPhoto}
                    disabled={capturedPhotos.length < 3 || !frame}
                    className="py-3 bg-indigo-600 text-white font-bold uppercase tracking-wider border-2 border-zinc-950 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                  >
                    <i className="ri-download-2-line mr-1"></i> Export Image
                  </button>
                </div>
              </div>

              <div className="sm:col-span-5 flex flex-col items-center">
                <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 select-none">Live Preview</span>
                <div className={`w-[220px] border-4 border-zinc-950 p-5 pt-14 pb-16 flex flex-col gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-visible ${frameColors[frame]?.bgClass || "bg-white"}`}>
                  
                  <div className="absolute top-0 left-0 right-0 h-4 border-b-2 border-zinc-950 flex items-center justify-between px-2 select-none" style={{ backgroundColor: frame === "black" ? "#27272a" : "#e4e4e7" }}>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] border border-black"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#eab308] border border-black"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] border border-black"></span>
                    </div>
                  </div>

                  <span className="absolute top-5 left-4 font-mono text-[11px] font-bold select-none">+</span >
                  <span className="absolute top-5 right-4 font-mono text-[11px] font-bold select-none">+</span >

                  <img src={runIcon} className="absolute left-1 top-6 w-11 h-11 pointer-events-none z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                  <img src={heroIcon} className="absolute right-1 top-6 w-11 h-11 pointer-events-none z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                  <img src={cursor1Icon} className="absolute -left-3 bottom-14 w-10 h-10 pointer-events-none z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                  <img src={cursor2Icon} className="absolute -right-3 bottom-24 w-11 h-11 pointer-events-none z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                  <img src={cursor3Icon} className="absolute -right-2 top-1/2 w-10 h-10 pointer-events-none z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />

                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="w-full flex flex-col">
                      <div className="w-full h-4 flex items-center justify-end px-1.5 border-t-2 border-x-2 border-zinc-950 select-none font-mono text-[6px] font-bold text-zinc-500" style={{ backgroundColor: frame === "black" ? "#27272a" : "#e4e4e7" }}>
                        CAPTURE_0{idx + 1}.BMP
                      </div>
                      <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]">
                        {capturedPhotos[idx] ? (
                          <img 
                            src={capturedPhotos[idx]} 
                            className={`w-full h-full object-cover scale-x-[-1] ${filterStyles[filter]}`} 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[11px] font-mono font-bold text-zinc-400">
                            [{idx + 1}]
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center select-none">
                    <div className="text-[11px] font-mono text-center font-black tracking-wider text-inherit">
                      RAMA.EXE
                    </div>
                    <div className="text-[6px] font-mono text-center font-bold tracking-widest opacity-60 text-inherit mt-0.5">
                      [ SYSTEM PHOTOBOOTH V2.0 ]
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
}