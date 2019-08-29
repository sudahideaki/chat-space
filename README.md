# chat spase DB設計

# usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|
|email|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

# groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :groups_users
- has_many :messages
has_many :groups_users

# groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false|
|group_id|references|null: false|

### Association
- belongs_to :group
- belongs_to :user

# messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user