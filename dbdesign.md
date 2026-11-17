# マンガ情報共有システム — データベース設計書

**Version:** 1.0  
**設計段階:** 論理設計  
**対象:** マンガ  
**DBMS想定:** PostgreSQL  
**実装状況:** 未実装

---

## 1. プロジェクト概要

マンガ作品の情報を管理し、ユーザー間で共有・編集できるシステムを構築する。

基本的な方針は以下のとおり。

- マンガのみを対象とする。
- 作品の基本情報を管理する。
- 著者・出版社・レーベル・掲載誌を独立したエンティティとして管理する。
- 巻と話を管理する。
- ユーザーが作品に関する追加情報を自由に編集できるようにする。
- 口コミ・評価を管理する。
- タグによる作品分類を可能にする。
- 編集履歴と報告機能を備える。
- 将来的なカラム・情報形式の追加に対応しやすい構造にする。

## 2. 設計思想

### 2.1 拡張性

作品に関する追加情報は、固定カラムを増やすのではなく、汎用的なセクション機構によって管理する。

### 2.2 共同編集

ユーザーは共通のデータを編集する。

個人ごとに編集案を保持する方式ではなく、全員が同じ情報を編集する方式を採用する。

### 2.3 変更履歴

重要なデータ変更について、変更前後のデータ全体と編集者を記録する。

### 2.4 データの一貫性

可能な限りデータベース制約によって整合性を保証する。

## 3. エンティティ一覧

設計案として、以下の22テーブルを想定する。

| 分類 | テーブル |
|---|---|
| 作品 | Works |
| 著者 | Authors |
| 出版社 | Publishers |
| レーベル | Labels |
| 掲載誌 | Magazines |
| 作品・著者関連 | WorkAuthors |
| 作品・出版社関連 | WorkPublishers |
| 作品・レーベル関連 | WorkLabels |
| 作品・掲載誌関連 | WorkMagazines |
| 巻 | Volumes |
| 話 | Episodes |
| 巻・話関連 | VolumeEpisodes |
| セクション形式 | SectionTypes |
| 作品セクション | WorkSections |
| セクション内容 | WorkSectionContents |
| タグ | Tags |
| 作品・タグ関連 | WorkTags |
| ユーザー | Users |
| SNSリンク | UserSocialLinks |
| 口コミ | Reviews |
| 編集履歴 | EditHistories |
| 報告 | Reports |

※22テーブルは現時点の構成案。すべてのカラム・制約が最終確定したわけではない。

---

# 4. 作品・出版情報

## 4.1 Works

作品の基本情報を管理する。

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| title | VARCHAR(255) | 作品タイトル |
| cover_url | TEXT | 書影URL |
| thumbnail_url | TEXT | 軽量書影URL |
| serialization_start | DATE | 連載開始日 |
| serialization_end | DATE | 連載終了日 |
| score | NUMERIC | 評価スコア算出済み数値 |

`score` は口コミから算出する集計値。

著者・出版社・レーベル・掲載誌は別テーブルで管理する。

## 4.2 Authors

著者情報を管理する。

## 4.3 Publishers

出版社情報を管理する。

## 4.4 Labels

レーベル情報を管理する。

## 4.5 Magazines

掲載誌情報を管理する。

これら4つのテーブルには、それぞれ独立したIDを設ける。

名称の重複や表記揺れについては、注釈などを利用して管理する方針。

## 4.6 関連テーブル

| テーブル | 関連 |
|---|---|
| WorkAuthors | Works - Authors |
| WorkPublishers | Works - Publishers |
| WorkLabels | Works - Labels |
| WorkMagazines | Works - Magazines |

作品と各情報を関連付ける中間テーブルを設ける。

多対多の関係を基本とする設計案。

著者については、著者の役割を区別するためのカラムも検討する。

---

# 5. 巻・話

## 5.1 Volumes

単行本の巻情報を管理する。

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| work_id | BIGINT | 対象作品ID |
| volume_number | INTEGER | 巻数 |

## 5.2 Episodes

話を中心に管理する。

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| work_id | BIGINT | 対象作品ID |
| episode_number | VARCHAR(50) | 話数 |
| title | VARCHAR(255) | 話タイトル |
| description | TEXT | 説明 |
| published_at | DATE | 公開日 |
| sort_order | INTEGER | 表示順序 |

## 5.3 VolumeEpisodes

巻と話の関連付けを管理する。

