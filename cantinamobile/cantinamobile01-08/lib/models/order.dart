import 'package:flutter/material.dart';
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
    // Mapear forma de pagamento
    PaymentMethod paymentMethod = PaymentMethod.card;
    String formaPagto = json['formaPagto'] ?? '';
    switch (formaPagto.toUpperCase()) {
      case 'DINHEIRO':
        paymentMethod = PaymentMethod.cash;
        break;
      case 'PIX':
        paymentMethod = PaymentMethod.pix;
        break;
      case 'CARTAO':
      case 'CARTÃO':
      default:
        paymentMethod = PaymentMethod.card;
        break;
    }
    
    // Mapear status do pedido
    OrderStatus status = OrderStatus.active;
    String statusPedido = json['statusPedido'] ?? '';
    switch (statusPedido.toUpperCase()) {
      case 'ATIVO':
        status = OrderStatus.active;
        break;
      case 'ACEITO':
        status = OrderStatus.accepted;
        break;
      case 'FINALIZADO':
        status = OrderStatus.completed;
        break;
      case 'CANCELADO':
        status = OrderStatus.cancelled;
        break;
      default:
        status = OrderStatus.active;
        break;
    }
    
    // Criar itens do pedido a partir da informação do pedido
    List<CartItem> items = [];
    String infoPedido = json['infoPedido'] ?? '';
    if (infoPedido.contains('Itens:')) {
      String itensTexto = infoPedido.split('Itens: ')[1];
      List<String> produtoItens = itensTexto.split('; ');
      for (String item in produtoItens) {
        if (item.trim().isNotEmpty) {
          // Parse formato: "Nome (2x) - R$ 10.00"
          RegExp regex = RegExp(r'(.+?)\s*\((\d+)x\)\s*-\s*R\$\s*([\d,\.]+)');
          Match? match = regex.firstMatch(item.trim());
          if (match != null) {
            String nome = match.group(1)!.trim();
            int quantidade = int.parse(match.group(2)!);
            double precoTotal = double.parse(match.group(3)!.replaceAll(',', '.'));
            double precoUnitario = precoTotal / quantidade;
            
            items.add(CartItem(
              id: DateTime.now().millisecondsSinceEpoch.toString(),
              name: nome,
              price: precoUnitario,
              quantity: quantidade,
              image: '🍽️',
            ));
          }
        }
      }
    }
    
    return Order(
      id: json['id']?.toString() ?? '',
      date: DateTime.tryParse(json['dataPedido'] ?? '') ?? DateTime.now(),
      items: items,
      total: (json['valor'] ?? 0.0).toDouble(),
      paymentMethod: paymentMethod,
      password: json['senhaPedido'] ?? '',
      status: status,
    );
  }
}

enum OrderStatus {
  active,
  accepted,
  completed,
  cancelled,
}

extension OrderStatusExtension on OrderStatus {
  String get displayName {
    switch (this) {
      case OrderStatus.active:
        return 'ATIVO';
      case OrderStatus.accepted:
        return 'ACEITO';
      case OrderStatus.completed:
        return 'FINALIZADO';
      case OrderStatus.cancelled:
        return 'CANCELADO';
    }
  }
  
  Color get color {
    switch (this) {
      case OrderStatus.active:
        return Colors.orange;
      case OrderStatus.accepted:
        return Colors.green;
      case OrderStatus.completed:
        return Colors.blue;
      case OrderStatus.cancelled:
        return Colors.red;
    }
  }
}