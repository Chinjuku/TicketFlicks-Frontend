"use client"
import withAuthAdmin from '@/components/Auth/with-auth-admin'
import React from 'react'

const Page: React.FC = ({ user }: any ) => {
  console.log(user)
  return (
    <div>Dashboard</div>
  )
}

export default withAuthAdmin(Page)