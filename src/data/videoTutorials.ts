export interface VideoPlaylist {
  id: string;
  title: string;
  query: string;
  searchUrl: string;
  thumbnail: string;
  category: string;
  badge: string;
}

export interface FeaturedVideo {
  id: string;
  videoId: string;
  url: string;
  thumbnail: string;
  category: string;
}

// 20 curated YouTube search playlists
export const playlists: VideoPlaylist[] = [
  { id: "p1", title: "AI Tutorial for Beginners", query: "artificial intelligence tutorial beginner", searchUrl: "https://www.youtube.com/results?search_query=artificial+intelligence+tutorial+beginner", thumbnail: "https://img.youtube.com/vi/JMUxmLyrhSk/hqdefault.jpg", category: "AI Basics", badge: "Beginner" },
  { id: "p2", title: "What is Artificial Intelligence", query: "what is artificial intelligence", searchUrl: "https://www.youtube.com/results?search_query=what+is+artificial+intelligence", thumbnail: "https://img.youtube.com/vi/2ePf9rue1Ao/hqdefault.jpg", category: "AI Basics", badge: "Intro" },
  { id: "p3", title: "Machine Learning Full Course", query: "machine learning full course", searchUrl: "https://www.youtube.com/results?search_query=machine+learning+full+course", thumbnail: "https://img.youtube.com/vi/i_LwzRVP7bg/hqdefault.jpg", category: "Machine Learning", badge: "Full Course" },
  { id: "p4", title: "Deep Learning Tutorial", query: "deep learning tutorial", searchUrl: "https://www.youtube.com/results?search_query=deep+learning+tutorial", thumbnail: "https://img.youtube.com/vi/VyWAvY2CF9c/hqdefault.jpg", category: "Deep Learning", badge: "Advanced" },
  { id: "p5", title: "Neural Networks Explained", query: "neural network explained", searchUrl: "https://www.youtube.com/results?search_query=neural+network+explained", thumbnail: "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg", category: "Deep Learning", badge: "Visual" },
  { id: "p6", title: "Python for AI Beginners", query: "python for ai beginners", searchUrl: "https://www.youtube.com/results?search_query=python+for+ai+beginners", thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg", category: "Programming", badge: "Beginner" },
  { id: "p7", title: "AI for Students", query: "ai for students", searchUrl: "https://www.youtube.com/results?search_query=ai+for+students", thumbnail: "https://img.youtube.com/vi/ad79nYk2keg/hqdefault.jpg", category: "Education", badge: "Student" },
  { id: "p8", title: "AI Project Ideas", query: "ai project ideas", searchUrl: "https://www.youtube.com/results?search_query=ai+project+ideas", thumbnail: "https://img.youtube.com/vi/8yGfQak-q9M/hqdefault.jpg", category: "Projects", badge: "Inspire" },
  { id: "p9", title: "Build an AI App Tutorial", query: "build ai app tutorial", searchUrl: "https://www.youtube.com/results?search_query=build+ai+app+tutorial", thumbnail: "https://img.youtube.com/vi/mJwPvyc4-rk/hqdefault.jpg", category: "App Building", badge: "Hands-on" },
  { id: "p10", title: "ChatGPT Tutorial for Beginners", query: "chatgpt tutorial beginner", searchUrl: "https://www.youtube.com/results?search_query=chatgpt+tutorial+beginner", thumbnail: "https://img.youtube.com/vi/JTxsNm9IdYU/hqdefault.jpg", category: "ChatGPT", badge: "Trending" },
  { id: "p11", title: "Generative AI Explained", query: "generative ai explained", searchUrl: "https://www.youtube.com/results?search_query=generative+ai+explained", thumbnail: "https://img.youtube.com/vi/cqaTQ75Rbpg/hqdefault.jpg", category: "Generative AI", badge: "Hot" },
  { id: "p12", title: "AI Tools 2026", query: "ai tools 2026", searchUrl: "https://www.youtube.com/results?search_query=ai+tools+2026", thumbnail: "https://img.youtube.com/vi/vMyGXboO4wI/hqdefault.jpg", category: "AI Tools", badge: "Latest" },
  { id: "p13", title: "Best Free AI Tools", query: "best ai tools free", searchUrl: "https://www.youtube.com/results?search_query=best+ai+tools+free", thumbnail: "https://img.youtube.com/vi/D-VIcOlZuZo/hqdefault.jpg", category: "AI Tools", badge: "Free" },
  { id: "p14", title: "AI Website Builder Tutorial", query: "ai website builder tutorial", searchUrl: "https://www.youtube.com/results?search_query=ai+website+builder+tutorial", thumbnail: "https://img.youtube.com/vi/mJwPvyc4-rk/hqdefault.jpg", category: "App Building", badge: "Builder" },
  { id: "p15", title: "Lovable AI Tutorial", query: "lovable ai tutorial", searchUrl: "https://www.youtube.com/results?search_query=lovable+ai+tutorial", thumbnail: "https://img.youtube.com/vi/V0c5y7m6RxE/hqdefault.jpg", category: "App Building", badge: "Lovable" },
  { id: "p16", title: "Bolt AI Builder Tutorial", query: "bolt ai builder tutorial", searchUrl: "https://www.youtube.com/results?search_query=bolt+ai+builder+tutorial", thumbnail: "https://img.youtube.com/vi/CY7r3SqmcSY/hqdefault.jpg", category: "App Building", badge: "Bolt" },
  { id: "p17", title: "How to Build a Chatbot", query: "how to build chatbot", searchUrl: "https://www.youtube.com/results?search_query=how+to+build+chatbot", thumbnail: "https://img.youtube.com/vi/SJDEOWLHYVo/hqdefault.jpg", category: "Chatbots", badge: "Build" },
  { id: "p18", title: "NLP Tutorial for Beginners", query: "nlp tutorial beginner", searchUrl: "https://www.youtube.com/results?search_query=nlp+tutorial+beginner", thumbnail: "https://img.youtube.com/vi/X2vAabgKiuM/hqdefault.jpg", category: "NLP", badge: "Beginner" },
  { id: "p19", title: "Computer Vision Tutorial", query: "computer vision tutorial", searchUrl: "https://www.youtube.com/results?search_query=computer+vision+tutorial", thumbnail: "https://img.youtube.com/vi/01sAkU_NvOY/hqdefault.jpg", category: "Computer Vision", badge: "Hands-on" },
  { id: "p20", title: "AI in Education", query: "ai in education", searchUrl: "https://www.youtube.com/results?search_query=ai+in+education", thumbnail: "https://img.youtube.com/vi/9YoyrlmF1Vo/hqdefault.jpg", category: "Education", badge: "EdTech" },
];

// Build featured videos list from provided IDs (deduped)
const rawIds = [
  "2ePf9rue1Ao","aircAruvnKk","JMUxmLyrhSk","Gv9_4yMHFhI","5NgNicANyqM","ua-CiDNNj30","IpGxLWOIZy4","KNAWp2S3w94",
  "8zKuNo4ay8E","7eh4d6sabA0","O5nskjZ_GoI","E5RjzSK0fvY","YqjVtK6iW6k","Adh1fYl4w2E","UwsrzCVZAb8","6m0Zl4r9h9E",
  "1gDhl4leEzA","U9R9MZpV8bE","R9OHn5ZF4Uo","3Kq1MIfTWCE","8yGfQak-q9M","O4xNJsjtN6E","3k2d9F3s8XU","F1O1y1XgP2k",
  "Ai1xqX8YdXg","z-EtmaFJieY","GkZ1n7yK2lE","Ybq7G6k3lP8","8XyZq9m2JpE","6w3n2QvP0yM","HjF9l2zP1kA","Qk3d9f8L2Xc",
  "Z8y7P1n3KcM","4G5kL1m2QpE","Y7k3L9f2N1A","J3k2P9m1XzE","8Lk3mP2Q9Zc","6Zk1P3n2LmE","2Qk9L3mP1Zc","7Pk3L1m9Z2E",
  "5Lm9P2k3Z1E","9Zk3P1m2LQe","4Pk2L9m1Z3E","3Lm1P2k9Z8E","8Pk3L2m1Z9E","1Lm9P3k2Z8E","7Zk3P2m1L9E","2Lm1P3k9Z8E",
  "6Pk3L9m2Z1E","9Lm1P2k3Z8E","ukzFI9rgwfU","rfscVS0vtbw","8rXD5-xhemo","tPYj3fFJGjk",
];

const categories = ["AI Basics","Machine Learning","Deep Learning","ChatGPT","Generative AI","Programming","Computer Vision","NLP","App Building","Chatbots"];
const uniqueIds = Array.from(new Set(rawIds));

export const featuredVideos: FeaturedVideo[] = uniqueIds.map((vid, i) => ({
  id: `v${i + 1}`,
  videoId: vid,
  url: `https://www.youtube.com/watch?v=${vid}`,
  thumbnail: `https://img.youtube.com/vi/${vid}/hqdefault.jpg`,
  category: categories[i % categories.length],
}));

export const allCategories = ["All", ...Array.from(new Set([...playlists.map(p => p.category), ...categories]))];
