import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const blogs = [
    {
        title: "Living with Diabetes: Daily Management Tips",
        excerpt:
            "Discover effective strategies for managing your diabetes through proper monitoring and lifestyle adjustments.",
        keyPoints: [
            "Monitor blood sugar levels regularly",
            "Stay active with moderate exercise",
            "Follow a balanced, diabetes-friendly diet",
        ],
    },
    {
        title: "Nutrition Guide for Diabetics",
        excerpt:
            "Learn about the best dietary practices and meal planning techniques to maintain healthy blood sugar levels.",
        keyPoints: [
            "Best foods for stable blood sugar",
            "Meal planning tips",
            "Understanding carbohydrate counting",
        ],
    },
    {
        title: "Exercise Routines for Diabetes Control",
        excerpt:
            "Explore physical activities and exercise plans that help in managing diabetes effectively.",
        keyPoints: [
            "Low-impact exercises for beginners",
            "Strength training benefits",
            "Importance of consistency in workouts",
        ],
    },
    {
        title: "Latest Diabetes Research Breakthroughs",
        excerpt:
            "Stay updated with the most recent advancements in diabetes treatment and research.",
        keyPoints: [
            "New insulin delivery methods",
            "Promising clinical trials",
            "Technology in diabetes management",
        ],
    },
    {
        title: "Mental Health and Diabetes",
        excerpt:
            "Understanding the psychological aspects of living with chronic conditions and maintaining mental wellness.",
        keyPoints: [
            "Managing stress and anxiety",
            "Support groups and therapy",
            "Mindfulness techniques",
        ],
    },
    {
        title: "Preventing Diabetes Complications",
        excerpt:
            "Key steps to avoid long-term complications from diabetes and maintain overall health.",
        keyPoints: [
            "Importance of foot care",
            "Managing cholesterol and blood pressure",
            "Regular checkups and screenings",
        ],
    },
];

export default function BlogSection() {
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
                {blogs.map((blog, index) => (
                    <SwiperSlide key={index}>
                        <div className="space-y-4 p-10">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {blog.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">{blog.excerpt}</p>
                            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                                {blog.keyPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </SwiperSlide>
                ))}
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
