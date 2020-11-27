# BAMs APIカタログ
OpenAPIをリストし、APIを選択するとOpenAPI文書を元にしたUI画面を表示しAPIを試験実行できるAPIカタログ。GitHub PagesなどのWebサーバやVSCode上のプラグインとしてAPIカタログを表示します。

## TODO
12/4までの作業:
- Github Pages対応
  - Sawgger UIに戻るボタンを追加する(完了)
  - OpenAPI文書置き場を別リポジトリ(ここではmyapi01)にしてsubmoduleとして取り込みカタログリスト内のOpenAPI文書へのパスを変更する(完了)
  - favicon.icoを追加する(完了)
  - カタログリスト名を「apicatalog.json」に修正する(完了)
  - GridView表示のヘッダ部分「API Catalog Index」と表示された部分のパディングが20px 40px 40pxとなっており、GridViewとの間を表すpadding-bottomも40pxになっていて少し間が抜けているので、20px 40px 40px 20pxと設定して間を短くする(完了)
  - GridViewエリアでnameの下にdescriptionを入れる(完了)
  - GridViewエリアの背景に透過率50%くらいにしたイメージを入れる(完了)
- VSCode対応
  - VSCodeプラグイン化動作確認(完了)
  - VSCodeでのSwaggerUI(npm module)動作確認(完了)
  - VSCodeアイコン追加(完了)
- [参考](https://github.com/swagger-api/swagger-ui/issues/4390)のようにSwagger UIの左上のロゴを"icons/bams_swaggerui.png"に変更したのでGitPagesロゴパス参照のずれを修正する(作業中)
- 同様にjs,cssファイルのパス及びファイル名を変えたので、再度ローカルファイル参照先を修正する(作業中)
- SwaggerUI ホットリロード状態での起動実装(作業中)
- API Catalog GridViewエリアのnameを太文字化(作業中)
- ファイルDL実装(InsomniaUIクリックでgit clone)(作業中)
- VSCodeプラグインとGitあわせた動作テスト(作業中)

12/4以降の作業:
- VSCodeのOpenAPI Editorが"swagger"タグに反応してSwagger UIを開くのようにapicatalog.jsonも"apicatalog"タグを追加してそれを元にAPI Catalogビューを開くようにしたい
- Github PageにはOAuth認証を行い参照可能ユーザを限定するログイン画面を追加したい（まずはvue.jsでBasic認証を追加する方法でもよいです）
- KeycloakのようなOAuth認証サーバと連携したログイン機能とJWTトークンを使ったロールやスコープ別の表示内容変更ができるようにしたい。
- APIの利用状況のダッシュボード表示がしたい。まずはAPIの実行トランザクション数と成功数と失敗数と平均レスポンスタイムを表示を試みます。さらにはログイン組織ごとのトランザクション数とRate Limit数、APIトークンなどの認証情報のセットを試みます。

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

