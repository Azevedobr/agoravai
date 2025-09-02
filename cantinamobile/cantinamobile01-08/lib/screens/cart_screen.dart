import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../models/cart_item.dart';
import '../theme/app_theme.dart';
import '../widgets/gradient_button.dart';
import '../services/order_service.dart';
import '../services/cart_service.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  PaymentMethod? selectedPaymentMethod;
  final CartService _cartService = CartService();

  void removeItem(String id) {
    _cartService.removeItem(id);
  }

  void updateQuantity(String id, int newQuantity) {
    _cartService.updateQuantity(id, newQuantity);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Carrinho'),
        backgroundColor: AppTheme.backgroundColor,
        elevation: 0,
        leading: IconButton(
          icon: const FaIcon(FontAwesomeIcons.arrowLeft, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListenableBuilder(
        listenable: _cartService,
        builder: (context, child) {
          final cartItems = _cartService.items;
          return cartItems.isEmpty
              ? _buildEmptyCart()
              : Column(
                  children: [
                    Expanded(
                      child: ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: cartItems.length,
                        itemBuilder: (context, index) {
                          return _buildCartItem(cartItems[index]);
                        },
                      ),
                    ),
                    _buildPaymentSection(),
                    _buildTotalSection(),
                  ],
                );
        },
      ),
    );
  }

  Widget _buildEmptyCart() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const FaIcon(
            FontAwesomeIcons.shoppingCart,
            size: 80,
            color: Colors.white54,
          ),
          const SizedBox(height: 24),
          Text(
            'Seu carrinho está vazio',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              color: Colors.white54,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCartItem(CartItem item) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.cardColor,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 60,
            height: 60,
            decoration: BoxDecoration(
              color: AppTheme.surfaceColor,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Center(
              child: Text(
                item.image,
                style: const TextStyle(fontSize: 24),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.name,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'R\$ ${item.price.toStringAsFixed(2)}',
                  style: TextStyle(
                    fontSize: 14,
                    color: AppTheme.secondaryColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
          Row(
            children: [
              IconButton(
                onPressed: () => updateQuantity(item.id, item.quantity - 1),
                icon: const FaIcon(
                  FontAwesomeIcons.minus,
                  size: 16,
                  color: Colors.white,
                ),
                style: IconButton.styleFrom(
                  backgroundColor: AppTheme.surfaceColor,
                  minimumSize: const Size(32, 32),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  '${item.quantity}',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ),
              IconButton(
                onPressed: () => updateQuantity(item.id, item.quantity + 1),
                icon: const FaIcon(
                  FontAwesomeIcons.plus,
                  size: 16,
                  color: Colors.white,
                ),
                style: IconButton.styleFrom(
                  backgroundColor: AppTheme.primaryColor,
                  minimumSize: const Size(32, 32),
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),
          IconButton(
            onPressed: () => removeItem(item.id),
            icon: const FaIcon(
              FontAwesomeIcons.trash,
              size: 16,
              color: Colors.red,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentSection() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.cardColor,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Método de Pagamento',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 16),
          ...PaymentMethod.values.map((method) => _buildPaymentOption(method)),
        ],
      ),
    );
  }

  Widget _buildPaymentOption(PaymentMethod method) {
    final isSelected = selectedPaymentMethod == method;
    
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      child: InkWell(
        onTap: () {
          setState(() {
            selectedPaymentMethod = method;
          });
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isSelected ? AppTheme.primaryColor.withOpacity(0.2) : AppTheme.surfaceColor,
            borderRadius: BorderRadius.circular(12),
            border: isSelected
                ? Border.all(color: AppTheme.primaryColor, width: 2)
                : null,
          ),
          child: Row(
            children: [
              Text(
                method.icon,
                style: const TextStyle(fontSize: 24),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  method.displayName,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: isSelected ? AppTheme.primaryColor : Colors.white,
                  ),
                ),
              ),
              if (isSelected)
                FaIcon(
                  FontAwesomeIcons.check,
                  color: AppTheme.primaryColor,
                  size: 16,
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTotalSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.surfaceColor,
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      child: SafeArea(
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Total',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
                Text(
                  'R\$ ${_cartService.totalAmount.toStringAsFixed(2)}',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.secondaryColor,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: GradientButton(
                text: 'Finalizar Pedido',
                onPressed: selectedPaymentMethod != null ? _finalizePurchase : null,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _finalizePurchase() {
    if (selectedPaymentMethod == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Selecione um método de pagamento'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    // Criar o pedido e adicionar ao histórico
    final order = OrderService().createOrder(
      items: _cartService.items,
      total: _cartService.totalAmount,
      paymentMethod: selectedPaymentMethod!,
    );

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.cardColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        title: Row(
          children: [
            const FaIcon(
              FontAwesomeIcons.checkCircle,
              color: Colors.green,
              size: 24,
            ),
            const SizedBox(width: 12),
            const Text(
              'Pedido Confirmado!',
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Pedido: ${order.id}',
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Pagamento: ${selectedPaymentMethod!.displayName}',
              style: const TextStyle(color: Colors.white70),
            ),
            Text(
              'Total: R\$ ${_cartService.totalAmount.toStringAsFixed(2)}',
              style: const TextStyle(color: Colors.white70),
            ),
            const SizedBox(height: 16),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.primaryColor.withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: AppTheme.primaryColor,
                  width: 1,
                ),
              ),
              child: Column(
                children: [
                  const Text(
                    'Senha do Pedido',
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    order.password,
                    style: TextStyle(
                      color: AppTheme.primaryColor,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 4,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Anote esta senha para retirar seu pedido',
                    style: TextStyle(
                      color: Colors.white54,
                      fontSize: 12,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _cartService.clearCart();
              setState(() {
                selectedPaymentMethod = null;
              });
              
              // Mostrar mensagem de sucesso
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: const Text('Pedido adicionado ao histórico!'),
                  backgroundColor: Colors.green,
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
            child: Text(
              'OK',
              style: TextStyle(color: AppTheme.primaryColor),
            ),
          ),
        ],
      ),
    );
  }
}