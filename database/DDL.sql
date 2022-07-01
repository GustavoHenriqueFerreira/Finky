CREATE DATABASE FINKY;

USE FINKY;

create table credito(
idCredito int primary key identity,
nomeCredito varchar(40) not null,
taxas SMALLMONEY,
tarifaAvalicao int,
);
GO

create table finacimento(
idFinaciamento int primary key identity,
idCredito INT FOREIGN KEY REFERENCES credito(idCredito),
valorEntrada int,
valorFinaciamento int,
parcela int,
prazo int,
taxas int,
);
GO