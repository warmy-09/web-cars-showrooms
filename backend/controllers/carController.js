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

// Mengambil detail 1 mobil beserta variannya berdasarkan slug
const getCarBySlug = async (req, res) => {
  try {
    let { slug } = req.params;
    slug = slug.trim();
    
    const car = await carModel.getCarBySlug(slug);
    
    if (!car) {
      return res.status(404).json({ success: false, message: 'Mobil tidak ditemukan' });
    }

    // Ambil variants untuk mobil ini
    const variants = await carModel.getVariantsByCarId(car.id);
    car.variants = variants;
    
    // Parsing JSON untuk specs dan fullSpecs jika di DB disave sebagai string/JSON
    if (typeof car.specs === 'string') car.specs = JSON.parse(car.specs);
    if (typeof car.fullSpecs === 'string') car.fullSpecs = JSON.parse(car.fullSpecs);
    if (typeof car.colors === 'string') car.colors = JSON.parse(car.colors);
    if (typeof car.gallery === 'string') car.gallery = JSON.parse(car.gallery);
    if (typeof car.quickSpecs === 'string') car.quickSpecs = JSON.parse(car.quickSpecs);

    res.json({ success: true, data: car });
  } catch (error) {
    console.error('Error fetching car by slug:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mengambil Reviews berdasarkan slug mobil
const getCarReviews = async (req, res) => {
  try {
    let { slug } = req.params;
    slug = slug.trim();
    
    const reviews = await carModel.getReviewsBySlug(slug);
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mengambil FAQs berdasarkan slug mobil
const getCarFaqs = async (req, res) => {
  try {
    let { slug } = req.params;
    slug = slug.trim();
    
    const faqs = await carModel.getFaqsBySlug(slug);
    res.json({ success: true, data: faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCars,
  getCarBySlug,
  getCarReviews,
  getCarFaqs
};