import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../theme/app_theme.dart';
import '../utils/responsive.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/gradient_button.dart';
import '../utils/validators.dart';
import '../services/user_service.dart';
import '../services/auth_service.dart';
import '../services/api_service.dart';
import '../models/user.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();

  final UserService _userService = UserService();
  bool _isEditing = false;

  @override
  void initState() {
    super.initState();
    final currentUser = AuthService().currentUser;
    if (currentUser != null) {
      _nameController.text = currentUser.nome;
      _emailController.text = currentUser.email;
    }
  }

  void _toggleEdit() {
    print('Alternando modo de edição: $_isEditing -> ${!_isEditing}');
    setState(() {
      _isEditing = !_isEditing;
      if (!_isEditing) {
        // Se cancelou, restaura os valores originais
        final currentUser = AuthService().currentUser;
        if (currentUser != null) {
          _nameController.text = currentUser.nome;
          _emailController.text = currentUser.email;
          print('Valores restaurados: ${currentUser.nome}, ${currentUser.email}');
        }
      }
    });
    print('Novo estado _isEditing: $_isEditing');
  }



  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();

    super.dispose();
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
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        _buildProfilePhoto(context),
                        const SizedBox(height: 32),
                        _buildForm(context),
                        const SizedBox(height: 32),
                        _buildSaveButton(context),
                      ],
                    ),
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
          if (!_isEditing)
            IconButton(
              onPressed: _toggleEdit,
              icon: const FaIcon(FontAwesomeIcons.edit, color: Colors.white),
            ).animate().fadeIn().slideX(begin: 0.3)
          else
            const SizedBox(width: 48),
        ],
      ),
    );
  }

  Widget _buildProfilePhoto(BuildContext context) {
    return Container(
      width: 120,
      height: 120,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppTheme.primaryColor, Color(0xFF8B7EFF)],
        ),
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: AppTheme.primaryColor.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: const Center(
        child: FaIcon(
          FontAwesomeIcons.user,
          color: Colors.white,
          size: 48,
        ),
      ),
    ).animate().scale(duration: 800.ms, curve: Curves.elasticOut);
  }

  Widget _buildForm(BuildContext context) {
    print('Construindo form com _isEditing: $_isEditing');
    return Column(
      children: [
        CustomTextField(
          key: ValueKey('name_field_$_isEditing'),
          controller: _nameController,
          label: 'Nome completo',
          hint: 'Digite seu nome completo',
          prefixIcon: FontAwesomeIcons.user,
          validator: Validators.name,
          enabled: _isEditing,
        ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.3),
        const SizedBox(height: 20),
        CustomTextField(
          key: ValueKey('email_field_$_isEditing'),
          controller: _emailController,
          label: 'E-mail',
          hint: 'Digite seu e-mail',
          keyboardType: TextInputType.emailAddress,
          prefixIcon: FontAwesomeIcons.envelope,
          validator: Validators.email,
          enabled: _isEditing,
        ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.3),
        const SizedBox(height: 20),

      ],
    );
  }

  Widget _buildSaveButton(BuildContext context) {
    if (!_isEditing) {
      return const SizedBox.shrink();
    }
    
    return Row(
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
              if (_formKey.currentState!.validate()) {
                final currentUser = AuthService().currentUser;
                if (currentUser != null) {
                  print('Usuário atual: ${currentUser.nome}, ID: ${currentUser.id}');
                  
                  // Verificar conexão com backend
                  final backendConnected = await ApiService.checkBackendConnection();
                  if (!backendConnected) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          'Backend não está rodando em localhost:8080!',
                          style: GoogleFonts.poppins(color: Colors.white),
                        ),
                        backgroundColor: Colors.orange,
                        behavior: SnackBarBehavior.floating,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    );
                    return;
                  }
                  
                  if (currentUser.id == null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          'Erro: ID do usuário não encontrado!',
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
                  
                  final success = await ApiService.updateUser(
                    currentUser.id!,
                    _nameController.text,
                    _emailController.text,
                  );
                  
                  if (success) {
                    // Atualizar dados locais
                    final updatedUser = User(
                      id: currentUser.id,
                      nome: _nameController.text,
                      email: _emailController.text,
                      senha: currentUser.senha,
                      nivelAcesso: currentUser.nivelAcesso,
                      statusUsuario: currentUser.statusUsuario,
                    );
                    AuthService().setCurrentUser(updatedUser);
                    
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          'Perfil atualizado com sucesso!',
                          style: GoogleFonts.poppins(color: Colors.white),
                        ),
                        backgroundColor: Colors.green,
                        behavior: SnackBarBehavior.floating,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    );
                    setState(() {
                      _isEditing = false;
                    });
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          'Erro: Backend não conseguiu atualizar os dados no banco!',
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
    ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.3);
  }
}