# WorkoutTracker

App nativo iOS de controle de treino de academia (cargas, reps, treino por dia
da semana, evolução), com Live Activity/Dynamic Island e companion app no
Apple Watch com HealthKit.

Plano completo de fases: `C:\Users\Rafael\.claude\plans\estou-come-ando-um-projeto-shimmying-bumblebee.md`

## Como este projeto é estruturado (dev 100% Windows, sem Mac, sem pagar Apple por enquanto)

- O `.xcodeproj` **não é versionado**. Ele é gerado a partir de `project.yml`
  pelo [XcodeGen](https://github.com/yonaskolb/XcodeGen), rodando dentro do
  GitHub Actions (macOS na nuvem) — nunca localmente no Windows.
- Código-fonte fica em `Sources/WorkoutTracker`, editável em qualquer editor
  (VS Code + extensão Swift no Windows). Não espere autocomplete/type-check
  completo para `import SwiftUI`/`HealthKit`/etc. no Windows — os SDKs da
  Apple só existem dentro do Xcode/macOS. O feedback real vem do build no CI.
- O workflow `.github/workflows/build-ipa.yml` compila um **`.ipa` sem
  assinatura** a cada push e publica como artefato do run (aba Actions do
  GitHub). Não usa TestFlight nem App Store Connect — logo, **não exige
  Apple Developer Program pago**.
- Para instalar no iPhone: baixar o artefato do Actions e usar o
  [Sideloadly](https://sideloadly.io/) no Windows (USB), que assina o `.ipa`
  na hora com seu Apple ID comum (grátis) e instala no device.

## Passos manuais pendentes

1. **Repositório remoto no GitHub** — criar um repo (pode ser privado) e
   configurar como `origin` deste diretório (`git remote add origin <url>`),
   depois `git push`. Necessário para o GitHub Actions rodar.
2. **Sideloadly** instalado no Windows (https://sideloadly.io/), Apple ID
   comum (o mesmo que você já usa no iPhone, não precisa ser um novo).
3. A cada novo `.ipa` gerado: baixar o artefato do run em
   `github.com/<seu-usuario>/<repo>/actions`, abrir no Sideloadly, plugar o
   iPhone via USB, logar com o Apple ID e instalar.

## Limitação importante: conta Apple grátis (Personal Team)

Sideloadly assina com uma conta Apple **grátis**, o que tem restrições reais
da própria Apple (não é algo que dá pra contornar com ferramenta nenhuma):

- **Certificado expira em 7 dias** — depois disso o app para de abrir até
  você reinstalar (replugar o iPhone e rodar o Sideloadly de novo).
- **App Groups é bloqueado** em conta grátis. Pode não ser um problema para a
  Live Activity se ela só refletir estado empurrado pelo app principal (sem o
  widget precisar ler dados por conta própria) — a confirmar na prática na
  Fase 2.
- **ActivityKit (Dynamic Island) e HealthKit têm relatos conflitantes** nos
  fóruns da Apple sobre funcionar ou não em Personal Team — alguns
  desenvolvedores relatam erro de provisioning especificamente no entitlement
  do ActivityKit sem conta paga. **Isso precisa ser testado cedo** (um "hello
  world" de Live Activity e um de leitura de HealthKit, antes de construir
  as Fases 2 e 3 inteiras em cima da suposição de que funciona).
- Se algum desses travar por causa do entitlement, a correção é assinar o
  Apple Developer Program (US$99/ano) — nesse ponto o custo é para destravar
  uma feature específica, não uma taxa paga "por precaução".

## Critério de pronto da Fase 0

Este "Hello World" aparecendo instalado no iPhone físico via Sideloadly, a
partir de um `.ipa` gerado 100% pelo GitHub Actions, sem nunca ter aberto o
Xcode nem pago nada à Apple.
