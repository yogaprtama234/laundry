import React, { useState, useEffect } from 'react';

// Main App Component
function App() {
  // State to manage current view (simple routing for a profile site)
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Simulate fetching data from a backend API
  useEffect(() => {
    setLoading(true);
    // Simulate API call for services
    setTimeout(() => {
      setServices([
        { id: 1, name: 'Cuci Kiloan', description: 'Pakaian Anda dicuci, dikeringkan, dan dilipat rapi per kilogram.', price: 'Rp 7.000/kg', icon: '🧺' },
        { id: 2, name: 'Cuci Satuan', description: 'Cocok untuk pakaian khusus seperti gaun, jas, atau selimut.', price: 'Mulai Rp 25.000', icon: '👔' },
        { id: 3, name: 'Dry Clean', description: 'Pembersihan tanpa air untuk bahan sensitif, menjaga kualitas kain.', price: 'Mulai Rp 35.000', icon: '✨' },
        { id: 4, name: 'Setrika Saja', description: 'Pakaian Anda disetrika hingga licin dan siap pakai.', price: 'Rp 5.000/kg', icon: '♨️' },
        { id: 5, name: 'Cuci Sepatu', description: 'Pembersihan profesional untuk sepatu kesayangan Anda.', price: 'Mulai Rp 40.000', icon: '👟' },
        { id: 6, name: 'Cuci Karpet', description: 'Karpet Anda bersih, wangi, dan bebas noda.', price: 'Mulai Rp 20.000/m²', icon: '🧼' },
      ]);
      // Simulate API call for testimonials
      setTimeout(() => {
        setTestimonials([
          { id: 1, name: 'Budi Santoso', quote: 'Layanan sangat cepat dan bersih! Pakaian selalu wangi dan rapi. Sangat direkomendasikan!', avatar: 'https://placehold.co/100x100/A78BFA/ffffff?text=BS' },
          { id: 2, name: 'Siti Aminah', quote: 'Harga terjangkau dengan kualitas premium. Tidak pernah kecewa dengan hasilnya.', avatar: 'https://placehold.co/100x100/FDBA74/ffffff?text=SA' },
          { id: 3, name: 'Andi Wijaya', quote: 'Penjemputan dan pengantaran tepat waktu. Sangat membantu di tengah kesibukan saya.', avatar: 'https://placehold.co/100x100/93C5FD/ffffff?text=AW' },
          { id: 4, name: 'Dewi Lestari', quote: 'Pakaian saya yang sensitif selalu ditangani dengan hati-hati. Terima kasih!', avatar: 'https://placehold.co/100x100/FCA5A5/ffffff?text=DL' },
        ]);
        setLoading(false);
      }, 800); // Simulate network delay for testimonials
    }, 1000); // Simulate network delay for services
  }, []);

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50">
      <Navbar setCurrentPage={setCurrentPage} />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
          <p className="ml-4 text-lg text-indigo-600">Memuat data...</p>
        </div>
      ) : (
        <>
          {currentPage === 'home' && <Home services={services} testimonials={testimonials} setCurrentPage={setCurrentPage} />}
          {currentPage === 'about' && <About />}
          {currentPage === 'services' && <Services services={services} />}
          {currentPage === 'contact' && <Contact />}
        </>
      )}

      <Footer />
    </div>
  );
}

