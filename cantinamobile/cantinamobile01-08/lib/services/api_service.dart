import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';
import '../models/produto.dart';
import '../models/order.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:8080';
  
  // Método para verificar se o backend está rodando
  static Future<bool> checkBackendConnection() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/usuario/findAll'),
        headers: {'Content-Type': 'application/json'},
      ).timeout(const Duration(seconds: 5));
      
      print('Backend connection test - Status: ${response.statusCode}');
      return response.statusCode == 200 || response.statusCode == 404;
    } catch (e) {
      print('Backend não está rodando: $e');
      return false;
    }
  }
  
  // Método para tentar descobrir o endpoint correto de atualização
  static Future<String?> discoverUpdateEndpoint(int userId) async {
    // Primeiro, vamos tentar GET no usuário para ver se existe
    try {
      final getResponse = await http.get(
        Uri.parse('$baseUrl/usuario/$userId'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (getResponse.statusCode == 200) {
        print('Usuário encontrado via GET /usuario/$userId');
        return '$baseUrl/usuario/$userId';
      }
    } catch (e) {
      print('Erro ao tentar GET: $e');
    }
    
    return null;
  }

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

      print('Login response status: ${response.statusCode}');
      print('Login response body: ${response.body}');

      if (response.statusCode == 200) {
        final userData = jsonDecode(response.body);
        print('Dados do usuário: $userData');
        
        final user = User.fromJson(userData);
        print('Usuário criado - ID: ${user.id}, Nome: ${user.nome}');
        
        // Se o backend não retornou ID, tentar buscar por email
        if (user.id == null) {
          print('ID não encontrado no login, tentando buscar usuário por email...');
          final userWithId = await _findUserByEmail(email);
          if (userWithId != null) {
            return userWithId;
          }
          
          // Se ainda não encontrou, criar um ID temporário
          print('Criando ID temporário para o usuário');
          return User(
            id: DateTime.now().millisecondsSinceEpoch, // ID temporário
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            nivelAcesso: user.nivelAcesso,
            statusUsuario: user.statusUsuario,
          );
        }
        
        return user;
      }
      return null;
    } catch (e) {
      print('Erro no login: $e');
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

  static Future<List<Order>> getUserOrders(int userId) async {
    // Lista de endpoints possíveis para pedidos
    final endpoints = [
      '$baseUrl/pedido/usuario/$userId',
      '$baseUrl/pedidos/usuario/$userId',
      '$baseUrl/pedido/findByUsuario/$userId',
      '$baseUrl/pedido/findAll',
    ];
    
    for (String endpoint in endpoints) {
      try {
        print('Tentando endpoint: $endpoint');
        
        final response = await http.get(
          Uri.parse(endpoint),
          headers: {'Content-Type': 'application/json'},
        );

        print('Status Code: ${response.statusCode}');
        print('Response Body: ${response.body}');

        if (response.statusCode == 200) {
          try {
            final responseData = jsonDecode(response.body);
            if (responseData is Map && responseData.containsKey('error')) {
              print('Endpoint retornou erro: ${responseData['error']}');
              continue;
            }
            
            List<dynamic> data = responseData is List ? responseData : [];
            print('Sucesso com endpoint: $endpoint');
            return data.map((json) => Order.fromJson(json)).toList();
          } catch (e) {
            print('Erro ao processar resposta: $e');
            continue;
          }
        }
      } catch (e) {
        print('Erro ao tentar $endpoint: $e');
      }
    }
    
    print('Nenhum endpoint de pedidos funcionou - retornando lista vazia');
    return [];
  }

  static Future<bool> updateUser(int userId, String nome, String email) async {
    // Baseado na resposta do backend, vamos tentar PUT direto no endpoint de usuários
    final endpoints = [
      '$baseUrl/usuario/$userId',
      '$baseUrl/usuarios/$userId', 
      '$baseUrl/usuario/update/$userId',
      '$baseUrl/usuario/editar/$userId',
      '$baseUrl/usuario/atualizar/$userId',
      '$baseUrl/api/usuario/$userId',
      '$baseUrl/api/usuarios/$userId',
      '$baseUrl/usuario/signup', // Tentar usar signup como update temporário
    ];
    
    for (String endpoint in endpoints) {
      try {
        print('Tentando endpoint: $endpoint');
        print('Dados: {"nome": "$nome", "email": "$email"}');
        
        // Tentar primeiro PATCH, depois PUT
        var response = await http.patch(
          Uri.parse(endpoint),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'nome': nome,
            'email': email,
          }),
        );
        
        // Se PATCH não funcionar, tentar PUT
        if (response.statusCode == 405 || response.statusCode == 404) {
          response = await http.put(
            Uri.parse(endpoint),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({
              'nome': nome,
              'email': email,
            }),
          );
        }

        print('Status Code: ${response.statusCode}');
        print('Response Body: ${response.body}');
        
        if (response.statusCode == 200) {
          // Verificar se a resposta contém erro
          try {
            final responseData = jsonDecode(response.body);
            if (responseData is Map && responseData.containsKey('error')) {
              print('Endpoint retornou erro: ${responseData['error']}');
              continue; // Tenta próximo endpoint
            }
          } catch (e) {
            // Se não conseguir fazer parse, assume que é sucesso
          }
          print('Sucesso com endpoint: $endpoint');
          return true;
        }
        
        // Se não for 404, pode ser outro erro, então continua tentando
        if (response.statusCode != 404) {
          print('Erro ${response.statusCode} em $endpoint: ${response.body}');
        }
        
      } catch (e) {
        print('Erro ao tentar $endpoint: $e');
      }
    }
    
    print('Nenhum endpoint funcionou - falha na atualização');
    return false; // Falha se nenhum endpoint funcionar
  }
  
  // Método auxiliar para buscar usuário por email
  static Future<User?> _findUserByEmail(String email) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/usuario/findAll'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        List<dynamic> users = jsonDecode(response.body);
        for (var userData in users) {
          if (userData['email'] == email) {
            print('Usuário encontrado por email: $userData');
            return User.fromJson(userData);
          }
        }
      }
    } catch (e) {
      print('Erro ao buscar usuário por email: $e');
    }
    return null;
  }
  
  // Método para validar senha atual do usuário
  static Future<bool> validateCurrentPassword(int userId, String currentPassword) async {
    final response = await http.post(
      Uri.parse('$baseUrl/usuario/validatePassword'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'userId': userId,
        'password': currentPassword,
      }),
    );
    
    print('Validando senha para usuário $userId');
    print('Status Code: ${response.statusCode}');
    print('Response Body: ${response.body}');
    
    if (response.statusCode == 200) {
      final responseData = jsonDecode(response.body);
      return responseData['valid'] == true;
    }
    
    throw Exception('Erro ao validar senha: ${response.statusCode}');
  }
  
  // Método para alterar senha do usuário
  static Future<bool> changePassword(int userId, String currentPassword, String newPassword) async {
    final response = await http.put(
      Uri.parse('$baseUrl/usuario/changePassword'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'userId': userId,
        'currentPassword': currentPassword,
        'newPassword': newPassword,
      }),
    );
    
    print('Alterando senha para usuário $userId');
    print('Status Code: ${response.statusCode}');
    print('Response Body: ${response.body}');
    
    if (response.statusCode == 200) {
      return true;
    }
    
    throw Exception('Erro ao alterar senha: ${response.statusCode}');
  }
}