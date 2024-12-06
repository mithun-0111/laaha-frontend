import { CloseIcon, SettingsIcon } from "@/src/lib/icons";
import { useState } from "react"

const ConfigPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <div onClick={handleClick} className="cursor-pointer"> <SettingsIcon /> </div>
      {
        isOpen && (
          <>
            <div className="absolute right-0 mt-2 bg-white border-color-gray border-px rounded-lg shadow-lg z-10">
              <div className="p-4 w-60">
                  <div onClick={handleClick} className="absolute top-2 right-2 cursor-pointer">
                    <CloseIcon />
                  </div>
                  <ul className="space-y-2">
                      <li>
                        <button className=" hover:underline">Video Settings</button>
                      </li>
                      <li>
                        <button className="hover:underline">Audio Settings</button>
                      </li>
                      <li>
                        <button className="hover:underline">Zoom</button>
                      </li>
                  </ul>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default ConfigPopup