const ComponentFunction = function () {
    // @section:imports @depends:[]
    const React = require('react');
    const { useState, useEffect, useContext, useMemo, useCallback } = React;
    const { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert, Platform, StatusBar,
        ActivityIndicator, FlatList, Dimensions, Image } = require('react-native');
    const { MaterialIcons } = require('@expo/vector-icons');
    const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');
    const { createStackNavigator } = require('@react-navigation/stack');
    const { useSafeAreaInsets } = require('react-native-safe-area-context');
    const { useCamera } = require('platform-hooks');
    // @end:imports

    // @section:theme @depends:[]
    var TAB_MENU_HEIGHT = Platform.OS === 'web' ? 56 : 49;
    var SCROLL_EXTRA_PADDING = 16;
    var WEB_TAB_MENU_PADDING = 90;
    var FAB_SPACING = 16;

    var primaryColor = '#1a1a1a';
    var accentColor = '#C9A96E';
    var backgroundColor = '#FAF9F7';
    var cardColor = '#FFFFFF';
    var textPrimary = '#1a1a1a';
    var textSecondary = '#8B8B8B';
    var borderColor = '#E8E3DC';
    var storageStrategy = 'local';
    // @end:theme

    // @section:navigation-setup @depends:[]
    var Tab = createBottomTabNavigator();
    var Stack = createStackNavigator();
    // @end:navigation-setup

    // @section:data @depends:[]
    var CATEGORIES = [
        {
            id: 'casual', name: 'Casual', icon: 'weekend', imageKey: 'IMAGE:casual-fashion-woman-street', color: '#F5E6D3', count:
                24
        },
        {
            id: 'formal', name: 'Formal', icon: 'business-center', imageKey: 'IMAGE:elegant-formal-fashion-suit', color:
                '#D3E0F5', count: 18
        },
        {
            id: 'sportswear', name: 'Esportivo', icon: 'fitness-center', imageKey: 'IMAGE:sportswear-athletic-outfit', color:
                '#D3F5D7', count: 15
        },
        {
            id: 'streetwear', name: 'Streetwear', icon: 'style', imageKey: 'IMAGE:streetwear-urban-fashion-young', color:
                '#F5D3D3', count: 21
        },
    ];

    var FASHION_ITEMS = [
        { id: '1', name: 'Look Editorial Primavera', brand: 'Studio Chic', category: 'casual', description: 'Conjunto casual com tons neutros, perfeito para o dia a dia com toque sofisticado.', imageKey: 'IMAGE:woman-fashion-editorial-spring-look', tags: ['primavera', 'neutros', 'casual'], isTrending: true, price: 'R$ 289' },
        { id: '2', name: 'Terno Slim Executivo', brand: 'Atelier Modern', category: 'formal', description: 'Terno slim fit em lã italiana, ideal para reuniões e eventos corporativos.', imageKey: 'IMAGE:men-slim-suit-business-elegant', tags: ['executivo', 'terno', 'formal'], isTrending: true, price: 'R$ 1.290' },
        { id: '3', name: 'Set Fitness Premium', brand: 'ActiveWear', category: 'sportswear', description: 'Conjunto esportivo com tecido de alta performance e design moderno.', imageKey: 'IMAGE:woman-fitness-sportswear-gym', tags: ['fitness', 'esporte', 'performance'], isTrending: false, price: 'R$ 349' },
        { id: '4', name: 'Outfit Urbano Grunge', brand: 'Street Code', category: 'streetwear', description: 'Visual urbano com peças oversized e referências da cultura hip-hop.', imageKey: 'IMAGE:streetwear-urban-grunge-outfit-male', tags: ['urbano', 'oversized', 'hiphop'], isTrending: true, price: 'R$ 450' },
        { id: '5', name: 'Vestido Midi Elegant', brand: 'Belle Mode', category: 'formal', description: 'Vestido midi em seda com corte impecável para ocasiões especiais.', imageKey: 'IMAGE:elegant-midi-dress-woman-evening', tags: ['vestido', 'seda', 'elegante'], isTrending: true, price: 'R$ 899' },
        { id: '6', name: 'Jeans + Blazer Casual', brand: 'Denim Lab', category: 'casual', description: 'Combinação clássica de jeans e blazer oversized para um visual moderno.', imageKey: 'IMAGE:woman-blazer-jeans-casual-chic', tags: ['jeans', 'blazer', 'casual'], isTrending: false, price: 'R$ 520' },
        { id: '7', name: 'Look Running Pro', brand: 'SpeedWear', category: 'sportswear', description: 'Equipamento completo para corrida com tecnologia de absorção de impacto.', imageKey: 'IMAGE:running-sportswear-athlete-street', tags: ['corrida', 'running', 'esporte'], isTrending: false, price: 'R$ 420' },
        { id: '8', name: 'Oversized Hoodie Set', brand: 'UrbanLux', category: 'streetwear', description: 'Moletom oversized com calça cargo, o combo perfeito do streetwear moderno.', imageKey: 'IMAGE:oversized-hoodie-streetwear-fashion', tags: ['moletom', 'cargo', 'streetwear'], isTrending: true, price: 'R$ 380' },
        { id: '9', name: 'Conjuntinho Linho', brand: 'Bege Studio', category: 'casual', description: 'Conjunto de linho fresco em tom bege, elegante e confortável para o verão.', imageKey: 'IMAGE:linen-set-woman-summer-elegant', tags: ['linho', 'verão', 'bege'], isTrending: false, price: 'R$ 340' },
        { id: '10', name: 'Smoking Noite', brand: 'Black Tie', category: 'formal', description: 'Smoking clássico com lapela brilhante para eventos noturnos de alto padrão.', imageKey: 'IMAGE:men-tuxedo-smoking-elegant-night', tags: ['smoking', 'noite', 'gala'], isTrending: false, price: 'R$ 2.100' },
        { id: '11', name: 'Sports Bra + Legging', brand: 'FitGlow', category: 'sportswear', description: 'Set de treino feminino com estampa geométrica e tecido compressivo.', imageKey: 'IMAGE:woman-sports-bra-legging-workout', tags: ['treino', 'legging', 'feminino'], isTrending: true, price: 'R$ 280' },
        { id: '12', name: 'Jaqueta Denim Vintage', brand: 'Retro Wear', category: 'streetwear', description: 'Jaqueta jeans com patches vintage, símbolo do estilo street contemporâneo.', imageKey: 'IMAGE:vintage-denim-jacket-patches-streetwear', tags: ['vintage', 'jeans', 'patches'], isTrending: false, price: 'R$ 310' }
    ];

var TRENDS = [
    { id: 't1', title: 'Monocromático Total', description: 'O look monocromático domina as passarelas. Aposte em uma cor do head-to-toe para um visual sofisticado e contemporâneo.', tip: 'Dica: misture texturas diferentes da mesma cor para criar profundidade.', imageKey: 'IMAGE:monochromatic-fashion-editorial-elegant', tag: '🔥 Top Tendência' },
    { id: 't2', title: 'Quiet Luxury', description: 'Menos é mais. O quiet luxury aposta em peças atemporais, tecidos nobres e discretamente sofisticados.', tip: 'Dica: Invista em básicos de qualidade com cortes impecáveis.', imageKey: 'IMAGE:quiet-luxury-fashion-minimalist-elegant', tag: '✨ Em Alta' },
    { id: 't3', title: 'Cottagecore Urbano', description: 'A estética rural encontra a cidade. Vestidos florais, tecidos naturais e peças românticas nas ruas.', tip: 'Dica: Combine linho com flores para o look perfeito.', imageKey: 'IMAGE:cottagecore-floral-dress-woman-outdoor', tag: '🌸 Novo' },
    { id: 't4', title: 'Y2K Revival', description: 'Os anos 2000 voltaram com tudo! Calças de cintura baixa, tops cropped e brilho são o must-have da temporada.', tip: 'Dica: Um acessório Y2K já faz toda a diferença.', imageKey: 'IMAGE:y2k-fashion-revival-trendy-young', tag: '💫 Viral' },
    { id: 't5', title: 'Gorpcore Sofisticado', description: 'A moda outdoor invade o cotidiano. Coletes técnicos, tênis chunky e peças funcionais com estilo.', tip: 'Dica: Misture peças técnicas com jeans para o equilíbrio perfeito.', imageKey: 'IMAGE:gorpcore-outdoor-fashion-technical-wear', tag: '⛰️ Destaque' }
];
// @end:data

// @section:ThemeContext @depends:[theme]
var ThemeContext = React.createContext({
    theme: {
        colors: {
            primary: primaryColor, accent: accentColor, background: backgroundColor,
            card: cardColor, textPrimary: textPrimary, textSecondary: textSecondary,
            border: borderColor, success: '#10B981', error: '#EF4444', warning: '#F59E0B'
        }
    },
    darkMode: false,
    toggleDarkMode: function () { },
});

var ThemeProvider = function (props) {
    var darkModeState = useState(false);
    var darkMode = darkModeState[0];
    var setDarkMode = darkModeState[1];

    var lightTheme = useMemo(function () {
        return {
            colors: {
                primary: primaryColor, accent: accentColor, background: backgroundColor,
                card: cardColor, textPrimary: textPrimary, textSecondary: textSecondary,
                border: borderColor, success: '#10B981', error: '#EF4444', warning: '#F59E0B'
            }
        };
    }, []);

    var darkTheme = useMemo(function () {
        return {
            colors: {
                primary: '#FAF9F7', accent: accentColor, background: '#111111',
                card: '#1E1E1E', textPrimary: '#FAF9F7', textSecondary: '#9B9B9B',
                border: '#2A2A2A', success: '#10B981', error: '#EF4444', warning: '#F59E0B'
            }
        };
    }, []);

    var theme = darkMode ? darkTheme : lightTheme;
    var toggleDarkMode = useCallback(function () {
        setDarkMode(function (prev) { return !prev; });
    }, []);

    var value = useMemo(function () {
        return { theme: theme, darkMode: darkMode, toggleDarkMode: toggleDarkMode };
    }, [theme, darkMode, toggleDarkMode]);

    return React.createElement(ThemeContext.Provider, { value: value }, props.children);
};

var useTheme = function () { return useContext(ThemeContext); };
// @end:ThemeContext

// @section:HomeScreen-state @depends:[ThemeContext]
var useHomeScreenState = function () {
    var themeContext = useTheme();
    var theme = themeContext.theme;
    var activeFilterState = useState('all');
    var activeFilter = activeFilterState[0];
    var setActiveFilter = activeFilterState[1];
    var trendingItems = useMemo(function () {
        return FASHION_ITEMS.filter(function (item) { return item.isTrending; });
    }, []);
    return { theme: theme, activeFilter: activeFilter, setActiveFilter: setActiveFilter, trendingItems: trendingItems };
};
// @end:HomeScreen-state

// @section:HomeScreen @depends:[HomeScreen-state,styles]
var HomeScreen = function (props) {
    var navigation = props.navigation;
    var state = useHomeScreenState();
    var theme = state.theme;
    var insets = useSafeAreaInsets();
    var windowWidth = Dimensions.get('window').width;
    var scrollBottomPadding = Platform.OS === 'web' ? WEB_TAB_MENU_PADDING : (TAB_MENU_HEIGHT + insets.bottom +
        SCROLL_EXTRA_PADDING);

    return React.createElement(ScrollView, {
        style: { flex: 1, backgroundColor: theme.colors.background },
        contentContainerStyle: { paddingBottom: scrollBottomPadding },
        showsVerticalScrollIndicator: false
    },
        // Hero Banner
        React.createElement(View, { style: [styles.heroBanner, { height: 420 }], componentId: 'home-hero' },
            React.createElement(Image, {
                source: { uri: 'IMAGE:fashion-editorial-hero-woman-elegant-runway' },
                style: styles.heroImage,
                resizeMode: 'cover',
                componentId: 'hero-image'
            }),
            React.createElement(View, { style: styles.heroOverlay },
                React.createElement(View, { style: styles.heroBadge },
                    React.createElement(Text, { style: styles.heroBadgeText }, '✦ Nova Coleção 2025')
                ),
                React.createElement(Text, { style: styles.heroTitle }, 'Moda que\nInspira'),
                React.createElement(Text, { style: styles.heroSubtitle }, 'Descubra as últimas tendências da temporada'),
                React.createElement(TouchableOpacity, {
                    style: styles.heroButton,
                    onPress: function () { navigation.navigate('Galeria'); },
                    componentId: 'hero-cta-button'
                },
                    React.createElement(Text, { style: styles.heroButtonText }, 'Explorar Coleção'),
                    React.createElement(MaterialIcons, { name: 'arrow-forward', size: 16, color: primaryColor, style: { marginLeft: 6 } })
                )
            )
        ),

        // Categories Strip
        React.createElement(View, { style: styles.sectionContainer, componentId: 'home-categories' },
            React.createElement(View, { style: styles.sectionHeader },
                React.createElement(Text, { style: [styles.sectionTitle, { color: theme.colors.textPrimary }] }, 'Categorias'),
                React.createElement(TouchableOpacity, {
                    onPress: function () { navigation.navigate('Galeria'); },
                    componentId: 'see-all-categories'
                },
                    React.createElement(Text, { style: [styles.seeAllText, { color: accentColor }] }, 'Ver todas')
                )
            ),
            React.createElement(ScrollView, {
                horizontal: true,
                showsHorizontalScrollIndicator: false,
                style: { flexGrow: 'initial' },
                contentContainerStyle: { paddingHorizontal: 20, gap: 12 }
            },
                CATEGORIES.map(function (cat) {
                    return React.createElement(TouchableOpacity, {
                        key: cat.id,
                        style: [styles.categoryPill, { backgroundColor: cat.color }],
                        onPress: function () { navigation.navigate('Galeria', { categoryId: cat.id }); },
                        componentId: 'category-pill-' + cat.id
                    },
                        React.createElement(MaterialIcons, { name: cat.icon, size: 18, color: primaryColor }),
                        React.createElement(Text, { style: styles.categoryPillText }, cat.name),
                        React.createElement(Text, { style: styles.categoryPillCount }, cat.count + ' looks')
                    );
                })
            )
        ),

        // Trending Section
        React.createElement(View, { style: styles.sectionContainer, componentId: 'home-trending' },
            React.createElement(View, { style: styles.sectionHeader },
                React.createElement(View, { style: styles.trendingHeaderLeft },
                    React.createElement(View, { style: styles.trendingDot }),
                    React.createElement(Text, { style: [styles.sectionTitle, { color: theme.colors.textPrimary }] }, 'Em Alta Agora')
                ),
                React.createElement(TouchableOpacity, {
                    onPress: function () { navigation.navigate('Tendências'); },
                    componentId: 'see-all-trends'
                },
                    React.createElement(Text, { style: [styles.seeAllText, { color: accentColor }] }, 'Ver tendências')
                )
            ),
            React.createElement(View, { style: styles.trendingGrid },
                state.trendingItems.map(function (item, index) {
                    var isLarge = index === 0;
                    return React.createElement(TouchableOpacity, {
                        key: item.id,
                        style: [styles.trendingCard, isLarge ? styles.trendingCardLarge : styles.trendingCardSmall, {
                            backgroundColor:
                                theme.colors.card
                        }],
                        onPress: function () { navigation.push('ItemDetail', { itemId: item.id }); },
                        componentId: 'trending-card-' + item.id
                    },
                        React.createElement(Image, {
                            source: { uri: item.imageKey },
                            style: [styles.trendingCardImage, isLarge ? { height: 280 } : { height: 160 }],
                            resizeMode: 'cover',
                            componentId: 'trending-img-' + item.id
                        }),
                        React.createElement(View, { style: styles.trendingCardOverlay },
                            React.createElement(View, { style: [styles.categoryBadge, { backgroundColor: accentColor }] },
                                React.createElement(Text, { style: styles.categoryBadgeText }, item.category)
                            )
                        ),
                        React.createElement(View, { style: styles.trendingCardInfo },
                            React.createElement(Text, {
                                style: [styles.trendingCardName, { color: theme.colors.textPrimary }],
                                numberOfLines: 1
                            }, item.name),
                            React.createElement(Text, { style: [styles.trendingCardBrand, { color: theme.colors.textSecondary }] }, item.brand),
                            React.createElement(Text, { style: [styles.trendingCardPrice, { color: accentColor }] }, item.price)
                        )
                    );
                })
            )
        ),

        // Style Tip Banner
        React.createElement(View, {
            style: [styles.tipBanner, { backgroundColor: primaryColor }], componentId: 'home-tip-banner'
        },
            React.createElement(Text, { style: styles.tipBannerLabel }, '✦ DICA DE ESTILO'),
            React.createElement(Text, { style: styles.tipBannerText }, '"O estilo é uma forma de dizer quem você é sem precisar falar."'),
            React.createElement(Text, { style: styles.tipBannerAuthor }, '— Rachel Zoe'),
                React.createElement(TouchableOpacity, {
                    style: styles.tipBannerButton,
                    onPress: function () { navigation.navigate('Tendências'); },
                    componentId: 'tip-banner-cta'
                },
                    React.createElement(Text, { style: styles.tipBannerButtonText }, 'Ver Tendências →')
                )
            )
        );
};
// @end:HomeScreen

// @section:GalleryScreen-state @depends:[ThemeContext]
var useGalleryScreenState = function (route) {
    var themeContext = useTheme();
    var theme = themeContext.theme;
    var initialCategory = route && route.params && route.params.categoryId ? route.params.categoryId : 'all';
    var activeCatState = useState(initialCategory);
    var activeCat = activeCatState[0];
    var setActiveCat = activeCatState[1];
    var searchState = useState('');
    var searchText = searchState[0];
    var setSearchText = searchState[1];

    var filteredItems = useMemo(function () {
        var items = activeCat === 'all' ? FASHION_ITEMS : FASHION_ITEMS.filter(function (item) {
            return item.category ===
                activeCat;
        });
        if (searchText.trim().length > 0) {
            var lower = searchText.toLowerCase();
            items = items.filter(function (item) {
                return item.name.toLowerCase().indexOf(lower) !== -1 ||
                    item.brand.toLowerCase().indexOf(lower) !== -1 ||
                    item.tags.some(function (t) { return t.toLowerCase().indexOf(lower) !== -1; });
            });
        }
        return items;
    }, [activeCat, searchText]);

    return {
        theme: theme, activeCat: activeCat, setActiveCat: setActiveCat, searchText: searchText, setSearchText:
            setSearchText, filteredItems: filteredItems
    };
};
// @end:GalleryScreen-state

// @section:GalleryScreen @depends:[GalleryScreen-state,styles]
var GalleryScreen = function (props) {
    var navigation = props.navigation;
    var route = props.route;
    var state = useGalleryScreenState(route);
    var theme = state.theme;
    var insets = useSafeAreaInsets();
    var windowWidth = Dimensions.get('window').width;
    var cardWidth = (windowWidth - 48) / 2;
    var scrollBottomPadding = Platform.OS === 'web' ? WEB_TAB_MENU_PADDING : (TAB_MENU_HEIGHT + insets.bottom +
        SCROLL_EXTRA_PADDING);

    var renderItem = function (info) {
        var item = info.item;
        return React.createElement(TouchableOpacity, {
            style: [styles.galleryCard, { width: cardWidth, backgroundColor: theme.colors.card }],
            onPress: function () { navigation.push('ItemDetail', { itemId: item.id }); },
            componentId: 'gallery-card-' + item.id
        },
            React.createElement(Image, {
                source: { uri: item.imageKey },
                style: [styles.galleryCardImage, { height: cardWidth * 1.3 }],
                resizeMode: 'cover',
                componentId: 'gallery-img-' + item.id
            }),
            React.createElement(View, { style: styles.galleryCardHeart },
                React.createElement(MaterialIcons, { name: 'favorite-border', size: 18, color: '#FFFFFF' })
            ),
            React.createElement(View, { style: [styles.galleryCardInfo] },
                React.createElement(Text, {
                    style: [styles.galleryCardName, { color: theme.colors.textPrimary }],
                    numberOfLines: 1
                }, item.name),
                React.createElement(View, {
                    style: {
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                        marginTop: 2
                    }
                },
                    React.createElement(Text, { style: [styles.galleryCardBrand, { color: theme.colors.textSecondary }] }, item.brand),
                    React.createElement(Text, { style: [styles.galleryCardPrice, { color: accentColor }] }, item.price)
                )
            )
        );
    };

    return React.createElement(View, { style: { flex: 1, backgroundColor: theme.colors.background } },
        // Header
        React.createElement(View, {
            style: [styles.galleryHeader, {
                paddingTop: insets.top + 16, backgroundColor:
                    theme.colors.background, borderBottomColor: theme.colors.border
            }], componentId: 'gallery-header'
        },
            React.createElement(Text, { style: [styles.galleryHeaderTitle, { color: theme.colors.textPrimary }] }, 'Galeria de Moda'),
            React.createElement(View, {
                style: [styles.searchBar, {
                    backgroundColor: theme.colors.card, borderColor:
                        theme.colors.border
                }]
            },
                React.createElement(MaterialIcons, { name: 'search', size: 20, color: theme.colors.textSecondary }),
                React.createElement(TextInput, {
                    style: [styles.searchInput, { color: theme.colors.textPrimary }],
                    placeholder: 'Buscar looks, marcas...',
                    placeholderTextColor: theme.colors.textSecondary,
                    value: state.searchText,
                    onChangeText: state.setSearchText,
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    componentId: 'gallery-search-input'
                })
            ),
                React.createElement(ScrollView, {
                    horizontal: true,
                    showsHorizontalScrollIndicator: false,
                    style: { flexGrow: 'initial' },
                    contentContainerStyle: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 }
                },
                    React.createElement(TouchableOpacity, {
                        style: [styles.filterChip, state.activeCat === 'all' && { backgroundColor: primaryColor }],
                        onPress: function () { state.setActiveCat('all'); },
                        componentId: 'filter-all'
                    },
                        React.createElement(Text, { style: [styles.filterChipText, state.activeCat === 'all' && { color: '#FFFFFF' }] },
                            'Todos')
                    ),
                    CATEGORIES.map(function (cat) {
                        var isActive = state.activeCat === cat.id;
                        return React.createElement(TouchableOpacity, {
                            key: cat.id,
                            style: [styles.filterChip, isActive && { backgroundColor: primaryColor }],
                            onPress: function () { state.setActiveCat(cat.id); },
                            componentId: 'filter-' + cat.id
                        },
                            React.createElement(Text, { style: [styles.filterChipText, isActive && { color: '#FFFFFF' }] }, cat.name)
                        );
                    })
                )
            ),

            // Grid
            React.createElement(FlatList, {
                data: state.filteredItems,
                renderItem: renderItem,
                keyExtractor: function (item) { return item.id; },
                numColumns: 2,
                columnWrapperStyle: { justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
                contentContainerStyle: { paddingTop: 16, paddingBottom: scrollBottomPadding },
                showsVerticalScrollIndicator: false,
                ListEmptyComponent: React.createElement(View, { style: { alignItems: 'center', paddingVertical: 60 } },
                    React.createElement(MaterialIcons, { name: 'search-off', size: 48, color: textSecondary }),
                    React.createElement(Text, { style: { color: textSecondary, fontSize: 16, marginTop: 12 } }, 'Nenhum look encontrado'),
                    React.createElement(Text, { style: { color: textSecondary, fontSize: 14, marginTop: 4, textAlign: 'center' } }, 'Tente uma pesquisa diferente')
                    ),
                    componentId: 'gallery-flatlist'
})
        );
};
// @end:GalleryScreen

// @section:TrendsScreen @depends:[ThemeContext,styles]
var TrendsScreen = function (props) {
    var navigation = props.navigation;
    var themeContext = useTheme();
    var theme = themeContext.theme;
    var insets = useSafeAreaInsets();
    var scrollBottomPadding = Platform.OS === 'web' ? WEB_TAB_MENU_PADDING : (TAB_MENU_HEIGHT + insets.bottom +
        SCROLL_EXTRA_PADDING);

    return React.createElement(ScrollView, {
        style: { flex: 1, backgroundColor: theme.colors.background },
        contentContainerStyle: { paddingBottom: scrollBottomPadding },
        showsVerticalScrollIndicator: false
    },
        // Header
        React.createElement(View, {
            style: [styles.trendsHeader, {
                paddingTop: insets.top + 20, backgroundColor: primaryColor
            }], componentId: 'trends-header'
        },
            React.createElement(Text, { style: styles.trendsHeaderLabel }, '✦ TEMPORADA 2025'),
            React.createElement(Text, { style: styles.trendsHeaderTitle }, 'Tendências\nda Moda'),
            React.createElement(Text, { style: styles.trendsHeaderSubtitle }, 'O que está dominando as passarelas e ruas do mundo')
        ),

        // Trends List
        React.createElement(View, { style: { padding: 20 }, componentId: 'trends-list' },
            TRENDS.map(function (trend, index) {
                return React.createElement(View, {
                    key: trend.id,
                    style: [styles.trendCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }],
                    componentId: 'trend-card-' + trend.id
                },
                    React.createElement(View, { style: { position: 'relative' } },
                        React.createElement(Image, {
                            source: { uri: trend.imageKey },
                            style: styles.trendCardImage,
                            resizeMode: 'cover',
                            componentId: 'trend-img-' + trend.id
                        }),
                        React.createElement(View, { style: styles.trendTagContainer },
                            React.createElement(View, { style: [styles.trendTag, { backgroundColor: accentColor }] },
                                React.createElement(Text, { style: styles.trendTagText }, trend.tag)
                            )
                        ),
                        React.createElement(View, { style: [styles.trendIndexBadge, { backgroundColor: primaryColor }] },
                            React.createElement(Text, { style: styles.trendIndexText }, '#' + (index + 1))
                        )
                    ),
                    React.createElement(View, { style: styles.trendCardContent },
                        React.createElement(Text, { style: [styles.trendCardTitle, { color: theme.colors.textPrimary }] }, trend.title),
                        React.createElement(Text, { style: [styles.trendCardDesc, { color: theme.colors.textSecondary }] }, trend.description),
                        React.createElement(View, {
                            style: [styles.trendTipBox, {
                                backgroundColor: theme.colors.background, borderLeftColor:
                                    accentColor
                            }]
                        },
                            React.createElement(MaterialIcons, { name: 'lightbulb', size: 16, color: accentColor, style: { marginRight: 8 } }),
                            React.createElement(Text, { style: [styles.trendTipText, { color: theme.colors.textSecondary }] }, trend.tip)
                        ),
                        React.createElement(TouchableOpacity, {
                            style: [styles.trendExploreBtn, { backgroundColor: primaryColor }],
                            onPress: function () { navigation.navigate('Galeria'); },
                            componentId: 'trend-explore-' + trend.id
                        },
                            React.createElement(Text, { style: styles.trendExploreBtnText }, 'Explorar Look'),
                            React.createElement(MaterialIcons, { name: 'arrow-forward', size: 16, color: '#FFFFFF', style: { marginLeft: 6 } })
                        )
                    )
                );
            })
        )
    );
};
// @end:TrendsScreen

