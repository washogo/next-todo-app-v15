-- 既存のidカラムのデフォルト値をuuid_generate_v4()に設定
ALTER TABLE public.todos ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- 既存のidカラムにNOT NULL制約を追加
ALTER TABLE public.todos ALTER COLUMN id SET NOT NULL;