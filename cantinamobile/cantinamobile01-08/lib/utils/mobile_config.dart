import 'package:flutter/services.dart';

class MobileConfig {
  static void configureMobile() {
    // Força orientação portrait para mobile
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    
    // Configura a barra de status
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Color(0xFF0A0E27),
        statusBarIconBrightness: Brightness.light,
        systemNavigationBarColor: Color(0xFF1A1F3A),
        systemNavigationBarIconBrightness: Brightness.light,
      ),
    );
    
    // Habilita edge-to-edge
    SystemChrome.setEnabledSystemUIMode(
      SystemUiMode.edgeToEdge,
    );
  }
}