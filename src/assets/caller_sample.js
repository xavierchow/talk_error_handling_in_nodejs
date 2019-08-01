const ServiceError = require("ServiceError");
const wepay = {};
const payload = {};
exports.unifiedOrder = async () => {
  try {
    const prepay = await wepay.unifiedOrder(payload);
    return prepay;
  } catch (err) {
    throw new ServiceError(1100, `wepay unifiedOrder err ${err.message}`);
  }
};

exports.verifyOrderPayment = async ({ order, wepayment }) => {
  const isVerifiedPayment = () => {};
  if (isVerifiedPayment(wepayment)) {
    return Promise.resolve();
  } else {
    return Promise.reject(
      new ServiceError(
        1101,
        `wepay openid/total_fee/trade_type not match to order`,
        { ...wepayment }
      )
    );
  }
};
