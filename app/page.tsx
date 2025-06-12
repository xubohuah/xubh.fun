export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0'
    }}>
      <iframe 
        src="https://arc.net/e/4A1E5B46-A87F-4BB4-A391-A0D99E71230E"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none'
        }}
        title="leisure lab"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </main>
  )
}