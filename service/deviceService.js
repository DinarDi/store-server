const { Device, DeviceInfo } = require("../models/models");

class DeviceService {
  async getAll(brandId, typeId, limit, offset) {
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }

    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }

    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }

    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return devices;
  }

  async getOne(id) {
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return device;
  }

  async createDevice(name, price, brandId, typeId, info, fileName) {
    const newDevice = await Device.create({
      name,
      price,
      brandId,
      typeId,
      img: fileName,
    });

    if (info) {
      info.forEach((el) => {
        DeviceInfo.create({
          title: el.title,
          description: el.description,
          deviceId: newDevice.id,
        });
      });
    }
    return newDevice;
  }

  async updateDevice(item) {
    const updatedDevice = await Device.update(item, { where: { id: item.id } });

    if (item.info) {
      for (const el of item.info) {
        let finded = await DeviceInfo.findOne({ where: { id: el.id } });
        if (finded) {
          await finded.update(el);
        } else {
          await DeviceInfo.create({
            title: el.title,
            description: el.description,
            deviceId: item.id,
          });
        }
      }
    }

    return updatedDevice;
  }

  async deleteDevice(id) {
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    await device.destroy();
    return device;
  }

  async deleteDeviceInfo(id) {
    const deviceInfo = await DeviceInfo.destroy({ where: { id } });
    return deviceInfo;
  }
}

module.exports = new DeviceService();
