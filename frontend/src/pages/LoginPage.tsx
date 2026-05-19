import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api'

const ADMIN_ACCOUNT = {
  email: 'admin@freshcart.com',
  password: 'admin123',
}

export default function LoginPage() {
  const [email, setEmail] = useState(ADMIN_ACCOUNT.email)
  const [password, setPassword] = useState(ADMIN_ACCOUNT.password)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const session = await login(email, password)
      localStorage.setItem('token', session.token)
      localStorage.setItem('user', JSON.stringify(session.user))
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Invalid credentials or API unavailable. Use admin@freshcart.com / admin123 after starting the backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50 p-4'>
      <div className='grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2'>
        <section className='hidden bg-gradient-to-br from-green-700 to-lime-500 p-10 text-white lg:block'>
          <Link to='/' className='inline-flex items-center gap-2 text-xl font-black text-white hover:text-green-50'>
            <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-2xl'>🥬</span>
            FreshCart Market
          </Link>
          <h1 className='mt-14 text-4xl font-black leading-tight'>Manage fresh fruit and veg orders with confidence.</h1>
          <p className='mt-5 text-lg leading-8 text-green-50'>Access products, carts, payments, orders, reports, and store settings from one clean admin dashboard.</p>
          <div className='mt-10 grid gap-3'>
            {['Live produce inventory', 'Cart and checkout workflow', 'Order tracking dashboard'].map(item => (
              <div key={item} className='rounded-2xl bg-white/15 px-4 py-3 font-bold'>{item}</div>
            ))}
          </div>
        </section>

        <section className='p-6 sm:p-10'>
          <div className='mb-7'>
            <Link to='/' className='mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl hover:bg-green-200 lg:hidden'>
              🥬
            </Link>
            <p className='text-sm font-black uppercase tracking-wide text-green-700'>Admin sign in</p>
            <h2 className='mt-2 text-3xl font-black text-gray-950'>Welcome back</h2>
            <p className='mt-2 text-sm text-gray-500'>Use the hardcoded admin account to open the FreshCart dashboard.</p>
          </div>

          <div className='mb-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm'>
            <p className='mb-1 font-black text-green-800'>Admin Credentials</p>
            <p className='text-green-700'>Email: <span className='font-mono'>admin@freshcart.com</span></p>
            <p className='text-green-700'>Password: <span className='font-mono'>admin123</span></p>
          </div>

          {error ? <div className='mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700'>{error}</div> : null}

          <form onSubmit={handleLogin} className='space-y-4'>
            <label className='block'>
              <span className='mb-2 block text-sm font-bold text-gray-700'>Email address</span>
              <input value={email} onChange={e => setEmail(e.target.value)} type='email' className='w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500' placeholder='admin@freshcart.com' autoComplete='email' />
            </label>
            <label className='block'>
              <span className='mb-2 block text-sm font-bold text-gray-700'>Password</span>
              <input value={password} onChange={e => setPassword(e.target.value)} type='password' className='w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500' placeholder='admin123' autoComplete='current-password' />
            </label>
            <button type='submit' disabled={loading} className='w-full rounded-xl bg-green-600 py-3 font-black text-white shadow-lg hover:bg-green-700 disabled:opacity-60'>
              {loading ? 'Signing in…' : 'Sign in to dashboard'}
            </button>
          </form>

          <p className='mt-4 text-center text-xs text-gray-500'>Legacy demo login remains supported: demo@example.com / demo123.</p>

          <div className='mt-6 text-center'>
            <Link to='/' className='text-sm font-bold text-green-700 hover:text-green-800'>Back to landing page</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
