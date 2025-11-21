import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  const backend = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`${backend}/api/products`)
        const data = await res.json()
        setProducts(data.items || [])
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [backend])

  const handleAdd = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setOpen(true)
  }

  const handleRemove = (item) => {
    setCart((prev) => prev.filter((p) => p.id !== item.id))
  }

  const handleCheckout = async () => {
    try {
      const payload = {
        items: cart.map((c) => ({
          product_id: c.id,
          title: c.title,
          price: c.price,
          quantity: c.quantity,
          image: c.image,
        })),
        total_amount: cart.reduce((sum, it) => sum + it.price * it.quantity, 0),
        customer_name: 'Guest',
        customer_email: 'guest@example.com',
        shipping_address: '123 Demo Street',
      }
      const res = await fetch(`${backend}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      alert(`Order created: ${data.id}`)
      setCart([])
      setOpen(false)
    } catch (e) {
      alert('Checkout failed')
    }
  }

  const seed = async () => {
    await fetch(`${backend}/api/seed`, { method: 'POST' })
    const res = await fetch(`${backend}/api/products`)
    const data = await res.json()
    setProducts(data.items || [])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onToggleCart={() => setOpen((o) => !o)} cartCount={cart.reduce((sum, it) => sum + it.quantity, 0)} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Shop the latest</h1>
            <p className="text-slate-600">Modern demo store built with HTML, CSS and JavaScript (React)</p>
          </div>
          <button onClick={seed} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">Seed products</button>
        </div>

        {loading && <p className="text-slate-600">Loading products...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </main>

      <CartDrawer open={open} items={cart} onClose={() => setOpen(false)} onCheckout={handleCheckout} onRemove={handleRemove} />
    </div>
  )
}

export default App
