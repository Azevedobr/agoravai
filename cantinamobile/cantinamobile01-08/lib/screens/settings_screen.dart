import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../utils/responsive.dart';
import '../providers/app_provider.dart';
import 'change_password_screen.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {



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
              _buildHeader(context),
              Expanded(
                child: SingleChildScrollView(
                  padding: Responsive.paddingHorizontal(context, 6.4),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [

                      _buildSection(
                        appProvider.translate('security'),
                        appProvider.translate('security_desc'),
                        [

                          _buildActionTile(
                            appProvider.translate('change_password'),
                            appProvider.translate('change_password_desc'),
                            FontAwesomeIcons.key,
                            () => Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const ChangePasswordScreen(),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24),
                      _buildSection(
                        appProvider.translate('preferences'),
                        appProvider.translate('preferences_desc'),
                        [
                          _buildSelectTile(
                            appProvider.translate('language'),
                            _getLanguageName(appProvider.language),
                            FontAwesomeIcons.globe,
                            () => _showLanguageDialog(),
                          ),

                        ],
                      ),
                      const SizedBox(height: 24),
                      _buildSection(
                        appProvider.translate('about'),
                        appProvider.translate('about_desc'),
                        [
                          _buildActionTile(
                            appProvider.translate('terms'),
                            appProvider.translate('terms_desc'),
                            FontAwesomeIcons.fileContract,
                            () => Navigator.pushNamed(context, '/terms'),
                          ),
                          _buildActionTile(
                            appProvider.translate('privacy'),
                            appProvider.translate('privacy_desc'),
                            FontAwesomeIcons.shieldAlt,
                            () => Navigator.pushNamed(context, '/privacy'),
                          ),
                          _buildActionTile(
                            appProvider.translate('version'),
                            'v1.0.0',
                            FontAwesomeIcons.mobileAlt,
                            () {},
                          ),
                        ],
                      ),
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
    final appProvider = Provider.of<AppProvider>(context, listen: false);
    
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
            appProvider.translate('settings'),
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

  Widget _buildSection(String title, String subtitle, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: GoogleFonts.poppins(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ).animate().fadeIn().slideY(begin: 0.3),
        const SizedBox(height: 4),
        Text(
          subtitle,
          style: GoogleFonts.poppins(
            fontSize: 14,
            color: Colors.white.withOpacity(0.7),
          ),
        ).animate().fadeIn(delay: 100.ms).slideY(begin: 0.3),
        const SizedBox(height: 16),
        ...children,
      ],
    );
  }

  Widget _buildSwitchTile(
    String title,
    String subtitle,
    IconData icon,
    bool value,
    ValueChanged<bool> onChanged,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceColor,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: FaIcon(
              icon,
              color: AppTheme.primaryColor,
              size: 18,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.poppins(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: GoogleFonts.poppins(
                    fontSize: 13,
                    color: Colors.white.withOpacity(0.6),
                  ),
                ),
              ],
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeColor: AppTheme.primaryColor,
            activeTrackColor: AppTheme.primaryColor.withOpacity(0.3),
            inactiveThumbColor: Colors.white54,
            inactiveTrackColor: Colors.white.withOpacity(0.1),
          ),
        ],
      ),
    ).animate().fadeIn().slideX(begin: 0.3);
  }

  Widget _buildActionTile(String title, String subtitle, IconData icon, VoidCallback onTap) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        tileColor: AppTheme.surfaceColor,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: AppTheme.primaryColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: FaIcon(
            icon,
            color: AppTheme.primaryColor,
            size: 18,
          ),
        ),
        title: Text(
          title,
          style: GoogleFonts.poppins(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Colors.white,
          ),
        ),
        subtitle: Text(
          subtitle,
          style: GoogleFonts.poppins(
            fontSize: 13,
            color: Colors.white.withOpacity(0.6),
          ),
        ),
        trailing: const FaIcon(
          FontAwesomeIcons.chevronRight,
          color: Colors.white54,
          size: 16,
        ),
        onTap: onTap,
      ),
    ).animate().fadeIn().slideX(begin: 0.3);
  }

  Widget _buildSelectTile(String title, String value, IconData icon, VoidCallback onTap) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        tileColor: AppTheme.surfaceColor,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: AppTheme.primaryColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: FaIcon(
            icon,
            color: AppTheme.primaryColor,
            size: 18,
          ),
        ),
        title: Text(
          title,
          style: GoogleFonts.poppins(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Colors.white,
          ),
        ),
        subtitle: Text(
          value,
          style: GoogleFonts.poppins(
            fontSize: 13,
            color: AppTheme.primaryColor,
          ),
        ),
        trailing: const FaIcon(
          FontAwesomeIcons.chevronRight,
          color: Colors.white54,
          size: 16,
        ),
        onTap: onTap,
      ),
    ).animate().fadeIn().slideX(begin: 0.3);
  }

  String _getLanguageName(String code) {
    return 'Português';
  }

  void _showLanguageDialog() {
    final appProvider = Provider.of<AppProvider>(context, listen: false);
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.cardColor,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text(
          'Selecionar Idioma',
          style: GoogleFonts.poppins(
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: const Text(
                'Português',
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
              leading: Radio<String>(
                value: 'pt',
                groupValue: 'pt',
                onChanged: (value) {
                  Navigator.pop(context);
                },
                activeColor: AppTheme.primaryColor,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'OK',
              style: GoogleFonts.poppins(
                color: AppTheme.primaryColor,
              ),
            ),
          ),
        ],
      ),
    );
  }


}