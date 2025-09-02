import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../providers/app_provider.dart';

class PrivacyScreen extends StatelessWidget {
  const PrivacyScreen({super.key});

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
                        appProvider.translate('privacy_title'),
                        _getPrivacyContent(appProvider.language),
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
            appProvider.translate('privacy'),
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

  String _getPrivacyContent(String language) {
    switch (language) {
      case 'pt':
        return '''1. COLETA DE DADOS
Coletamos apenas dados necessários para o funcionamento do aplicativo.

2. USO DOS DADOS
Seus dados são usados para:
• Personalizar sua experiência
• Melhorar nossos serviços
• Comunicação sobre atualizações

3. COMPARTILHAMENTO
Não compartilhamos seus dados pessoais com terceiros sem seu consentimento.

4. SEGURANÇA
Implementamos medidas de segurança para proteger suas informações.

5. COOKIES
Utilizamos cookies para melhorar a experiência do usuário.

6. SEUS DIREITOS
Você pode:
• Acessar seus dados
• Corrigir informações
• Solicitar exclusão

7. CONTATO
Para questões sobre privacidade, entre em contato conosco.''';
      case 'en':
        return '''1. DATA COLLECTION
We collect only necessary data for app functionality.

2. DATA USE
Your data is used to:
• Personalize your experience
• Improve our services
• Communicate about updates

3. SHARING
We don't share your personal data with third parties without consent.

4. SECURITY
We implement security measures to protect your information.

5. COOKIES
We use cookies to improve user experience.

6. YOUR RIGHTS
You can:
• Access your data
• Correct information
• Request deletion

7. CONTACT
For privacy questions, contact us.''';
      case 'es':
        return '''1. RECOLECCIÓN DE DATOS
Recolectamos solo datos necesarios para el funcionamiento de la app.

2. USO DE DATOS
Tus datos se usan para:
• Personalizar tu experiencia
• Mejorar nuestros servicios
• Comunicación sobre actualizaciones

3. COMPARTIR
No compartimos tus datos personales con terceros sin consentimiento.

4. SEGURIDAD
Implementamos medidas de seguridad para proteger tu información.

5. COOKIES
Utilizamos cookies para mejorar la experiencia del usuario.

6. TUS DERECHOS
Puedes:
• Acceder a tus datos
• Corregir información
• Solicitar eliminación

7. CONTACTO
Para preguntas sobre privacidad, contáctanos.''';
      default:
        return _getPrivacyContent('pt');
    }
  }
}