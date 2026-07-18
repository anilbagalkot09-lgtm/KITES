import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Zap, 
  Layers, 
  Maximize2, 
  Scale, 
  Search, 
  ShoppingBag, 
  Trash2, 
  Info, 
  Compass, 
  CheckCircle,
  Truck,
  Phone,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';

// Complete product database parsed exactly from the brochure specifications
const KITES_PRODUCTS = [
  { id: 'bulk-1', name: '2 Zone Bulk Cooking', category: 'Bulk Cooking', capacity: '2 Dish', power: '8-12kw', size: "3'x5'x2.5'", weight: '50-60kg', minPower: 8, maxPower: 12 },
  { id: 'wok-1', name: '2 Zone Chinese Wok', category: 'Live Counter', capacity: '2 Dish', power: '3-5kw', size: "2'x4'x2.5'", weight: '30-40kg', minPower: 3, maxPower: 5 },
  { id: 'live-1', name: '2 Zone Live Counter & Kadai', category: 'Live Counter', capacity: '2 Dish', power: '5-10kw', size: "2'x4'x2.5'", weight: '25-40kg', minPower: 5, maxPower: 10 },
  { id: 'dosa-1', name: '2x2 Dosa Tawa', category: 'Multi-Zone', capacity: '01-Oct', power: '5-40kw', size: 'Multiple', weight: '50-150kg', minPower: 5, maxPower: 40 },
  { id: 'zone-3', name: '3 Zone Multi-Cooker', category: 'Multi-Zone', capacity: '3 Dish', power: '10-15kw', size: "4'x6'x2.5'", weight: '30-35kg', minPower: 10, maxPower: 15 },
  { id: 'bulk-2', name: 'Bulk Cooking Unit Base', category: 'Bulk Cooking', capacity: '1 Dish', power: '5-12kw', size: "2'x2'x2.5'", weight: '15-20kg', minPower: 5, maxPower: 12 },
  { id: 'bret-1', name: 'Bret Pan', category: 'Specialized', capacity: '100-500L', power: '8-40kw', size: 'Multiple', weight: 'Varying', minPower: 8, maxPower: 40 },
  { id: 'stock-1', name: 'Stock Pot', category: 'Bulk Cooking', capacity: '100-500L', power: '12-45kw', size: 'Multiple', weight: 'Varying', minPower: 12, maxPower: 45 },
  { id: 'frier-1', name: 'Batch Frier', category: 'Specialized', capacity: '100-500L', power: '20-40kw', size: 'Multiple', weight: 'Varying', minPower: 20, maxPower: 40 },
  { id: 'roast-1', name: 'Batch Roaster', category: 'Specialized', capacity: '25-500L', power: '8-20kw', size: 'Multiple', weight: '100-300kg', minPower: 8, maxPower: 20 },
  { id: 'warm-1', name: 'Buffet Warmer', category: 'Live Counter', capacity: '2 to 10', power: '0.5-2kw', size: 'STD', weight: 'Varying', minPower: 0.5, maxPower: 2 },
  { id: 'croast-1', name: 'Continuous Roaster', category: 'Specialized', capacity: "5' to 10'", power: '60-120kw', size: 'Multiple', weight: 'Varying', minPower: 60, maxPower: 120 },
  { id: 'idli-1', name: 'Idli Pan System', category: 'Bulk Cooking', capacity: '120-320 pcs', power: '5-40kw', size: 'Multiple', weight: 'Varying', minPower: 5, maxPower: 40 },
  { id: 'jilebi-1', name: 'Jilebi Kadai', category: 'Live Counter', capacity: 'STD', power: '5-8kw', size: 'STD', weight: 'STD', minPower: 5, maxPower: 8 },
  { id: 'kadai-1', name: 'Industrial Kadai', category: 'Bulk Cooking', capacity: '18" - 42"', power: '5-40kw', size: 'Multiple', weight: 'Varying', minPower: 5, maxPower: 40 },
  { id: 'live-base', name: 'Live Counter Compact', category: 'Live Counter', capacity: 'STD', power: '3.5kw', size: "1.5'x1.5'x0.5'", weight: '15kg', minPower: 3.5, maxPower: 3.5 },
  { id: 'milk-1', name: 'Milk Boiler', category: 'Specialized', capacity: '25-500L', power: '8-30kw', size: 'Multiple', weight: 'Varying', minPower: 8, maxPower: 30 },
  { id: 'mobile-1', name: 'Mobile Kitchen Unit', category: 'Specialized', capacity: 'STD', power: '50kw', size: 'STD', weight: 'Varying', minPower: 50, maxPower: 50 },
  { id: 'pav-1', name: 'Pav Bhaaji Kadai', category: 'Live Counter', capacity: '18"-32"', power: '3.5-12kw', size: 'STD', weight: '70-100kg', minPower: 3.5, maxPower: 12 },
  { id: 'rice-1', name: 'Rice Boiler', category: 'Bulk Cooking', capacity: '100-500L', power: '12-45kw', size: 'Multiple', weight: 'Varying', minPower: 12, maxPower: 45 },
  { id: 'sand-1', name: 'Sand Roaster', category: 'Specialized', capacity: "5' - 10'", power: '100-200kw', size: 'Multiple', weight: 'Varying', minPower: 100, maxPower: 200 }
];

