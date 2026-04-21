// backend/controllers/carController.js
const carModel = require('../models/carModel');

const normalizeSpecKey = (label = '') => {
  const key = String(label).toLowerCase().replace(/[^a-z0-9]/g, '');

  if (key.includes('tipemesin') || key.includes('enginetype') || key === 'mesin') return 'engine';
  if (key.includes('kapasitas') || key === 'cc') return 'cc';
  if (key.includes('tenaga') || key.includes('power')) return 'power';
  if (key.includes('torsi') || key.includes('torque')) return 'torque';
  if (key.includes('transmisi') || key.includes('transmission')) return 'transmission';
  if (key.includes('dimensi') || key.includes('dimension')) return 'dimension';

  return null;
};

const buildSpecs = (specRows = []) => {
  const specs = {
    engine: '-',
    cc: '-',
    power: '-',
    torque: '-',
    transmission: '-',
    dimension: '-'
  };

  for (const row of specRows) {
    const mappedKey = normalizeSpecKey(row.spec_label);
    if (mappedKey && specs[mappedKey] === '-') {
      specs[mappedKey] = row.spec_value;
    }
  }

  return specs;
};

const buildFullSpecs = (specRows = []) => {
  const fullSpecs = {
    mesin: [],
    dimensi: []
  };

  for (const row of specRows) {
    const category = String(row.spec_category || '').toLowerCase();
    const item = { label: row.spec_label, value: row.spec_value };

    if (category.includes('mesin') || category.includes('engine') || category.includes('performa')) {
      fullSpecs.mesin.push(item);
      continue;
    }

    if (category.includes('dimensi') || category.includes('dimension')) {
      fullSpecs.dimensi.push(item);
    }
  }

  return fullSpecs;
};

const buildQuickSpecs = (specs) => {
  const quickSpecs = [];

  if (specs.transmission !== '-') {
    quickSpecs.push({ label: 'Transmisi', value: specs.transmission });
  }
  if (specs.power !== '-') {
    quickSpecs.push({ label: 'Tenaga', value: specs.power });
  }
  if (specs.torque !== '-') {
    quickSpecs.push({ label: 'Torsi', value: specs.torque });
  }
  if (specs.dimension !== '-') {
    quickSpecs.push({ label: 'Dimensi', value: specs.dimension });
  }

  return quickSpecs;
};

const getCars = async (req, res) => {
  try {
    const cars = await carModel.getAllCars();
    const variants = await carModel.getAllCarVariants();

    const carsWithVariants = cars.map(car => ({
      ...car,
      variants: variants.filter(v => v.car_id === car.id),
      specs: {
        transmission: variants.find(v => v.car_id === car.id)?.transmission || '-'
      }
    }));

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

    const variants = await carModel.getVariantsByCarId(car.id);
    const specRows = await carModel.getSpecsByCarId(car.id);
    const galleryRows = await carModel.getGalleryByCarId(car.id);
    const colorRows = await carModel.getColorsByCarId(car.id);

    const specs = buildSpecs(specRows);
    const fullSpecs = buildFullSpecs(specRows);

    car.variants = variants;
    car.specs = specs;
    car.fullSpecs = fullSpecs;
    car.quickSpecs = buildQuickSpecs(specs);
    car.colors = colorRows;
    car.gallery = galleryRows.map(item => item.image_url).filter(Boolean);

    if (car.gallery.length === 0 && car.image_url) {
      car.gallery = [car.image_url];
    }

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