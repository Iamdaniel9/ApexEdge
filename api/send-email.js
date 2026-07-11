export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, login, password, server } = req.body;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer re_Vv2DEbVX_GQ4LhZzMGNP35p9yahMPBwus',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'ApexEdge Funding <support@apexedgefunded.com>',
      to: [email],
      subject: 'Your ApexEdge Account is Approved! 🎉',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <div style="background:#080c14;padding:20px;text-align:center;border-radius:10px 10px 0 0">
            <h1 style="color:#00d4ff;margin:0">ApexEdge Funding</h1>
          </div>
          <div style="background:#f9f9f9;padding:30px;border-radius:0 0 10px 10px">
            <h2 style="color:#333">Hi ${name}, you're approved! 🎉</h2>
            <p style="color:#555">Your ApexEdge challenge account has been approved!</p>
            <div style="background:#080c14;border-radius:8px;padding:20px;margin:20px 0">
              <h3 style="color:#00d4ff;margin-top:0">Your Exness Demo Account</h3>
              <p style="color:#fff;margin:8px 0"><strong style="color:#94a3b8">Login ID:</strong> ${login}</p>
              <p style="color:#fff;margin:8px 0"><strong style="color:#94a3b8">Password:</strong> ${password}</p>
              <p style="color:#fff;margin:8px 0"><strong style="color:#94a3b8">Server:</strong> ${server}</p>
              <p style="color:#fff;margin:8px 0"><strong style="color:#94a3b8">Balance:</strong> $1,000.00</p>
            </div>
            <h3 style="color:#333">How to Start:</h3>
            <ol style="color:#555;line-height:1.8">
              <li>Go to <strong>exness.com</strong> and download MetaTrader 5</li>
              <li>Open MT5 and click <strong>Login to Trade Account</strong></li>
              <li>Enter your Login ID, Password and Server above</li>
              <li>Start trading!</li>
            </ol>
            <h3 style="color:#333">Your Challenge Rules:</h3>
            <ul style="color:#555;line-height:1.8">
              <li>Profit Target: <strong>20% ($200)</strong></li>
              <li>Max Daily Loss: <strong>5% ($50)</strong></li>
              <li>Max Total Drawdown: <strong>10% ($100)</strong></li>
              <li>Time Limit: <strong>None</strong></li>
              <li>Profit Split: <strong>80% yours when funded</strong></li>
            </ul>
            <div style="text-align:center;margin:30px 0">
              <a href="https://apexedgefunded.com" style="background:#00d4ff;color:#080c14;padding:12px 30px;border-radius:8px;text-decoration:none;font-weight:bold">View Your Dashboard</a>
            </div>
            <p style="color:#333"><strong>ApexEdge Funding Team</strong></p>
          </div>
        </div>
      `
    })
  });

  const data = await response.json();
  return res.status(response.ok ? 200 : 400).json(data);
    }
