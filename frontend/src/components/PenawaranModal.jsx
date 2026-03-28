import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const carData = {
  "Pilih Model": ["Pilih Varian"],
  "Destinator": ["Destinator 2.4L AT"],
  "New Destinator": ["New Destinator Ultimate AT"],
  "New XFORCE": ["Exceed CVT", "Ultimate CVT"],
  "New Pajero Sport": ["Exceed MT 4x2", "Dakar AT 4x2", "Dakar Ultimate AT 4x4"],
  "New Xpander": ["GLS MT", "Ultimate CVT"],
  "New Xpander Cross": ["MT", "Premium CVT"],
  "XFORCE": ["Ultimate CVT"],
  "L300": ["Pick Up Flat Deck", "Cab Chasiss"],
  "All New Triton": ["HDX MT Double Cab 4WD", "Ultimate AT Double Cab 4WD"],
  "Canter": ["FE 71 (4 Ban)", "FE 74 HD (6 Ban)", "FE SHDX (6 Ban)"],
  "Fuso": ["Fighter X FM 65", "Fighter X FN 62"],
  "Tractor Head": ["Fighter X FN 62 F HD"],
  "L100 EV": ["L100 EV Blind Van"]
};

const PenawaranModal = ({ isOpen, onClose, selectedModel, selectedVarian }) => {
  const [formData, setFormData] = useState({
    nama: '',
    jenisKelamin: '',
    whatsapp: '',
    model: 'Pilih Model',
    varian: 'Pilih Varian',
    pembayaran: 'Cash / Tunai',
    domisili: '',
    catatan: ''
  });

  useEffect(() => {
    if (isOpen) {
      const initialModel = carData[selectedModel] ? selectedModel : 'Pilih Model';

      let initialVarian = 'Pilih Varian';
      if (initialModel !== 'Pilih Model' && carData[initialModel].includes(selectedVarian)) {
        initialVarian = selectedVarian;
      }

      setFormData({
        nama: '',
        jenisKelamin: '',
        whatsapp: '',
        model: initialModel,
        varian: initialVarian,
        pembayaran: 'Cash / Tunai',
        domisili: '',
        catatan: ''
      });
    }
  }, [isOpen, selectedModel, selectedVarian]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setFormData({
      ...formData,
      model: newModel,
      varian: 'Pilih Varian'
    });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const noWA = '6281212345678';

    if (formData.model === 'Pilih Model' || formData.varian === 'Pilih Varian') {
      alert('Silakan pilih Model dan Varian kendaraan terlebih dahulu.');
      return;
    }

    const message = `Halo Mitsubishi Utama, saya ingin meminta penawaran kendaraan:%0A%0A` +
      `*Model:* ${formData.model}%0A` +
      `*Varian:* ${formData.varian}%0A` +
      `*Rencana Pembayaran:* ${formData.pembayaran}%0A%0A` +
      `*Data Diri:*%0A` +
      `- Nama: ${formData.nama}%0A` +
      `- Domisili: ${formData.domisili}%0A` +
      `- No WA: ${formData.whatsapp}%0A%0A` +
      `*Catatan:* ${formData.catatan}`;

    window.open(`https://wa.me/${noWA}?text=${message}`, '_blank');
    onClose();
  };

  const availableVariants = carData[formData.model] || ["Pilih Varian"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">

        <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex justify-between items-center rounded-t-xl z-10">
          <h3 className="text-xl font-extrabold text-brand-black">Dapatkan Penawaran</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-3">Login untuk menyimpan data Anda dan auto-fill di kunjungan berikutnya</p>
            <button className="flex items-center justify-center w-full bg-white border border-gray-300 py-2 rounded-md shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4 mr-2" alt="Google" />
              Login dengan Google
            </button>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
              <input required type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="Nama Anda" className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-brand-red focus:border-brand-red outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
              <div className="flex space-x-4">
                <label className="flex items-center text-sm text-gray-600"><input type="radio" name="jenisKelamin" value="Laki-laki" onChange={handleInputChange} className="mr-2 accent-brand-red" /> Laki-laki</label>
                <label className="flex items-center text-sm text-gray-600"><input type="radio" name="jenisKelamin" value="Perempuan" onChange={handleInputChange} className="mr-2 accent-brand-red" /> Perempuan</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor WhatsApp</label>
              <input required type="number" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="08123456789" className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-brand-red focus:border-brand-red outline-none" />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Model</label>
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleModelChange}
                  className="w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm focus:ring-brand-red focus:border-brand-red outline-none cursor-pointer"
                >
                  {Object.keys(carData).map((modelName) => (
                    <option key={modelName} value={modelName} disabled={modelName === 'Pilih Model'}>
                      {modelName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Varian</label>
                <select
                  name="varian"
                  value={formData.varian}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm focus:ring-brand-red focus:border-brand-red outline-none cursor-pointer"
                  disabled={formData.model === 'Pilih Model'}
                >
                  <option value="Pilih Varian" disabled>Pilih Varian</option>
                  {availableVariants.filter(v => v !== 'Pilih Varian').map((variantName) => (
                    <option key={variantName} value={variantName}>
                      {variantName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rencana Pembayaran</label>
              <div className="flex space-x-4">
                <label className="flex items-center text-sm text-gray-600"><input type="radio" name="pembayaran" value="Cash / Tunai" defaultChecked onChange={handleInputChange} className="mr-2 accent-brand-red" /> Cash / Tunai</label>
                <label className="flex items-center text-sm text-gray-600"><input type="radio" name="pembayaran" value="Kredit / Cicilan" onChange={handleInputChange} className="mr-2 accent-brand-red" /> Kredit / Cicilan</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Kota Domisili</label>
              <input required type="text" name="domisili" value={formData.domisili} onChange={handleInputChange} placeholder="Contoh: Jakarta Selatan" className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-brand-red focus:border-brand-red outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Catatan</label>
              <textarea name="catatan" value={formData.catatan} onChange={handleInputChange} placeholder="Tanya simulasi kredit atau test drive..." rows="3" className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-brand-red focus:border-brand-red outline-none resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-brand-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-md mt-4">
              Kirim via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PenawaranModal;