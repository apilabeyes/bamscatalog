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

## ビルド方法(Webページ版)
前提条件: nodeのバージョンは14.15
```
$ cd vue2
$ npm install
$ npm run build # docsフォルダにWebページ版のBAMsカタログが生成されます
```

## カタログリスト
「apicatalog.json」ファイルにAPIカタログにリストしたいカタログをリストします。
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

## Swagger UIの実行方法
まず[こちら](https://petstore.swagger.io/)でOpenAPI仕様を読み込むとどのようなUIが表示されて「Try it out」をクリックしてexecuteをクリックするとAPIが実行されるようすを試します。

1. サンプル実行しやすいGETを選ぶ
![](./images/swaggerui01.png)
2. "Try it out"をクリックしパラメータ入力可能にする
![](./images/swaggerui02.png)
3. パラメータpetIdに1を入力して「Execute」ボタンをクリックすると実行したCurlコマンドとレスポンスが表示される
![](./images/swaggerui03.png)

## Swagger UI等の開発部品としての使い方
上で試したSwagger UIのソースコードは[SwaggerUIのgithub上](https://github.com/swagger-api/swagger-ui)に存在し、UI画面を表示するためのnmpモジュールは下記にあります。
- [swagger-ui-dist](https://www.npmjs.com/package/swagger-ui-dist): HTMLに直接のせられるSwaggerUI部品
- [swagger-ui-react](https://www.npmjs.com/package/swagger-ui-react): react用SwaggerUI部品
 
これらを参考にGridView上の一つをクリックしたときに表示されるSwagger UI画面を開発しました。

- 参考1: [Swagger UIのWebアプリへの組み込み方](https://dev.classmethod.jp/articles/swagger-ui-without-server/)
- 参考2: GridViewは下記の[insomniaのstorybookの部品](https://deploy-preview-2565--insomnia-storybook.netlify.app/?path=/story/navigation-card--deck)を使っています

## Github情報
Web版APIカタログはGithub「apilabeyes」アカウントのプライベートリポジトリのGithubページで公開。準備したリポジトリは以下の4つ。
 
- test: OpenAPI仕様UIやOpenAPI文書をGithubページで公開するテスト用に作ったプライベートリポジトリ。
- myapi01: デモ用のOpenAPI文書をセットしたプライベートリポジトリ。
- bamscatalog: 本プライベートリポジトリ。docsフォルダ下をGithub PagesとしてWeb版BAMsカタログを公開。そこで参照するOpenAPI文書はmyapi01に入れサブモジュールとして取り込む。
- apitest: テスト用APIのプライベートリポジトリ。

## Githubの使い方
1. clone方法
```
$ git clone https://[ユーザ名]:[パスワード]@github.com/apilabeyes/[リポジトリ名].git
$ cd [リポジトリ名]
```

2. ファイルを追加する場合はcloneしたフォルダにファイルを追加して下記コマンドを実行してpushしてください

```
$ git add .
$ git commit -m "(どのような追加・変更をしたか記述)"
$ git push
```
※ VSCodeを使うとより簡単に操作できます

## OpenAPI文書の配置
OpenAPI文書は別リポジトリで管理し、それらをsubmoduleとして取り込むことでカタログに表示します。

```
$ git submodule add https://[token]@github.com/apilabeyes/myapi01 myapi01
```

※ トークンはGitHub右上のアカウントから「Settings」を選択、左のメニューから「Developer settings」を選択、「Personal access tokens」の「Generate new token」ボタンを押下して、Noteに「submodule用アクセストークン」などをメモ、「Set scopes」では「repo」全体をチェックして「Generate token」ボタンを押下するとトークンが表示されるのでコピーして上述の[token]の箇所に添付してコマンドを実行します。
