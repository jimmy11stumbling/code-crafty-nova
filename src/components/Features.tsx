
import React from "react";
import { cn } from "@/lib/utils";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      title: "Intuitive Interface",
      description:
        "A clean and minimal interface that puts focus on the content and functionality.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Thoughtful Design",
      description:
        "Every detail is meticulously crafted to provide the best user experience.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M12 2v2" />
          <path d="M12 22v-2" />
          <path d="m17 20.66-1-1.73" />
          <path d="M11 10.27 7 3.34" />
          <path d="m20.66 17-1.73-1" />
          <path d="m3.34 7 1.73 1" />
          <path d="M14 12h8" />
          <path d="M2 12h2" />
          <path d="m20.66 7-1.73 1" />
          <path d="m3.34 17 1.73-1" />
          <path d="m17 3.34-1 1.73" />
          <path d="m7 20.66 1-1.73" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Seamless Experience",
      description:
        "Navigate with ease through a seamless and responsive experience across all devices.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Attention to Detail",
      description:
        "We believe that the details are not just details, they make the product.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Premium Quality",
      description:
        "Every component is crafted with care to ensure the highest quality product.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Innovation",
      description:
        "Constantly evolving to introduce new and innovative features for our users.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a5 5 0 0 0-5 5v14a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
          <path d="M4 10h16" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="section bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="chip bg-blue-100 text-blue-800">Features</span>
          </div>
          <h2 className="section-title">Craftmanship in Every Detail</h2>
          <p className="section-subtitle">
            Our innovative features are designed with meticulous attention to
            detail, ensuring a seamless and intuitive user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={cn(
                "group p-8 rounded-2xl neo-morph transition-all duration-300 hover:shadow-lg bg-white",
                "transform hover:-translate-y-1 hover:scale-[1.02] cursor-default"
              )}
              style={{
                animationDelay: `${100 * index}ms`,
                opacity: 0,
                animation: "fade-up 0.6s ease-out forwards",
              }}
            >
              <div className="p-3 rounded-xl bg-gray-50 inline-flex mb-5 group-hover:bg-blue-50 transition-colors duration-300">
                <div className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
