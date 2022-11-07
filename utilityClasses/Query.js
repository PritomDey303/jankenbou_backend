const mongoose = require("mongoose");

class Query {
  constructor(model) {
    this.model = model;
    console.log("Query");
  }
  //finddata
  async findData(query) {
    return await this.model.find(query);
  }
  //find data by id
  async findDataById(id) {
    id = mongoose.Types.ObjectId(id);
    return await this.model.findById(id);
  }
  //insert data
  async insertData(data) {
    return await this.model.create(data);
  }

  //insert multiple data
  async insertManyData(data) {
    return await this.model.insertMany(data);
  }
  //update data by id
  async updateDataById(id, data) {
    let Id = mongoose.Types.ObjectId(id);
    return await this.model.findByIdAndUpdate(Id, data);
  }
  //delete data by id
  async deleteDataById(id) {
    let Id = mongoose.Types.ObjectId(id);
    return await this.model.findByIdAndDelete(Id);
  }
}

module.exports = Query;
