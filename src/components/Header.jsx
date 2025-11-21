import React from 'react'

function Header({ onToggleCart, cartCount }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner" />
          <span className="text-xl font-semibold text-slate-800">BlueShop</span>
        </div>
        <button
          onClick={onToggleCart}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        >
          <span>Cart</span>
          <span className="inline-flex items-center justify-center text-xs font-semibold w-6 h-6 rounded-full bg-blue-500">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header
