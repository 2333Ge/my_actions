const nodeMailer = require("nodemailer");
const axios = require("axios");

/**抽奖 */
const checkInUrl = "https://api.juejin.cn/growth_api/v1/check_in";
/**签到 */
const drawUrl = "https://api.juejin.cn/growth_api/v1/lottery/draw";

const emailInfo = {
  user: "ych.class@qq.com",
  from: "ych.class@qq.com",
  to: "ych.class@qq.com",
};

/**
 * 签到
 */
const checkInAPI = async (cookie) => {
  let { data } = await axios({
    url: checkInUrl,
    method: "post",
    headers: { Cookie: cookie },
  });
  return data;
};

/**
 * 抽奖，免费一次和和消耗两百是一个接口
 */
const drawAPI = async (cookie) => {
  let { data } = await axios({
    url: drawUrl,
    method: "post",
    headers: { Cookie: cookie },
  });
  return data;
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

/**
 * 签到、抽奖、发邮件
 */
module.exports.submit = async (cookie, qqEmailPass) => {
  console.log("params====>", cookie, qqEmailPass);

  const checkInData = "await checkInAPI(cookie)";
  const drawData = await drawAPI(cookie);

  console.log("checkData====>", checkInData, drawData);

  const checkInSuccess = checkInData.data;
  const drawSuccess = drawData.data;

  const title = `掘金签到${checkInSuccess ? "成功" : "失败"}，抽奖${
    drawSuccess ? "成功" : "失败"
  }`;

  const line1 = checkInSuccess
    ? `签到成功: 今日获得${checkInData.data.incr_point}积分\n`
    : "";

  const line2 = drawSuccess
    ? `抽奖成功, 获得：${drawData.data.lottery_name}\n`
    : "";

  const line3 = `签到返回结果:\n ${JSON.stringify(checkInData, null, 2)}\n`;

  const line4 = `抽奖返回结果:\n ${JSON.stringify(drawSuccess, null, 2)}\n`;

  sendQQEmail(title, `${line1}${line2}${line3}${line4}`, qqEmailPass);
};
