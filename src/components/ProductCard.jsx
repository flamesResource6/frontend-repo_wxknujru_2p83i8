import React from 'react'

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-2xl bg-white/90 backdrop-blur border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="aspect-square overflow-hidden bg-slate-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-slate-800 font-medium line-clamp-1">{product.title}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-slate-900 font-semibold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-500"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
