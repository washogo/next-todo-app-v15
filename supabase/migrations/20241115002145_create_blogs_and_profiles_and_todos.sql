create table "public"."blogs" (
    "id" text not null,
    "content" text not null,
    "created_at" timestamp with time zone default now(),
    "image_url" text not null,
    "title" text not null,
    "user_id" text not null
);


create table "public"."profiles" (
    "id" text not null,
    "email" text not null,
    "avatar_url" text,
    "name" text
);


create table "public"."todos" (
    "id" text not null,
    "content" text not null,
    "title" text not null,
    "created_at" timestamp with time zone default now(),
    "status" text,
    "comment" text,
    "user_id" text not null
);


CREATE UNIQUE INDEX blogs_pkey ON public.blogs USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX todos_pkey ON public.todos USING btree (id);

alter table "public"."blogs" add constraint "blogs_pkey" PRIMARY KEY using index "blogs_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."todos" add constraint "todos_pkey" PRIMARY KEY using index "todos_pkey";

grant delete on table "public"."blogs" to "anon";

grant insert on table "public"."blogs" to "anon";

grant references on table "public"."blogs" to "anon";

grant select on table "public"."blogs" to "anon";

grant trigger on table "public"."blogs" to "anon";

grant truncate on table "public"."blogs" to "anon";

grant update on table "public"."blogs" to "anon";

grant delete on table "public"."blogs" to "authenticated";

grant insert on table "public"."blogs" to "authenticated";

grant references on table "public"."blogs" to "authenticated";

grant select on table "public"."blogs" to "authenticated";

grant trigger on table "public"."blogs" to "authenticated";

grant truncate on table "public"."blogs" to "authenticated";

grant update on table "public"."blogs" to "authenticated";

grant delete on table "public"."blogs" to "service_role";

grant insert on table "public"."blogs" to "service_role";

grant references on table "public"."blogs" to "service_role";

grant select on table "public"."blogs" to "service_role";

grant trigger on table "public"."blogs" to "service_role";

grant truncate on table "public"."blogs" to "service_role";

grant update on table "public"."blogs" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."todos" to "anon";

grant insert on table "public"."todos" to "anon";

grant references on table "public"."todos" to "anon";

grant select on table "public"."todos" to "anon";

grant trigger on table "public"."todos" to "anon";

grant truncate on table "public"."todos" to "anon";

grant update on table "public"."todos" to "anon";

grant delete on table "public"."todos" to "authenticated";

grant insert on table "public"."todos" to "authenticated";

grant references on table "public"."todos" to "authenticated";

grant select on table "public"."todos" to "authenticated";

grant trigger on table "public"."todos" to "authenticated";

grant truncate on table "public"."todos" to "authenticated";

grant update on table "public"."todos" to "authenticated";

grant delete on table "public"."todos" to "service_role";

grant insert on table "public"."todos" to "service_role";

grant references on table "public"."todos" to "service_role";

grant select on table "public"."todos" to "service_role";

grant trigger on table "public"."todos" to "service_role";

grant truncate on table "public"."todos" to "service_role";

grant update on table "public"."todos" to "service_role";


