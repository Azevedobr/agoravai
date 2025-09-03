import 'cart_item.dart';

class Order {
  final String id;
  final DateTime date;
  final List<CartItem> items;
  final double total;
  final PaymentMethod paymentMethod;
  final String password;
  final OrderStatus status;

  Order({
    required this.id,
    required this.date,
    required this.items,
    required this.total,
    required this.paymentMethod,
    required this.password,
    this.status = OrderStatus.completed,
  });

  String get formattedDate {
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
  }

  String get formattedTime {
    return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
  }

  List<String> get itemNames {
    return items.map((item) => '${item.name} (${item.quantity}x)').toList();
  }

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id']?.toString() ?? '',
      date: DateTime.tryParse(json['dataPedido'] ?? '') ?? DateTime.now(),
      items: [], // Será preenchido com os itens do pedido
      total: (json['valorTotal'] ?? 0.0).toDouble(),
      paymentMethod: PaymentMethod.card, // Padrão
      password: json['senha'] ?? '',
      status: json['status'] == 'CONCLUIDO' ? OrderStatus.completed : OrderStatus.cancelled,
    );
  }
}

enum OrderStatus {
  completed,
  cancelled,
}

extension OrderStatusExtension on OrderStatus {
  String get displayName {
    switch (this) {
      case OrderStatus.completed:
        return 'Entregue';
      case OrderStatus.cancelled:
        return 'Cancelado';
    }
  }
}