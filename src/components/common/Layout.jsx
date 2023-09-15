import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomTab from './BottomTab'
import '../../styles/Main.scss'

function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <BottomTab />
    </>
  )
}

export default Layout
