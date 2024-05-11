import Navbar from "@/app/components/Navbar";

const Layout = ({ children }:{
    children: React.ReactNode
}) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Layout;