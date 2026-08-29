import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://usekarsa.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/harga`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tentang-kami`, changeFrequency: "yearly", priority: 0.5 },
    {
      url: `${base}/jasa-script-video-tiktok`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/jasa-konten-video-umkm`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/jasa-content-creator-umkm`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/jasa-artikel-seo`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/paket-konten-instagram`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${base}/blog/jasa-konten-video-umkm-untuk-penjualan`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/blog/cara-membuat-video-tiktok-produk-umkm`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/blog/berapa-biaya-jasa-content-creator-umkm`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/blog/cara-menulis-artikel-seo-untuk-toko-online`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/refund`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return staticPages;
}