// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import type p5 from 'p5'

// interface P5Instance extends p5 {
//   remove: () => void
// }

// export default function P5Sketch() {
//   const sketchRef = useRef<HTMLDivElement>(null)
//   const p5InstanceRef = useRef<P5Instance | null>(null)
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         const dataUrl = e.target?.result as string
//         setUploadedImage(dataUrl)
//         // 重新初始化 p5 实例
//         if (p5InstanceRef.current) {
//           p5InstanceRef.current.remove()
//         }
//         initP5(dataUrl)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const initP5 = (imageUrl: string | null = null) => {
//     import('p5').then((p5Module) => {
//       const P5 = p5Module.default

//       const sketch = (p: p5) => {
//         let img: p5.Image
//         let frame = 0
//         const strokeLength = 35
//         const noiseScale = 0.005
//         const drawLength = 250

//         p.preload = () => {
//           if (imageUrl) {
//             img = p.loadImage(imageUrl)
//           }
//         }

//         p.setup = () => {
//           p.createCanvas(p.windowWidth > 800 ? 800 : p.windowWidth - 40, 
//                         p.windowHeight > 600 ? 600 : p.windowHeight - 100)
//           p.background(255)
//           if (!imageUrl) {
//             // 如果没有上传图片，创建默认的渐变图像
//             img = p.createGraphics(400, 400)
//             img.loadPixels()
//             for (let y = 0; y < 400; y++) {
//               for (let x = 0; x < 400; x++) {
//                 const r = p.map(x, 0, 400, 220, 30)
//                 const g = p.map(y, 0, 400, 30, 50)
//                 const b = p.map(x + y, 0, 800, 50, 220)
//                 const index = (y * 400 + x) * 4
//                 img.pixels[index] = r
//                 img.pixels[index + 1] = g
//                 img.pixels[index + 2] = b
//                 img.pixels[index + 3] = 255
//               }
//             }
//             img.updatePixels()
//           }
//           frame = 0
//         }

//         p.draw = () => {
//           if (frame > drawLength || !img) return

//           p.translate(
//             p.width / 2 - img.width / 2,
//             p.height / 2 - img.height / 2
//           )
          
//           const count = p.map(frame, 0, drawLength, 2, 80)
          
//           for (let i = 0; i < count; i++) {
//             const x = p.int(p.random(img.width))
//             const y = p.int(p.random(img.height))
            
//             const c = img.get(x, y)
//             p.stroke(c)
            
//             const currentStrokeThickness = p.map(frame, 0, drawLength, 25, 0)
//             p.strokeWeight(currentStrokeThickness)
            
//             p.push()
//             p.translate(x, y)
//             const n = p.noise(x * noiseScale, y * noiseScale)
//             p.rotate(p.radians(p.map(n, 0, 1, -180, 180)))
            
//             const lengthVariation = p.random(0.75, 1.25)
//             p.line(0, 0, strokeLength * lengthVariation, 0)
            
//             const [r, g, b] = c
//             p.stroke(p.min(r * 3, 255), p.min(g * 3, 255), p.min(b * 3, 255), p.random(100))
//             p.strokeWeight(currentStrokeThickness * 0.8)
//             p.line(0, -currentStrokeThickness * 0.15, strokeLength * lengthVariation, -currentStrokeThickness * 0.15)
//             p.pop()
//           }
          
//           frame++
//         }

//         p.mousePressed = () => {
//           if (p.mouseX > 0 && p.mouseX < p.width && 
//               p.mouseY > 0 && p.mouseY < p.height) {
//             p.background(255)
//             frame = 0
//             p.noiseSeed(p.int(p.random(1000)))
//           }
//         }

//         p.windowResized = () => {
//           p.resizeCanvas(p.windowWidth > 800 ? 800 : p.windowWidth - 40, 
//                         p.windowHeight > 600 ? 600 : p.windowHeight - 100)
//         }
//       }

//       if (sketchRef.current) {
//         p5InstanceRef.current = new P5(sketch, sketchRef.current) as P5Instance
//       }
//     })
//   }

//   useEffect(() => {
//     initP5()
//     return () => {
//       if (p5InstanceRef.current) {
//         p5InstanceRef.current.remove()
//       }
//     }
//   }, [])

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
//       <div style={{
//         display: 'flex',
//         gap: '10px',
//         alignItems: 'center'
//       }}>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           style={{ display: 'none' }}
//         />
//         <button
//           onClick={() => fileInputRef.current?.click()}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontSize: '14px'
//           }}
//         >
//           上传图片
//         </button>
//         <button
//           onClick={() => {
//             if (p5InstanceRef.current) {
//               p5InstanceRef.current.remove()
//             }
//             setUploadedImage(null)
//             initP5()
//           }}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#f44336',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontSize: '14px'
//           }}
//         >
//           重置
//         </button>
//       </div>
//       <div 
//         ref={sketchRef}
//         style={{
//           border: '2px solid #ddd',
//           borderRadius: '8px',
//           overflow: 'hidden',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//         }}
//       />
//     </div>
//   )
// }
