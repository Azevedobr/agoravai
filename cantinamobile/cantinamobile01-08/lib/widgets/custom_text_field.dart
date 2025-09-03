import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../utils/responsive.dart';

class CustomTextField extends StatefulWidget {
  final String label;
  final String hint;
  final bool isPassword;
  final TextInputType keyboardType;
  final IconData? prefixIcon;
  final String? Function(String?)? validator;
  final TextEditingController? controller;
  final bool enabled;
  final Function(String)? onChanged;

  const CustomTextField({
    super.key,
    required this.label,
    required this.hint,
    this.isPassword = false,
    this.keyboardType = TextInputType.text,
    this.prefixIcon,
    this.validator,
    this.controller,
    this.enabled = true,
    this.onChanged,
  });

  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  bool _obscureText = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: TextStyle(
            color: Colors.white,
            fontSize: Responsive.sp(context, 16),
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: TextFormField(
            controller: widget.controller,
            keyboardType: widget.keyboardType,
            obscureText: widget.isPassword ? _obscureText : false,
            enabled: widget.enabled,
            style: TextStyle(
              color: widget.enabled ? Colors.white : Colors.white.withOpacity(0.6),
              fontSize: Responsive.sp(context, 16),
            ),
            validator: widget.validator,
            onChanged: widget.onChanged,
            decoration: InputDecoration(
              filled: true,
              fillColor: widget.enabled 
                  ? const Color(0xFF1A1F3A)
                  : const Color(0xFF1A1F3A).withOpacity(0.5),
              hintText: widget.hint,
              hintStyle: TextStyle(
                color: Colors.white.withOpacity(0.5),
              ),
              prefixIcon: widget.prefixIcon != null
                  ? Icon(
                      widget.prefixIcon, 
                      color: widget.enabled 
                          ? Colors.white.withOpacity(0.7)
                          : Colors.white.withOpacity(0.4)
                    )
                  : null,
              suffixIcon: widget.isPassword
                  ? IconButton(
                      icon: FaIcon(
                        _obscureText ? FontAwesomeIcons.eyeSlash : FontAwesomeIcons.eye,
                        color: Colors.white.withOpacity(0.7),
                        size: 18,
                      ),
                      onPressed: widget.enabled ? () {
                        setState(() {
                          _obscureText = !_obscureText;
                        });
                      } : null,
                    )
                  : null,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: BorderSide.none,
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: BorderSide.none,
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: const BorderSide(
                  color: Color(0xFF6C63FF),
                  width: 2,
                ),
              ),
              disabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: BorderSide.none,
              ),
              contentPadding: const EdgeInsets.all(20),
            ),
          ),
        ),
      ],
    );
  }
}