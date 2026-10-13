const express = require("express");
const cors = require("cors"); //
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;

// Palitan mo 'to ng na-copy mong API Key mula sa Resend
const resend = new Resend(process.env.RESEND_API_KEY); // Dito mo ilalagay ang API Key mo mula sa Resend

app.use(cors()); //
app.use(express.json());

app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev", // Default testing email ng Resend
            to: "artmac437@gmail.com", // Dito pumasok ang email sa'yo!
            subject: `Bagong Mensahe mula kay ${name}`,
            html: `<p><strong>Pangalan:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Mensahe:</strong> ${message}</p>`
        });

        res.status(200).json({ success: true, message: "Sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error sending email." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});