--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Homebrew)
-- Dumped by pg_dump version 16.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    name text NOT NULL,
    price double precision NOT NULL,
    description text,
    quantity integer,
    image text,
    id integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (name, price, description, quantity, image, id) FROM stdin;
Produk satu	300000	ini ptoduk tadinya mahal	50	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3erm4JDadaBHsmNK6pYivfw4WCqegiYG-0w&usqp=CAU	1
Produk satu	300000	ini ptoduk mahal	50	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3erm4JDadaBHsmNK6pYivfw4WCqegiYG-0w&usqp=CAU	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role) FROM stdin;
1	admin	admin@makeitsg.com	$2a$12$iYevwh1XX0tQqzwKVMGFYOw71LfNa53Ana2FTFowYk.OB7GUNjLnm	edit
2	user	user@makeitsg.com	$2a$12$iYevwh1XX0tQqzwKVMGFYOw71LfNa53Ana2FTFowYk.OB7GUNjLnm	view
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 2, true);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

