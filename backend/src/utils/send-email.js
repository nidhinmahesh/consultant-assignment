const { Resend } = require("resend");
const { env } = require("../config");
const { ApiError } = require("./api-error");

let resend;
try {
  resend = new Resend(env.RESEND_API_KEY);
} catch (error) {
  console.log('Resend not properly configured, email functionality disabled');
  resend = null;
}

const sendMail = async (mailOptions) => {
  if (!resend) {
    console.log('Email would be sent to:', mailOptions.to);
    return; // Mock successful email send
  }
  
  const { error } = await resend.emails.send(mailOptions);
  if (error) {
    throw new ApiError(500, "Unable to send email");
  }
};

module.exports = {
  sendMail,
};
