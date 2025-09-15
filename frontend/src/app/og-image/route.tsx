import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #22D3EE 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '800px',
            padding: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              lineHeight: 1.1,
            }}
          >
            MaishaTech
          </h1>
          <h2
            style={{
              fontSize: '36px',
              fontWeight: '600',
              margin: '0 0 20px 0',
              opacity: 0.9,
            }}
          >
            Software Development Portfolio
          </h2>
          <p
            style={{
              fontSize: '24px',
              margin: '0',
              opacity: 0.8,
              lineHeight: 1.4,
            }}
          >
            Showcasing real products: e-commerce, services, chat, payments & more
          </p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '40px',
              fontSize: '18px',
              opacity: 0.9,
            }}
          >
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>React</span>
            <span>•</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
