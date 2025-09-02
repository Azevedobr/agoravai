import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';
import '../models/produto.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:8080';

  static Future<bool> registerUser(User user) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/usuario/signup'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(user.toJson()),
      );

      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  static Future<User?> loginUser(String email, String senha) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/usuario/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'senha': senha}),
      );

      if (response.statusCode == 200) {
        return User.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  static Future<List<Produto>> getProdutos() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/produto/findAllAtivos'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        return data.map((json) => Produto.fromJson(json)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  static Future<bool> updateUser(int userId, String nome, String email) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/usuario/editar/$userId'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'nome': nome,
          'email': email,
        }),
      );

      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
}