// @section:FavoritesScreen-state @depends:[ThemeContext]
var useFavoritesScreenState = function (favorites) {
    var themeContext = useTheme();
    var theme = themeContext.theme;
    var favoriteItems = useMemo(function () {
        return FASHION_ITEMS.filter(function (item) {
            return favorites.indexOf(item.id) !== -1;
        });
    }, [favorites]);
    return { theme: theme, favoriteItems: favoriteItems };
};
// @end:FavoritesScreen-state

// @section:FavoritesScreen @depends:[FavoritesScreen-state,styles]
var FavoritesScreen = function (props) {
    var navigation = props.navigation;
    var favorites = props.favorites || [];
    var onRemove = props.onRemoveFavorite || function () { };
    var state = useFavoritesScreenState(favorites);
    var theme = state.theme;
    var insets = useSafeAreaInsets();
    var scrollBottomPadding = Platform.OS === 'web' ? WEB_TAB_MENU_PADDING : (TAB_MENU_HEIGHT + insets.bottom +
        SCROLL_EXTRA_PADDING);
    var windowWidth = Dimensions.get('window').width;
    var cardWidth = (windowWidth - 48) / 2;

    if (state.favoriteItems.length === 0) {
        return React.createElement(View, {
            style: { flex: 1, backgroundColor: theme.colors.background }, componentId:
                'favorites-empty'
        },
            React.createElement(View, {
                style: [styles.favoritesHeader, {
                    paddingTop: insets.top + 20, backgroundColor:
                        theme.colors.background, borderBottomColor: theme.colors.border
                }]
            },
                React.createElement(Text, { style: [styles.favoritesHeaderTitle, { color: theme.colors.textPrimary }] }, 'Meus Favoritos')
                ),
                React.createElement(View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 } },
                    React.createElement(View, { style: [styles.emptyHeartIcon, { backgroundColor: '#FFF0F0' }] },
                        React.createElement(MaterialIcons, { name: 'favorite', size: 48, color: '#FFB3B3', componentId: 'empty-heart-icon' })
                    ),
                    React.createElement(Text, { style: [styles.emptyTitle, { color: theme.colors.textPrimary }] }, 'Ainda sem favoritos'),
                    React.createElement(Text, { style: [styles.emptySubtitle, { color: theme.colors.textSecondary }] }, 'Explore a galeria e salve os looks que você mais gosta'),
                    React.createElement(TouchableOpacity, {
                        style: [styles.emptyButton, { backgroundColor: primaryColor }],
                        onPress: function () { navigation.navigate('Galeria'); },
                        componentId: 'empty-explore-button'
                    },
                        React.createElement(Text, { style: styles.emptyButtonText }, 'Explorar Galeria')
                    )
                    )
                );
    }

    return React.createElement(View, {
        style: { flex: 1, backgroundColor: theme.colors.background }, componentId:
            'favorites-screen'
    },
        React.createElement(View, {
            style: [styles.favoritesHeader, {
                paddingTop: insets.top + 20, backgroundColor:
                    theme.colors.background, borderBottomColor: theme.colors.border
            }]
        },
            React.createElement(Text, { style: [styles.favoritesHeaderTitle, { color: theme.colors.textPrimary }] }, 'Meus Favoritos'),
            React.createElement(Text, { style: [styles.favoritesHeaderCount, { color: theme.colors.textSecondary }] },
                state.favoriteItems.length + ' looks salvos')
            ),
            React.createElement(FlatList, {
                data: state.favoriteItems,
                keyExtractor: function (item) { return item.id; },
                numColumns: 2,
                columnWrapperStyle: { justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
                contentContainerStyle: { paddingTop: 16, paddingBottom: scrollBottomPadding },
                showsVerticalScrollIndicator: false,
                renderItem: function (info) {
                    var item = info.item;
                    return React.createElement(View, {
                        style: [styles.galleryCard, { width: cardWidth, backgroundColor: theme.colors.card }],
                        componentId: 'fav-card-' + item.id
                    },
                        React.createElement(TouchableOpacity, {
                            onPress: function () { navigation.push('ItemDetail', { itemId: item.id }); }
                        },
                            React.createElement(Image, {
                                source: { uri: item.imageKey },
                                style: [styles.galleryCardImage, { height: cardWidth * 1.3 }],
                                resizeMode: 'cover',
                                componentId: 'fav-img-' + item.id
                            })
                        ),
                        React.createElement(TouchableOpacity, {
                            style: [styles.galleryCardHeart, { backgroundColor: '#FF6B6B' }],
                            onPress: function () { onRemove(item.id); },
                            componentId: 'fav-remove-' + item.id
                        },
                            React.createElement(MaterialIcons, { name: 'favorite', size: 18, color: '#FFFFFF' })
                        ),
                        React.createElement(View, { style: styles.galleryCardInfo },
                            React.createElement(Text, { style: [styles.galleryCardName, { color: theme.colors.textPrimary }], numberOfLines: 1 },
                                item.name),
                            React.createElement(View, {
                                style: {
                                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                    marginTop: 2
                                }
                            },
                                React.createElement(Text, { style: [styles.galleryCardBrand, { color: theme.colors.textSecondary }] }, item.brand),
                                React.createElement(Text, { style: [styles.galleryCardPrice, { color: accentColor }] }, item.price)
                            )
                        )
                    );
                },
                componentId: 'favorites-flatlist'
            })
        );
};
// @end:FavoritesScreen

