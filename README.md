# RickMortyApp

App React Native para consultar personagens da API publica GraphQL do Rick and Morty.

## Stack

- React Native 0.86.0 com TypeScript
- Apollo Client com GraphQL
- React Navigation
- Zustand + AsyncStorage para persistencia local
- styled-components com ThemeProvider
- i18next com PT-BR e EN-US
- Sentry opcional, integrado ao React Navigation
- lucide-react-native + react-native-svg para icones
- Jest + Testing Library com cobertura minima configurada

## Funcionalidades

- Lista paginada de personagens com infinite scroll
- Busca por nome com debounce
- Filtros por status, especie e genero
- Loading, erro com retry, lista vazia e pull-to-refresh
- Tela de detalhe com dados do personagem e episodios
- Favoritos na lista e no detalhe, com estrela do `lucide-react-native`
- Favoritos persistidos entre sessoes
- Tema `system`, `light` e `dark` persistido
- Idioma `pt-BR` e `en-US` persistido
- Idioma inicial baseado no dispositivo: portugues usa `pt-BR`; outros idiomas usam `en-US`

## Requisitos

- Node.js >= 22.11.0, preferencialmente Node 22 LTS
- npm
- JDK 17
- Android Studio com SDK/emulador Android configurado
- macOS + Xcode + CocoaPods apenas para rodar iOS

> Observacao: React Native 0.86 exige Node mais novo que 20.17.0. Use Node 22 LTS para evitar falhas de build/Metro.

## Variaveis de ambiente

Crie o arquivo `.env` a partir do exemplo:

```sh
copy .env.example .env
```

No macOS/Linux:

```sh
cp .env.example .env
```

O Sentry é opcional. Para habilitar, preencha:

```env
SENTRY_DSN=
```

Sem `SENTRY_DSN`, o Sentry nao inicializa e o app roda normalmente.

## Como rodar

Instale as dependencias:

```sh
npm install
```

Inicie o Metro:

```sh
npm start
```

Em outro terminal, rode Android:

```sh
npm run android
```

Para iOS, em macOS:

```sh
bundle install
cd ios
bundle exec pod install
cd ..
npm run ios
```

## Qualidade

```sh
npm run typecheck
npm run lint
npm test
npm test -- --coverage --runInBand
npm run format:check
```

O coverage possui thresholds globais configurados no Jest:

- Statements: 80%
- Branches: 70%
- Functions: 80%
- Lines: 80%

Para formatar o projeto:

```sh
npm run format
```

## Estrutura

```txt
src/
  app/
    apollo/
    config/
    i18n/
    navigation/
    sentry/
    theme/
  features/
    characters/
      api/
      components/
      screens/
      utils/
  shared/
    components/
    hooks/
  store/
  types/
```

## Decisoes de arquitetura

- Apollo centraliza cache e pagina os resultados de `characters` usando `filter` como chave.
- Queries usam `TypedDocumentNode`, permitindo inferencia de tipos no `useQuery` sem generics deprecated.
- Zustand mantem stores pequenas e independentes para favoritos e preferencias.
- AsyncStorage foi escolhido para manter a persistencia simples e reduzir atrito de build nativa no RN 0.86.
- i18next tem recursos tipados via TypeScript para reduzir erro em chaves de traducao.
- styled-components concentra tema claro/escuro e permite respeitar preferencia do usuario.
- `lucide-react-native` usa `react-native-svg` para renderizar icones consistentes no app.
- Sentry nao inicializa sem `SENTRY_DSN`, deixando o projeto pronto para ambiente real sem quebrar desenvolvimento local.
