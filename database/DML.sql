USE FINKY;

INSERT INTO credito (nomeCredito, taxas, tarifaAvalicao)
VALUES	
		('Caixa', 8.99, 800),
		('Santader', 9.49, 700),
		('Itaú', 9.70, 600),
		('Bradesco', 9.90, 500);
GO

SELECT * FROM credito;

INSERT INTO finacimento(idCredito, valorEntrada, valorFinaciamento, parcela, taxas, prazo)
VALUES	
		(1, 100000, 500000, 2000, 5, 25);
GO

SELECT * FROM finacimento;