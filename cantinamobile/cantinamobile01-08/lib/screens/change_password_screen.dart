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
import '../services/auth_service.dart';
import '../services/api_service.dart';

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
  
  bool _isEditing = false;
  bool _isCurrentPasswordValid = false;
  bool _isValidatingPassword = false;

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }
  
  void _toggleEdit() {
    setState(() {
      _isEditing = !_isEditing;
      if (!_isEditing) {
        // Se cancelou, limpa os campos
        _currentPasswordController.clear();
        _newPasswordController.clear();
        _confirmPasswordController.clear();
        _isCurrentPasswordValid = false;
      }
    });
  }
  
  void _validateCurrentPassword() async {
    if (_currentPasswordController.text.isEmpty) return;
    
    final currentUser = AuthService().currentUser;
    if (currentUser == null || currentUser.id == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Erro: Usuário não encontrado!',
            style: GoogleFonts.poppins(color: Colors.white),
          ),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      );
      return;
    }
    
    setState(() {
      _isValidatingPassword = true;
    });
    
    try {
      // Validação real com o backend
      final isValid = await ApiService.validateCurrentPassword(
        currentUser.id!,
        _currentPasswordController.text,
      );
      
      setState(() {
        _isCurrentPasswordValid = isValid;
        _isValidatingPassword = false;
      });
      
      if (!isValid) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Senha atual incorreta!',
              style: GoogleFonts.poppins(color: Colors.white),
            ),
            backgroundColor: Colors.red,
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        );
      }
    } catch (e) {
      setState(() {
        _isCurrentPasswordValid = false;
        _isValidatingPassword = false;
      });
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Erro ao validar senha: ${e.toString()}',
            style: GoogleFonts.poppins(color: Colors.white),
          ),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      );
    }
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
                    Row(
                      children: [
                        IconButton(
                          onPressed: () => Navigator.pop(context),
                          icon: const FaIcon(
                            FontAwesomeIcons.arrowLeft,
                            color: Colors.white,
                          ),
                        ),
                        const Spacer(),
                        if (!_isEditing)
                          IconButton(
                            onPressed: _toggleEdit,
                            icon: const FaIcon(
                              FontAwesomeIcons.edit,
                              color: Colors.white,
                            ),
                          ),
                      ],
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
                    if (_isEditing) ...[
                      CustomTextField(
                        controller: _currentPasswordController,
                        label: 'Senha atual',
                        hint: 'Digite sua senha atual',
                        isPassword: true,
                        prefixIcon: FontAwesomeIcons.lock,
                        enabled: true,
                        validator: Validators.password,
                        onChanged: (value) {
                          if (value.length >= 6) {
                            _validateCurrentPassword();
                          } else {
                            setState(() {
                              _isCurrentPasswordValid = false;
                            });
                          }
                        },
                      ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.3),
                      const SizedBox(height: 8),
                      if (_isValidatingPassword)
                        const Row(
                          children: [
                            SizedBox(
                              width: 16,
                              height: 16,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: AppTheme.primaryColor,
                              ),
                            ),
                            SizedBox(width: 8),
                            Text(
                              'Validando senha...',
                              style: TextStyle(color: Colors.white54, fontSize: 12),
                            ),
                          ],
                        ),
                      if (_isCurrentPasswordValid)
                        const Row(
                          children: [
                            Icon(Icons.check_circle, color: Colors.green, size: 16),
                            SizedBox(width: 8),
                            Text(
                              'Senha válida',
                              style: TextStyle(color: Colors.green, fontSize: 12),
                            ),
                          ],
                        ),
                      const SizedBox(height: 24),
                      CustomTextField(
                        controller: _newPasswordController,
                        label: 'Nova senha',
                        hint: 'Digite sua nova senha',
                        isPassword: true,
                        prefixIcon: FontAwesomeIcons.key,
                        enabled: _isCurrentPasswordValid,
                        validator: Validators.password,
                      ).animate().fadeIn(delay: 800.ms).slideY(begin: 0.3),
                      const SizedBox(height: 24),
                      CustomTextField(
                        controller: _confirmPasswordController,
                        label: 'Confirmar nova senha',
                        hint: 'Confirme sua nova senha',
                        isPassword: true,
                        prefixIcon: FontAwesomeIcons.lock,
                        enabled: _isCurrentPasswordValid,
                        validator: (value) => Validators.confirmPassword(value, _newPasswordController.text),
                      ).animate().fadeIn(delay: 1000.ms).slideY(begin: 0.3),
                    ] else ...[
                      Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: AppTheme.surfaceColor.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: Colors.white.withOpacity(0.1)),
                        ),
                        child: Row(
                          children: [
                            const FaIcon(
                              FontAwesomeIcons.lock,
                              color: Colors.white54,
                              size: 20,
                            ),
                            const SizedBox(width: 16),
                            Text(
                              'Clique em editar para alterar sua senha',
                              style: GoogleFonts.poppins(
                                color: Colors.white.withOpacity(0.7),
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.3),
                    ],
                    const SizedBox(height: 40),
                    if (_isEditing) ...[
                      Row(
                        children: [
                          Expanded(
                            child: GradientButton(
                              text: 'Cancelar',
                              isOutlined: true,
                              onPressed: _toggleEdit,
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: GradientButton(
                              text: 'Salvar',
                              onPressed: () async {
                                if (_formKey.currentState!.validate() && _isCurrentPasswordValid) {
                                  final currentUser = AuthService().currentUser;
                                  if (currentUser != null && currentUser.id != null) {
                                    try {
                                      await ApiService.changePassword(
                                        currentUser.id!,
                                        _currentPasswordController.text,
                                        _newPasswordController.text,
                                      );
                                      
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        SnackBar(
                                          content: Text(
                                            'Senha alterada com sucesso!',
                                            style: GoogleFonts.poppins(color: Colors.white),
                                          ),
                                          backgroundColor: Colors.green,
                                          behavior: SnackBarBehavior.floating,
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(12),
                                          ),
                                        ),
                                      );
                                      Navigator.pop(context);
                                    } catch (e) {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        SnackBar(
                                          content: Text(
                                            'Erro ao alterar senha: ${e.toString()}',
                                            style: GoogleFonts.poppins(color: Colors.white),
                                          ),
                                          backgroundColor: Colors.red,
                                          behavior: SnackBarBehavior.floating,
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(12),
                                          ),
                                        ),
                                      );
                                    }
                                  }
                                }
                              },
                            ),
                          ),
                        ],
                      ).animate().fadeIn(delay: 1200.ms).slideY(begin: 0.3),
                    ],
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