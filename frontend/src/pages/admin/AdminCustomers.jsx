import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, MapPin, Calendar, Search } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/auth/customers');
        if (data.success) {
          setCustomers(data.customers);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Patron Directory</h1>
        <p className="text-xs text-gray-500 mt-1">Review registered client profiles, contact numbers and locations.</p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-blush-200 flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search customers by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs text-gray-800 bg-transparent focus:outline-none"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-blush-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-blush-100">
            <thead className="bg-blush-50/60 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Patron Name</th>
                <th className="py-3.5 px-3">Email Address</th>
                <th className="py-3.5 px-3">Phone</th>
                <th className="py-3.5 px-3">Primary City</th>
                <th className="py-3.5 px-3">Registered Date</th>
                <th className="py-3.5 px-4 text-right">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">Loading patrons...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">No patrons found.</td>
                </tr>
              ) : (
                filtered.map((cust) => (
                  <tr key={cust._id} className="hover:bg-blush-50/30 transition">
                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F8DDE5] text-[#7A1738] font-bold text-xs flex items-center justify-center">
                          {cust.name[0]?.toUpperCase()}
                        </div>
                        <span>{cust.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">{cust.email}</td>
                    <td className="py-3.5 px-3 text-gray-600">{cust.phone || 'N/A'}</td>
                    <td className="py-3.5 px-3 text-gray-500">
                      {cust.addresses?.[0]?.city || 'Indore'}
                    </td>
                    <td className="py-3.5 px-3 text-gray-400">
                      {new Date(cust.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="badge-rose text-[10px] uppercase font-bold">
                        {cust.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
