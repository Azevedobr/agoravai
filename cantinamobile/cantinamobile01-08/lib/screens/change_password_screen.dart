import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/gradient_button.dart';
import '../providers/app_provider.dart';
import '../utils/validators.dart';

class ChangePasswordScreen extends StatefulWidget {
  const ChangePasswordScreen({super.key});

  @override
  State<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

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
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: SingleChildScrollView(
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 40),
                    IconButton(
                      onPressed: () => Navigator.pop(context),
                      icon: const FaIcon(
                        FontAwesomeIcons.arrowLeft,
                        color: Colors.white,
                      ),
                    ).animate().fadeIn().slideX(begin: -0.3),
                    const SizedBox(height: 20),
                    Text(
                      appProvider.translate('change_password'),
                      style: GoogleFonts.poppins(
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        height: 1.2,
                      ),
                    ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.3),
                    const SizedBox(height: 8),
                    Text(
                      appProvider.translate('change_password_desc'),
                      style: GoogleFonts.poppins(
                        fontSize: 16,
                        color: Colors.white.withOpacity(0.7),
                      ),
                    ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.3),
                    const SizedBox(height: 40),
                    CustomTextField(
                      controller: _currentPasswordController,
                      label: appProvider.translate('current_password'),
                      hint: appProvider.translate('current_password'),
                      isPassword: true,
                      prefixIcon: FontAwesomeIcons.lock,
                      validator: Validators.password,
                    ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.3),
                    const SizedBox(height: 24),
                    CustomTextField(
                      controller: _newPasswordController,
                      label: appProvider.translate('new_password'),
                      hint: appProvider.translate('new_password'),
                      isPassword: true,
                      prefixIcon: FontAwesomeIcons.key,
                      validator: Validators.password,
                    ).animate().fadeIn(delay: 800.ms).slideY(begin: 0.3),
                    const SizedBox(height: 24),
                    CustomTextField(
                      controller: _confirmPasswordController,
                      label: appProvider.translate('confirm_password'),
                      hint: appProvider.translate('confirm_password'),
                      isPassword: true,
                      prefixIcon: FontAwesomeIcons.lock,
                      validator: (value) => Validators.confirmPassword(value, _newPasswordController.text),
                    ).animate().fadeIn(delay: 1000.ms).slideY(begin: 0.3),
                    const SizedBox(height: 40),
                    GradientButton(
                      text: appProvider.translate('save'),
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(
                                appProvider.translate('password_changed'),
                                style: GoogleFonts.poppins(),
                              ),
                              backgroundColor: AppTheme.primaryColor,
                              behavior: SnackBarBehavior.floating,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                          );
                          Navigator.pop(context);
                        }
                      },
                    ).animate().fadeIn(delay: 1200.ms).slideY(begin: 0.3),
                    const SizedBox(height: 16),
                    GradientButton(
                      text: appProvider.translate('cancel'),
                      isOutlined: true,
                      onPressed: () => Navigator.pop(context),
                    ).animate().fadeIn(delay: 1400.ms).slideY(begin: 0.3),
                    const SizedBox(height: 40),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}