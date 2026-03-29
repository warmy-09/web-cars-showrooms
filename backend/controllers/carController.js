// backend/controllers/carController.js
const carModel = require('../models/carModel');

const getCars = async (req, res) => {
  try {
    // 1. Ambil data dari Model
    const cars = await carModel.getAllCars();
    const variants = await carModel.getAllCarVariants();
    
    // 2. Gabungkan varian ke dalam array mobil yang tepat
    const carsWithVariants = cars.map(car => ({
      ...car,
      variants: variants.filter(v => v.car_id === car.id)
    }));

    // 3. Kirim response
    res.json({ success: true, count: carsWithVariants.length, data: carsWithVariants });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getCars
};