import { laila } from "@/src/lib/utils"
import { EmailIcon, LocationIcon, PhoneIcon } from "@/src/lib/icons"

interface AccessServicesCardProps {
  className: string;
  phoneNumber: string;
  email: string;
  title: string;
  location: string;
  tag: string;
}

export default function AccessServicesCard({ className, phoneNumber, email, title, location, tag }: AccessServicesCardProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="bg-[#f8f9f9] py-3 px-[14px] rounded-lg flex gap-2 flex-col mb-5">
        <div className="text-xl font-bold">{title}</div>
        <div className="flex items-center gap-2">
          <LocationIcon />
          <span className="text-m pt-1">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon />
          <span className="text-m pt-1">Telephone: {phoneNumber}</span>
          <button className="text-m pt-1 text-[#4856df] underline">Copy phone</button>
        </div>

        <div className="flex items-center gap-2">
          <EmailIcon />
          <span className="text-m pt-1">Email: {email}</span>
          <button className="text-m pt-1 text-[#4856df] underline">Copy email</button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="">
          <h3 className="text-m text-muted-foreground">Services offered :</h3>
          <p className={`text-m p-2 rounded-md font-medium ${laila.className} text-[#f7265d] bg-[#fff5f8] inline-block`}>
           {tag}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <button className="w-full border border-[#e9ebed] flex justify-center py-[10px] px-[14px] rounded-sm gap-2 text-[#87929d]">
          <PhoneIcon />
          <span>Phone</span>
        </button>
      </div>
    </div>
  )
}
