export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { name, email, login, password, server } = req.body || {};

    if (!email) return res.status(400).json({ error: 'Missing email' });

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_cHRfB13w_71ZHYrf5LZno2vfECtLRd8fE',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'ApexEdge Funding <support@apexedgefunded.com>',
        to: [email],
        subject: 'Your ApexEdge Account is Approved!',
        html: '<h2>Hi ' + name + '!</h2><p>Your account is approved!</p><p><b>Login ID:</b> ' + login + '</p><p><b>Password:</b> ' + password + '</p><p><b>Server:</b> ' + server + '</p><p><b>Balance:</b> $1,000</p><p>Download MT5 from exness.com to start trading.</p><br><p>ApexEdge Funding Team</p>'
      })
    });

    const data = await response.json();
    console.log('Resend response:', JSON.stringify(data));
    return res.status(response.ok ? 200 : 400).json(data);

  } catch (error) {
    console.log('Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
                }
