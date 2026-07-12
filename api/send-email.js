const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { name, email, login, password, server } = req.body || {};

    if (!email) return res.status(400).json({ error: 'Missing email' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'apexfundededge@gmail.com',
        pass: 'gnoj sszo dkou jenf'
      }
    });

    await transporter.sendMail({
      from: '"ApexEdge Funding" <apexfundededge@gmail.com>',
      to: email,
      subject: 'Your ApexEdge Account is Approved! 🎉',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#080c14;padding:20px;text-align:center;border-radius:10px 10px 0 0">
            <h1 style="color:#00d4ff;margin:0">ApexEdge Funding</h1>
          </div>
          <div style="background:#f9f9f9;padding:30px;border-radius:0 0 10px 10px">
            <h2 style="color:#333">Hi ${name}, you are approved! 🎉</h2>
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
              <li>Go to exness.com and download MetaTrader 5</li>
              <li>Open MT5 and click Login to Trade Account</li>
              <li>Enter your Login ID, Password and Server above</li>
              <li>Start trading!</li>
            </ol>
            <h3 style="color:#333">Challenge Rules:</h3>
            <ul style="color:#555;line-height:1.8">
              <li>Profit Target: 20% ($200)</li>
              <li>Max Daily Loss: 5% ($50)</li>
              <li>Max Total Drawdown: 10% ($100)</li>
              <li>Profit Split: 80% yours when funded</li>
            </ul>
            <div style="text-align:center;margin:30px 0">
              <a href="https://apexedgefunded.com" style="background:#00d4ff;color:#080c14;padding:12px 30px;border-radius:8px;text-decoration:none;font-weight:bold">View Dashboard</a>
            </div>
            <p style="color:#333"><strong>ApexEdge Funding Team</strong></p>
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
