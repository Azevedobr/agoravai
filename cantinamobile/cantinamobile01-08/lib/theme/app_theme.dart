import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color primaryColor = Color(0xFF6C63FF);
  static const Color secondaryColor = Color(0xFFFFE44C);
  
  // Dark theme colors
  static const Color darkBackgroundColor = Color(0xFF0A0E27);
  static const Color darkSurfaceColor = Color(0xFF1A1F3A);
  static const Color darkCardColor = Color(0xFF252B4A);
  
  // Light theme colors
  static const Color lightBackgroundColor = Color(0xFFF8F9FA);
  static const Color lightSurfaceColor = Color(0xFFFFFFFF);
  static const Color lightCardColor = Color(0xFFF1F3F4);
  
  // Legacy colors for backward compatibility
  static const Color backgroundColor = darkBackgroundColor;
  static const Color surfaceColor = darkSurfaceColor;
  static const Color cardColor = darkCardColor;
  
  static ThemeData darkTheme = ThemeData(
    primarySwatch: Colors.deepPurple,
    scaffoldBackgroundColor: darkBackgroundColor,
    textTheme: GoogleFonts.poppinsTextTheme().apply(
      bodyColor: Colors.white,
      displayColor: Colors.white,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: secondaryColor,
        foregroundColor: Colors.black,
        elevation: 8,
        shadowColor: secondaryColor.withOpacity(0.3),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        padding: const EdgeInsets.symmetric(vertical: 16),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: darkSurfaceColor,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide.none,
      ),
      hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
      contentPadding: const EdgeInsets.all(20),
    ),
  );
  
  static ThemeData lightTheme = ThemeData(
    primarySwatch: Colors.deepPurple,
    scaffoldBackgroundColor: lightBackgroundColor,
    textTheme: GoogleFonts.poppinsTextTheme().apply(
      bodyColor: Colors.black87,
      displayColor: Colors.black87,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        elevation: 8,
        shadowColor: primaryColor.withOpacity(0.3),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        padding: const EdgeInsets.symmetric(vertical: 16),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: lightSurfaceColor,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide.none,
      ),
      hintStyle: TextStyle(color: Colors.black.withOpacity(0.5)),
      contentPadding: const EdgeInsets.all(20),
    ),
  );
  
  // Legacy theme for backward compatibility
  static final ThemeData theme = darkTheme;
}