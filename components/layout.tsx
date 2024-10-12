import Footer from './footer'
import Meta from './meta'

type Props = {
  isHomepage?: boolean
  children: React.ReactNode
}

const Layout = ({ children, isHomepage = true }: Props) => {
  return (
    <>
      <Meta isHomepage={isHomepage} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
