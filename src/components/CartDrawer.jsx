import React from 'react'

function CartDrawer({ open, items, onClose, onCheckout, onRemove }) {
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-slate-900/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-9rem)]">
          {items.length === 0 ? (
            <p className="text-slate-500">Your cart is empty.</p>
          ) : (
            items.map((it, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <img src={it.image} alt={it.title} className="w-16 h-16 rounded object-cover bg-slate-100" />
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{it.title}</p>
                  <p className="text-sm text-slate-500">${it.price.toFixed(2)} × {it.quantity}</p>
                </div>
                <button onClick={() => onRemove(it)} className="text-sm text-red-600 hover:underline">Remove</button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold text-slate-900">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full py-2 rounded-lg bg-slate-900 text-white disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
