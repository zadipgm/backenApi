import nodemailer from "nodemailer";
const SendEmailToAdmin = (email, mobileNumber, name, service) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shanirawn5@gmail.com",
      pass: "ockusrdltlsocmmd",
    },
  });

  var mailOptions = {
    from: "shanirawn5@gmail.com",
    to: "gm.zadip@gmail.com",
    subject: "User Requested for Service",
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
                      <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${name} requested for <strong>${service}</strong> service.</h1>
                      <table style="width:100%;border:1px solid black;">
                        <tr>
                          <th style="border:1px solid black;">Name</th>
                          <th style="border:1px solid black;">Email</th>
                          <th style="border:1px solid black;">Mobile Number</th>
                          <th style="border:1px solid black;">Service</th>
                        </tr>
                        <tr>
                          <td style="border:1px solid black;">${name}</td>
                          <td style="border:1px solid black;">${email}</td>
                          <td style="border:1px solid black;">${mobileNumber}</td>
                          <td style="border:1px solid black;">${service}</td>
                        </tr>
                      </table>
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

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
export default SendEmailToAdmin;
