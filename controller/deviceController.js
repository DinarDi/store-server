const ApiError = require("../error/ApiError");
const deviceService = require("../service/deviceService");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class DeviceController {
  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      const devices = await deviceService.getAll(
        brandId,
        typeId,
        limit,
        offset
      );
      return res.json(devices);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const device = await deviceService.getOne(req.params.id);
      return res.json(device);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async createDevice(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      if (info) {
        info = JSON.parse(info);
      }
      const device = await deviceService.createDevice(
        name,
        price,
        brandId,
        typeId,
        info,
        fileName
      );
      return res.json(device);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async updateDevice(req, res, next) {
    try {
      let { id, name, price, img, brandId, typeId, info } = req.body;
      let fileName = "";

      if (req.files !== null) {
        const { newImg } = req.files;
        fs.unlinkSync(path.resolve(__dirname, "..", "static", img));
        fileName = uuid.v4() + ".jpg";
        newImg.mv(path.resolve(__dirname, "..", "static", fileName));
      } else {
        fileName = img;
      }

      if (info) {
        info = JSON.parse(info);
      }
      const item = { id, name, price, brandId, typeId, info, img: fileName };
      const device = await deviceService.updateDevice(item);
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteDevice(req, res, next) {
    try {
      const removedDevice = await deviceService.deleteDevice(req.params.id);
      fs.unlinkSync(path.resolve(__dirname, "..", "static", removedDevice.img));
      return res.json(removedDevice);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async deleteDeviceInfo(req, res, next) {
    try {
      const deviceInfo = await deviceService.deleteDeviceInfo(req.params.id);
      return res.json(deviceInfo);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DeviceController();
