# BAMs APIカタログ
OpenAPIをリストし、APIを選択するとOpenAPI文書を元にしたUI画面を表示しAPIを試験実行できるAPIカタログ。GitHub PagesなどのWebサーバやVSCode上のプラグインとしてAPIカタログを表示します。

## 初期取り込み方法
後述のとおりsubmoduleを使っていますので、git cloneに--recursiveをつけることと、プライベートリポジトリなので「[ユーザ名]:[パスワード]@」をセットすることに注意。
```
$ git clone --recursive https://[ユーザ名]:[パスワード]@github.com/apilabeyes/bamscatalog.git
$ cd bamscatalog
```

## Webページ版のBAMsカタログ生成方法
### 前提条件:
- nodeのバージョンは14.15
### ビルド結果：
- docsフォルダにWebページ版のBAMsカタログが生成されます
### ビルド方法
```
$ cd vue2
$ npm install
$ npm run build
```

### カスタマイズ方法：
#### (1) カタログリストのカスタマイズ
- 「vud2/public/apicatalog.json」ファイルにAPIカタログにリストしたいカタログを下記のとおり記載してビルドします。
```
[
  {
    "name":"ペットストア", # APIの名前
    "category":"店舗", # カテゴリ
    "api":"./myapi01/pets.json", # OpenAPI文書へのパス
    "description": "ペットストアのAPIです。", # APIの説明
    "images": "./myapi01/images/cat.jpg" # カタログに表示される画像へのパス
  },
  ...
]
```
#### (2) OpenAPI文書の配置
OpenAPI文書は別リポジトリで管理し、それらを「vue2/public」フォルダ下にsubmoduleとして取り込むことでビルド時のカタログへのコピー対象にします。

```
$ cd vue2/public
$ git submodule add https://[token]@github.com/apilabeyes/myapi01 myapi01
```
※ トークンはGitHub右上のアカウントから「Settings」を選択、左のメニューから「Developer settings」を選択、「Personal access tokens」の「Generate new token」ボタンを押下して、Noteに「submodule用アクセストークン」などをメモ、「Set scopes」では「repo」全体をチェックして「Generate token」ボタンを押下するとトークンが表示されるのでコピーして上述の[token]の箇所に添付してコマンドを実行します。

#### (3) ファイル更新・追加・削除のgitへの反映
ファイルの更新や追加、削除する場合は下記コマンドを実行してpushしてください

```
$ git rm [削除するファイル名]
$ git add .
$ git commit -m "(どのような追加・変更をしたか記述)"
$ git push
```