// @section:ItemDetailScreen @depends:[ThemeContext,styles]
var ITEMS_BY_ID = {};
FASHION_ITEMS.forEach(function (item) { ITEMS_BY_ID[item.id] = item; });

var ItemDetailScreen = function (props) {
    var navigation = props.navigation;
    var route = props.route;
    var itemId = route && route.params ? route.params.itemId : null;
    var item = itemId ? ITEMS_BY_ID[itemId] : {
        id: 'placeholder', name: 'Fashion Look', brand: 'Studio Mode', category:
            'casual', description: 'Um look incrível para qualquer ocasião, com estilo e elegância.', imageKey:
            'IMAGE:fashion-editorial-elegant-woman-look', tags: ['elegante', 'moderno'], price: 'R$ 450', isTrending: true
    };

    var themeContext = useTheme();
    var theme = themeContext.theme;
    var insets = useSafeAreaInsets();
    var favState = useState(false);
    var isFav = favState[0];
    var setIsFav = favState[1];

    var cameraHook = useCamera();
    var photo = cameraHook.photo;
    var takePhoto = cameraHook.takePhoto;
    var pickImage = cameraHook.pickImage;
    var cameraError = cameraHook.error;

    var tryOnModalState = useState(false);
    var showTryOn = tryOnModalState[0];
    var setShowTryOn = tryOnModalState[1];

    var windowWidth = Dimensions.get('window').width;
    var imageHeight = windowWidth * 1.1;

    var categoryObj = CATEGORIES.find(function (c) { return c.id === item.category; }) || CATEGORIES[0];

    var handleTakePhoto = function () {
        takePhoto().then(function (result) {
            if (result.error) {
                Platform.OS === 'web' ? window.alert('Erro: ' + result.error) : Alert.alert('Erro', result.error);
            }
        });
    };

    var handlePickImage = function () {
        pickImage({ allowsEditing: true }).then(function (result) {
            if (result.error) {
                Platform.OS === 'web' ? window.alert('Erro: ' + result.error) : Alert.alert('Erro', result.error);
            }
        });
    };

    var scrollHeight = Dimensions.get('window').height - insets.top;

    return React.createElement(View, {
        style: { flex: 1, backgroundColor: theme.colors.background }, componentId:
            'item-detail-screen'
    },
        // Back button overlay on image
        React.createElement(ScrollView, {
            style: {
                height: Platform.OS === 'web' ? scrollHeight : undefined, flex: Platform.OS === 'web' ? undefined : 1,
                overflow: Platform.OS === 'web' ? 'auto' : undefined
            },
            contentContainerStyle: { paddingBottom: insets.bottom + SCROLL_EXTRA_PADDING },
            showsVerticalScrollIndicator: false
        },
            // Hero Image
            React.createElement(View, { style: { position: 'relative' }, componentId: 'detail-hero' },
                React.createElement(Image, {
                    source: { uri: item.imageKey },
                    style: [styles.detailHeroImage, { width: windowWidth, height: imageHeight }],
                    resizeMode: 'cover',
                    componentId: 'detail-hero-image'
                }),
                React.createElement(View, { style: [styles.detailHeaderButtons, { top: insets.top + 12 }] },
                    React.createElement(TouchableOpacity, {
                        style: [styles.detailCircleButton, { backgroundColor: 'rgba(255,255,255,0.9)' }],
                        onPress: function () { navigation.goBack(); },
                        componentId: 'detail-back-button'
                    },
                        React.createElement(MaterialIcons, { name: 'arrow-back', size: 22, color: primaryColor })
                    ),
                    React.createElement(TouchableOpacity, {
                        style: [styles.detailCircleButton, { backgroundColor: isFav ? '#FF6B6B' : 'rgba(255,255,255,0.9)' }],
                        onPress: function () { setIsFav(function (prev) { return !prev; }); },
                        componentId: 'detail-fav-button'
                    },
                        React.createElement(MaterialIcons, {
                            name: isFav ? 'favorite' : 'favorite-border', size: 22, color: isFav ? '#FFFFFF' :
                                primaryColor
                        })
                    )
                ),
                item.isTrending && React.createElement(View, { style: [styles.detailTrendBadge, { backgroundColor: accentColor }] },
                    React.createElement(Text, { style: styles.detailTrendBadgeText }, '🔥 Tendência')
                )
            ),

            // Content
            React.createElement(View, {
                style: [styles.detailContent, { backgroundColor: theme.colors.background }], componentId:
                    'detail-content'
            },
                React.createElement(View, { style: [styles.detailCategoryBadge, { backgroundColor: categoryObj.color }] },
                    React.createElement(Text, { style: [styles.detailCategoryText, { color: primaryColor }] }, categoryObj.name)
                ),
                React.createElement(Text, { style: [styles.detailItemName, { color: theme.colors.textPrimary }] }, item.name),
                React.createElement(Text, { style: [styles.detailBrand, { color: theme.colors.textSecondary }] }, item.brand),
                React.createElement(Text, { style: [styles.detailPrice, { color: accentColor }] }, item.price),

                React.createElement(View, { style: [styles.divider, { backgroundColor: theme.colors.border }] }),

                React.createElement(Text, { style: [styles.detailSectionLabel, { color: theme.colors.textPrimary }] }, 'Sobre este Look'),
                React.createElement(Text, { style: [styles.detailDescription, { color: theme.colors.textSecondary }] }, item.description),

                    // Tags
                    React.createElement(View, { style: styles.tagsContainer },
                        item.tags.map(function (tag) {
                            return React.createElement(View, {
                                key: tag, style: [styles.tag, {
                                    backgroundColor: theme.colors.card, borderColor:
                                        theme.colors.border
                                }]
                            },
                                React.createElement(Text, { style: [styles.tagText, { color: theme.colors.textSecondary }] }, '#' + tag)
                            );
                        })
                    ),

                    React.createElement(View, { style: [styles.divider, { backgroundColor: theme.colors.border }] }),

                    // Try On Feature
                    React.createElement(Text, { style: [styles.detailSectionLabel, { color: theme.colors.textPrimary }] }, '📸 Experimente o Look'),
                    React.createElement(Text, { style: [styles.detailDescription, { color: theme.colors.textSecondary }] }, 'Tire uma selfie ou escolha uma foto para experimentar este estilo.'),

photo && React.createElement(Image, {
                        source: { uri: photo.uri },
                        style: {
                            width: '100%',
                            height: 300,
                            borderRadius: 16,
                            overflow: 'hidden',
                            backgroundColor: '#E5E7EB',
                            marginBottom: 16,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                            elevation: 8
                        },
                        resizeMode: 'cover',
                        componentId: 'tryon-photo'
                    }),

                        cameraError && React.createElement(View, { style: [styles.errorBanner, { backgroundColor: '#FFF0F0' }] },
                            React.createElement(MaterialIcons, { name: 'error-outline', size: 16, color: '#EF4444' }),
                            React.createElement(Text, { style: { color: '#EF4444', marginLeft: 8, fontSize: 13 } }, cameraError)
                        ),

                        React.createElement(View, { style: styles.tryOnButtons },
                            React.createElement(TouchableOpacity, {
                                style: [styles.tryOnBtn, { backgroundColor: primaryColor }],
                                onPress: handleTakePhoto,
                                componentId: 'detail-camera-button'
                            },
                                React.createElement(MaterialIcons, { name: 'camera-alt', size: 18, color: '#FFFFFF', style: { marginRight: 8 } }),
                                React.createElement(Text, { style: styles.tryOnBtnText }, 'Tirar Foto')
                            ),
                            React.createElement(TouchableOpacity, {
                                style: [styles.tryOnBtn, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: theme.colors.border }],
                                onPress: handlePickImage,
                                componentId: 'detail-gallery-button'
                            },
                                React.createElement(MaterialIcons, {
                                    name: 'photo-library', size: 18, color: theme.colors.textPrimary, style: {
                                        marginRight: 8
                                    }
                                }),
                                React.createElement(Text, { style: [styles.tryOnBtnText, { color: theme.colors.textPrimary }] }, 'Galeria')
                            )
                        )
                    )
                    )
                );
};
// @end:ItemDetailScreen

