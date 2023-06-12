import nodemailer from "nodemailer";
const PasswordResetEmail = async (email, fpSalt) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.accountsupport.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: "000@ZadipGroup#000",
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: "Reset password email",
    html: `<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
          <tr>
            <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
              <img src="https://zadip.sa/images/zadiplogo.png" alt="" width="300" style="height:auto;display:block;" />
            </td>
          </tr>
          <tr>
            <td style="padding:36px 30px 42px 30px;">
              <table role="presentation"style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td style="padding:0 0 36px 0;color:#153643;">
                  To reset your password, please click the link below.\n\n${
                    process.env.DOMAIN +
                    "/reset_password?token=" +
                    encodeURIComponent(fpSalt) +
                    "&email=" +
                    email
                  }
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;background:#70bbd9;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                <tr>
                <td style="padding:0;width:50%;" align="left">
                <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                  &reg; Zadip Group, Riyadh, Saudi Arabia 2023<br/>
                </p>
              </td>
                  <td style="padding:0;width:50%;" align="right">
                    <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="padding:0 0 0 10px;width:38px;">
                          <a href="https://twitter.com/zadipgroup" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                        </td>
                        <td style="padding:0 0 0 10px;width:38px;">
                          <a href="https://www.facebook.com/zadipgroup/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`,
    // html: `An Email has been sent to the user, Followings are user details:<br> User Email:${email} <br> User Mobile Number:${mobileNumber} <br> User Name:${name}`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
export default PasswordResetEmail;
