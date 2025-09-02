import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../providers/app_provider.dart';

class TermsScreen extends StatelessWidget {
  const TermsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);
    
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
              _buildHeader(context, appProvider),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildSection(
                        appProvider.translate('terms_title'),
                        _getTermsContent(appProvider.language),
                      ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.3),
                      const SizedBox(height: 40),
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

  Widget _buildHeader(BuildContext context, AppProvider appProvider) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: const FaIcon(
              FontAwesomeIcons.arrowLeft,
              color: Colors.white,
            ),
          ).animate().fadeIn().slideX(begin: -0.3),
          const Spacer(),
          Text(
            appProvider.translate('terms'),
            style: GoogleFonts.poppins(
              fontSize: 20,
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

  Widget _buildSection(String title, String content) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.surfaceColor,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: GoogleFonts.poppins(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            content,
            style: GoogleFonts.poppins(
              fontSize: 14,
              color: Colors.white.withOpacity(0.8),
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }

  String _getTermsContent(String language) {
    switch (language) {
      case 'pt':
        return '''1. ACEITAÇÃO DOS TERMOS
Ao utilizar o FinnTech, você concorda com estes termos de uso.

2. USO DO APLICATIVO
O FinnTech é destinado para encontrar produtos saudáveis. Você deve usar o aplicativo de forma responsável.

3. CONTA DO USUÁRIO
Você é responsável por manter a segurança de sua conta e senha.

4. PRIVACIDADE
Respeitamos sua privacidade conforme nossa Política de Privacidade.

5. LIMITAÇÃO DE RESPONSABILIDADE
O FinnTech não se responsabiliza por danos indiretos ou consequenciais.

6. MODIFICAÇÕES
Podemos modificar estes termos a qualquer momento.

7. CONTATO
Para dúvidas, entre em contato conosco através do aplicativo.''';
      case 'en':
        return '''1. ACCEPTANCE OF TERMS
By using FinnTech, you agree to these terms of use.

2. USE OF APPLICATION
FinnTech is intended for finding healthy products. You must use the app responsibly.

3. USER ACCOUNT
You are responsible for maintaining the security of your account and password.

4. PRIVACY
We respect your privacy according to our Privacy Policy.

5. LIMITATION OF LIABILITY
FinnTech is not responsible for indirect or consequential damages.

6. MODIFICATIONS
We may modify these terms at any time.

7. CONTACT
For questions, contact us through the application.''';
      case 'es':
        return '''1. ACEPTACIÓN DE TÉRMINOS
Al usar FinnTech, aceptas estos términos de uso.

2. USO DE LA APLICACIÓN
FinnTech está destinado para encontrar productos saludables. Debes usar la app responsablemente.

3. CUENTA DE USUARIO
Eres responsable de mantener la seguridad de tu cuenta y contraseña.

4. PRIVACIDAD
Respetamos tu privacidad según nuestra Política de Privacidad.

5. LIMITACIÓN DE RESPONSABILIDAD
FinnTech no se responsabiliza por daños indirectos o consecuenciales.

6. MODIFICACIONES
Podemos modificar estos términos en cualquier momento.

7. CONTACTO
Para preguntas, contáctanos a través de la aplicación.''';
      default:
        return _getTermsContent('pt');
    }
  }
}