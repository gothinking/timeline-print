import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Instagram, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Timeline Print Bumirejo - Home Page
 * Design: Playful Modern with Coral, Lavender, and Periwinkle Blue
 * Features: Service showcase, pricing display, order form, contact information
 */

interface OrderItem {
  service: string;
  quantity: number;
  price: number;
}

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const services = [
    {
      category: "Print",
      icon: "🖨️",
      items: [
        { name: "Hitam Putih", price: 500 },
        { name: "Warna", price: 500 },
        { name: "½ Warna", price: 1000 },
        { name: "Full Warna", price: 1500 },
      ],
    },
    {
      category: "Copy",
      icon: "📋",
      items: [
        { name: "Hitam Putih", price: 250 },
        { name: "Warna", price: 1000 },
      ],
    },
    {
      category: "Scan",
      icon: "📸",
      items: [{ name: "Scan", price: 1000 }],
    },
    {
      category: "Cetak Foto",
      icon: "📷",
      items: [
        { name: "2x3", price: 3500 },
        { name: "3x4", price: 4500 },
        { name: "4x6", price: 4000 },
        { name: "2R (6,35x8,89)", price: 2500 },
        { name: "3R (8,89x12,7)", price: 3000 },
        { name: "4R (10,2x15,2)", price: 3500 },
        { name: "5R (12,7x17,8)", price: 5000 },
        { name: "6R (15,2x20,3)", price: 5500 },
        { name: "8R (20,3x25,4)", price: 8500 },
        { name: "S8R (A4)", price: 8500 },
      ],
    },
    {
      category: "Cetak Polaroid",
      icon: "📸",
      items: [
        { name: "Mini (6 x 9 cm)", price: 12000 },
        { name: "Square (8 x 8 cm)", price: 14000 },
        { name: "Standar (7,5 x 9 cm)", price: 16000 },
        { name: "Strip A (5 x 15 cm)", price: 20000 },
        { name: "Strip B (7,7 x 17,8 cm)", price: 25000 },
        { name: "Snapshot A (10 x 15 cm)", price: 30000 },
        { name: "Snapshot B (11,5 x 17 cm)", price: 35000 },
        { name: "Mix (1,2,3)", price: 15000 },
      ],
    },
    {
      category: "Jasa Edit Dokumen",
      icon: "✏️",
      items: [
        { name: "Jasa Ketik", price: 3000 },
        { name: "Jasa Formatting", price: 1000 },
      ],
    },
  ];

  const addToOrder = (serviceName: string, price: number) => {
    const existingItem = orderItems.find((item) => item.service === serviceName);
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.service === serviceName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems([
        ...orderItems,
        { service: serviceName, quantity: 1, price },
      ]);
    }
    toast.success(`${serviceName} ditambahkan ke pesanan`);
  };

  const removeFromOrder = (serviceName: string) => {
    setOrderItems(orderItems.filter((item) => item.service !== serviceName));
    toast.success(`${serviceName} dihapus dari pesanan`);
  };

  const updateQuantity = (serviceName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(serviceName);
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.service === serviceName ? { ...item, quantity } : item
        )
      );
    }
  };

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmitOrder = () => {
    if (!customerName || !customerPhone) {
      toast.error("Silakan isi nama dan nomor telepon");
      return;
    }

    if (orderItems.length === 0) {
      toast.error("Silakan tambahkan minimal satu layanan");
      return;
    }

    const orderSummary = orderItems
      .map((item) => `${item.service} x${item.quantity} = Rp ${item.price * item.quantity}`)
      .join("\n");

    const message = `Halo Timeline Print!\n\nNama: ${customerName}\nNo. Telepon: ${customerPhone}\nEmail: ${customerEmail || "-"}\n\nPesanan:\n${orderSummary}\n\nTotal: Rp ${totalPrice}\n\nCatatan: ${orderNotes || "-"}`;

    const whatsappUrl = `https://wa.me/083898121684?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast.success("Pesanan dikirim ke WhatsApp!");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setOrderNotes("");
    setOrderItems([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663369510594/U95YbHfyA34WmM5eQpZn65/hero-background-7NLX4ub3uCbjan5k8dZ7Ct.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="text-6xl md:text-7xl font-bold mb-6"
            style={{ fontFamily: "Fredoka, sans-serif", color: "#FF6B5B" }}
          >
            Timeline Print
          </h1>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-8"
            style={{ fontFamily: "Fredoka, sans-serif", color: "#2C2C2C" }}
          >
            Bumirejo
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
            Layanan Printing, Scanning, Copying, dan Edit Dokumen Terpercaya
          </p>
          <Button
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-coral text-lg"
          >
            Lihat Layanan Kami
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <h2
            className="text-5xl font-bold text-center mb-4"
            style={{ fontFamily: "Fredoka, sans-serif", color: "#FF6B5B" }}
          >
            Layanan Kami
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Berbagai pilihan layanan printing dan dokumen untuk kebutuhan Anda
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="service-card">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "Fredoka, sans-serif", color: "#FF6B5B" }}
                >
                  {service.category}
                </h3>
                <div className="space-y-3">
                  {service.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex justify-between items-center p-3 bg-[#E8E8F0] rounded-xl hover:bg-[#DDD8E8] transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-[#FF6B5B] font-bold">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <button
                        onClick={() => addToOrder(item.name, item.price)}
                        className="bg-[#6B8FD9] text-white p-2 rounded-full hover:bg-[#5B7FD9] transition-colors"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section
        id="order"
        className="py-20"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663369510594/U95YbHfyA34WmM5eQpZn65/contact-section-bg-mBsRt5RNMRBGm2krh9oAQC.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <h2
                className="text-4xl font-bold mb-8"
                style={{ fontFamily: "Fredoka, sans-serif", color: "#FF6B5B" }}
              >
                Ringkasan Pesanan
              </h2>

              {orderItems.length === 0 ? (
                <Card className="p-8 bg-[#E8E8F0] text-center">
                  <p className="text-gray-600 text-lg">
                    Belum ada layanan yang dipilih. Tambahkan layanan dari atas!
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item, idx) => (
                    <Card key={idx} className="p-4 bg-white border-2 border-[#E8E8F0]">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-gray-800">
                            {item.service}
                          </p>
                          <p className="text-[#FF6B5B] font-semibold">
                            Rp {item.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.service, item.quantity - 1)
                            }
                            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.service, item.quantity + 1)
                            }
                            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                          Subtotal: Rp{" "}
                          {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                        <button
                          onClick={() => removeFromOrder(item.service)}
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          Hapus
                        </button>
                      </div>
                    </Card>
                  ))}

                  <Card className="p-6 bg-gradient-to-r from-[#FF6B5B] to-[#FFA366] text-white">
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold">Total:</p>
                      <p className="text-3xl font-bold">
                        Rp {totalPrice.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {/* Order Form */}
            <div>
              <h2
                className="text-4xl font-bold mb-8"
                style={{ fontFamily: "Fredoka, sans-serif", color: "#FF6B5B" }}
              >
                Form Pemesanan
              </h2>

              <Card className="p-8 bg-white">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="rounded-xl border-2 border-[#E8E8F0] focus:border-[#FF6B5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      No. Telepon *
                    </label>
                    <Input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="rounded-xl border-2 border-[#E8E8F0] focus:border-[#FF6B5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (Opsional)
                    </label>
                    <Input
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="email@example.com"
                      type="email"
                      className="rounded-xl border-2 border-[#E8E8F0] focus:border-[#FF6B5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Catatan Pesanan (Opsional)
                    </label>
                    <Textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Tuliskan catatan khusus untuk pesanan Anda..."
                      className="rounded-xl border-2 border-[#E8E8F0] focus:border-[#FF6B5B] min-h-24"
                    />
                  </div>

                  <Button
                    onClick={handleSubmitOrder}
                    className="btn-coral w-full text-lg"
                  >
                    Pesan Sekarang via WhatsApp
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Dengan mengklik tombol di atas, Anda akan diarahkan ke WhatsApp
                    untuk menyelesaikan pemesanan.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#E8E8F0]">
        <div className="container max-w-6xl mx-auto px-4">
          <h2
            className="text-5xl font-bold text-center mb-16"
            style={{ fontFamily: "Fredoka, sans-serif", color: "#FF6B5B" }}
          >
            Hubungi Kami
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="service-card text-center">
              <Phone className="w-16 h-16 mx-auto mb-4 text-[#FF6B5B]" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">WhatsApp</h3>
              <a
                href="https://wa.me/083898121684"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B8FD9] font-semibold hover:underline"
              >
                083898121684
              </a>
            </Card>

            <Card className="service-card text-center">
              <Instagram className="w-16 h-16 mx-auto mb-4 text-[#FF6B5B]" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Instagram</h3>
              <a
                href="https://instagram.com/timelineprint.bumirejo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B8FD9] font-semibold hover:underline"
              >
                @timelineprint.bumirejo
              </a>
            </Card>

            <Card className="service-card text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 text-[#FF6B5B]" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Lokasi</h3>
              <p className="text-gray-600">Tiban, Bumirejo, Mungkid, Magelang</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">
            © 2026 Timeline Print Bumirejo. Semua hak dilindungi.
          </p>
          <p className="text-gray-400">
            Layanan Printing, Scanning, Copying, dan Edit Dokumen Berkualitas
          </p>
        </div>
      </footer>
    </div>
  );
}
