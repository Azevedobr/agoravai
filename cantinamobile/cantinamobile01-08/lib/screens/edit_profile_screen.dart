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
  String? _selectedImage;

  @override
  void initState() {
    super.initState();
    final currentUser = AuthService().currentUser;
    if (currentUser != null) {
      _nameController.text = currentUser.nome;
      _emailController.text = currentUser.email;
    }
  }

  void _selectImage() {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.cardColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Escolher Foto',
              style: GoogleFonts.poppins(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildImageOption(
                  icon: FontAwesomeIcons.camera,
                  label: 'Câmera',
                  onTap: () {
                    Navigator.pop(context);
                    setState(() {
                      _selectedImage = 'camera_image';
                    });
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          'Foto capturada da câmera!',
                          style: GoogleFonts.poppins(color: Colors.white),
                        ),
                        backgroundColor: AppTheme.primaryColor,
                        behavior: SnackBarBehavior.floating,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                    );
                  },
                ),
                _buildImageOption(
                  icon: FontAwesomeIcons.image,
                  label: 'Galeria',
                  onTap: () {
                    Navigator.pop(context);
                    setState(() {
                      _selectedImage = 'gallery_image';
                    });
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          'Foto selecionada da galeria!',
                          style: GoogleFonts.poppins(color: Colors.white),
                        ),
                        backgroundColor: AppTheme.primaryColor,
                        behavior: SnackBarBehavior.floating,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                    );
                  },
                ),
                if (_selectedImage != null)
                  _buildImageOption(
                    icon: FontAwesomeIcons.trash,
                    label: 'Remover',
                    color: Colors.red,
                    onTap: () {
                      Navigator.pop(context);
                      setState(() {
                        _selectedImage = null;
                      });
                    },
                  ),
              ],
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildImageOption({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
    Color? color,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: (color ?? AppTheme.primaryColor).withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: FaIcon(
              icon,
              color: color ?? AppTheme.primaryColor,
              size: 24,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: GoogleFonts.poppins(
              color: Colors.white,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
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
            'Editar Perfil',
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

  Widget _buildProfilePhoto(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: 120,
          height: 120,
          decoration: BoxDecoration(
            gradient: _selectedImage != null
                ? null
                : const LinearGradient(
                    colors: [AppTheme.primaryColor, Color(0xFF8B7EFF)],
                  ),
            color: _selectedImage != null ? AppTheme.surfaceColor : null,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: AppTheme.primaryColor.withOpacity(0.3),
                blurRadius: 20,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: _selectedImage != null
              ? ClipOval(
                  child: Container(
                    width: 120,
                    height: 120,
                    color: AppTheme.primaryColor.withOpacity(0.2),
                    child: const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.image,
                            color: Colors.white,
                            size: 32,
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Foto',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 12,
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
                    size: 48,
                  ),
                ),
        ).animate().scale(duration: 800.ms, curve: Curves.elasticOut),
        Positioned(
          bottom: 0,
          right: 0,
          child: GestureDetector(
            onTap: _selectImage,
            child: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppTheme.secondaryColor,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: const FaIcon(
                FontAwesomeIcons.camera,
                color: Colors.black,
                size: 16,
              ),
            ),
          ),
        ).animate(delay: 500.ms).scale(),
      ],
    );
  }

  Widget _buildForm(BuildContext context) {
    return Column(
      children: [
        CustomTextField(
          controller: _nameController,
          label: 'Nome completo',
          hint: 'Digite seu nome completo',
          prefixIcon: FontAwesomeIcons.user,
          validator: Validators.name,
        ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.3),
        const SizedBox(height: 20),
        CustomTextField(
          controller: _emailController,
          label: 'E-mail',
          hint: 'Digite seu e-mail',
          keyboardType: TextInputType.emailAddress,
          prefixIcon: FontAwesomeIcons.envelope,
          validator: Validators.email,
        ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.3),
        const SizedBox(height: 20),

      ],
    );
  }

  Widget _buildSaveButton(BuildContext context) {
    return GradientButton(
      text: 'Salvar Alterações',
      onPressed: () async {
        if (_formKey.currentState!.validate()) {
          final currentUser = AuthService().currentUser;
          if (currentUser != null) {
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
              Navigator.pop(context);
            } else {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    'Erro ao atualizar perfil!',
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
    ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.3);
  }
}