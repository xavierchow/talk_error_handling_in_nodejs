const assert = require("assert").strict;
const { deserializer } = require("../orderHelper");
const initFsm = require("../statemachine");
const { CREATED } = require("../statemachine/constants");
const { ServiceErrorFactory } = require("../../error");

module.exports = function(Model) {
  async function createOrder(transactionId, userId, data) {
    const order = await deserializer();

    const fsm = initFsm(order);
    fsm.logger = Model.app.logger;
    try {
      await fsm.create({ transactionId, userId, data }, Model);
    } catch (e) {
      throw e; // no need catch and throw here if no other process
    }

    assert.strictEqual(fsm.state, CREATED);

    return { order: fsm.order };
  }

  async function anotherCreateOrder(transactionId, userId, data) {
    const order = await deserializer();

    const createError = ServiceErrorFactory(Model.app.logger);
    const fsm = initFsm(order);
    try {
      await fsm.create({ transactionId, userId, data }, Model);
    } catch (e) {
      throw createError(e, { transactionId }); // attach whatever you want
    }

    assert.strictEqual(fsm.state, CREATED);

    return { order: fsm.order };
  }
};
