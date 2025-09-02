import 'dart:math';
import '../models/order.dart';
import '../models/cart_item.dart';

class OrderService {
  static final OrderService _instance = OrderService._internal();
  factory OrderService() => _instance;
  OrderService._internal();

  final List<Order> _orders = [
    Order(
      id: '#001',
      date: DateTime.now().subtract(const Duration(days: 3)),
      items: [
        CartItem(id: '1', name: 'Salada Caesar', price: 24.90, image: '🥗', quantity: 1),
        CartItem(id: '2', name: 'Smoothie Verde', price: 18.50, image: '🥤', quantity: 1),
      ],
      total: 43.40,
      paymentMethod: PaymentMethod.card,
      password: 'A1B2C3',
      status: OrderStatus.completed,
    ),
    Order(
      id: '#002',
      date: DateTime.now().subtract(const Duration(days: 5)),
      items: [
        CartItem(id: '3', name: 'Bowl de Açaí', price: 22.00, image: '🍓', quantity: 1),
        CartItem(id: '4', name: 'Suco Natural', price: 8.50, image: '🧃', quantity: 1),
      ],
      total: 30.50,
      paymentMethod: PaymentMethod.pix,
      password: 'X9Y8Z7',
      status: OrderStatus.completed,
    ),
  ];

  List<Order> get orders => List.unmodifiable(_orders);

  String _generateRandomPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    final random = Random();
    return String.fromCharCodes(
      Iterable.generate(6, (_) => chars.codeUnitAt(random.nextInt(chars.length))),
    );
  }

  String _generateOrderId() {
    final orderNumber = (_orders.length + 1).toString().padLeft(3, '0');
    return '#$orderNumber';
  }

  Order createOrder({
    required List<CartItem> items,
    required double total,
    required PaymentMethod paymentMethod,
  }) {
    final order = Order(
      id: _generateOrderId(),
      date: DateTime.now(),
      items: List.from(items),
      total: total,
      paymentMethod: paymentMethod,
      password: _generateRandomPassword(),
      status: OrderStatus.completed,
    );

    _orders.insert(0, order); // Adiciona no início da lista
    return order;
  }
}