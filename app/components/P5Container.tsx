// 'use client';

// import dynamic from 'next/dynamic';

// // Dynamically import the P5 component with SSR disabled
// const P5Sketch = dynamic(() => import('./P5Sketch'), {
//   ssr: false,
//   loading: () => (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       fontSize: '18px',
//       color: '#666'
//     }}>
//       Loading p5.js sketch...
//     </div>
//   )
// });

// export default function P5Container() {
//   return <P5Sketch />;
// } 