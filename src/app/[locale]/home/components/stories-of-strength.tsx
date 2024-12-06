import Image from "next/image";
import { laila } from "@/src/lib/utils";

interface Story {
  description: string
  by: string
}

export default function StoriesOfStrength({ stories }: { stories: Story[] }) {
  return (
    <div
      className={`stories-strength-support flex flex-wrap md:flex-nowrap py-10 px-28 mb-20`}
    >
      <div className={`left-content w-full md:w-[35%]`}>
        <h2
          className={`${laila.className} text-[28px] font-semibold pb-[18px] text-[#363e44]`}
        >
          Stories of Strength and Support
        </h2>
        <p className={`text-[#5a6872] font-univers text-l`}>
          See how Laaha has changed lives with real stories from other girls and
          women.
        </p>
      </div>

      <div className={`right-content columns-2 w-[65%] gap-8`}>
        {stories?.map((item, index) => (
          <div key={index} className="card p-[28px] rounded-xl bg-white">
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: item.description }}
            ></div>
            <div className="profile-details">
              <div className="profile-image flex items-center">
                <Image
                  src="https://laaha.org/sites/default/files/2024-07/Website-TestimonialAvatar-Venezuela.png"
                  width={32}
                  height={32}
                  alt="profile-image"
                />
                <div className="details ml-2">
                  <div className="user-age-location">{item.by}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
