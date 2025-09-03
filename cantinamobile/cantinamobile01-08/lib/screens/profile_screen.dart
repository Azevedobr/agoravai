import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../theme/app_theme.dart';
import '../utils/responsive.dart';
import '../widgets/gradient_button.dart';
import '../services/user_service.dart';
import '../services/auth_service.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final UserService _userService = UserService();

  @override
  void initState() {
    super.initState();
  }

  // Método chamado quando a tela volta ao foco
  void _refreshProfile() {
    setState(() {
      // Força a reconstrução da tela com os dados atualizados
    });
  }

  @override
  Widget build(BuildContext context) {
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
                    children: [
                      _buildProfileInfo(context),
                      const SizedBox(height: 32),
                      _buildMenuOptions(context),
                      const SizedBox(height: 32),
                      _buildLogoutButton(context),
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
            'Perfil',
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

  Widget _buildProfileInfo(BuildContext context) {
    return ListenableBuilder(
      listenable: _userService,
      builder: (context, child) {
        return Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: AppTheme.cardColor,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  gradient: _userService.profileImage != null
                      ? null
                      : const LinearGradient(
                          colors: [AppTheme.primaryColor, Color(0xFF8B7EFF)],
                        ),
                  color: _userService.profileImage != null ? AppTheme.surfaceColor : null,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.primaryColor.withOpacity(0.3),
                      blurRadius: 20,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: _userService.profileImage != null
                    ? ClipOval(
                        child: Container(
                          width: 80,
                          height: 80,
                          color: AppTheme.primaryColor.withOpacity(0.2),
                          child: const Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                FaIcon(
                                  FontAwesomeIcons.image,
                                  color: Colors.white,
                                  size: 24,
                                ),
                                SizedBox(height: 2),
                                Text(
                                  'Foto',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 10,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      )
                    : const Center(
                        child: FaIcon(
                          FontAwesomeIcons.user,
                          color: Colors.white,
                          size: 32,
                        ),
                      ),
              ).animate().scale(duration: 800.ms, curve: Curves.elasticOut),
              const SizedBox(height: 16),
              Text(
                AuthService().currentUser?.nome ?? 'Usuário',
                style: GoogleFonts.poppins(
                  fontSize: Responsive.sp(context, 24),
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.3),
              const SizedBox(height: 8),
              Text(
                AuthService().currentUser?.email ?? 'email@exemplo.com',
                style: GoogleFonts.poppins(
                  fontSize: Responsive.sp(context, 16),
                  color: Colors.white.withOpacity(0.7),
                ),
              ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.3),
            ],
          ),
        );
      },
    );
  }

  Widget _buildMenuOptions(BuildContext context) {
    final options = [
      {'icon': FontAwesomeIcons.user, 'title': 'Editar Perfil', 'subtitle': 'Altere suas informações'},
      {'icon': FontAwesomeIcons.history, 'title': 'Histórico', 'subtitle': 'Veja seus pedidos anteriores'},
      {'icon': FontAwesomeIcons.creditCard, 'title': 'Pagamentos', 'subtitle': 'Gerencie seus métodos de pagamento'},

      {'icon': FontAwesomeIcons.cog, 'title': 'Configurações', 'subtitle': 'Ajustes do aplicativo'},
    ];

    return Column(
      children: options.asMap().entries.map((entry) {
        final index = entry.key;
        final option = entry.value;
        
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          decoration: BoxDecoration(
            color: AppTheme.surfaceColor,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: ListTile(
            contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            leading: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.primaryColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: FaIcon(
                option['icon'] as IconData,
                color: AppTheme.primaryColor,
                size: 20,
              ),
            ),
            title: Text(
              option['title'] as String,
              style: GoogleFonts.poppins(
                fontSize: Responsive.sp(context, 16),
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
            subtitle: Text(
              option['subtitle'] as String,
              style: GoogleFonts.poppins(
                fontSize: Responsive.sp(context, 14),
                color: Colors.white.withOpacity(0.6),
              ),
            ),
            trailing: const FaIcon(
              FontAwesomeIcons.chevronRight,
              color: Colors.white54,
              size: 16,
            ),
            onTap: () async {
              if (option['title'] == 'Editar Perfil') {
                await Navigator.pushNamed(context, '/edit-profile');
                _refreshProfile(); // Atualiza a tela quando volta da edição
              } else if (option['title'] == 'Histórico') {
                Navigator.pushNamed(context, '/history');
              } else if (option['title'] == 'Pagamentos') {
                Navigator.pushNamed(context, '/payments');

              } else if (option['title'] == 'Configurações') {
                Navigator.pushNamed(context, '/settings');
              }
            },
          ),
        ).animate(delay: (index * 100).ms).fadeIn().slideX(begin: 0.3);
      }).toList(),
    );
  }

  Widget _buildLogoutButton(BuildContext context) {
    return GradientButton(
      text: 'Sair da Conta',
      isOutlined: true,
      onPressed: () {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            backgroundColor: AppTheme.cardColor,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            title: Text(
              'Sair da Conta',
              style: GoogleFonts.poppins(
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
            ),
            content: Text(
              'Tem certeza que deseja sair da sua conta?',
              style: GoogleFonts.poppins(
                color: Colors.white.withOpacity(0.8),
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text(
                  'Cancelar',
                  style: GoogleFonts.poppins(
                    color: Colors.white54,
                  ),
                ),
              ),
              TextButton(
                onPressed: () {
                  AuthService().logout();
                  Navigator.pop(context);
                  Navigator.pushNamedAndRemoveUntil(
                    context,
                    '/',
                    (route) => false,
                  );
                },
                child: Text(
                  'Sair',
                  style: GoogleFonts.poppins(
                    color: Colors.red,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    ).animate().fadeIn(delay: 800.ms).slideY(begin: 0.3);
  }
}