| カラム | 型の候補 | 説明 |
|---|---|---|
| volume_id | BIGINT | 巻ID |
| episode_id | BIGINT | 話ID |
| position | INTEGER | 巻内での掲載順 |

複合主キーとして `(volume_id, episode_id)` を想定する。

## 5.4 確定仕様

- 話数を中心に管理する。
- 話の順序はユーザーに任せる。
- 話数の重複を許可する。
- 話と巻は独立して管理する。
- 巻と話を中間テーブルで関連付ける。
- 未収録の話のために特別な巻を用意する方式は採用しない。

---

# 6. 作品の追加情報

作品ごとに自由な情報を追加できる仕組み。

## 6.1 基本構造

以下の3テーブルで構成する。

- SectionTypes
- WorkSections
- WorkSectionContents

### SectionTypes

開発者が用意する情報形式を管理する。

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| type_key | VARCHAR(50) | 形式識別子 |
| display_name | VARCHAR(100) | 表示名 |
| description | TEXT | 説明 |

形式の例：

| type_key | 内容 |
|---|---|
| text | テキスト |
| table | テーブル |
| data | 構造化データ |
| link | リンク |

新しい形式の追加には、開発者によるバリデーション・表示処理・編集UIの実装が必要。

### WorkSections

作品に追加された情報の定義を管理する。

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| work_id | BIGINT | 対象作品ID |
| section_type_id | BIGINT | 情報形式ID |
| heading | VARCHAR(255) | 見出し |
| position | INTEGER | 表示順 |
| created_by | BIGINT | 作成者ID |
| created_at | TIMESTAMPTZ | 作成日時 |
| updated_at | TIMESTAMPTZ | 更新日時 |
| deleted_at | TIMESTAMPTZ | 論理削除日時 |

### WorkSectionContents

実際の内容を管理する。

| カラム | 型の候補 | 説明 |
|---|---|---|
| section_id | BIGINT | 主キー・外部キー |
| content | JSONB | セクション内容 |
| edited_by | BIGINT | 最終編集者ID |
| updated_at | TIMESTAMPTZ | 更新日時 |

1つのセクションにつき1つの現在の内容を保持する設計。

## 6.2 確定仕様

| 項目 | 決定 |
|---|---|
| 同一形式の複数追加 | 許可 |
| 編集方式 | 全員で同じ内容を編集 |
| 履歴方式 | 変更前後のJSON全体を保存 |
| 削除方式 | 論理削除 |
| 表示順序 | ユーザーが変更可能 |
| 表示順序の重複 | 許可 |
| 編集履歴 | 見出し・形式・表示順序・内容を対象 |

## 6.3 データ形式の例

テキスト形式：

```json
{
  "text": "作品に関する説明文"
}
```

テーブル形式：

```json
{
  "columns": [
    {"key": "name", "label": "名前"},
    {"key": "role", "label": "役割"}
  ],
  "rows": [
    {"name": "キャラクターA", "role": "主人公"}
  ]
}
```

リンク形式：

```json
{
  "label": "公式サイト",
  "url": "https://example.com"
}
```

JSONBの内容は、形式ごとにバックエンドでバリデーションする。

---

# 7. タグ

## 7.1 Tags

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| name | VARCHAR(100) | タグ名 |
| description | TEXT | 説明 |
| created_by | BIGINT | 作成者ID |
| created_at | TIMESTAMPTZ | 作成日時 |
| updated_at | TIMESTAMPTZ | 更新日時 |

## 7.2 WorkTags

| カラム | 型の候補 | 説明 |
|---|---|---|
| work_id | BIGINT | 作品ID |
| tag_id | BIGINT | タグID |
| created_by | BIGINT | 適用者ID |
| created_at | TIMESTAMPTZ | 作成日時 |

複合主キー `(work_id, tag_id)` を想定する。

## 7.3 確定仕様

- タグは誰でも作成可能。
- 適用対象は作品のみ。
- タグの重複管理は慎重に行う。
- フロントエンドで既存タグを選択する方式を採用する。
- 注釈によってタグの意味を統一する。
- 完全な重複防止は困難であることを認識する。

---

# 8. ユーザー

## 8.1 Users

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| username | VARCHAR(50) | ユーザー名 |
| icon_url | TEXT | アイコンURL |
| thumbnail_url | TEXT | 軽量アイコンURL |
| biography | TEXT | 自己紹介 |

認証情報・権限情報などは今後の設計対象。

## 8.2 UserSocialLinks

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| user_id | BIGINT | ユーザーID |
| platform | VARCHAR(50) | SNSサービス |
| url | TEXT | SNSリンク |

