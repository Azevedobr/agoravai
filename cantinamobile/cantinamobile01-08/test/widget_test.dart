
import 'package:flutter_test/flutter_test.dart';
import 'package:tcc/main.dart'; // Atualize o caminho se necessário

void main() {
  testWidgets('Splash screen loads and navigates to Login', (WidgetTester tester) async {
    // Inicializa o app
    await tester.pumpWidget(const FinnTechApp());

    // Verifica se a splash screen aparece com texto e botão "Entrar"
    expect(find.text('FinnTech'), findsOneWidget);
    expect(find.text('Entrar'), findsOneWidget);

    // Toca no botão "Entrar"
    await tester.tap(find.text('Entrar'));
    await tester.pumpAndSettle(); // Espera a navegação

    // Verifica se navegou para a tela de login
    expect(find.text('Bem-vindo de volta!'), findsOneWidget);
    expect(find.text('Email*'), findsOneWidget);
  });

  testWidgets('Can navigate to Register screen from Splash', (WidgetTester tester) async {
    await tester.pumpWidget(const FinnTechApp());

    // Toca no botão "Criar conta"
    await tester.tap(find.text('Criar conta'));
    await tester.pumpAndSettle();

    // Verifica se está na tela de cadastro
    expect(find.text('Criar Conta'), findsOneWidget);
    expect(find.text('Seu nome completo*'), findsOneWidget);
  });

  testWidgets('Can navigate to Forgot Password from Login', (WidgetTester tester) async {
    await tester.pumpWidget(const FinnTechApp());

    // Vai para a tela de login
    await tester.tap(find.text('Entrar'));
    await tester.pumpAndSettle();

    // Toca no botão "Esqueceu a senha?"
    await tester.tap(find.text('Esqueceu a senha?'));
    await tester.pumpAndSettle();

    // Verifica se está na tela de recuperação
    expect(find.text('Esqueci a minha senha'), findsOneWidget);
    expect(find.text('Seu email*'), findsOneWidget);
  });
}
