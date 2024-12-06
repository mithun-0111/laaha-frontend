import Logo from "../Header/Logo"
import Copyright from "./Copyright"
import ExploreMenu from "./ExploreMenu"
import FooterBottom from "./FooterBottom"
import QuickLinks from "./QuickLinks"
import SiteDesc from "./SiteDesc"

const Footer = () => {
  return (
    <div className="footer bg-color-secondary py-10 lg:py-16">
      <div className="container">
        <div className="footer-top lg:pb-16 flex flex-wrap items-start lg:border-b lg:border-color-pink-500 mb-10">
          <div className="footer-top-left order-1 mb-8 lg:mb-0 flex-[0_0_100%] lg:flex-[0_0_25%]">
            <Logo />
          </div>
          <div className="footer-link order-3 lg:order-2 flex flex-wrap flex-[0_0_100%] lg:flex-[0_0_40%]">
            <QuickLinks />
            <ExploreMenu />
          </div>
          <div className="flex-[0_0_100%] lg:flex-[0_0_35%] pb-8 mb-8 border-b border-color-pink-500 lg:pb-0 lg:mb-0 lg:border-b-0 order-2 lg:order-3">
            <SiteDesc />
          </div>
        </div>
        <div className="footer-bottom block lg:flex justify-between">
          <div className="footer-bottom-menu">
            <FooterBottom />
          </div>
          <div className="copyrights">
            <Copyright />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer