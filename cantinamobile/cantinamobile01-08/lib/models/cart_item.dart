class CartItem {
  final String id;
  final String name;
  final double price;
  final String image;
  int quantity;

  CartItem({
    required this.id,
    required this.name,
    required this.price,
    required this.image,
    this.quantity = 1,
  });

  double get totalPrice => price * quantity;
}

enum PaymentMethod {
  card,
  cash,
  pix,
}

extension PaymentMethodExtension on PaymentMethod {
  String get displayName {
    switch (this) {
      case PaymentMethod.card:
        return 'Cartão';
      case PaymentMethod.cash:
        return 'Dinheiro';
      case PaymentMethod.pix:
        return 'PIX';
    }
  }

  String get icon {
    switch (this) {
      case PaymentMethod.card:
        return '💳';
      case PaymentMethod.cash:
        return '💵';
      case PaymentMethod.pix:
        return '📱';
    }
  }
}