ユーザーは複数のSNSリンクを登録できる。

---

# 9. 口コミ

## 9.1 Reviews

| カラム | 型の候補 | NULL | 説明 |
|---|---|---|---|
| id | BIGINT | NO | 主キー |
| user_id | BIGINT | NO | 投稿ユーザー |
| target_type | VARCHAR(20) | NO | 対象種別 |
| work_id | BIGINT | NO | 作品ID |
| volume_id | BIGINT | YES | 巻ID |
| episode_id | BIGINT | YES | 話ID |
| score | NUMERIC(2,1) | NO | 評価スコア |
| body | TEXT | YES | 本文 |
| created_at | TIMESTAMPTZ | NO | 投稿日時 |
| updated_at | TIMESTAMPTZ | NO | 更新日時 |
| deleted_at | TIMESTAMPTZ | YES | 論理削除日時 |

## 9.2 確定仕様

| 項目 | 決定 |
|---|---|
| 対象 | 作品・巻・話 |
| 評価範囲 | 0〜5 |
| 評価刻み幅 | 0.5 |
| 本文 | 任意 |
| 削除方式 | 論理削除 |

評価は以下の11段階。

`0 / 0.5 / 1 / 1.5 / 2 / 2.5 / 3 / 3.5 / 4 / 4.5 / 5`

削除済み口コミは通常の表示と集計から除外する。

## 9.3 制約案

評価スコア：

```sql
CHECK (
    score >= 0
    AND score <= 5
    AND score * 2 = TRUNC(score * 2)
)
```

対象種別と対象IDの整合性：

- work：work_idのみ使用
- volume：work_idとvolume_idを使用
- episode：work_idとepisode_idを使用

また、複合外部キーによって巻・話が指定作品に属することを保証する。

同一ユーザー・同一対象の重複投稿防止については、過去の設計案で一意制約を提案している。最終DDL作成時に投稿制限の適用範囲を再確認する。

---

# 10. 編集履歴

## 10.1 EditHistories

共通の編集履歴テーブルを使用する。

| カラム | 型の候補 | 説明 |
|---|---|---|
| id | BIGINT | 主キー |
| user_id | BIGINT | 編集ユーザーID |
| target_type | VARCHAR(50) | 対象種別 |
| target_id | BIGINT | 対象ID |
| action | VARCHAR(20) | 操作種別 |
| before_data | JSONB | 変更前データ |
| after_data | JSONB | 変更後データ |
| created_at | TIMESTAMPTZ | 操作日時 |

## 10.2 履歴対象

以下の7種類を確定する。

1. Works
2. Episodes
3. Volumes
4. WorkSections
5. WorkSectionContents
6. Tags
7. Reviews

## 10.3 操作種別

| action | 内容 |
|---|---|
| create | 新規作成 |
| update | 更新 |
| delete | 論理削除 |
| restore | 復元 |

変更前後のJSON全体を保存する。

新規作成時はbefore_dataをNULLとし、削除時は削除後の状態をafter_dataに保存する。

履歴レコードは原則として変更・削除しない。

## 10.4 設計上の注意

- 編集者IDを必ず記録する。
- 履歴保存とデータ更新は同一トランザクションで実行する。
- ポリモーフィック参照の対象整合性はバックエンドで検証する。
- セクションのメタデータと内容は、それぞれの履歴対象として記録する。

---

# 11. 報告機能

## 11.1 Reports

| カラム | 型の候補 | NULL | 説明 |
|---|---|---|---|
| id | BIGINT | NO | 主キー |
| user_id | BIGINT | NO | 報告ユーザーID |
| target_type | VARCHAR(50) | NO | 対象種別 |
| target_id | BIGINT | NO | 対象ID |
| reason | VARCHAR(50) | NO | 報告理由 |
| description | TEXT | YES | 詳細説明 |
| status | VARCHAR(20) | NO | 対応状態 |
| reviewed_by | BIGINT | YES | 対応管理者ID |
| created_at | TIMESTAMPTZ | NO | 報告日時 |
| updated_at | TIMESTAMPTZ | NO | 更新日時 |
| resolved_at | TIMESTAMPTZ | YES | 対応完了日時 |

## 11.2 報告対象

- Works
- Volumes
- Episodes
- WorkSections
- WorkSectionContents
- Tags
- Reviews

## 11.3 報告理由案

