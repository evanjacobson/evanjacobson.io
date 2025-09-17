export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    try {
      console.log('Processing email subscription request...');

      const { email } = await request.json();
      console.log('Email received:', email);

      // Validate email
      if (!email || !email.trim()) {
        console.log('Email validation failed: empty email');
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
        console.log('Email validation failed: invalid format');
        return new Response(JSON.stringify({ error: 'Invalid email format' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      console.log('Email validation passed');

      // Check if database binding exists
      if (!env.DB) {
        console.error('DB database binding not found');
        return new Response(JSON.stringify({ error: 'Database not configured' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      console.log('Database binding found, setting up table...');

      // Create table if it doesn't exist
      try {
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `).run();
        console.log('Table setup complete');
      } catch (tableError) {
        console.error('Table setup failed:', tableError);
        throw tableError;
      }

      // Insert email
      console.log('Inserting email into database...');
      const stmt = env.DB.prepare('INSERT INTO Users (email) VALUES (?)');
      const result = await stmt.bind(email.trim().toLowerCase()).run();

      if (result.success) {
        console.log('Email successfully inserted with ID:', result.meta.last_row_id);
        return new Response(JSON.stringify({
          success: true,
          message: 'Successfully subscribed!',
          id: result.meta.last_row_id
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } else {
        console.error('Database insert failed:', result);
        throw new Error('Failed to insert email');
      }

    } catch (error) {
      // Handle duplicate emails gracefully
      if (error.message && error.message.includes('UNIQUE constraint failed')) {
        console.log('Duplicate email detected, returning success');
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

      console.error('Unexpected error:', error);
      console.error('Error stack:', error.stack);

      return new Response(JSON.stringify({
        error: 'Internal server error',
        details: error.message
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