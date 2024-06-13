# UserScripts
s1vお手製のUserScriptを置いておく場所です。

問題などあればIssueを上げていただけますと対応するかもしれません。

# 利用方法
TampermonkeyなどのUserScriptを管理するブラウザ拡張機能を導入し、一覧のタイトルをクリックするとインストールできます。

うまくインストールできない場合は**拡張機能の管理**(chrome://extensions/)画面右上の`デベロッパー モード`を有効にしてみてください。  
（2024/06/13現在、最新のTampermonkeyではインストールプロセスに変更があり、バグが有るようです）

# 一覧
## KoT
### [AddSurplusTime](https://github.com/s1v/UserScripts/raw/main/KoT/AddSurplusTime.user.js)
KoTのタイムカードに現在の余剰労働時間を追加表示します。

1日の標準労働時間を8時間とし、現状で確定している労働実績から差分を算出します。
