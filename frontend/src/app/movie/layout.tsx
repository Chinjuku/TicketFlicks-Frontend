import Navbar from "@/app/components/navbar";

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