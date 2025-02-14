// resources/js/Components/BlogSection.jsx
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogSection({ blogs }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, []);

    return (
        <div className="relative group max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
                Medical Blog
            </h2>
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Keyboard, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                className="rounded-3xl shadow-lg bg-white dark:bg-gray-800 p-6"
            >
                {blogs && blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <SwiperSlide key={index}>
                            <div className="space-y-4 p-10">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">{blog.body}</p>
                                <p className="text-gray-800 dark:text-gray-500 text-xs">
                                    {blog.published_at}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}

            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
                <button
                    ref={prevRef}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                    ← Previous
                </button>
                <button
                    ref={nextRef}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                    Next →
                </button>
            </div>

            <div className="swiper-pagination !relative !bottom-0 mt-4" />
        </div>
    );
}
