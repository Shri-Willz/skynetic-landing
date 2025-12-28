import supabase from "./supabase";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://skynetic.tech",
      "https://www.skynetic.tech",
      "http://localhost:5173"
    ],
    methods: ["POST", "GET"]
  })
);

app.get("/", (_req, res) => {
  res.json({ ok: true });
});

// ===== NODEMAILER (CREATE ONCE) =====
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.HOSTINGER_EMAIL,
    pass: process.env.HOSTINGER_PASS
  }
});

// ===== REGISTER API =====
app.post("/api/register", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      });
    }

    // ---- Save to Supabase ----
    const { error } = await supabase
      .from("Trial")
      .insert({ name, email });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    // ---- Send Email ----
    await transporter.sendMail({
      from: `"Skynetic" <${process.env.HOSTINGER_EMAIL}>`,
      to: email,
      subject: "You’re on the early access list",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; line-height: 1.6; color: #111827;">
          <p>Hey ${name},</p>

          <h2>JOB SEARCH SUPERCHARGED</h2>

          <p>
            You just joined <strong>5,000+ developers</strong> landing jobs
            <strong>78% faster</strong>.
          </p>

          <ul>
            <li><strong>200+ Real Interview Scenarios</strong></li>
            <li><strong>AI Coach That Gets It</strong></li>
            <li><strong>14-Day System</strong></li>
            <li><strong>Verified Skills Badge</strong></li>
          </ul>

          <p><strong>247 spots left</strong> for lifetime free access.</p>

          <p><strong>Team SKYNETIC</strong></p>

          <p style="font-size: 14px;">
            P.S. After spot #1,000 this goes to <strong>$49/month</strong>.
          </p>
        </div>
      `
    });

    return res.json({
      success: true,
      message: "Registration successful"
    });

  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

export default app;
