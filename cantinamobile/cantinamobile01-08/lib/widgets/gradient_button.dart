import 'package:flutter/material.dart';
import '../utils/responsive.dart';

class GradientButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isOutlined;

  const GradientButton({
    super.key,
    required this.text,
    this.onPressed,
    this.isOutlined = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: Responsive.hp(context, 7),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: isOutlined
            ? null
            : const LinearGradient(
                colors: [Color(0xFF6C63FF), Color(0xFF9C88FF)],
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
              ),
        border: isOutlined
            ? Border.all(color: const Color(0xFF6C63FF), width: 2)
            : null,
        boxShadow: isOutlined
            ? null
            : [
                BoxShadow(
                  color: const Color(0xFF6C63FF).withOpacity(0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ],
      ),
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),
        child: Text(
          text,
          style: TextStyle(
            color: isOutlined ? const Color(0xFF6C63FF) : Colors.white,
            fontSize: Responsive.sp(context, 18),
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}