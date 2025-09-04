"use strict";
// const testingData = [
//   {
//     title: "kkklling eyes",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753692735/kkkilling_eyes_Typebeat_fbs90q.mp3",
//     duration: "2:35",
//     bpm: 94,
//     scale: "F Minor",
//     genre: ["Hip Hop", "Trap"],
//     mood: ["Dark", "Negative", "Raw"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "3 Jul 2025",
//   },
//   {
//     title: "Slide In",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753722959/Slide_In_Typebeat_fve7sq.mp3",
//     duration: "2:48",
//     bpm: 100,
//     scale: "F# Major",
//     genre: ["Pop", "Bollywood", "Ambient"],
//     mood: ["Medlodic", "Soulful"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "23 Apr 2025",
//   },
//   {
//     title: "Teer",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753692752/Teer_Typebeat_kv9hpa.mp3",
//     duration: "3:17",
//     bpm: 102,
//     scale: "A Minor",
//     genre: ["Pop", "Solo", "Bollywood", "Bollywood Pop"],
//     mood: ["Happy", "Soulful", "Melodic"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "17 March 2025",
//   },
//   {
//     title: "Inspired",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753692722/Bonita_Typebeat_m37hc2.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "14 March 2025",
//   },
//   {
//     title: "Pataal",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753692742/Pataal_Typebeat_gfops0.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "7 March 2025",
//   },
//   {
//     title: "Rehle Mere Kol",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753723049/Rehle_mere_kol_Typebeat_pd8knj.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "2 March 2025",
//   },
//   {
//     title: "Zariya",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753723019/zariya_Typebeat_owncnn.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "16 Feb 2025",
//   },
//   {
//     title: "F.L.A.W.",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753723016/FLAW_Falling_Like_A_Wishper_Typebeat_da2ev6.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "4 Feb 2025",
//   },
//   {
//     title: "Juicy",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753723006/Juicy_Typebeat_wa9o6i.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "19 Jan 2025",
//   },
//   {
//     title: "Aksar Ishq",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753723066/Aksar_Ishq_Typebeat_iahvn6.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "12 Jan 2025",
//   },
//   {
//     title: "Love Illisions",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753722932/Love_illusions_Typebeat_s14guv.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "9 Jan 2025",
//   },
//   {
//     title: "Causes",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753722932/Causes_Typebeat_fimjbq.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "5 Jan 2025",
//   },
//   {
//     title: "Zulfein",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753723059/Zulfein_Typebeat_ylnzuz.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "1 Jan 2025",
//   },
//   {
//     title: "Pagal Piya",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753722971/Pagal_Piya_Typebeat_s2uar8.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "29 Dec 2024",
//   },
//   {
//     title: "Lost In You",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753722985/Lost_In_You_Typebeat_qz7u04.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "28 Dec 2024",
//   },
//   {
//     title: "AURA",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753692748/AURA_Typebeat_ygstws.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "7 July 2024",
//   },
//   {
//     title: "Malang",
//     coverImage:
//       "https://res.cloudinary.com/dy0itwxqe/image/upload/v1753723396/gresic_error_image_azfqbe.jpg",
//     audioUrl:
//       "https://res.cloudinary.com/dy0itwxqe/video/upload/v1753722843/Malang_Typebeat_iptf6p.mp3",
//     duration: "2:08",
//     bpm: 120,
//     scale: "C# Major",
//     genre: ["Pop", "Trippy"],
//     mood: ["Energetic", "Fast"],
//     price: "FREE",
//     purchaseLink: "",
//     releaseDate: "8 Sept 2022",
//   },
// ];
// exports.default = testingData;
