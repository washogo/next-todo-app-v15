-- profilesテーブルのidカラムの型をuuidに変更して、auth.usersテーブルのidカラムとリレーションを張る
alter table "public"."profiles" alter column "id" set data type uuid;
alter table "public"."profiles" alter column "id" set not null;
alter table "public"."profiles" add constraint fk_profiles_id foreign key ("id") references "auth"."users"("id");