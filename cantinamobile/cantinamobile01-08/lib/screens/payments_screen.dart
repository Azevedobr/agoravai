import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../theme/app_theme.dart';
import '../utils/responsive.dart';

class PaymentsScreen extends StatelessWidget {
  const PaymentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final paymentMethods = [
      {
        'icon': FontAwesomeIcons.creditCard,
        'title': 'Cartão de Crédito',
        'subtitle': 'Visa, Mastercard, Elo',
        'enabled': true,
      },
      {
        'icon': FontAwesomeIcons.creditCard,
        'title': 'Cartão de Débito',
        'subtitle': 'Débito à vista',
        'enabled': true,
      },
      {
        'icon': FontAwesomeIcons.mobile,
        'title': 'PIX',
        'subtitle': 'Pagamento instantâneo',
        'enabled': true,
      },
      {
        'icon': FontAwesomeIcons.moneyBill,
        'title': 'Dinheiro',
        'subtitle': 'Pagamento em espécie',
        'enabled': true,
      },
      {
        'icon': FontAwesomeIcons.wallet,
        'title': 'Carteira Digital',
        'subtitle': 'PayPal, PicPay, Mercado Pago',
        'enabled': false,
      },
    ];

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
              _buildHeader(context),
              Expanded(
                child: SingleChildScrollView(
                  padding: Responsive.paddingHorizontal(context, 6.4),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Métodos de Pagamento Aceitos',
                        style: GoogleFonts.poppins(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ).animate().fadeIn().slideY(begin: 0.3),
                      const SizedBox(height: 8),
                      Text(
                        'Escolha como você prefere pagar seus pedidos',
                        style: GoogleFonts.poppins(
                          fontSize: 14,
                          color: Colors.white.withOpacity(0.7),
                        ),
                      ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.3),
                      const SizedBox(height: 24),
                      ...paymentMethods.asMap().entries.map((entry) {
                        final index = entry.key;
                        final method = entry.value;
                        return _buildPaymentMethod(context, method, index);
                      }).toList(),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: const FaIcon(FontAwesomeIcons.arrowLeft, color: Colors.white),
          ).animate().fadeIn().slideX(begin: -0.3),
          const Spacer(),
          Text(
            'Pagamentos',
            style: GoogleFonts.poppins(
              fontSize: Responsive.sp(context, 20),
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ).animate().fadeIn(delay: 200.ms),
          const Spacer(),
          const SizedBox(width: 48),
        ],
      ),
    );
  }

  Widget _buildPaymentMethod(BuildContext context, Map<String, dynamic> method, int index) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.cardColor,
        borderRadius: BorderRadius.circular(16),
        border: method['enabled'] 
            ? Border.all(color: AppTheme.primaryColor.withOpacity(0.3))
            : Border.all(color: Colors.white.withOpacity(0.1)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: method['enabled'] 
                  ? AppTheme.primaryColor.withOpacity(0.1)
                  : Colors.white.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
            ),
            child: FaIcon(
              method['icon'] as IconData,
              color: method['enabled'] ? AppTheme.primaryColor : Colors.white54,
              size: 24,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  method['title'] as String,
                  style: GoogleFonts.poppins(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: method['enabled'] ? Colors.white : Colors.white54,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  method['subtitle'] as String,
                  style: GoogleFonts.poppins(
                    fontSize: 14,
                    color: method['enabled'] 
                        ? Colors.white.withOpacity(0.7)
                        : Colors.white.withOpacity(0.4),
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: method['enabled'] ? Colors.green : Colors.orange,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              method['enabled'] ? 'Ativo' : 'Em breve',
              style: GoogleFonts.poppins(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    ).animate(delay: (index * 100).ms).fadeIn().slideY(begin: 0.3);
  }
}