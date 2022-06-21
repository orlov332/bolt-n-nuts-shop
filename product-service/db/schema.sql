-- Master username
-- postgres
-- Master password
-- JnJ4UcTXYezH14MIF9i1
-- Endpoint
-- bolt-n-nuts-products.c6dtehq3bdda.eu-west-1.rds.amazonaws.com


create database bolt_n_nuts;

create extension if not exists "uuid-ossp";

create table if not exists products
(
    id          uuid default uuid_generate_v4()
        constraint product_pk
            primary key,
    title       text not null,
    description text,
    price       decimal
);

create table if not exists stocks
(
    product_id uuid not null unique
        constraint stocks_pk
            primary key
        constraint stocks_products_id_fk
            references products,
    count      int  not null
);


