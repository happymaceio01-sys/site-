// Data from the original site.js
const CATEGORIES = [
  { id: 'casual', name: 'Casual', icon: 'weekend', imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop', color: '#F5E6D3', count: 24 },
  { id: 'formal', name: 'Formal', icon: 'business-center', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', color: '#D3E0F5', count: 18 },
  { id: 'sportswear', name: 'Esportivo', icon: 'fitness-center', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', color: '#D3F5D7', count: 15 },
  { id: 'streetwear', name: 'Streetwear', icon: 'style', imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop', color: '#F5D3D3', count: 21 },
];

const FASHION_ITEMS = [
  { id: '1', name: 'Look Editorial Primavera', brand: 'Studio Chic', category: 'casual', description: 'Conjunto casual com tons neutros, perfeito para o dia a dia com toque sofisticado.', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop', tags: ['primavera', 'neutros', 'casual'], isTrending: true, price: 'R$ 289' },
  { id: '2', name: 'Terno Slim Executivo', brand: 'Atelier Modern', category: 'formal', description: 'Terno slim fit em lã italiana, ideal para reuniões e eventos corporativos.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', tags: ['executivo', 'terno', 'formal'], isTrending: true, price: 'R$ 1.290' },
  { id: '3', name: 'Set Fitness Premium', brand: 'ActiveWear', category: 'sportswear', description: 'Conjunto esportivo com tecido de alta performance e design moderno.', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', tags: ['fitness', 'esporte', 'performance'], isTrending: false, price: 'R$ 349' },
  { id: '4', name: 'Outfit Urbano Grunge', brand: 'Street Code', category: 'streetwear', description: 'Visual urbano com peças oversized e referências da cultura hip-hop.', imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop', tags: ['urbano', 'oversized', 'hiphop'], isTrending: true, price: 'R$ 450' },
  { id: '5', name: 'Vestido Midi Elegant', brand: 'Belle Mode', category: 'formal', description: 'Vestido midi em seda com corte impecável para ocasiões especiais.', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop', tags: ['vestido', 'seda', 'elegante'], isTrending: true, price: 'R$ 899' },
  { id: '6', name: 'Jeans + Blazer Casual', brand: 'Denim Lab', category: 'casual', description: 'Combinação clássica de jeans e blazer oversized para um visual moderno.', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', tags: ['jeans', 'blazer', 'casual'], isTrending: false, price: 'R$ 520' },
  { id: '7', name: 'Look Running Pro', brand: 'SpeedWear', category: 'sportswear', description: 'Equipamento completo para corrida com tecnologia de absorção de impacto.', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop', tags: ['corrida', 'running', 'esporte'], isTrending: false, price: 'R$ 420' },
  { id: '8', name: 'Oversized Hoodie Set', brand: 'UrbanLux', category: 'streetwear', description: 'Moletom oversized com calça cargo, o combo perfeito do streetwear moderno.', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop', tags: ['moletom', 'cargo', 'streetwear'], isTrending: true, price: 'R$ 380' },
  { id: '9', name: 'Conjuntinho Linho', brand: 'Bege Studio', category: 'casual', description: 'Conjunto de linho fresco em tom bege, elegante e confortável para o verão.', imageUrl: 'https://images.unsplash.com/photo-1506629905607-0b5ab9a9e21a?w=400&h=300&fit=crop', tags: ['linho', 'verão', 'bege'], isTrending: false, price: 'R$ 340' },
  { id: '10', name: 'Smoking Noite', brand: 'Black Tie', category: 'formal', description: 'Smoking clássico com lapela brilhante para eventos noturnos de alto padrão.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', tags: ['smoking', 'noite', 'gala'], isTrending: false, price: 'R$ 2.100' },
  { id: '11', name: 'Sports Bra + Legging', brand: 'FitGlow', category: 'sportswear', description: 'Set de treino feminino com estampa geométrica e tecido compressivo.', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', tags: ['treino', 'legging', 'feminino'], isTrending: true, price: 'R$ 280' },
  { id: '12', name: 'Jaqueta Denim Vintage', brand: 'Retro Wear', category: 'streetwear', description: 'Jaqueta jeans com patches vintage, símbolo do estilo street contemporâneo.', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', tags: ['vintage', 'jeans', 'patches'], isTrending: false, price: 'R$ 310' },
];

const TRENDS = [
  { id: 't1', title: 'Monocromático Total', description: 'O look monocromático domina as passarelas. Aposte em uma cor do head-to-toe para um visual sofisticado e contemporâneo.', tip: 'Dica: misture texturas diferentes da mesma cor para criar profundidade.', imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop', tag: '🔥 Top Tendência' },
  { id: 't2', title: 'Quiet Luxury', description: 'Menos é mais. O quiet luxury aposta em peças atemporais, tecidos nobres e discretamente sofisticados.', tip: 'Dica: Invista em básicos de qualidade com cortes impecáveis.', imageUrl: 'https://images.unsplash.com/photo-1506629905607-0b5ab9a9e21a?w=600&h=400&fit=crop', tag: '✨ Em Alta' },
  { id: 't3', title: 'Cottagecore Urbano', description: 'A estética rural encontra a cidade. Vestidos florais, tecidos naturais e peças românticas nas ruas.', tip: 'Dica: Combine linho com flores para o look perfeito.', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop', tag: '🌸 Novo' },
  { id: 't4', title: 'Y2K Revival', description: 'Os anos 2000 voltaram com tudo! Calças de cintura baixa, tops cropped e brilho são o must-have da temporada.', tip: 'Dica: Um acessório Y2K já faz toda a diferença.', imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=400&fit=crop', tag: '💫 Viral' },
  { id: 't5', title: 'Gorpcore Sofisticado', description: 'A moda outdoor invade o cotidiano. Coletes técnicos, tênis chunky e peças funcionais com estilo.', tip: 'Dica: Misture peças técnicas com jeans para o equilíbrio perfeito.', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop', tag: '⛰️ Destaque' }
];

// Material Icons mapping (simplified)
const ICONS = {
  'weekend': '🏖️',
  'business-center': '💼',
  'fitness-center': '🏋️',
  'style': '👔',
  'favorite-border': '🤍',
  'favorite': '❤️',
  'lightbulb': '💡',
  'arrow-forward': '→'
};

// State
let currentFilter = 'all';
let searchTerm = '';

// DOM elements
const categoriesContainer = document.getElementById('categoriesContainer');
const trendingContainer = document.getElementById('trendingContainer');
const galleryContainer = document.getElementById('galleryContainer');
const filtersContainer = document.getElementById('filtersContainer');
const trendsContainer = document.getElementById('trendsContainer');
const searchInput = document.getElementById('searchInput');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  renderCategories();
  renderTrending();
  renderFilters();
  renderGallery();
  renderTrends();

  // Search functionality
  searchInput.addEventListener('input', function(e) {
    searchTerm = e.target.value.toLowerCase();
    renderGallery();
  });
});

// Render functions
function renderCategories() {
  categoriesContainer.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card ${cat.id}" onclick="filterByCategory('${cat.id}')">
      <img src="${cat.imageUrl}" alt="${cat.name}" class="category-image" style="width: 100%; height: 120px; object-fit: cover; border-radius: 12px; margin-bottom: 12px;">
      <span class="category-icon">${ICONS[cat.icon] || '👕'}</span>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count} looks</div>
    </div>
  `).join('');
}

function renderTrending() {
  const trendingItems = FASHION_ITEMS.filter(item => item.isTrending);
  trendingContainer.innerHTML = trendingItems.map((item, index) => `
    <div class="trending-card ${index === 0 ? 'large' : ''}" onclick="showItemDetail('${item.id}')">
      <div class="trending-overlay">
        <img src="${item.imageUrl}" alt="${item.name}" class="trending-image" style="width: 100%; height: ${index === 0 ? '300px' : '160px'}; object-fit: cover;">
        <div class="category-badge">${item.category}</div>
      </div>
      <div class="trending-info">
        <div class="trending-name">${item.name}</div>
        <div class="trending-brand">${item.brand}</div>
        <div class="trending-price">${item.price}</div>
      </div>
    </div>
  `).join('');
}

function renderFilters() {
  filtersContainer.innerHTML = `
    <div class="filters">
      <button class="filter-chip ${currentFilter === 'all' ? 'active' : ''}" onclick="setFilter('all')">Todos</button>
      ${CATEGORIES.map(cat => `
        <button class="filter-chip ${currentFilter === cat.id ? 'active' : ''}" onclick="setFilter('${cat.id}')">${cat.name}</button>
      `).join('')}
    </div>
  `;
}

function renderGallery() {
  let filteredItems = currentFilter === 'all' ? FASHION_ITEMS : FASHION_ITEMS.filter(item => item.category === currentFilter);

  if (searchTerm) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  galleryContainer.innerHTML = filteredItems.map(item => `
    <div class="gallery-card" onclick="showItemDetail('${item.id}')">
      <div style="position: relative;">
        <img src="${item.imageUrl}" alt="${item.name}" class="gallery-image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 16px;">
        <div class="gallery-heart">${ICONS['favorite-border']}</div>
      </div>
      <div class="gallery-info">
        <div class="gallery-name">${item.name}</div>
        <div class="gallery-brand">${item.brand}</div>
        <div class="gallery-price">${item.price}</div>
      </div>
    </div>
  `).join('');

  if (filteredItems.length === 0) {
    galleryContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: #8B8B8B;">
        <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
        <div style="font-size: 16px; margin-bottom: 8px;">Nenhum look encontrado</div>
        <div style="font-size: 14px;">Tente uma pesquisa diferente</div>
      </div>
    `;
  }
}

function renderTrends() {
  trendsContainer.innerHTML = TRENDS.map((trend, index) => `
    <div class="trend-card">
      <div class="trend-overlay">
        <img src="${trend.imageUrl}" alt="${trend.title}" class="trend-image" style="width: 100%; height: 240px; object-fit: cover;">
        <div class="trend-tag">${trend.tag}</div>
        <div class="trend-index">#${index + 1}</div>
      </div>
      <div class="trend-content">
        <h3 class="trend-title">${trend.title}</h3>
        <p class="trend-desc">${trend.description}</p>
        <div class="trend-tip">
          <strong>Dica:</strong>
          <p>${trend.tip.replace('Dica: ', '')}</p>
        </div>
        <a class="trend-explore" href="#gallery">Explorar Look</a>
      </div>
    </div>
  `).join('');
}

// Event handlers
function filterByCategory(categoryId) {
  currentFilter = categoryId;
  renderFilters();
  renderGallery();
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

function setFilter(filter) {
  currentFilter = filter;
  renderFilters();
  renderGallery();
}

function showItemDetail(itemId) {
  const item = FASHION_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  // Simple modal/alert for demo
  const modalContent = `
    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
      <img src="${item.imageUrl}" alt="${item.name}" style="width: 100%; height: 300px; object-fit: cover;">
      <div style="padding: 24px;">
        <div style="background: ${CATEGORIES.find(c => c.id === item.category)?.color || '#F5E6D3'}; display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 12px;">
          ${item.category}
        </div>
        <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">${item.name}</h2>
        <p style="color: #8B8B8B; font-size: 16px; margin-bottom: 12px;">${item.brand}</p>
        <p style="color: #C9A96E; font-size: 24px; font-weight: 800; margin-bottom: 20px;">${item.price}</p>
        <div style="height: 1px; background: #E8E3DC; margin: 20px 0;"></div>
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 12px;">Sobre este Look</h3>
        <p style="color: #8B8B8B; line-height: 1.6; margin-bottom: 16px;">${item.description}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
          ${item.tags.map(tag => `<span style="background: #FAF9F7; border: 1px solid #E8E3DC; padding: 6px 12px; border-radius: 20px; font-size: 13px; color: #8B8B8B;">#${tag}</span>`).join('')}
        </div>
        <button onclick="closeModal()" style="width: 100%; background: #1a1a1a; color: white; border: none; padding: 16px; border-radius: 14px; font-weight: 700; cursor: pointer;">Fechar</button>
      </div>
    </div>
  `;

  // Create modal overlay
  const modal = document.createElement('div');
  modal.id = 'itemModal';
  modal.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;" onclick="closeModal()">
      ${modalContent}
    </div>
  `;
  document.body.appendChild(modal);
}

function closeModal() {
  const modal = document.getElementById('itemModal');
  if (modal) {
    modal.remove();
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});