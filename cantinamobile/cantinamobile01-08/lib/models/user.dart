class User {
  final int? id;
  final String nome;
  final String email;
  final String senha;
  final String? nivelAcesso;
  final String? statusUsuario;

  User({
    this.id,
    required this.nome,
    required this.email,
    required this.senha,
    this.nivelAcesso = 'ALUNO',
    this.statusUsuario = 'ATIVO',
  });

  Map<String, dynamic> toJson() {
    return {
      'nome': nome,
      'email': email,
      'senha': senha,
      'nivelAcesso': nivelAcesso,
      'statusUsuario': statusUsuario,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      nome: json['nome'],
      email: json['email'],
      senha: json['senha'],
      nivelAcesso: json['nivelAcesso'],
      statusUsuario: json['statusUsuario'],
    );
  }
}