import parentController from "../controller.js";
import nodemailer from "nodemailer";
import c from "config";
import _ from "lodash";

export default new (class extends parentController {
  async contact(req, res) {
    const data = _.pick(req.body, ["name", "email", "subject", "message"]);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: c.get("email.user"),
        pass: c.get("email.password"),
      },
    });
    const mailOptions = {
      from: c.get("email.user"),
      to: c.get("email.user"),
      subject: data.subject,
      text: `from : ${data.name} <${data.email}>\nmessage : ${data.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return this.response({
          res,
          message: "Error",
          code: 400,
          data: { error },
        });
      }
      return this.response({ res, message: "Email sent", data: info.response });
    });
  }
})();
