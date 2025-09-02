import 'package:flutter/material.dart';

class Responsive {
  static double width(BuildContext context) => MediaQuery.of(context).size.width;
  static double height(BuildContext context) => MediaQuery.of(context).size.height;
  
  // Responsividade baseada na largura da tela
  static double wp(BuildContext context, double percentage) {
    return width(context) * percentage / 100;
  }
  
  // Responsividade baseada na altura da tela
  static double hp(BuildContext context, double percentage) {
    return height(context) * percentage / 100;
  }
  
  // Tamanho de fonte responsivo
  static double sp(BuildContext context, double size) {
    return size * (width(context) / 375); // 375 é a largura base do iPhone
  }
  
  // Verifica se é um dispositivo pequeno
  static bool isSmallDevice(BuildContext context) {
    return width(context) < 350;
  }
  
  // Verifica se é um dispositivo médio
  static bool isMediumDevice(BuildContext context) {
    return width(context) >= 350 && width(context) < 600;
  }
  
  // Verifica se é um dispositivo grande (tablet)
  static bool isLargeDevice(BuildContext context) {
    return width(context) >= 600;
  }
  
  // Padding responsivo
  static EdgeInsets paddingAll(BuildContext context, double percentage) {
    return EdgeInsets.all(wp(context, percentage));
  }
  
  static EdgeInsets paddingHorizontal(BuildContext context, double percentage) {
    return EdgeInsets.symmetric(horizontal: wp(context, percentage));
  }
  
  static EdgeInsets paddingVertical(BuildContext context, double percentage) {
    return EdgeInsets.symmetric(vertical: hp(context, percentage));
  }
}