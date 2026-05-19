import { Link } from 'react-router-dom'

const FEATURES = [
  { id: 1, title: 'Fresh produce catalog', text: 'Manage fruit and vegetable listings, prices, stock levels, and low-stock alerts from one dashboard.', icon: '🥭' },
  { id: 2, title: 'Cart checkout tools', text: 'Review customer carts, coupons, delivery fees, and payment summaries before fulfillment.', icon: '🛒' },
  { id: 3, title: 'Order workflow', text: 'Track every order from pending to paid, packing, and delivered with clear team visibility.', icon: '📦' },
]

const PRODUCE = [
  { id: 1, name: 'Organic Bananas', stock: '84 lb available', color: '#facc15' },
  { id: 2, name: 'Baby Spinach', stock: '18 bags available', color: '#22c55e' },
  { id: 3, name: 'Roma Tomatoes', stock: '9 lb available', color: '#ef4444' },
]

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 text-gray-900'>
      <header className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6'>
        <Link to='/' className='flex items-center gap-2 text-xl font-black text-green-700 hover:text-green-800'>
          <span className='flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100 text-2xl'>🥬</span>
          FreshCart Market
        </Link>
        <Link to='/login' className='rounded-full bg-green-600 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-green-700'>
          Sign in
        </Link>
      </header>

      <main>
        <section className='mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20'>
          <div>
            <p className='mb-4 inline-flex rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-bold text-green-700 shadow-sm'>
              🌱 Built for fruit and veg commerce
            </p>
            <h1 className='text-4xl font-black tracking-tight text-gray-950 sm:text-6xl'>
              Run a fresher produce store from cart to doorstep.
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              FreshCart Market brings products, carts, payments, orders, reports, and store settings together for modern grocery teams.
            </p>
            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <Link to='/login' className='rounded-xl bg-green-600 px-6 py-3 text-center font-black text-white shadow-lg hover:bg-green-700'>
                Sign in to dashboard
              </Link>
              <Link to='/login' className='rounded-xl border border-orange-200 bg-white px-6 py-3 text-center font-black text-orange-700 hover:bg-orange-50'>
                Try demo account
              </Link>
            </div>
          </div>

          <div className='rounded-[2rem] border bg-white p-5 shadow-2xl'>
            <div className='rounded-[1.5rem] bg-gradient-to-br from-green-600 to-lime-500 p-6 text-white'>
              <p className='text-sm font-bold uppercase text-green-100'>Today&apos;s produce board</p>
              <h2 className='mt-2 text-3xl font-black'>Fresh operations</h2>
              <div className='mt-6 grid gap-3 sm:grid-cols-3'>
                {['120+ items', '91% same day', 'Live reports'].map(metric => (
                  <div key={metric} className='rounded-2xl bg-white/15 p-4 font-black'>{metric}</div>
                ))}
              </div>
            </div>
            <div className='mt-5 space-y-3'>
              {PRODUCE.map(product => (
                <div key={product.id} className='flex items-center justify-between gap-3 rounded-2xl bg-gray-50 p-4'>
                  <div className='flex min-w-0 items-center gap-3'>
                    <span className='h-10 w-10 shrink-0 rounded-xl' style={{ backgroundColor: product.color }} />
                    <div className='min-w-0'>
                      <p className='truncate font-black'>{product.name}</p>
                      <p className='text-sm text-gray-500'>{product.stock}</p>
                    </div>
                  </div>
                  <span className='rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-700'>Active</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='mx-auto grid max-w-7xl gap-5 px-4 pb-16 sm:px-6 md:grid-cols-3'>
          {FEATURES.map(feature => (
            <div key={feature.id} className='rounded-3xl border bg-white p-6 shadow-sm'>
              <div className='mb-4 text-3xl'>{feature.icon}</div>
              <h3 className='text-lg font-black'>{feature.title}</h3>
              <p className='mt-3 leading-7 text-gray-600'>{feature.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
