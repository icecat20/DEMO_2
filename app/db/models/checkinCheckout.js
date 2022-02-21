const BaseModel = require("./BaseModel");
const path = require("path");
const TABLE_NAME = "checkin_checkout";
const {Model} = require('objection');

class CheckinCheckout extends BaseModel {
  static get tableName() {
    return TABLE_NAME;
  }
  $beforeInsert() {
    this.checkin = new Date().toISOString();
    this.checkout = new Date().toISOString();
  }

  $beforeUpdate() {
    this.checkout = new Date().toISOString();
  }
  static get relationMappings() {
    return {
      userId : {
        relation: Model.BelongsToOneRelation,
        modelClass : path.join(__dirname,'/users'),
        join: {
            from :`${TABLE_NAME}.user_id`,
            to : `user.id`,
        }
      },
    };
  }
}

module.exports = CheckinCheckout;
