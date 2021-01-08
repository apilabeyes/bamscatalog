# BAMs APIカタログ
OpenAPIをリストし、APIを選択するとOpenAPI文書を元にしたUI画面を表示しAPIを試験実行できるAPIカタログ。GitHub PagesなどのWebサーバやVSCode上のプラグインとしてAPIカタログを表示します。

## 初期取り込み方法
後述のとおりsubmoduleを使っていますので、git cloneに--recursiveをつけることに注意。
```
$ git clone --recursive https://github.com/apilabeyes/bamscatalog.git
$ cd bamscatalog
```

### カスタマイズ方法：
#### (1) OpenAPI文書をもつリポジトリを作成し、カタログリストを作成
- OpenAPI文書を含むリポジトリを作成します。ここではリポジトリmyapi01とmyapi02をサブモジュールとして含むmyapiというリポジトリを作りました。
- myapi内のカタログリスト「bamscatalog.json」ファイルにAPIカタログにリストしたいAPIを下記のとおりJSON形式で記載します。
```
[
  ...
  {
    "name":"ペットショップAPI",
    "category":"-",
    "api":"./myapi02/pets/openapi.json",
    "description":"ペットショップのAPIです。",
    "images":"./myapi02/pets/pets.jpg"
  },
  ...
]
```

#### (2) OpenAPI文書の配置
(1)で作ったOpenAPI文書用リポジトリをサブモジュールとして取り込むことでGithub Pagesで参照可能になります。サブモジュールとして取り込んだリポジトリ名は「bamscatalogenv.js」で設定します。
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
