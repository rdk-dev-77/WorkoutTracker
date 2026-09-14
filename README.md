# WorkoutTracker

App pessoal de controle de treino de academia (cargas, reps, treino por dia da
semana, evolução ao longo do tempo). Web app (React + Vite), instalável como
PWA no iPhone via Safari, usado 100% no navegador.

Plano completo: `C:\Users\Rafael\.claude\plans\estou-come-ando-um-projeto-shimmying-bumblebee.md`

> Histórico: o projeto começou como app nativo iOS (Xcode/XcodeGen/Sideloadly),
> mas foi migrado para web app puro. Dynamic Island e HealthKit/Apple Watch
> foram descartados nessa migração — são exclusivamente nativos, não existem
> em navegador/PWA.

## Stack

- React + TypeScript + Vite
- `vite-plugin-pwa` (manifest + service worker)
- Persistência: local no navegador (IndexedDB) — sem backend, sem sync entre
  dispositivos, decisão consciente para manter o projeto simples
- Deploy: GitHub Pages, via GitHub Actions (`.github/workflows/deploy.yml`)

## IMPORTANTE: como instalar no iPhone (não é opcional)

O Safari apaga dados de site (IndexedDB/localStorage) depois de 7 dias sem uso
**se o site estiver aberto como aba normal**. Isso não afeta um PWA instalado
via "Adicionar à Tela de Início" — só nesse modo o iOS trata os dados como
persistentes de verdade.

**Portanto, use sempre pelo ícone instalado, nunca pela aba do Safari**:

1. Abra a URL do GitHub Pages no Safari do iPhone.
2. Toque em Compartilhar → "Adicionar à Tela de Início".
3. A partir daí, sempre abra pelo ícone na tela de início, não pelo Safari.

Mesmo assim, como é a única cópia dos dados (sem backend), vale implementar
cedo (Fase 1) uma função de exportar/importar backup em JSON, por segurança.

## Rodando localmente (Windows)

```
npm install
npm run dev
```

## Deploy

1. Nas configurações do repositório no GitHub, em **Settings → Pages**,
   definir Source = "GitHub Actions" (passo manual único).
2. Cada push em `main`/`master` builda e publica automaticamente em
   `https://rdk-dev-77.github.io/WorkoutTracker/`.

## Critério de pronto da Fase 0

Site publicado no GitHub Pages, funcionando como PWA instalável no Safari do
iPhone (ícone próprio, abre em tela cheia sem a barra do Safari).
