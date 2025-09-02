import 'package:flutter/foundation.dart';

class UserService extends ChangeNotifier {
  static final UserService _instance = UserService._internal();
  factory UserService() => _instance;
  UserService._internal();

  String _name = 'João Silva';
  String _email = 'joao.silva@email.com';
  String _phone = '(11) 99999-9999';
  String? _profileImage;

  String get name => _name;
  String get email => _email;
  String get phone => _phone;
  String? get profileImage => _profileImage;

  void updateProfile({
    required String name,
    required String email,
    required String phone,
    String? profileImage,
  }) {
    _name = name;
    _email = email;
    _phone = phone;
    if (profileImage != null) {
      _profileImage = profileImage;
    }
    notifyListeners();
  }

  void updateProfileImage(String imagePath) {
    _profileImage = imagePath;
    notifyListeners();
  }
}