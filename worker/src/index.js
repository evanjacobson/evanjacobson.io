export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { email } = await request.json();

      // Validate email
      if (!email || !email.trim()) {
        return new Response(JSON.stringify({ error: 'Email is required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return new Response(JSON.stringify({ error: 'Invalid email format' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Create table if it doesn't exist
      await env.USERS.prepare(`
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      // Insert email
      const stmt = env.USERS.prepare('INSERT INTO Users (email, inserted_utc) VALUES (?, ?)');
      const result = await stmt.bind(
        email.trim().toLowerCase(),
        new Date().toISOString()
      ).run();


      if (result.success) {
        return new Response(JSON.stringify({
          success: true,
          message: 'Successfully subscribed!'
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } else {
        throw new Error('Failed to insert email');
      }

    } catch (error) {
      // Handle duplicate emails gracefully
      if (error.message && error.message.includes('UNIQUE constraint failed')) {
        return new Response(JSON.stringify({
          success: true,
          message: 'Already subscribed!'
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      console.error('Error:', error);
      return new Response(JSON.stringify({
        error: 'Internal server error'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  },
};