export default function KitesShowroom() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [configuratorGrid, setConfiguratorGrid] = useState([]);

  // Filter computation logic
  const filteredProducts = useMemo(() => {
    return KITES_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Handle adding an item to the custom load calculator
  const addToCalculationLayout = (product) => {
    setConfiguratorGrid(prev => [...prev, { ...product, uniqueId: Date.now() }]);
  };

  // Remove item from load calculator
  const removeFromLayout = (uniqueId) => {
    setConfiguratorGrid(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  // Aggregate load requirements
  const totalPowerLoad = useMemo(() => {
    return configuratorGrid.reduce((sum, item) => sum + item.maxPower, 0);
  }, [configuratorGrid]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* BRAND HEADER BANNER */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white border-b-4 border-amber-400 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-md shadow-sm">
                Industry 4.0 Ready
              </span>
              <span className="text-slate-400 text-xs tracking-wider">Brochure Date: 29-Apr-2026</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white flex items-center gap-2">
              KITES<span className="text-amber-400 text-lg font-medium tracking-normal block self-end pb-1.5 font-mono ml-1">®</span>
            </h1>
            <p className="text-amber-400 font-semibold tracking-wide text-sm sm:text-base italic uppercase mt-1">
              Heat Only What Matters
            </p>
            <p className="text-slate-300 max-w-2xl text-xs sm:text-sm mt-4 leading-relaxed font-light">
              KALIKA INDUCTION TECH EQUIPMENTS & SOLUTIONS fuses engineering precision with heavy-duty performance. Designed to deliver maximum output with minimal energy waste across commercial and industrial enterprise setups.
            </p>
          </div>
          
          {/* QUICK BRAND MISSION EMBED */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-sm w-full">
            <h3 className="font-bold text-white text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <Compass className="text-amber-400" size={14} /> Our Core Vision
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              Redefining heating technology through efficient, sustainable, and highly connected induction architectures built to withstand real high-demand kitchens.
            </p>
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* INTERACTIVE LOAD CONFIGURATOR PANEL */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="text-blue-600" size={18} />
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Kitchen Load Estimator</h2>
            </div>
            <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
              Add hardware profiles from the catalog to run a virtual diagnostic estimation of cumulative infrastructure draw metrics.
            </p>

            {configuratorGrid.length === 0 ? (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-2">
                <ShoppingBag size={20} className="text-slate-300" />
                <span>No assets active in simulator layout. Click "Add to Grid" to begin.</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 mb-4">
                {configuratorGrid.map((item) => (
                  <div key={item.uniqueId} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                    <div className="truncate pr-2">
                      <p className="font-bold text-slate-800 truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">Max Load: {item.power}</p>
                    </div>
                    <button 
                      onClick={() => removeFromLayout(item.uniqueId)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove asset"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* LIVE DATA READOUT */}
            <div className="border-t border-slate-200 pt-4 space-y-2.5">
              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Total Active Units:</span>
                <span className="font-bold text-slate-900 font-mono">{configuratorGrid.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Estimated Max Power:</span>
                <span className="font-extrabold text-blue-600 font-mono text-sm bg-blue-50 px-2 py-0.5 rounded">
                  {totalPowerLoad.toFixed(1)} kW
                </span>
              </div>
            </div>

            {totalPowerLoad > 100 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-900 flex items-start gap-1.5 leading-relaxed">
                <Info size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>High capacity load profile detected. Heavy duty sub-station panel isolation matching is highly suggested for these ratings.</span>
              </div>
            )}
          </div>
        </section>

        {/* PRODUCTS LIVING CATALOG GRID MAP */}
        <section className="lg:col-span-3 space-y-6">
          
          {/* SEARCH AND NAVIGATION FILTER PILLS */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search catalog models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>

            {/* Filter Category Tabs */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {['All', 'Multi-Zone', 'Bulk Cooking', 'Specialized', 'Live Counter'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap uppercase ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* CATALOG CONTAINER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
                >
                  {/* CARD HEADER */}
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] font-black tracking-widest uppercase bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm mt-1.5 tracking-tight group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* DATA METRIC LINES */}
                  <div className="p-4 space-y-2 text-xs flex-grow bg-white">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400 flex items-center gap-1"><Flame size={12} /> Capacity</span>
                      <span className="font-semibold text-slate-800">{product.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400 flex items-center gap-1"><Zap size={12} /> Power Rating</span>
                      <span className="font-bold text-amber-600 font-mono">{product.power}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400 flex items-center gap-1"><Maximize2 size={12} /> Dimensions</span>
                      <span className="font-mono text-slate-700 font-medium">{product.size}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-400 flex items-center gap-1"><Scale size={12} /> Net Mass</span>
                      <span className="text-slate-700 font-medium">{product.weight}</span>
                    </div>
                  </div>

                  {/* ACTION CONTROLS FOOTER */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 mt-auto">
                    <button
                      onClick={() => addToCalculationLayout(product)}
                      className="w-full bg-white hover:bg-blue-600 border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-white text-xs font-bold py-1.5 px-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle size={14} /> Add to Simulation
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                <Info size={24} className="text-slate-300" />
                <span>No hardware configuration matches your filter constraints.</span>
              </div>
            )}
          </div>

          {/* FULL COMPREHENSIVE SCHEMATIC OVERVIEW MAP LINK */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-sm border border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Truck size={18} className="text-blue-400" /> Complete Equipment Schematic Directory
                </h3>
                <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                  To view cross-sectional engineering layout configurations, design structures, and comparative dimensions across all multi-zone frames, refer directly to the master asset file named <strong className="text-slate-200 font-mono text-xs">"equipments full image.jpg"</strong> verbatim.
                </p>
              </div>
            </div>
          </div>

        </section>
      </main>

      {/* FOOTER & OFFICIAL CORPORATE CREDENTIALS */}
      <footer className="bg-slate-950 text-slate-400 text-xs mt-20 border-t border-slate-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-slate-100 font-extrabold text-sm tracking-wide mb-2">KALIKA INDUCTION TECH EQUIPMENTS & SOLUTIONS</p>
            <p className="text-slate-500 text-[11px] leading-relaxed max-w-xs">
              Forward-thinking induction coil systems built for absolute structural performance, durability, and adaptive thermal control within commercial kitchens.
            </p>
          </div>
          
          <div>
            <p className="text-slate-200 font-bold text-xs uppercase tracking-widest mb-3">Why Choose KITES</p>
            <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
              <li>Engineered Efficiency for maximum thermal output</li>
              <li>Built for High-Demand Industrial Durability</li>
              <li>Global Supply Chain Mastery & Precision</li>
              <li>Customer-Centric Innovation framework</li>
            </ul>
          </div>
          
          {/* SECURE DIRECT CONTACT FIELD OVERVIEW TARGETS */}
          <div className="space-y-2 border-t border-slate-800 md:border-t-0 pt-4 md:pt-0">
            <p className="text-slate-200 font-bold text-xs uppercase tracking-widest mb-1">Corporate Relations Desk</p>
            <div className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors">
              <MapPin size={14} className="text-slate-600" />
              <span>India Production Facilities Office</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors">
              <Phone size={14} className="text-slate-600" />
              <span>Contact Phone: [Brochure Records System]</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors">
              <Mail size={14} className="text-slate-600" />
              <span>Email Link: [System Core Security Masked]</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-600">
          © 2026 KITES Tech Systems Group. All manufacturing data, electromagnetic coil specification layouts, and industrial configurations are registered assets under active protection laws.
        </div>
      </footer>

    </div>
  );
}