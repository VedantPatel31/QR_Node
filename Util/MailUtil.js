const mailer = require("nodemailer");

//this sendMail is userDefined function
const sendMail = async (to, subject, text) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "vedantpatel018@gmail.com",
      pass: "augtbydclslkugab",
    },
  });

  const mailOptions = {
    from: "vedantpatel018@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: `
            <h1>Hi</h1>
            <p>YOUR OTP IS 1234</p>
        `,
    attachments: [
      {
        filename: "abc.png",
        path: "./images/abc.png",
      },
    ],
  };

  const res = await transporter.sendMail(mailOptions);
  console.log(res);
  return res;
};
//sendMail("samir.vithlani83955@gmail.com", "Test Mail", "This is test mail from nodejs")
module.exports = {sendMail}