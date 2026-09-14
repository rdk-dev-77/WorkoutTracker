# WorkoutTracker

App nativo iOS de controle de treino de academia (cargas, reps, treino por dia
da semana, evolução), com Live Activity/Dynamic Island e companion app no
Apple Watch com HealthKit.

Plano completo de fases: `C:\Users\Rafael\.claude\plans\estou-come-ando-um-projeto-shimmying-bumblebee.md`

## Como este projeto é estruturado (dev 100% Windows, sem Mac)

- O `.xcodeproj` **não é versionado**. Ele é gerado a partir de `project.yml`
  pelo [XcodeGen](https://github.com/yonaskolb/XcodeGen), rodando dentro do
  pipeline de CI (macOS na nuvem) — nunca localmente no Windows.
- Código-fonte fica em `Sources/WorkoutTracker`, editável em qualquer editor
  (VS Code + extensão Swift no Windows). Não espere autocomplete/type-check
  completo para `import SwiftUI`/`HealthKit`/etc. no Windows — os SDKs da
  Apple só existem dentro do Xcode/macOS. O feedback real vem do build no CI.
- Cada push dispara (depois de configurado) um build assinado que é publicado
  no TestFlight, para instalar no iPhone físico.

## Passos manuais pendentes (só você pode fazer — exigem sua conta/pagamento)

Estes passos não fazem parte do código e precisam ser feitos por você, uma
única vez, via navegador:

1. **Apple Developer Program** (US$99/ano) — inscrever-se em
   https://developer.apple.com/programs/ com o seu Apple ID. Necessário para
   TestFlight, entitlement de HealthKit e Live Activities.
2. **Repositório remoto no GitHub** — criar um repo (pode ser privado) e
   configurar como `origin` deste diretório (`git remote add origin <url>`).
3. **Conta na Codemagic** (https://codemagic.io) — plano free inclui 500
   min/mês em máquina macOS, suficiente para este projeto no início.
   - Conectar a conta Codemagic à sua Apple Developer Program (Codemagic >
     Teams > Integrations > App Store Connect) para gerenciamento automático
     de certificados/assinatura.
   - Atualizar `codemagic.yaml` com o nome real da integração criada e do
     grupo de testers do TestFlight.
4. **App Store Connect** (https://appstoreconnect.apple.com) — criar o app
   (mesmo Bundle ID de `project.yml`: `com.rafaellacerda.workouttracker`) e um
   grupo de teste interno no TestFlight com você mesmo como tester.
5. Preencher `DEVELOPMENT_TEAM` em `project.yml` com o Team ID da sua conta
   (visível em Apple Developer > Membership).

## Critério de pronto da Fase 0

Este "Hello World" aparecendo instalado via TestFlight no iPhone físico,
sem nunca ter aberto o Xcode.
