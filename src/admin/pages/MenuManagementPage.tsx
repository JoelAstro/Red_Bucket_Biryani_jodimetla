import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Filter,
  Check,
  AlertCircle,
  X,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { useRestaurantData } from '../../context/RestaurantDataContext';

export const MenuManagementPage: React.FC = () => {
  const { refreshData } = useRestaurantData();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [foodTypeFilter, setFoodTypeFilter] = useState<string>('all');

  // Notification state
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<any | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    bucketCategory: 'solo',
    bucketLabel: 'Solo Bucket',
    serves: '1–2 persons',
    price: 180,
    foodType: 'chicken',
    foodCategory: 'Chicken',
    description: '',
    badge: '',
    image: '',
    isVeg: false,
    isBestseller: false,
    isAvailable: true
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  const loadMenu = async () => {
    try {
      setIsLoading(true);
      const res = await adminApi.getMenuItems();
      setItems(res.items || []);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to load menu items.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || item.bucketCategory === selectedCategory;

    const matchesAvailability =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && item.isAvailable !== false) ||
      (availabilityFilter === 'unavailable' && item.isAvailable === false);

    const matchesFoodType =
      foodTypeFilter === 'all' || item.foodType === foodTypeFilter;

    return matchesSearch && matchesCategory && matchesAvailability && matchesFoodType;
  });

  // Toggle availability
  const handleToggleAvailability = async (item: any) => {
    const nextStatus = item.isAvailable === false ? true : false;
    try {
      // Optimistic update
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isAvailable: nextStatus } : i))
      );

      const res = await adminApi.toggleAvailability(item.id, nextStatus);
      showNotification('success', res.message);
      // Synchronize public site context
      refreshData();
    } catch (err: any) {
      // Revert optimistic update
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isAvailable: item.isAvailable } : i))
      );
      showNotification('error', err.message || 'Failed to toggle availability.');
    }
  };

  // Open add modal
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      bucketCategory: 'solo',
      bucketLabel: 'Solo Bucket',
      serves: '1–2 persons',
      price: 180,
      foodType: 'chicken',
      foodCategory: 'Chicken',
      description: '',
      badge: '',
      image: '',
      isVeg: false,
      isBestseller: false,
      isAvailable: true
    });
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      bucketCategory: item.bucketCategory || 'solo',
      bucketLabel: item.bucketLabel || 'Solo Bucket',
      serves: item.serves || '1–2 persons',
      price: item.price || 0,
      foodType: item.foodType || 'chicken',
      foodCategory: item.foodCategory || 'Chicken',
      description: item.description || '',
      badge: item.badge || '',
      image: item.image || '',
      isVeg: Boolean(item.isVeg),
      isBestseller: Boolean(item.isBestseller),
      isAvailable: item.isAvailable !== false
    });
    setIsModalOpen(true);
  };

  // Handle save (Add or Edit)
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showNotification('error', 'Item name is required.');
      return;
    }

    try {
      if (editingItem) {
        // Edit existing
        const res = await adminApi.updateMenuItem(editingItem.id, formData);
        setItems((prev) => prev.map((i) => (i.id === editingItem.id ? res.item : i)));
        showNotification('success', `"${res.item.name}" updated successfully.`);
      } else {
        // Add new
        const res = await adminApi.addMenuItem(formData);
        setItems((prev) => [res.item, ...prev]);
        showNotification('success', `"${res.item.name}" added to menu.`);
      }
      setIsModalOpen(false);
      refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to save menu item.');
    }
  };

  // Handle delete
  const handleDeleteConfirm = async () => {
    if (!deleteConfirmItem) return;

    try {
      await adminApi.deleteMenuItem(deleteConfirmItem.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteConfirmItem.id));
      showNotification('success', `"${deleteConfirmItem.name}" deleted from menu.`);
      setDeleteConfirmItem(null);
      refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete item.');
    }
  };

  // Update bucket label when category changes
  const handleCategoryChange = (key: string) => {
    const labels: Record<string, { label: string; serves: string }> = {
      solo: { label: 'Solo Bucket', serves: '1–2 persons' },
      duo: { label: 'Duo Bucket', serves: '2–3 persons' },
      party: { label: 'Party Pack', serves: '4–6 persons' },
      allmix: { label: 'All Mix Party Pack', serves: '4–6 persons' },
      celebration: { label: 'Celebration Pack', serves: '10–12 persons' },
      'mighty-sixty': { label: 'Mighty Sixty', serves: '60 persons' }
    };

    setFormData((prev) => ({
      ...prev,
      bucketCategory: key,
      bucketLabel: labels[key]?.label || prev.bucketLabel,
      serves: labels[key]?.serves || prev.serves
    }));
  };

  return (
    <div className="space-y-6 select-none">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between shadow-xl animate-in slide-in-from-top-2 duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/90 border border-brand-red/50 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-brand-red" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-gold text-xs font-bold tracking-wider uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Kitchen Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            Menu Items & Availability
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 mt-0.5">
            Manage live dish availability, modify prices, update descriptions, and add new specials.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadMenu}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-gold/40 text-cream/90 hover:text-white transition-all shadow-md active:scale-95"
            title="Refresh menu items"
          >
            <RefreshCw className={`w-4 h-4 text-gold ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleOpenAdd}
            className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red via-deep-red to-burgundy hover:from-red-600 hover:to-brand-red text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-red/40 active:scale-98 transition-all"
          >
            <Plus className="w-4 h-4 text-gold" />
            <span>Add New Dish</span>
          </button>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-white/10 shadow-lg space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cream/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish name, spice style, or ingredients..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-xs sm:text-sm text-white placeholder-cream/30 focus:outline-none focus:ring-1 focus:ring-gold transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-cream/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Row: Category + Availability + Food Type */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-cream/60 mr-2 font-bold">
            <Filter className="w-3.5 h-3.5 text-gold" />
            <span>Filters:</span>
          </div>

          {/* Availability Pills */}
          <button
            onClick={() => setAvailabilityFilter('all')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              availabilityFilter === 'all'
                ? 'bg-gold text-neutral-950'
                : 'bg-neutral-900 text-cream/70 hover:text-white border border-white/5'
            }`}
          >
            All Stock
          </button>
          <button
            onClick={() => setAvailabilityFilter('available')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              availabilityFilter === 'available'
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 text-cream/70 hover:text-white border border-white/5'
            }`}
          >
            Available Only
          </button>
          <button
            onClick={() => setAvailabilityFilter('unavailable')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              availabilityFilter === 'unavailable'
                ? 'bg-amber-600 text-white'
                : 'bg-neutral-900 text-cream/70 hover:text-white border border-white/5'
            }`}
          >
            Sold Out / Unavailable
          </button>

          <span className="text-white/20 mx-1">|</span>

          {/* Food Type dropdown */}
          <select
            value={foodTypeFilter}
            onChange={(e) => setFoodTypeFilter(e.target.value)}
            className="px-3 py-1 bg-neutral-900 border border-white/10 rounded-lg text-cream font-medium focus:border-gold focus:outline-none"
          >
            <option value="all">All Food Types</option>
            <option value="chicken">Chicken</option>
            <option value="mutton">Mutton</option>
            <option value="seafood">Seafood / Fish / Prawns</option>
            <option value="egg">Egg</option>
            <option value="veg">Veg Only</option>
          </select>

          {/* Bucket Category dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 bg-neutral-900 border border-white/10 rounded-lg text-cream font-medium focus:border-gold focus:outline-none"
          >
            <option value="all">All Bucket Sizes</option>
            <option value="solo">Solo Bucket (1–2 Pax)</option>
            <option value="duo">Duo Bucket (2–3 Pax)</option>
            <option value="party">Party Pack (4–6 Pax)</option>
            <option value="allmix">All Mix Party Pack (4–6 Pax)</option>
            <option value="celebration">Celebration Pack (10–12 Pax)</option>
            <option value="mighty-sixty">Mighty Sixty (60 Pax)</option>
          </select>
        </div>
      </div>

      {/* Menu Table / Card List */}
      <div className="bg-neutral-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs text-cream/70 bg-neutral-900/50">
          <span className="font-bold">
            Showing {filteredItems.length} of {items.length} dishes
          </span>
          <span className="text-[11px]">
            Tip: Click the availability toggle switch to immediately mark an item in/out of stock.
          </span>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-cream/50 space-y-3">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs">Loading live menu items from database...</div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center text-cream/50 space-y-2">
            <AlertCircle className="w-8 h-8 text-gold/60 mx-auto" />
            <div className="text-sm font-bold text-white">No menu items match your filter criteria.</div>
            <div className="text-xs text-cream/40">Try adjusting your search query or reset filters.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900 text-gold uppercase tracking-wider text-[10px] font-black border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Dish Name & Details</th>
                  <th className="py-3 px-3">Bucket Size</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-4 text-center">Availability</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => {
                  const isAvail = item.isAvailable !== false;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-neutral-900/40 transition-colors ${
                        !isAvail ? 'opacity-70 bg-neutral-950/40' : ''
                      }`}
                    >
                      {/* Name & Details */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {/* Veg / Non-Veg Indicator */}
                          <div
                            className={`w-3.5 h-3.5 border p-0.5 rounded-sm shrink-0 flex items-center justify-center ${
                              item.isVeg
                                ? 'border-emerald-500 bg-emerald-950/40'
                                : 'border-brand-red bg-red-950/40'
                            }`}
                            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.isVeg ? 'bg-emerald-400' : 'bg-brand-red'
                              }`}
                            />
                          </div>

                          <div>
                            <div className="font-bold text-sm text-white flex items-center gap-1.5">
                              <span>{item.name}</span>
                              {item.isBestseller && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-gold text-[9px] font-black uppercase">
                                  Bestseller
                                </span>
                              )}
                              {item.badge && (
                                <span className="px-1.5 py-0.2 rounded bg-brand-red/20 text-brand-red text-[9px] font-black uppercase">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-[11px] text-cream/60 line-clamp-1 max-w-md mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Bucket Size */}
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/5 text-[11px] font-bold text-cream/90 whitespace-nowrap">
                          {item.bucketLabel || item.bucketCategory}
                        </span>
                        <div className="text-[10px] text-cream/50 mt-0.5">{item.serves}</div>
                      </td>

                      {/* Food Category */}
                      <td className="py-3 px-3">
                        <span className="text-xs font-semibold text-cream/80">
                          {item.foodCategory || item.foodType}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3">
                        <span className="text-sm font-black text-gold font-['Montserrat',sans-serif]">
                          ₹{item.price}
                        </span>
                      </td>

                      {/* Availability Toggle Switch */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleAvailability(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${
                            isAvail
                              ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
                              : 'bg-amber-950/60 border border-amber-500/50 text-amber-300 hover:bg-amber-900/60'
                          }`}
                        >
                          {isAvail ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>Available</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>Sold Out</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 rounded-lg bg-neutral-900 border border-white/10 hover:border-gold text-cream/80 hover:text-gold transition-colors"
                            title="Edit dish details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmItem(item)}
                            className="p-2 rounded-lg bg-neutral-900 border border-white/10 hover:border-red-500 text-cream/80 hover:text-red-400 transition-colors"
                            title="Delete dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-neutral-950 border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black text-white font-['Montserrat',sans-serif]">
                  {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
                </h3>
                <p className="text-xs text-cream/60 mt-0.5">
                  Update item specifics, serving sizes, pricing, and tags.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-900 text-cream/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              {/* Item Name */}
              <div>
                <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. RBB Special Chicken Dum Biryani"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                />
              </div>

              {/* Bucket Category & Bucket Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
                    Bucket Category *
                  </label>
                  <select
                    value={formData.bucketCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                  >
                    <option value="solo">Solo Bucket</option>
                    <option value="duo">Duo Bucket</option>
                    <option value="party">Party Pack</option>
                    <option value="allmix">All Mix Party Pack</option>
                    <option value="celebration">Celebration Pack</option>
                    <option value="mighty-sixty">Mighty Sixty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
                    Serving Description
                  </label>
                  <input
                    type="text"
                    value={formData.serves}
                    onChange={(e) => setFormData({ ...formData, serves: e.target.value })}
                    placeholder="e.g. 1–2 persons"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Price & Food Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white font-bold focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
                    Food Category
                  </label>
                  <select
                    value={formData.foodCategory}
                    onChange={(e) => setFormData({ ...formData, foodCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                  >
                    <option value="Chicken">Chicken</option>
                    <option value="Mutton">Mutton</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Egg">Egg</option>
                    <option value="Veg">Veg</option>
                    <option value="Special Mix">Special Mix</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ingredients, preparation style, cuts of meat, or spices..."
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                />
              </div>

              {/* Optional Badges & Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
                    Badge / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Chef Special or Spicy"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
                    Image Path or URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="e.g. /uploads/food-custom.jpg"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles: Veg, Bestseller, Available */}
              <div className="pt-2 flex flex-wrap items-center gap-4 border-t border-white/5">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-white">
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-neutral-900 border-white/20"
                  />
                  <span>Vegetarian Dish</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-white">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                    className="w-4 h-4 rounded text-gold focus:ring-gold bg-neutral-900 border-white/20"
                  />
                  <span>Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-white">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-neutral-900 border-white/20"
                  />
                  <span>Currently Available (In Stock)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-cream/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-deep-red text-white font-black uppercase tracking-wider shadow-lg hover:from-red-600 hover:to-brand-red transition-all"
                >
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-950 border border-brand-red/50 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-brand-red">
              <div className="p-2 rounded-xl bg-brand-red/20">
                <Trash2 className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="text-lg font-black text-white">Confirm Removal</h3>
            </div>

            <p className="text-xs sm:text-sm text-cream/80">
              Are you sure you want to remove <span className="font-bold text-white">"{deleteConfirmItem.name}"</span> (₹{deleteConfirmItem.price}) from the menu?
              This action will take effect across the public website immediately.
            </p>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-cream/70 hover:text-white border border-white/10 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2 rounded-xl bg-brand-red hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                Yes, Remove Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