// Navbar Component
const Navbar = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg py-4 px-6 md:px-12 fixed w-full z-50 rounded-b-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
          {/* Simple MDL Logo */}
          <span className="text-indigo-600 text-4xl font-extrabold font-['Playfair_Display'] mr-2">MDL</span>
          <div className="text-2xl font-bold text-gray-800">
            Mama Dhea Laundry
          </div>
        </div>
        <div className="hidden md:flex space-x-8">
          <NavItem title="Beranda" onClick={() => setCurrentPage('home')} />
          <NavItem title="Tentang Kami" onClick={() => setCurrentPage('about')} />
          <NavItem title="Layanan" onClick={() => setCurrentPage('services')} />
          <NavItem title="Kontak" onClick={() => setCurrentPage('contact')} />
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <MobileNavItem title="Beranda" onClick={() => { setCurrentPage('home'); setIsOpen(false); }} />
          <MobileNavItem title="Tentang Kami" onClick={() => { setCurrentPage('about'); setIsOpen(false); }} />
          <MobileNavItem title="Layanan" onClick={() => { setCurrentPage('services'); setIsOpen(false); }} />
          <MobileNavItem title="Kontak" onClick={() => { setCurrentPage('contact'); setIsOpen(false); }} />
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ title, onClick }) => (
  <a href="#" onClick={onClick} className="text-gray-600 hover:text-indigo-600 font-medium transition duration-300">
    {title}
  </a>
);

const MobileNavItem = ({ title, onClick }) => (
  <a href="#" onClick={onClick} className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-300">
    {title}
  </a>
);

