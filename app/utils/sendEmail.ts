// import nodemailer from "nodemailer";

// export const sendThankYouEmail = async (userEmail: string) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_SERVER_HOST,
//       port: Number(process.env.EMAIL_SERVER_PORT),
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_FROM,
//       to: userEmail,
//       subject: "🎉 Welcome to Our Platform!",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
//           <h2 style="color: #4CAF50;">Thank You for Signing Up!</h2>
//           <p>We're excited to have you on board. Explore our platform and let us know if you have any questions.</p>
//           <p>Best Regards,<br/><strong>Your Team 🚀</strong></p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("✅ Thank You email sent to:", userEmail);
//   } catch (error) {
//     console.error("❌ Error sending Thank You email:", error);
//   }
// };



import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendThankYouEmail = async (userEmail: string) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: userEmail,
      subject: "🎉 Welcome to Our Platform!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
          <h2 style="color: #4CAF50;">Thank You for Signing Up!</h2>
          <p>We're excited to have you on board. Explore our platform and let us know if you have any questions.</p>
          <p>Best Regards,<br/><strong>Your Team 🚀</strong></p>
        </div>
      `,
    });

    console.log("✅ Thank You email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Error sending Thank You email:", error);
  }
};
