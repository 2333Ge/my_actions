const nodeMailer = require("nodemailer");

const emailInfo = {
  user: "ych.class@qq.com",
  from: "ych.class@qq.com",
  to: "ych.class@qq.com",
};

/**
 * 发送邮件
 */
const sendQQEmail = async (subject, html, pass) => {
  let { user, from, to } = emailInfo;
  const transporter = nodeMailer.createTransport({
    service: "qq",
    auth: { user, pass },
  });
  transporter.sendMail({ from, to, subject, html }, (err) => {
    if (err) return console.log(`发送邮件失败：${err}`);
    console.log("发送邮件成功");
  });
};

module.exports.sendQQEmail = sendQQEmail;
