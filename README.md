# BAMs APIカタログ
OpenAPIをリストし、APIを選択するとOpenAPI文書を元にしたUI画面を表示しAPIを試験実行できるAPIカタログ。GitHub PagesなどのWebサーバやVSCode上のプラグインとしてAPIカタログを表示します。

## 初期取り込み方法
後述のとおりsubmoduleを使っていますので、git cloneに--recursiveをつけることと、プライベートリポジトリなので「[ユーザ名]:[パスワード]@」をセットすることに注意。
```
$ git clone --recursive https://github.com/apilabeyes/bamscatalog.git
$ cd bamscatalog
```

### カスタマイズ方法：
#### (1) OpenAPI文書をもつリポジトリを作成し、カタログリストを作成
- OpenAPI文書をもつリポジトリを作成します。ここではmyapi01とmyapi02を含むmyapiというリポジトリを作りました。
- カタログリスト「bamscatalog.json」ファイルにAPIカタログにリストしたいカタログを下記のとおり記載します。
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
OpenAPI文書は別リポジトリで管理し、それらをsubmoduleとして取り込むことでGithub Pagesで参照可能になります。
```
$ git submodule add https://github.com/apilabeyes/myapi myapi
```

#### (3) ファイル更新・追加・削除のgitへの反映
ファイルの更新や追加、削除する場合は下記コマンドを実行してpushしてください

```
$ git rm [削除するファイル名]
$ git add .
$ git commit -m "(どのような追加・変更をしたか記述)"
$ git push
```