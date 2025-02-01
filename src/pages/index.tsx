// import Carousel from "react-material-ui-carousel";

// import Image from "next/image";

// import InfoIcon from "@mui/icons-material/Info";
// import { Alert, AlertTitle, IconButton, Link, Typography } from "@mui/material";

// import LayoutWithBottomNav from "@/components/LayoutWithBottomNav";
// import UpdateDataDialog from "@/components/UpdateDataDialog";
// import { GenerateRecommendationButton } from "@/components/recommendation/GenerateRecommendationButton";
// import RecommendationList from "@/components/recommendation/RecommendationList";
// import MenuListSkeleton from "@/components/skeletons/MenuListSkeleton";
// import { useGetRecommendations } from "@/hooks/useGetData";
// import useRecommendationUpdate from "@/hooks/useRecommendationUpdate";
// import { formatDate } from "@/utils/string";

// export default function Home() {
//   const images = [
//     "/images/image1.png",
//     "/images/image2.png",
//     "/images/image3.png",
//     "/images/image4.png",
//     "/images/image5.png",
//   ];
//   const { data: recommendation, errorMessage } = useGetRecommendations();
//   const isRecommendationUpdated = useRecommendationUpdate(recommendation);

//   return (
//     <LayoutWithBottomNav>
//       <div className="w-full h-auto">
//         <div className="absolute top-0 left-0 w-full h-60 bg-primary shadow-md"></div>
//         <div className="absolute top-4 right-4">
//           <Link href="/information">
//             <IconButton
//               aria-label="Information"
//               className="bg-white p-0 hover:text-secondary active:text-secondary transition-colors duration-300"
//             >
//               <InfoIcon
//                 fontSize="medium"
//                 className="text-primary hover:text-secondary active:text-secondary transition-colors duration-300"
//               />
//             </IconButton>
//           </Link>
//         </div>

//         <div className="relative text-center">
//           <h1 className="text-3xl font-bold text-white">PreciFood</h1>
//           <p className="text-secondary text-xs italic">
//             For Specific Restaurant
//           </p>
//           <p className="text-white mt-2">Rekomendasi Menu untuk Anda!</p>
//         </div>
//       </div>

//       {/* Carousel */}
//       <div>
//         <Carousel indicators={false} navButtonsAlwaysInvisible>
//           {images.map((img, index) => (
//             <div
//               key={index}
//               className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg"
//             >
//               <Image
//                 src={img}
//                 alt={`Foto ${index + 1}`}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-l"
//               />
//             </div>
//           ))}
//         </Carousel>
//       </div>

//       {recommendation && (
//         <div className="mb-6 text-center px-4">
//           <Typography className="font-bold text-2xl text-gray-800">
//             {recommendation.restaurant_name}
//           </Typography>
//           <Typography className="font-normal italic text-sm text-gray-500">
//             Direkomendasikan pada: {formatDate(recommendation.recommended_at)}
//           </Typography>
//         </div>
//       )}

//       <div className="space-y-4 px-4">
//         {recommendation?.status.generator_error && (
//           <Alert severity="error">
//             Proses rekomendasi gagal: {recommendation.status.generator_error}
//           </Alert>
//         )}

//         {!recommendation?.recommendations?.length &&
//           !recommendation?.status.is_generating && (
//             <Alert severity="info">
//               <AlertTitle className="text-info">
//                 Belum Ada Rekomendasi
//               </AlertTitle>
//               <div className="italic">
//                 Anda belum memiliki list rekomendasi. <br />
//                 Silahkan buat rekomendasi baru untuk memulai.
//               </div>
//             </Alert>
//           )}

//         {recommendation?.status.is_generating &&
//           recommendation.status.generator_error === null && (
//             <Alert severity="info">
//               Sedang generate... <br /> Harap tunggu beberapa saat.
//             </Alert>
//           )}

//         {isRecommendationUpdated && !recommendation?.status.is_generating && (
//           <Alert severity="success">Rekomendasi telah diperbarui</Alert>
//         )}

//         {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
//       </div>

//       <div className="my-6 space-y-4 text-center px-4">
//         <GenerateRecommendationButton />
//         <UpdateDataDialog />
//       </div>

//       <div>
//         {/* Skeleton Placeholder Jika Sedang Generating */}
//         {recommendation?.status.is_generating && (
//           <div>
//             <MenuListSkeleton />
//           </div>
//         )}

//         {/* Menampilkan Recommendation List Hanya Jika Tidak Generating */}
//         {!recommendation?.status.is_generating &&
//           recommendation &&
//           recommendation.recommendations?.length > 0 && (
//             <RecommendationList
//               recommendationlist={recommendation.recommendations}
//             />
//           )}
//       </div>
//     </LayoutWithBottomNav>
//   );
// }

import { useEffect, useState } from "react";
import LandingPage from "@/components/LandingPage"; 
import HomePage from "@/components/HomePage"; 
import { getCookies } from "@/utils/cookie"; 

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const token = getCookies("token"); 
    setIsLoggedIn(!!token); 
  }, []);

  return isLoggedIn ? <HomePage /> : <LandingPage />;
}



