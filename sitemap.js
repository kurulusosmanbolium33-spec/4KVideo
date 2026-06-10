import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "video-cms-b7c1e.firebaseapp.com",
  projectId: "video-cms-b7c1e",
  storageBucket: "video-cms-b7c1e.firebasestorage.app",
  messagingSenderId: "991575420179",
  appId: "1:991575420179:web:23459a09aa36f868e37ee6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {

  const snapshot = await getDocs(collection(db, "videos"));

  let urls = "";

  snapshot.forEach((doc) => {
    urls += `
    <url>
      <loc>https://www.4kpornvideo.com/video.html?id=${doc.id}</loc>
    </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
      <loc>https://www.4kpornvideo.com/</loc>
    </url>

    ${urls}

  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(sitemap);
}
