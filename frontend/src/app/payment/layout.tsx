import React from 'react'

const Layout = ({ children } : {children:React.ReactNode}) => {
  return (
    <main className='h-full overflow-y-hidden'>{children}</main>
  )
}

export default Layout