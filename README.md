## 事前準備

.env ファイルを作成し、以下の内容を記述する。

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx
NEXT_PUBLIC_FIREBASE_DATABASE_URL=xxxx
```

## 起動

```bash
yarn dev
```

## firebase rules のデプロイ

```bash
$ firebase deploy --only database
```