| reason | 説明 |
|---|---|
| incorrect_information | 情報の誤り |
| duplicate | 重複 |
| inappropriate | 不適切な内容 |
| spam | スパム |
| copyright | 著作権上の問題 |
| other | その他 |

## 11.4 対応状態案

| status | 説明 |
|---|---|
| pending | 未対応 |
| reviewing | 確認中 |
| resolved | 対応済み |
| rejected | 対応不要 |

## 11.5 確定仕様

**同一ユーザーが同一対象を複数回報告することは禁止する。**

報告済みかどうかにかかわらず、一度報告した対象への再報告は認めない。

重複防止には以下の組み合わせを使用する。

`UNIQUE(user_id, target_type, target_id)`

報告しただけで対象データを自動削除することはしない。

管理者が確認・対応する。

---

# 12. リレーション設計

主な関係は以下のとおり。

| 親テーブル | 子テーブル | 関係 |
|---|---|---|
| Works | Volumes | 1:N |
| Works | Episodes | 1:N |
| Works | WorkSections | 1:N |
| Works | WorkTags | 1:N |
| Works | Reviews | 1:N |
| Authors | WorkAuthors | 1:N |
| Publishers | WorkPublishers | 1:N |
| Labels | WorkLabels | 1:N |
| Magazines | WorkMagazines | 1:N |
| Volumes | VolumeEpisodes | 1:N |
| Episodes | VolumeEpisodes | 1:N |
| SectionTypes | WorkSections | 1:N |
| WorkSections | WorkSectionContents | 1:1 |
| Tags | WorkTags | 1:N |
| Users | Reviews | 1:N |
| Users | EditHistories | 1:N |
| Users | Reports | 1:N |
| Users | UserSocialLinks | 1:N |

中間テーブルによって多対多の関係を表現する。

EditHistoriesとReportsの対象参照はポリモーフィック参照とする設計案。

---

# 13. 共通の設計ルール

| 項目 | 方針 |
|---|---|
| 主キー | BIGINTを基本とする |
| 日時 | TIMESTAMPTZ |
| 構造化データ | JSONB |
| 外部キー | 原則DB制約で保証 |
| 論理削除 | deleted_at |
| 編集履歴 | 変更前後の全データ |
| 編集者情報 | user_id |
| 報告の重複 | 禁止 |
| セクション形式 | 開発者が管理 |
| セクション内容 | ユーザーが共同編集 |

## 14. 実装前に必要な検討事項

以下はまだ完全には確定していない。

### 14.1 基本情報

- Authors / Publishers / Labels / Magazinesの詳細カラム
- 作品と著者の役割管理
- 作品と出版社などの関連付けの詳細
- 作品の連載期間の表現方法
- ユーザーの認証・権限管理

### 14.2 巻・話

- 巻数の表現方法
- 話の順序の具体的な管理方法
- 同じ話を複数巻に収録する場合の扱い
- 巻・話の論理削除方針

### 14.3 セクション

- JSONBの具体的なスキーマ
- バリデーション方式
- セクション削除後の復元方法
- 同時編集時の競合制御

### 14.4 口コミ

- 投稿制限の適用範囲
- 評価スコアの集計方法
- 削除済み口コミの復元方法

### 14.5 編集履歴・報告

- ポリモーフィック参照の整合性保証
- 履歴保存対象の追加・変更
- 報告対応者の権限
- 報告データの保存期間

### 14.6 データベース全般

- 各カラムの最終的な型・長さ
- NOT NULL制約
- CHECK制約
- UNIQUE制約
- インデックス
- ON DELETE / ON UPDATEの動作
- 論理削除と外部キーの整合性

---

# 15. 現在の進捗

| 項目 | 状態 |
|---|---|
| 対象ドメイン | 確定 |
| 主要エンティティ | 整理済み |
| 巻・話の管理方針 | 確定 |
| WorkSections | 仕様確定 |
| Tags | 仕様確定 |
| Reviews | 仕様確定 |
| EditHistories | 対象・保存方式確定 |
| Reports | 重複報告禁止を確定 |
| 全体ER構成 | 概念設計済み |
| 全カラムの物理設計 | 未実施 |
| PostgreSQL DDL | 未作成 |
| 実装 | 未開始 |

---

## 16. 今後の工程

1. 論理設計の最終レビュー
2. 全テーブルのカラム・データ型確定
3. 主キー・外部キー・各種制約の設計
4. インデックス設計
5. PostgreSQL DDL作成
6. マイグレーション設計
7. アプリケーション実装

**現時点では実装に進まず、論理設計の成果物として本書を管理する。**