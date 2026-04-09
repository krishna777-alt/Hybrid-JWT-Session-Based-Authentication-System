<h1 align="center">🔐 Advanced JWT Auth System</h1>

<p align="center">
A production-grade authentication system with refresh token rotation, hashed storage, and session tracking.
</p>

<hr>


<div class="container">

<h2>🚀 Features</h2>

<div class="card">
<span class="badge">🔄 Token Rotation</span>
<span class="badge">🔐 Hashed Tokens</span>
<span class="badge">📱 Multi-Device Sessions</span>
<span class="badge">🚨 Reuse Detection</span>
<span class="badge">📍 IP Tracking</span>
</div>

---

<h2>🧠 Overview</h2>

<p>
This API is a secure authentication system built using Node.js, combining JWT-based authentication with stateful session management. It uses short-lived access tokens and long-lived refresh tokens, which are hashed before being stored in the database. Each login creates a unique session tied to a device and IP address.
</p>

<p>
The system implements refresh token rotation and reuse detection. Every refresh request invalidates the old token and issues a new one. If a reused or suspicious token is detected, all sessions are revoked instantly, protecting against token theft and replay attacks.
</p>

---

<h2>🔄 Authentication Flow</h2>

<div class="code">
Login → Access Token + Refresh Token  
↓  
Hash Refresh Token & store in DB  
↓  
Client sends Refresh Token  
↓  
Verify → Rotate → Issue new tokens  
</div>

---

<h2>📂 Session Structure</h2>

<div class="code">
{
  token: "hashed_refresh_token",
  ip: "192.168.1.1",
  device: "Chrome on Linux",
  expiresAt: 1712345678901
}
</div>

---

<h2>🔐 Security Highlights</h2>

<ul>
  <li><span class="highlight">Hashed Refresh Tokens</span> – Never stored in plain text</li>
  <li><span class="highlight">Token Rotation</span> – One-time-use refresh tokens</li>
  <li><span class="highlight">Reuse Detection</span> – Revokes all sessions on attack</li>
  <li><span class="highlight">IP Validation</span> – Detects suspicious activity</li>
  <li><span class="highlight">Multi-Session Support</span> – Device-based sessions</li>
</ul>

---

<h2>📡 API Endpoints</h2>

<div class="card">
POST /login <br>
POST /refresh <br>
POST /logout
</div>

---

<h2>⚙️ Environment Variables</h2>

<div class="code">
ACCESS_SECRET_KEY=your_access_secret  
REFRESH_SECRET_KEY=your_refresh_secret  
ACCESS_TOKEN_EXPIRY=15m  
REFRESH_TOKEN_EXPIRY=7d  
</div>

---

<h2>🛠️ Tech Stack</h2>

<div class="card">
Node.js • Express • MongoDB • bcryptjs • jsonwebtoken
</div>

---

<h2>🧪 Security Scenarios</h2>

<ul>
  <li>✅ Valid token → Access granted</li>
  <li>❌ Expired token → Rejected</li>
  <li>🚨 Reused token → All sessions revoked</li>
  <li>📍 IP mismatch → Suspicious activity blocked</li>
</ul>

---

<h2>📈 Future Improvements</h2>

<ul>
  <li>⚡ Redis session store</li>
  <li>📊 Device management dashboard</li>
  <li>🧠 Token ID (jti) optimization</li>
  <li>🔔 Security alerts</li>
</ul>

---

<h2 align="center">👨‍💻 Author</h2>

<p align="center">
THEJAS KRISHNAN
</p>

</div>
