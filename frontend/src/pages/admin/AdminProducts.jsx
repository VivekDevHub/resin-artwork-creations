import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Search,
  X,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  const toast = useToast();

  const initialFormState = {
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    images: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    stock: 10,
    material: 'High-Gloss Epoxy Resin, Metallic Pigments & Botanicals',
    dimensions: 'Standard Artisan Size',
    careInstructions: 'Wipe gently with a soft microfibre cloth. Avoid harsh cleaners.',
    featured: false,
    bestSeller: false
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchProductsAndCats = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products?limit=50'),
        api.get('/categories')
      ]);

      if (prodRes.data.success) setProducts(prodRes.data.products);
      if (catRes.data.success) {
        setCategories(catRes.data.categories);
        if (!formData.category && catRes.data.categories.length > 0) {
          setFormData((prev) => ({ ...prev, category: catRes.data.categories[0]._id }));
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCats();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      ...initialFormState,
      category: categories[0]?._id || ''
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category?._id || product.category || categories[0]?._id || '',
      images: product.images?.join(', ') || '',
      stock: product.stock,
      material: product.material,
      dimensions: product.dimensions,
      careInstructions: product.careInstructions,
      featured: product.featured,
      bestSeller: product.bestSeller
    });
    setModalOpen(true);
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the boutique?`)) return;

    try {
      const { data } = await api.delete(`/products/${id}`);
      if (data.success) {
        toast.success('Product deleted successfully');
        setProducts(products.filter((p) => p._id !== id));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const imageArray = formData.images
        .split(',')
        .map((img) => img.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Math.round(Number(formData.price) * 1.25),
        stock: Number(formData.stock),
        images: imageArray.length > 0 ? imageArray : ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80']
      };

      if (editingProduct) {
        const { data } = await api.put(`/products/${editingProduct._id}`, payload);
        if (data.success) {
          toast.success('Product updated successfully');
          setProducts(products.map((p) => (p._id === editingProduct._id ? data.product : p)));
        }
      } else {
        const { data } = await api.post('/products', payload);
        if (data.success) {
          toast.success('New product published to boutique');
          setProducts([data.product, ...products]);
        }
      }

      setModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Artisan Products</h1>
          <p className="text-xs text-gray-500 mt-1">Manage catalog items, stock counts, pricing and gallery photos.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-xs px-5 py-3 font-semibold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-2xl border border-blush-200 flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Filter products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs text-gray-800 bg-transparent focus:outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-blush-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-blush-100">
            <thead className="bg-blush-50/60 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-3">Stock</th>
                <th className="py-3.5 px-3">Badges</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">Loading catalog...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">No products match your search.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-blush-50/30 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80'}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover border border-blush-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-800 line-clamp-1">{product.name}</p>
                          <p className="text-[11px] text-gray-400">{product.dimensions}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-600 font-medium">
                      {product.category?.name || product.categoryName}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#7A1738]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        product.stock > 5 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1 flex-wrap">
                        {product.featured && <span className="badge-rose text-[9px]">Featured</span>}
                        {product.bestSeller && <span className="badge-gold text-[9px]">Best Seller</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 text-gray-400 hover:text-[#7A1738] rounded-lg hover:bg-blush-50 transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id, product.name)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <h2 className="font-serif text-2xl font-bold text-[#2B1B20]">
                {editingProduct ? 'Edit Artisan Product' : 'Add New Artisan Product'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Geode Agate Coaster Set"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="899"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    min={0}
                    placeholder="1199"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="15"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738] bg-white"
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Image URLs (comma separated)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..., https://..."
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Artisanal description of the piece, resin layers, floral composition..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-[#7A1738] focus:ring-[#7A1738]"
                  />
                  <span className="font-semibold text-gray-700">Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bestSeller}
                    onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
                    className="rounded text-[#7A1738] focus:ring-[#7A1738]"
                  />
                  <span className="font-semibold text-gray-700">Mark as Best Seller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-blush-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary text-xs px-5 py-2.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs px-6 py-2.5 font-bold"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
