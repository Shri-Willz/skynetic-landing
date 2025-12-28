import supabase from "./supabase.ts";
import express from "express";
import nodemailer from "nodemailer"

const app = express()
const port = 8000
app.use(express.json());



app.get('/api', (req: any, res: any) => {
    console.log("hello world")
})
app.post('/api/register', async (req: any, res: any) => {

    const { name, email } = req.body

    console.log(name, email)

    const { data, error } = await supabase
        .from("Trial")
        .insert({ name: name, email: email })

    if (error) {
        console.log("somethong went wrong", error)
    }

    const traspoter = nodemailer.createTransport({
        secure: true,
        host: "smtp.hostinger.com",
        port: 465,
        auth: {
            user: process.env.hostinger_email,
            pass: process.env.hostinger_pass
        }
    })

    const info = {
        from: ` "Skynetic" ${process.env.hostinger_email}`,
        to: email,
        subject: "You’re on the early access list",
        html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; line-height: 1.6; color: #111827;">
        <p>Hey ${name},</p>

  <h2 style="margin-top: 24px; font-weight: 700;">
    JOB SEARCH SUPERCHARGED
  </h2>

  <p>
    You just joined <strong>5,000+ developers</strong> landing jobs
    <strong>78% faster</strong>.
  </p>

  <p style="margin-top: 24px;">
    Here’s what you get:
  </p>

  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 12px;">
      <strong>200+ Real Interview Scenarios</strong> –
      Actual questions from Google, Meta, Amazon.
      Not generic puzzles.
    </li>

<li style="margin-bottom: 12px;">
  <strong>AI Coach That Gets It</strong> –
  Instant feedback like a Staff Engineer reviewing your code.
</li>

<li style="margin-bottom: 12px;">
  <strong>14-Day System</strong> –
  Land interviews in 2 weeks, not 2 months.
  Your roadmap drops <strong>Monday 9 AM</strong>.
</li>

<li style="margin-bottom: 12px;">
  <strong>Verified Skills Badge</strong> –
  Share your <strong>SKYNETIC score</strong>.
  Recruiters are already asking for access.
</li>

  </ul>

  <p style="margin-top: 20px;">
    <strong>247 spots left</strong> for lifetime free access.
  </p>

  <p>Stay tuned.</p>

  <p style="margin-top: 28px;">
    <strong>Team SKYNETIC</strong>
  </p>

  <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />

  <p style="font-size: 14px; color: #374151;">
    <strong>P.S.</strong> After spot #1,000, this goes to
    <strong>$49/month</strong>. You’re free forever.
  </p>

</div>

    `,
    }

    traspoter.sendMail(info, function (error: any, info: any) {
        if (error) {
            console.log(error)
        }
        else {
            console.log(info)
        }
    })
    res.json({
        sucess: true,
        message: "data recieved"
    })

})

export default app;