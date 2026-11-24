import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory fallback cache for Vercel serverless instances
let inMemoryWishes: any[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS so client requests always succeed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST: Add new wish
  if (req.method === 'POST') {
    try {
      const newWish = req.body;
      if (newWish && newWish.text) {
        // If Upstash Redis or Vercel KV environment variables are present, we can persist there
        const kvRestUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
        const kvRestToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

        if (kvRestUrl && kvRestToken) {
          try {
            // Push to Upstash / Vercel KV list
            await fetch(`${kvRestUrl}/lpush/loy_krathong_wishes`, {
              headers: { Authorization: `Bearer ${kvRestToken}` },
              method: 'POST',
              body: JSON.stringify(newWish),
            });
          } catch (e) {
            console.error('KV Error:', e);
          }
        }

        // Also save to in-memory store
        const existingIdx = inMemoryWishes.findIndex((w) => w.id === newWish.id);
        if (existingIdx >= 0) {
          inMemoryWishes[existingIdx] = newWish;
        } else {
          inMemoryWishes.unshift(newWish);
        }

        // Limit memory store to 50 latest
        if (inMemoryWishes.length > 50) {
          inMemoryWishes = inMemoryWishes.slice(0, 50);
        }

        return res.status(200).json({ success: true, wish: newWish });
      }
      return res.status(400).json({ error: 'Invalid wish data' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Handle GET: Retrieve all wishes
  if (req.method === 'GET') {
    try {
      const kvRestUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
      const kvRestToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

      if (kvRestUrl && kvRestToken) {
        try {
          const kvRes = await fetch(`${kvRestUrl}/lrange/loy_krathong_wishes/0/40`, {
            headers: { Authorization: `Bearer ${kvRestToken}` },
          });
          if (kvRes.ok) {
            const data = await kvRes.json();
            if (data && Array.isArray(data.result)) {
              const parsed = data.result
                .map((item: any) => {
                  try {
                    return typeof item === 'string' ? JSON.parse(item) : item;
                  } catch {
                    return null;
                  }
                })
                .filter(Boolean);
              return res.status(200).json(parsed);
            }
          }
        } catch (e) {
          console.error('KV Read Error:', e);
        }
      }

      return res.status(200).json(inMemoryWishes);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
