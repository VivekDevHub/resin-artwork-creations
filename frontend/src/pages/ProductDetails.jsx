import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Share2,
  CheckCircle,
  MessageSquare,
  Clock
} from 'lucide-react';
import RatingStars from '../components/common/RatingStars';
import ProductCard from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customizationText, setCustomizationText] = useState('');
  const [loading, setLoading] = useState(true);

  // Review submission state
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '', title: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        if (data.success) {
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts || []);
          setSelectedImgIndex(0);

          // Fetch reviews
          const revRes = await api.get(`/reviews/product/${data.product._id}`);
          if (revRes.data.success) {
            setReviews(revRes.data.reviews || []);
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square bg-blush-100/50 rounded-3xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-blush-100/50 rounded-xl w-3/4 animate-pulse" />
            <div className="h-6 bg-blush-100/50 rounded-xl w-1/4 animate-pulse" />
            <div className="h-24 bg-blush-100/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#2B1B20] mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The handcrafted piece you are looking for may have been retired or moved.</p>
        <Link to="/shop" className="btn-primary text-sm px-6 py-3">Back to Boutique</Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, quantity, customizationText);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, customizationText);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      toast.error('Please write a comment for your review');
      return;
    }

    setSubmittingReview(true);
    try {
      const { data } = await api.post('/reviews', {
        productId: product._id,
        name: newReview.name || 'Artisan Collector',
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment
      });

      if (data.success) {
        toast.success('Thank you! Your review has been added.');
        setReviews([data.review, ...reviews]);
        setNewReview({ rating: 5, comment: '', name: '', title: '' });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#7A1738]">Home</Link>
          <span>&bull;</span>
          <Link to="/shop" className="hover:text-[#7A1738]">Shop</Link>
          <span>&bull;</span>
          <Link to={`/shop?category=${product.category?.slug}`} className="hover:text-[#7A1738]">
            {product.categoryName || product.category?.name || 'Artisan Work'}
          </Link>
          <span>&bull;</span>
          <span className="text-[#7A1738] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-[#F4B6C2]/40 shadow-soft">
              <img
                src={product.images[selectedImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {product.discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-[#D81B60] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 ${
                      selectedImgIndex === idx
                        ? 'border-[#7A1738] shadow-md scale-95'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Pricing, Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#D81B60] font-semibold">
                  {product.categoryName || 'Bespoke Handmade'}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#7A1738]"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20] mt-1 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-3">
                <RatingStars rating={product.rating || 5} numReviews={product.numReviews || 12} />
                <span className="text-xs text-gray-400">&bull;</span>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                  {product.stock > 0 ? 'Handcrafted & In Stock' : 'Made to Order'}
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-white border border-blush-200/70 shadow-sm flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#7A1738]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold text-[#D81B60]">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                </span>
              )}
              <span className="ml-auto text-[11px] text-gray-400">Inclusive of all taxes</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Personalization / Custom Inscription input */}
            <div className="p-4 rounded-2xl bg-blush-50/70 border border-blush-200">
              <label className="block text-xs font-semibold text-[#7A1738] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C9A227]" />
                Personalization / Inscription (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Enter name, initials, wedding date, or custom quote..."
                value={customizationText}
                onChange={(e) => setCustomizationText(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738] shadow-inner"
              />
              <p className="text-[11px] text-gray-500 mt-1.5">
                Mahima will handcraft your personalization in golden or silver metallic calligraphy.
              </p>
            </div>

            {/* Quantity and Primary CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-blush-300 rounded-full bg-white px-3 py-1.5 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#7A1738] font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#7A1738] font-bold text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary text-sm py-3.5 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-full border transition ${
                    isFavorited
                      ? 'bg-rose-50 border-[#D81B60] text-[#D81B60]'
                      : 'bg-white border-blush-300 text-gray-500 hover:text-[#D81B60]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#D81B60]' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full btn-gold text-sm py-3.5 font-bold flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-[#836511]" />
                <span>Buy Now with Instant Checkout</span>
              </button>
            </div>

            {/* Artisan Badges & Shipping Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-blush-200 text-xs text-gray-600">
              <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-blush-100">
                <Truck className="w-5 h-5 text-[#C9A227] shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Free Delivery</p>
                  <p className="text-[11px] text-gray-500">On orders ₹999+</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-blush-100">
                <Clock className="w-5 h-5 text-[#C9A227] shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">4-6 Business Days</p>
                  <p className="text-[11px] text-gray-500">Careful dispatch</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 bg-white p-3 rounded-2xl border border-blush-100">
                <ShieldCheck className="w-5 h-5 text-[#C9A227] shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Handcrafted Trust</p>
                  <p className="text-[11px] text-gray-500">Indore Atelier</p>
                </div>
              </div>
            </div>

            {/* Specifications Accordion / Block */}
            <div className="bg-white rounded-3xl p-6 border border-blush-200 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2B1B20]">Specifications & Care</h3>
              <div className="space-y-2.5 text-xs text-gray-700 divide-y divide-blush-100">
                <div className="flex justify-between pt-2">
                  <span className="font-semibold text-gray-500">Material</span>
                  <span className="text-right font-medium max-w-xs">{product.material}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-semibold text-gray-500">Dimensions</span>
                  <span className="text-right font-medium">{product.dimensions}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-semibold text-gray-500">Care Instructions</span>
                  <span className="text-right font-medium max-w-xs">{product.careInstructions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16 md:mt-24 pt-12 border-t border-blush-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-[#2B1B20]">Patron Reviews & Ratings</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <RatingStars rating={product.rating || 5} numReviews={reviews.length} size="md" />
              </div>
            </div>

            {/* Write a review form */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-blush-200 shadow-soft mb-12">
              <h3 className="font-serif text-xl font-bold text-[#2B1B20] mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#7A1738]" />
                Leave a Verified Patron Review
              </h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                    >
                      <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                      <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                      <option value="3">★★★☆☆ (3 Stars - Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Review Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Stunning floral finish and packaging!"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Review Details</label>
                  <textarea
                    rows={3}
                    placeholder="Share your experience with the craftsmanship, packaging, and delivery..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn-primary text-xs px-6 py-3"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>

            {/* List of Reviews */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-6">Be the first to review this artisanal masterpiece!</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev._id} className="bg-white rounded-2xl p-5 border border-blush-100 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <RatingStars rating={rev.rating} showNum={false} size="xs" />
                      <span className="text-[11px] text-gray-400">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {rev.title && <h4 className="font-serif font-bold text-base text-[#2B1B20]">{rev.title}</h4>}
                    <p className="text-xs text-gray-600 leading-relaxed italic">"{rev.comment}"</p>
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <span className="font-semibold text-[#7A1738]">{rev.name}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified Purchase
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-24 pt-12 border-t border-blush-200">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-semibold text-[#D81B60] uppercase tracking-wider block mb-1">
                You May Also Cherish
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2B1B20]">
                Related Artisan Creations
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
