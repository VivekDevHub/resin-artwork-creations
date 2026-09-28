import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/analytics/dashboard');
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.warn('Dashboard stats fetch failed:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-32 bg-white rounded-3xl animate-pulse border border-blush-200" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      subtitle: 'From completed orders'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'text-[#7A1738] bg-blush-100 border-blush-200',
      subtitle: 'All-time boutique orders'
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      subtitle: 'Active artisan catalog'
    },
    {
      title: 'Registered Patrons',
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: 'text-[#C9A227] bg-amber-50 border-amber-200',
      subtitle: 'Customer profiles'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Atelier Overview</h1>
        <p className="text-xs text-gray-500 mt-1">Live studio statistics, revenue metrics and order fulfillment.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-blush-200 shadow-soft flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-gray-500 block mb-1">{card.title}</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B20] block">
                  {card.value}
                </span>
                <span className="text-[11px] text-gray-400 mt-1 block">{card.subtitle}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2B1B20]">Monthly Sales Performance</h2>
              <p className="text-xs text-gray-400">Recorded and projected revenue for last 6 months</p>
            </div>
            <span className="badge-rose text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#D81B60]" />
              <span>Studio Growth</span>
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-4 pt-4">
            {stats?.monthlySales?.map((item, idx) => {
              const maxVal = Math.max(...(stats.monthlySales.map((m) => m.revenue) || [1]));
              const barPercent = Math.min(100, Math.round((item.revenue / (maxVal * 1.15)) * 100));

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-700 w-12 font-bold">{item.month}</span>
                    <span className="text-gray-500">{item.orders} orders</span>
                    <span className="font-bold text-[#7A1738]">₹{item.revenue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full bg-blush-100/70 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#D81B60] to-[#C9A227] h-full rounded-full transition-all duration-700"
                      style={{ width: `${barPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orders by Status breakdown */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#2B1B20]">Fulfillment Status</h2>
          <div className="space-y-2.5 pt-2">
            {Object.entries(stats?.ordersByStatus || {}).map(([status, count]) => (
              <div
                key={status}
                className="flex items-center justify-between p-2.5 rounded-xl bg-blush-50/70 border border-blush-100 text-xs"
              >
                <span className="font-medium text-gray-700">{status}</span>
                <span className="font-bold bg-white px-2.5 py-0.5 rounded-full border border-blush-200 text-[#7A1738]">
                  {count}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-blush-100">
            <Link
              to="/admin/orders"
              className="w-full btn-secondary text-xs py-2.5 flex items-center justify-center gap-1.5"
            >
              <span>Manage All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#2B1B20]">Recent Orders</h2>
            <p className="text-xs text-gray-400">Latest transactions requiring packaging or courier handover</p>
          </div>
          <Link to="/admin/orders" className="text-xs text-[#7A1738] font-bold hover:underline">
            View All Orders &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-blush-100">
            <thead>
              <tr className="text-gray-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-2">Order ID</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2">City</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Payment</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-50">
              {stats?.recentOrders?.map((ord) => (
                <tr key={ord._id} className="hover:bg-blush-50/40 transition">
                  <td className="py-3.5 px-2 font-mono font-bold text-[#7A1738]">{ord.orderId}</td>
                  <td className="py-3.5 px-2 font-medium text-gray-800">{ord.customer?.name}</td>
                  <td className="py-3.5 px-2 text-gray-500">{ord.shippingAddress?.city}</td>
                  <td className="py-3.5 px-2 font-bold text-gray-800">₹{ord.totalAmount?.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ord.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {ord.paymentMethod} ({ord.paymentStatus})
                    </span>
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="badge-rose text-[10px]">{ord.orderStatus}</span>
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <Link
                      to={`/orders/${ord.orderId}`}
                      className="text-[#7A1738] font-bold hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