// @section:AppShell @depends:[ThemeContext,HomeScreen,GalleryScreen,TrendsScreen,FavoritesScreen]
var AppShell = function () {
    var themeContext = useTheme();
    var theme = themeContext.theme;
    var favoritesState = useState([]);
    var favorites = favoritesState[0];
    var setFavorites = favoritesState[1];

    var handleToggleFavorite = useCallback(function (itemId) {
        setFavorites(function (prev) {
            if (prev.indexOf(itemId) !== -1) {
                return prev.filter(function (id) { return id !== itemId; });
            }
            return prev.concat([itemId]);
        });
    }, []);

    var FavoritesWrapper = function (props) {
        return React.createElement(FavoritesScreen, {
            navigation: props.navigation,
            route: props.route,
            favorites: favorites,
            onRemoveFavorite: handleToggleFavorite
        });
    };

    var insets = useSafeAreaInsets();

    return React.createElement(View, { style: { flex: 1, width: '100%', height: '100%', overflow: 'hidden' } },
        React.createElement(Tab.Navigator, {
            screenOptions: {
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    height: Platform.OS === 'web' ? TAB_MENU_HEIGHT : TAB_MENU_HEIGHT + insets.bottom,
                    borderTopWidth: 0,
                    backgroundColor: theme.colors.card,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 16,
                    elevation: 12
                },
                tabBarItemStyle: { padding: 0 },
                tabBarActiveTintColor: primaryColor,
                tabBarInactiveTintColor: textSecondary,
                tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 4 }
            }
        },
            React.createElement(Tab.Screen, {
                name: 'Início',
                component: HomeScreen,
                options: {
                    tabBarIcon: function (p) { return React.createElement(MaterialIcons, { name: 'home', size: 24, color: p.color }); }
                }
            }),
            React.createElement(Tab.Screen, {
                name: 'Galeria',
                component: GalleryScreen,
                options: {
                    tabBarIcon: function (p) { return React.createElement(MaterialIcons, { name: 'grid-view', size: 24, color: p.color }); }
                }
            }),
            React.createElement(Tab.Screen, {
                name: 'Tendências',
                component: TrendsScreen,
                options: {
                    tabBarIcon: function (p) {
                        return React.createElement(MaterialIcons, { name: 'trending-up', size: 24, color: p.color });
                    }
                }
            }),
            React.createElement(Tab.Screen, {
                name: 'Favoritos',
                component: FavoritesWrapper,
                options: {
                    tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
                    tabBarBadgeStyle: { backgroundColor: accentColor, color: '#FFFFFF', fontSize: 10 },
                    tabBarIcon: function (p) { return React.createElement(MaterialIcons, { name: 'favorite', size: 24, color: p.color }); }
                }
            })
        )
    );
};
// @end:AppShell