// Home Component
const Home = ({ services, testimonials, setCurrentPage }) => {
  // Placeholder image URL for laundry background
  const laundryBgUrl = "https://placehold.co/1920x1080/6366F1/ffffff?text=Laundry+Background"; // You can replace this with a real image URL

  return (
    <main className="pt-24"> {/* Add padding top to account for fixed navbar */}
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 overflow-hidden rounded-b-3xl shadow-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${laundryBgUrl})` }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-indigo-800 opacity-70"></div>
        <div className="container mx-auto text-center relative z-10 px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-down">
            Pakaian Bersih, Hidup Lebih Mudah
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up">
            Layanan laundry profesional dengan kualitas terbaik, cepat, dan terpercaya. Kami peduli pada pakaian Anda seperti kami peduli pada Anda.
          </p>
          <button
            onClick={() => setCurrentPage('services')}
            className="bg-white text-indigo-700 hover:bg-indigo-500 hover:text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg"
          >
            Lihat Layanan Kami
          </button>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 bg-white rounded-xl shadow-md mx-auto my-12 max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Layanan Unggulan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map(service => ( // Show first 3 services
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentPage('services')}
            className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Lihat Semua Layanan
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-indigo-50 rounded-xl shadow-md mx-auto my-12 max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Mengapa Memilih Mama Dhea Laundry?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="⚡"
            title="Proses Cepat"
            description="Pakaian Anda siap dalam waktu singkat tanpa mengurangi kualitas."
          />
          <FeatureCard
            icon="💧"
            title="Bersih Maksimal"
            description="Menggunakan deterjen berkualitas tinggi dan teknik pencucian modern."
          />
          <FeatureCard
            icon="💰"
            title="Harga Terjangkau"
            description="Layanan premium dengan harga yang bersahabat di kantong Anda."
          />
          <FeatureCard
            icon="♻️"
            title="Ramah Lingkungan"
            description="Kami berkomitmen menggunakan produk dan proses yang aman bagi lingkungan."
          />
          <FeatureCard
            icon="📦"
            title="Penjemputan & Pengantaran"
            description="Layanan antar jemput untuk kenyamanan maksimal Anda."
          />
          <FeatureCard
            icon="💖"
            title="Pelayanan Ramah"
            description="Staf kami siap melayani Anda dengan senyum dan profesionalisme."
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white rounded-xl shadow-md mx-auto my-12 max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Apa Kata Pelanggan Kami?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center rounded-xl shadow-xl mx-auto my-12 max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Pakaian Anda Bersih dan Rapi?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Jangan tunda lagi! Hubungi kami sekarang untuk mendapatkan layanan laundry terbaik di kota Anda.
        </p>
        <button
          onClick={() => setCurrentPage('contact')}
          className="bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg"
        >
          Hubungi Kami Sekarang
        </button>
      </section>
    </main>
  );
};

// About Component
const About = () => {
  return (
    <main className="pt-24 py-16 bg-gray-50">
      <section className="container mx-auto px-6 py-12 bg-white rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">Tentang Mama Dhea Laundry</h1>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img
              src="https://placehold.co/600x400/6366F1/ffffff?text=Our+Laundry+Facility"
              alt="Our Laundry Facility"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/6366F1/ffffff?text=Gambar+Fasilitas+Laundry"; }}
            />
          </div>
          <div className="md:w-1/2 text-gray-700 leading-relaxed">
            <p className="mb-4 text-lg">
              Mama Dhea Laundry didirikan dengan satu tujuan: untuk menyediakan layanan laundry berkualitas tinggi yang memudahkan hidup Anda. Kami memahami betapa berharganya waktu Anda, dan itulah mengapa kami berkomitmen untuk memberikan hasil yang bersih, rapi, dan tepat waktu.
            </p>
            <p className="mb-4 text-lg">
              Berawal dari sebuah ide sederhana untuk membantu masyarakat dengan kebutuhan laundry mereka, kami telah berkembang menjadi salah satu penyedia layanan laundry terkemuka di kota ini. Kami bangga dengan tim profesional kami yang terlatih, mesin-mesin canggih, dan penggunaan produk pembersih ramah lingkungan.
            </p>
            <p className="mb-4 text-lg">
              Kami percaya bahwa setiap helai pakaian memiliki cerita, dan kami berdedikasi untuk merawatnya dengan cermat. Dari cuci kiloan harian hingga dry clean untuk pakaian khusus, Mama Dhea Laundry adalah mitra terpercaya Anda untuk semua kebutuhan perawatan pakaian.
            </p>
            <p className="text-lg font-semibold text-indigo-600">
              Visi kami adalah menjadi solusi laundry pilihan utama bagi setiap rumah tangga dan bisnis, dengan memberikan pelayanan yang melampaui ekspektasi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

// Services Component
const Services = ({ services }) => {
  return (
    <main className="pt-24 py-16 bg-gray-50">
      <section className="container mx-auto px-6 py-12 bg-white rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">Daftar Layanan Kami</h1>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Kami menawarkan berbagai layanan laundry yang disesuaikan dengan kebutuhan Anda. Pilih layanan yang paling cocok untuk pakaian Anda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} fullDescription={true} />
          ))}
        </div>
      </section>
    </main>
  );
};

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend API
    console.log('Form submitted:', formData);
    alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', message: '' }); // Clear form
  };

  return (
    <main className="pt-24 py-16 bg-gray-50">
      <section className="container mx-auto px-6 py-12 bg-white rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">Hubungi Kami</h1>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Ada pertanyaan, saran, atau ingin memesan layanan? Jangan ragu untuk menghubungi kami melalui formulir di bawah ini atau informasi kontak kami.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kirim Pesan kepada Kami</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  placeholder="Nama Anda"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  placeholder="email@contoh.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Pesan Anda</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out w-full"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-indigo-50 p-8 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Kontak</h2>
            <div className="space-y-6">
              <ContactInfoItem icon="📍" title="Alamat" value="ds Kesamben, Kec Plumpang Kab Tuban" />
              <ContactInfoItem icon="📞" title="Telepon" value="085806425332" link="tel:+6285806425332" />
              <ContactInfoItem icon="📱" title="WhatsApp Cabang Magersari" value="085806425332" link="https://wa.me/6285806425332" />
              <ContactInfoItem icon="📱" title="WhatsApp Cabang Mberon" value="085232681147" link="https://wa.me/6285232681147" />
              <ContactInfoItem icon="📧" title="Email" value="info@mamadhealaundry.com" link="mailto:info@mamadhealaundry.com" />
              <ContactInfoItem icon="⏰" title="Jam Buka" value="Senin - Sabtu: 08:00 - 20:00" />
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Temukan Kami di Peta</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                {/* Placeholder for Google Maps iframe - Updated to a more generic location */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.088686616682!2d112.0833182147743!3d-7.07223799493922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77926b00000001%3A0x0!2sKesamben%2C%20Plumpang%2C%20Tuban%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1678901234567!5m2!1sen!2sid"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Mama Dhea Laundry"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ContactInfoItem = ({ icon, title, value, link }) => (
  <div className="flex items-start">
    <span className="text-2xl mr-4 flex-shrink-0">{icon}</span>
    <div>
      <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-base">
          {value}
        </a>
      ) : (
        <p className="text-gray-600 text-base">{value}</p>
      )}
    </div>
  </div>
);


// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-12 rounded-t-xl shadow-inner">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">Mama Dhea Laundry</h3>
            <p className="text-gray-400 text-sm">
              Solusi laundry terpercaya untuk pakaian bersih dan rapi Anda. Kami berkomitmen memberikan layanan terbaik dengan kualitas premium.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">Beranda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">Tentang Kami</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">Layanan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">Kontak</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Hubungi Kami</h4>
            <p className="text-gray-400 text-sm mb-2">📍 ds Kesamben, Kec Plumpang Kab Tuban</p>
            <p className="text-gray-400 text-sm mb-2">📞 085806425332</p>
            <p className="text-gray-400 text-sm mb-2">📱 WA Cabang Magersari: <a href="https://wa.me/6285806425332" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">085806425332</a></p>
            <p className="text-gray-400 text-sm mb-2">📱 WA Cabang Mberon: <a href="https://wa.me/6285232681147" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">085232681147</a></p>
            <p className="text-gray-400 text-sm mb-2">📧 mamadhealaundry22@gmail.com</p>
            <div className="flex space-x-4 mt-4 justify-center md:justify-start">
              {/* Social Media Icons - Placeholder */}
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.779 1.674 4.931 4.931.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.85-1.674 3.252-1.674 4.779-4.931 4.931-1.265.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.779-1.674-4.931-4.931-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.07-4.85 1.674-3.252 1.674-4.779 4.931-4.931 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.622-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.622 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.622 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.248-1.333 1.172-1.333h2.828v-5h-3.996c-4.067 0-5.004 3.007-5.004 4.874v2.126z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.407 0-6.17 2.76-6.17 6.17 0 .485.055.955.145 1.404-5.131-.256-9.673-2.72-12.721-6.447-.527.906-.833 1.956-.833 3.224 0 2.151 1.082 4.053 2.721 5.176-.798-.024-1.549-.245-2.206-.604v.075c0 2.986 2.127 5.474 4.931 6.03-.412.111-.849.17-1.296.17-.318 0-.626-.031-.926-.086.786 2.44 3.06 4.22 5.767 4.269-2.094 1.64-4.736 2.62-7.61 2.62-.495 0-.98-.029-1.458-.085 2.874 1.815 6.29 2.874 9.957 2.874 11.972 0 18.536-9.912 18.536-18.536 0-.281-.006-.557-.019-.836.969-.699 1.801-1.593 2.46-2.582z"></path></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Mama Dhea Laundry. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Reusable Service Card Component
const ServiceCard = ({ service, fullDescription = false }) => (
  <div className="bg-indigo-50 p-6 rounded-xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center text-center">
    <div className="text-5xl mb-4">{service.icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
    <p className="text-gray-600 mb-4 flex-grow">{fullDescription ? service.description : service.description.substring(0, 70) + '...'}</p>
    <p className="text-indigo-600 font-bold text-lg">{service.price}</p>
  </div>
);

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
    <div className="text-5xl mb-4 text-indigo-600">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Reusable Testimonial Card Component
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-indigo-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
    <img
      src={testimonial.avatar}
      alt={testimonial.name}
      className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-indigo-300 shadow-lg"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/A78BFA/ffffff?text=User"; }}
    />
    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
    <p className="font-semibold text-indigo-600">- {testimonial.name}</p>
  </div>
);

export default App;
