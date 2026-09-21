import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import { LuLoader } from "react-icons/lu"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openCatalog, setOpenCatalog] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
       // console.log(subLinks)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setOpenCatalog(false)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Navigation links - Desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">
                            <LuLoader />
                          </p>
                        ) : subLinks?.length ? (
                          <>
                            {subLinks?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={subLink._id || i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard - Desktop */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mr-4 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 right-0 z-50 w-full bg-richblack-800 border-b border-b-richblack-700 md:hidden">
          <div className="flex flex-col p-4">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-y-3 py-4 border-b border-b-richblack-700">
              {NavbarLinks.map((link, index) => (
                <div key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setOpenCatalog(!openCatalog)}
                        className="flex items-center justify-between text-richblack-25 hover:text-yellow-25 transition-all"
                      >
                        <span>{link.title}</span>
                        <BsChevronDown
                          className={`transition-transform ${
                            openCatalog ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openCatalog && (
                        <div className="flex flex-col gap-2 pl-4">
                          {loading ? (
                            <p className="text-richblack-300">
                              <LuLoader />
                            </p>
                          ) : subLinks.length ? (
                            subLinks.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                key={subLink._id || i}
                                onClick={closeMobileMenu}
                                className="text-richblack-300 hover:text-yellow-25 transition-all"
                              >
                                {subLink.name}
                              </Link>
                            ))
                          ) : (
                            <p className="text-richblack-300">No Courses Found</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link?.path}
                      onClick={closeMobileMenu}
                      className={`block py-2 transition-all ${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25 hover:text-yellow-25"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Auth & Cart */}
            <div className="flex flex-col gap-y-4 py-4 border-b border-b-richblack-700">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-richblack-25 hover:text-yellow-25 transition-all"
                >
                  <AiOutlineShoppingCart className="text-xl" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="ml-2 px-2 py-1 rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              {token === null && (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block py-2 text-richblack-25 hover:text-yellow-25 transition-all"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block py-2 text-richblack-25 hover:text-yellow-25 transition-all"
                  >
                    Sign up
                  </Link>
                </>
              )}

              {token !== null && (
                <div onClick={closeMobileMenu}>
                  <ProfileDropdown />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar