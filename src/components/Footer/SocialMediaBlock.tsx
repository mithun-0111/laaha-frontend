import Link from "next/link"
import { useState } from "react";
import './social-media.scss';
type socialMediaProps =
{
  data: {
    id: string
    title: string,
    url: string,
  }
}
const SocialMediaBlock = (socialMediaData:any) => {
  const [socialIcons, setsocialIcons] = useState<socialMediaProps[]>(socialMediaData?.data)

  return (
    <>
     { socialIcons && socialIcons.length > 0 && (
        <div className="social-links flex-[0_0_100%]">
          <ul className="ps-0 list-none inline-flex flex-wrap gap-4">
            {socialIcons.map((item:any) => (
              <li className={`mb-2 social-icons ${item.title.trim().toLowerCase().replace(' ', '-')}`} key={item.id}>
                <Link className="block w-8 h-8" target="_blank" href={item.url} aria-label={item.title}></Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default SocialMediaBlock