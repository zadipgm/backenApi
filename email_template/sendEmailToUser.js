import nodemailer from "nodemailer";
const SendEmailToUser = async (email, name) => {
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
    subject: "Welcome to the ZADIP Group",
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
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="padding:0 0 36px 0;color:#153643;">
                          <h2 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Dear ${name},</h2>
                          <h2 style="font-size:22px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Thank you for contacting us!</h2>
                          <h3 style="font-size:20px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Our sales representative will get back to you as soon as possible.</h3>
                          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> Founded in 2004, ZADIP has expanded from a small business to a multi-industry enterprise with operational teams in ICT, Networking, Software Development, Construction and Advertising. Our rapid expansion was only possible through the trust and support our customers put in our abilities.</p>
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
export default SendEmailToUser;
