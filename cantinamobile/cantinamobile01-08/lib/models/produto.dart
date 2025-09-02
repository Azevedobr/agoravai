class Produto {
  final int id;
  final String nome;
  final String? descricao;
  final double preco;
  final String? statusProduto;
  final Map<String, dynamic>? categoria;

  Produto({
    required this.id,
    required this.nome,
    this.descricao,
    required this.preco,
    this.statusProduto,
    this.categoria,
  });

  factory Produto.fromJson(Map<String, dynamic> json) {
    return Produto(
      id: json['id'],
      nome: json['nome'],
      descricao: json['descricao'],
      preco: json['preco'].toDouble(),
      statusProduto: json['statusProduto'],
      categoria: json['categoria'],
    );
  }
}