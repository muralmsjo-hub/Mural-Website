import Link from "next/link";
import Image from "next/image";
import { getAllCareers } from "@/server/careers/services";

async function page() {
  const response = await getAllCareers();
  const allCareers = response?.careers ?? [];

  return (
    <main className="ml:0 md:ml-2.5 lg:ml-5 mt-2">
      <header className="mb-4">
        <h1 className="ml-2 text-xl text-gray-800 lg:text-3xl font-semibold">
          All Careers
        </h1>
      </header>

      {/* EMPTY STATE */}
      {allCareers.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center text-center text-gray-500">
          <div className="text-lg font-medium">No careers available</div>
          <p className="mt-2 text-sm">
            Once you add careers, they will appear here.
          </p>

          {/* Optional CTA */}
          <Link
            href="/admin/dashboard/careers/newCareer"
            className="mt-6 inline-flex items-center rounded-md bg-[#397a34] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
          >
            Add New Career
          </Link>
        </div>
      ) : (
        <div className="space-y-12 mt-8">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-5 gap-6">
              {allCareers.map((career, index) => (
                <Link
                  key={index}
                  href={`/admin/dashboard/applications/${career.id}`}
                  className="group flex flex-col items-center gap-2 text-center hover:scale-105 transition-transform duration-500 ease-in-out"
                >
                  <div className="w-44 h-44 rounded-full overflow-hidden flex items-center justify-center border shadow-md bg-gray-50 hover:shadow-lg">
                    <Image
                      src={career.image ?? "DefaultImage"}
                      alt={career.positionEn!}
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-sm font-medium truncate max-w-36 mt-2">
                    {career.positionEn}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#062b56]/10 text-[#0b8b99] font-semibold">
                      {career.numberOfApplications}
                    </span>
                    <span className="whitespace-nowrap">Applications</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default page;
