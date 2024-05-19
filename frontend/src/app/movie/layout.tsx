
const Layout = ({ children }:{
    children: React.ReactNode
}) => {
    return (
        <div className="bg-gradient-to-b text-white from-black from-15% via-primary via-85% overflow-x-hidden to-black h-full pt-[3%]">
            {children}
        </div>
    )
}

export default Layout;