-- profilesテーブルのidカラムの型をuuidに変更して、auth.usersテーブルのidカラムとリレーションを張る
alter table "public"."profiles" alter column "id" type uuid using "id"::uuid;