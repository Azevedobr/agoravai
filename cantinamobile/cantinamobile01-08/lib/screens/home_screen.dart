import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../utils/responsive.dart';
import '../models/cart_item.dart';
import '../services/cart_service.dart';
import '../providers/app_provider.dart';
import '../services/api_service.dart';
import '../models/produto.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _categoryScrollController = ScrollController();
  int _selectedCategoryIndex = 0;
  String _searchQuery = '';
  final CartService _cartService = CartService();
  List<Produto> _produtos = [];
  bool _isLoading = true;
  
  void _addToCart(Produto product) {
    final cartItem = CartItem(
      id: product.id.toString(),
      name: product.nome,
      price: product.preco,
      image: '🛒',
    );
    
    _cartService.addItem(cartItem);
    
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          '${product.nome} adicionado ao carrinho!',
          style: GoogleFonts.poppins(color: Colors.white),
        ),
        backgroundColor: AppTheme.primaryColor,
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  final List<String> _categories = [
    'Todos',
    'Salgadinho',
    'Bebidas',
    'Doces',
    'Sorvetes'
  ];

  void _loadProdutos() async {
    setState(() {
      _isLoading = true;
    });
    
    final produtos = await ApiService.getProdutos();
    
    setState(() {
      _produtos = produtos;
      _isLoading = false;
    });
  }

  List<Produto> get _filteredProducts {
    List<Produto> products = _produtos;
    
    // Filtrar por pesquisa
    if (_searchQuery.isNotEmpty) {
      products = products.where((product) {
        return product.nome.toLowerCase().contains(_searchQuery.toLowerCase());
      }).toList();
    }
    
    return products;
  }

  @override
  void initState() {
    super.initState();
    _loadProdutos();
    _searchController.addListener(() {
      setState(() {
        _searchQuery = _searchController.text;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF0A0E27),
              Color(0xFF1A1F3A),
              Color(0xFF2D1B69),
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              _buildHeader(),
              _buildSearchBar(),
              _buildCategories(),
              Expanded(child: _buildProductGrid()),
            ],
          ),
        ),
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => _showDrawer(context),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.surfaceColor,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const FaIcon(
                FontAwesomeIcons.bars,
                color: Colors.white,
                size: 20,
              ),
            ),
          ).animate().fadeIn().slideX(begin: -0.3),
          const Spacer(),
          Column(
            children: [
              Text(
                'FinnTech Cantina',
                style: GoogleFonts.poppins(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              Text(
                'Alimentação Saudável',
                style: GoogleFonts.poppins(
                  fontSize: 12,
                  color: Colors.white.withOpacity(0.7),
                ),
              ),
            ],
          ).animate().fadeIn(delay: 200.ms),
          const Spacer(),
          GestureDetector(
            onTap: () => Navigator.pushNamed(context, '/cart'),
            child: Stack(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceColor,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const FaIcon(
                    FontAwesomeIcons.shoppingCart,
                    color: Colors.white,
                    size: 20,
                  ),
                ),
                ListenableBuilder(
                  listenable: _cartService,
                  builder: (context, child) {
                    if (_cartService.totalItems == 0) return const SizedBox.shrink();
                    return Positioned(
                      right: 0,
                      top: 0,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: const BoxDecoration(
                          color: AppTheme.secondaryColor,
                          shape: BoxShape.circle,
                        ),
                        child: Text(
                          _cartService.totalItems.toString(),
                          style: GoogleFonts.poppins(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ).animate().fadeIn(delay: 400.ms).slideX(begin: 0.3),
        ],
      ),
    );
  }

  Widget _buildSearchBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        decoration: BoxDecoration(
          color: AppTheme.surfaceColor,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: TextField(
          controller: _searchController,
          style: GoogleFonts.poppins(color: Colors.white),
          onChanged: (value) {
            setState(() {
              _searchQuery = value;
            });
          },
          decoration: InputDecoration(
            hintText: 'Buscar produtos...',
            hintStyle: GoogleFonts.poppins(
              color: Colors.white.withOpacity(0.5),
            ),
            prefixIcon: const FaIcon(
              FontAwesomeIcons.search,
              color: Colors.white54,
              size: 18,
            ),
            suffixIcon: _searchQuery.isNotEmpty
                ? IconButton(
                    onPressed: () {
                      _searchController.clear();
                      setState(() {
                        _searchQuery = '';
                      });
                    },
                    icon: const FaIcon(
                      FontAwesomeIcons.times,
                      color: Colors.white54,
                      size: 16,
                    ),
                  )
                : null,
            border: InputBorder.none,
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
      ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.3),
    );
  }

  Widget _buildCategories() {
    return Container(
      height: 80,
      margin: const EdgeInsets.symmetric(vertical: 20),
      child: Listener(
        onPointerSignal: (pointerSignal) {
          if (pointerSignal is PointerScrollEvent) {
            final double scrollDelta = pointerSignal.scrollDelta.dy;
            _categoryScrollController.animateTo(
              _categoryScrollController.offset + scrollDelta,
              duration: const Duration(milliseconds: 100),
              curve: Curves.easeOut,
            );
          }
        },
        child: Scrollbar(
          controller: _categoryScrollController,
          thumbVisibility: true,
          child: ListView.builder(
            controller: _categoryScrollController,
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            physics: const BouncingScrollPhysics(),
            itemCount: _categories.length,
            itemBuilder: (context, index) {
              final isSelected = index == _selectedCategoryIndex;
              return GestureDetector(
                onTap: () {
                  setState(() {
                    _selectedCategoryIndex = index;
                  });
                },
                child: Container(
                  margin: EdgeInsets.only(
                    right: index == _categories.length - 1 ? 20 : 16,
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 28,
                    vertical: 16,
                  ),
                  constraints: const BoxConstraints(
                    minWidth: 120,
                    minHeight: 60,
                  ),
                  decoration: BoxDecoration(
                    gradient: isSelected
                        ? const LinearGradient(
                            colors: [AppTheme.primaryColor, Color(0xFF8B7EFF)],
                          )
                        : null,
                    color: isSelected ? null : AppTheme.surfaceColor,
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: isSelected
                        ? [
                            BoxShadow(
                              color: AppTheme.primaryColor.withOpacity(0.3),
                              blurRadius: 8,
                              offset: const Offset(0, 4),
                            ),
                          ]
                        : [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.1),
                              blurRadius: 4,
                              offset: const Offset(0, 2),
                            ),
                          ],
                  ),
                  child: Center(
                    child: Text(
                      _categories[index],
                      style: GoogleFonts.poppins(
                        color: Colors.white,
                        fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                        fontSize: 16,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              ).animate(delay: (index * 100).ms).fadeIn().slideX(begin: 0.3);
            },
          ),
        ),
      ),
    );
  }

  Widget _buildProductGrid() {
    if (_isLoading) {
      return const Center(
        child: CircularProgressIndicator(
          color: AppTheme.primaryColor,
        ),
      );
    }
    
    final products = _filteredProducts;
    
    if (products.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.surfaceColor.withOpacity(0.5),
                shape: BoxShape.circle,
              ),
              child: const FaIcon(
                FontAwesomeIcons.search,
                color: Colors.white54,
                size: 40,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Nenhum produto encontrado',
              style: GoogleFonts.poppins(
                color: Colors.white.withOpacity(0.7),
                fontSize: 18,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              _searchQuery.isNotEmpty
                  ? 'Tente buscar por outro termo'
                  : 'Não há produtos nesta categoria',
              style: GoogleFonts.poppins(
                color: Colors.white.withOpacity(0.5),
                fontSize: 14,
              ),
            ),
          ],
        ).animate().fadeIn(),
      );
    }
    
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: Responsive.isLargeDevice(context) ? 3 : 2,
          childAspectRatio: Responsive.isLargeDevice(context) ? 0.9 : 0.8,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
        ),
        itemCount: products.length,
        itemBuilder: (context, index) {
          final product = products[index];
          return Container(
            decoration: BoxDecoration(
              color: AppTheme.cardColor,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 3,
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceColor,
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(20),
                        topRight: Radius.circular(20),
                      ),
                    ),
                    child: const Center(
                      child: Text(
                        '🛒',
                        style: TextStyle(fontSize: 40),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          product.nome,
                          style: GoogleFonts.poppins(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                            fontSize: 14,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          product.descricao ?? '',
                          style: GoogleFonts.poppins(
                            color: Colors.white.withOpacity(0.6),
                            fontSize: 11,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const Spacer(),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'R\$ ${product.preco.toStringAsFixed(2).replaceAll('.', ',')}',
                              style: GoogleFonts.poppins(
                                color: AppTheme.secondaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            GestureDetector(
                              onTap: () => _addToCart(product),
                              child: Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  gradient: const LinearGradient(
                                    colors: [AppTheme.primaryColor, Color(0xFF8B7EFF)],
                                  ),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: const FaIcon(
                                  FontAwesomeIcons.plus,
                                  color: Colors.white,
                                  size: 12,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ).animate(delay: (index * 100).ms).fadeIn().slideY(begin: 0.3);
        },
      ),
    );
  }

  Widget _buildBottomNav() {
    return Container(
      height: 80,
      decoration: BoxDecoration(
        color: AppTheme.surfaceColor,
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(25),
          topRight: Radius.circular(25),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildNavItem(FontAwesomeIcons.home, 'Início', true),
          GestureDetector(
            onTap: () => Navigator.pushNamed(context, '/history'),
            child: _buildNavItem(FontAwesomeIcons.history, 'Histórico', false),
          ),

          GestureDetector(
            onTap: () => Navigator.pushNamed(context, '/profile'),
            child: _buildNavItem(FontAwesomeIcons.user, 'Perfil', false),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(IconData icon, String label, bool isSelected) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            gradient: isSelected
                ? const LinearGradient(
                    colors: [AppTheme.primaryColor, Color(0xFF8B7EFF)],
                  )
                : null,
            borderRadius: BorderRadius.circular(12),
          ),
          child: FaIcon(
            icon,
            color: isSelected ? Colors.white : Colors.white54,
            size: 18,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: GoogleFonts.poppins(
            color: isSelected ? Colors.white : Colors.white54,
            fontSize: 10,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
          ),
        ),
      ],
    );
  }

  void _showDrawer(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context, listen: false);
    
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: const BoxDecoration(
          color: AppTheme.surfaceColor,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(25),
            topRight: Radius.circular(25),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  _buildDrawerItem(
                    FontAwesomeIcons.shoppingCart,
                    appProvider.translate('cart') ?? 'Carrinho',
                    () => Navigator.pushNamed(context, '/cart'),
                  ),
                  _buildDrawerItem(
                    FontAwesomeIcons.history,
                    appProvider.translate('history') ?? 'Histórico',
                    () => Navigator.pushNamed(context, '/history'),
                  ),


                  _buildDrawerItem(
                    FontAwesomeIcons.creditCard,
                    appProvider.translate('payments') ?? 'Pagamentos',
                    () => Navigator.pushNamed(context, '/payments'),
                  ),
                  _buildDrawerItem(
                    FontAwesomeIcons.user,
                    appProvider.translate('profile') ?? 'Perfil',
                    () => Navigator.pushNamed(context, '/profile'),
                  ),
                  _buildDrawerItem(
                    FontAwesomeIcons.cog,
                    appProvider.translate('settings') ?? 'Configurações',
                    () => Navigator.pushNamed(context, '/settings'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawerItem(IconData icon, String title, VoidCallback onTap) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppTheme.primaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: FaIcon(
          icon,
          color: AppTheme.primaryColor,
          size: 18,
        ),
      ),
      title: Text(
        title,
        style: GoogleFonts.poppins(
          color: Colors.white,
          fontWeight: FontWeight.w500,
        ),
      ),
      trailing: const FaIcon(
        FontAwesomeIcons.chevronRight,
        color: Colors.white54,
        size: 14,
      ),
      onTap: () {
        Navigator.pop(context);
        onTap();
      },
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    _categoryScrollController.dispose();
    super.dispose();
  }
}