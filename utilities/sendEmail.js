import { createTransport } from "nodemailer";

export const sendToEmail = async (email) => {
  console.log(44);
  const transporter = createTransport({
    service: "gmail",
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "ayaaothman96@gmail.com",
      pass: "icqz ocbz iqpc eqdd      ",
    },
  });
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<h1>Hello from ITI?   <a href='http://localhost:3000/user/verify'>please verify </a>   </h1>", // html body
  });
  console.log("Message sent: %s", info.messageId);
};