// @section:MainNavigator @depends:[AppShell,ItemDetailScreen,navigation-setup]
var MainNavigator = function () {
    return React.createElement(Stack.Navigator, { screenOptions: { headerShown: false }, initialRouteName: 'Main' },
        React.createElement(Stack.Screen, { name: 'Main', component: AppShell }),
        React.createElement(Stack.Screen, { name: 'ItemDetail', component: ItemDetailScreen, initialParams: { itemId: null } })
    );
};
// @end:MainNavigator

// @section:styles @depends:[theme]
const styles = StyleSheet.create({
    // Hero
    heroBanner: { position: 'relative', overflow: 'hidden' },
    heroImage: { width: '100%', height: '100%', position: 'absolute' },
    heroOverlay: {
        flex: 1, justifyContent: 'flex-end', padding: 28, paddingBottom: 36, backgroundColor: 'rgba(0,0,0,0.35)'
    },
    heroBadge: {
        backgroundColor: 'rgba(201,169,110,0.9)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical:
            5, borderRadius: 20, marginBottom: 12
    },
    heroBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
    heroTitle: { fontSize: 44, fontWeight: '800', color: '#FFFFFF', lineHeight: 50, marginBottom: 10, letterSpacing: -0.5 },
    heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 24, lineHeight: 22 },
    heroButton: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', alignSelf: 'flex-start',
        paddingHorizontal: 20, paddingVertical: 13, borderRadius: 30
    },
    heroButtonText: { fontSize: 14, fontWeight: '700', color: primaryColor, letterSpacing: 0.3 },
    // Section
    sectionContainer: { paddingVertical: 24 },
    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20,
        marginBottom: 16
    },
    sectionTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3 },
    seeAllText: { fontSize: 13, fontWeight: '600' },
    trendingHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    trendingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: accentColor },
    // Category Pills
    categoryPill: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius:
            24, gap: 6
    },
    categoryPillText: { fontSize: 13, fontWeight: '700', color: primaryColor },
    categoryPillCount: { fontSize: 11, color: textSecondary },
    // Trending Grid
    trendingGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
    trendingCard: {
        borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08, shadowRadius: 12, elevation: 4
    },
    trendingCardLarge: { width: '100%' },
    trendingCardSmall: { flex: 1, minWidth: 140 },
    trendingCardImage: { width: '100%' },
    trendingCardOverlay: { position: 'absolute', top: 12, left: 12 },
    trendingCardInfo: { padding: 12 },
    trendingCardName: { fontSize: 14, fontWeight: '700' },
    trendingCardBrand: { fontSize: 12, marginTop: 2 },
    trendingCardPrice: { fontSize: 13, fontWeight: '700', marginTop: 4 },
    categoryBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
    categoryBadgeText: {
        color: '#FFFFFF', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5
    },
    // Tip Banner
    tipBanner: { margin: 20, borderRadius: 20, padding: 28 },
    tipBannerLabel: { color: accentColor, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 10 },
    tipBannerText: { color: '#FFFFFF', fontSize: 17, fontStyle: 'italic', lineHeight: 26, marginBottom: 8 },
    tipBannerAuthor: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 20 },
    tipBannerButton: {
        backgroundColor: accentColor, alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 10,
        borderRadius: 20
    },
    tipBannerButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
    // Gallery
    galleryHeader: { paddingHorizontal: 20, paddingBottom: 0, borderBottomWidth: 1 },
    galleryHeaderTitle: { fontSize: 26, fontWeight: '800', marginBottom: 16, letterSpacing: -0.5 },
    searchBar: {
        flexDirection: 'row', alignItems: 'center', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11,
        borderWidth: 1, gap: 10, marginBottom: 4
    },
    searchInput: { flex: 1, fontSize: 14 },
    filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F0EDE8', borderWidth: 0 },
    filterChipText: { fontSize: 13, fontWeight: '600', color: textPrimary },
    galleryCard: {
        borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 8, elevation: 3
    },
    galleryCardImage: { width: '100%' },
    galleryCardHeart: {
        position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 17, backgroundColor:
            'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center'
    },
    galleryCardInfo: { padding: 10 },
    galleryCardName: { fontSize: 13, fontWeight: '700' },
    galleryCardBrand: { fontSize: 11 },
    galleryCardPrice: { fontSize: 12, fontWeight: '700' },
    // Trends
    trendsHeader: { padding: 28, paddingBottom: 40 },
    trendsHeaderLabel: { color: accentColor, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 10 },
    trendsHeaderTitle: {
        fontSize: 38, fontWeight: '800', color: '#FFFFFF', lineHeight: 44, letterSpacing: -0.5,
        marginBottom: 10
    },
    trendsHeaderSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 21 },
    trendCard: {
        borderRadius: 20, overflow: 'hidden', marginBottom: 24, borderWidth: 1, shadowColor: '#000', shadowOffset:
            { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 5
    },
    trendCardImage: { width: '100%', height: 240 },
    trendTagContainer: { position: 'absolute', top: 14, left: 14 },
    trendTag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
    trendTagText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
    trendIndexBadge: {
        position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: 19, alignItems:
            'center', justifyContent: 'center'
    },
    trendIndexText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
    trendCardContent: { padding: 20 },
    trendCardTitle: { fontSize: 20, fontWeight: '800', marginBottom: 8, letterSpacing: -0.3 },
    trendCardDesc: { fontSize: 14, lineHeight: 22, marginBottom: 14 },
    trendTipBox: {
        flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 12, borderLeftWidth: 3,
        marginBottom: 16
    },
    trendTipText: { flex: 1, fontSize: 13, lineHeight: 19 },
    trendExploreBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14,
        borderRadius: 14
    },
    trendExploreBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
    // Favorites
    favoritesHeader: { paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1 },
    favoritesHeaderTitle: { fontSize: 26, fontWeight: '800', marginBottom: 4, letterSpacing: -0.5 },
    favoritesHeaderCount: { fontSize: 14 },
    emptyHeartIcon: {
        width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center',
        marginBottom: 20
    },
    emptyTitle: { fontSize: 22, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
    emptySubtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
    emptyButton: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 28 },
    emptyButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
    // Detail
    detailHeroImage: {},
    detailHeaderButtons: {
        position: 'absolute', left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between',
        zIndex: 10
    },
    detailCircleButton: {
        width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4
    },
    detailTrendBadge: {
        position: 'absolute', bottom: 20, right: 20, paddingHorizontal: 14, paddingVertical: 8,
        borderRadius: 20
    },
    detailTrendBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
    detailContent: { padding: 24, paddingTop: 20 },
    detailCategoryBadge: {
        alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
        marginBottom: 12
    },
    detailCategoryText: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
    detailItemName: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5, marginBottom: 6 },
    detailBrand: { fontSize: 15, marginBottom: 8 },
    detailPrice: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
    divider: { height: 1, marginVertical: 20 },
    detailSectionLabel: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
    detailDescription: { fontSize: 15, lineHeight: 24, marginBottom: 16 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
    tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
    tagText: { fontSize: 13 },
    tryOnButtons: { flexDirection: 'row', gap: 12, marginBottom: 8 },
    tryOnBtn: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14,
        borderRadius: 14
    },
    tryOnBtnText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
    errorBanner: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 12 }
});
// @end:styles

// @section:return @depends:[MainNavigator,ThemeProvider]
return React.createElement(ThemeProvider, null,
    React.createElement(View, { style: { flex: 1, width: '100%', height: '100%' } },
        React.createElement(StatusBar, { barStyle: 'light-content' }),
        React.createElement(MainNavigator)
    )
);
// @end:return
};
return ComponentFunction;