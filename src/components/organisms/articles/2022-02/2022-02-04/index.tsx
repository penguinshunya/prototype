import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

const COMMAND = `
# アカウントの確認
gcloud config get-value account

# プロジェクトの確認
gcloud config get-value project

# 認証済みアカウント一覧の取得
gcloud auth list

# アカウントの切り替え
gcloud config set account "takayashunya@gmail.com"

# ワークスペースを扱うためのコマンド
gcloud config configurations

# ワークスペースを作成する。自動で作成したワークスペースに切り替わる
gcloud config configurations create work

# ワークスペースに設定を行い、設定内容を確認する
gcloud config set account takayashunya@gmail.com
gcloud config set project takayashunya-202202
gcloud config configurations list

# defaultワークスペースに切り替える
gcloud config configurations activate default
`;

interface Props {}

export const Article20220204: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        <code>gcloud</code>コマンドの使い方
      </P>
      <CodeBlock>{COMMAND.trim()}</CodeBlock>
      <P>
        自分用のワークスペースへの切り替えには<code>takaya</code>
        エイリアス（自分の名前）を、仕事用のワークスペースへの切り替えには<code>towork</code>
        エイリアスを使うことにする。
      </P>
      <MyDivider />
      <P>
        GCPのMySQLデータベースを使うことにした。月3,000円ほどかかると思うけれど、それ以上の価値がある気がする。使わない場合は止めてしまえばいい。
      </P>
    </ArticleContent>
  );
});

export default Article20220204;
