using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Finky.Domains;

#nullable disable

namespace Finky.Contexts
{
    public partial class FinkyContext : DbContext
    {
        public FinkyContext()
        {
        }

        public FinkyContext(DbContextOptions<FinkyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Credito> Creditos { get; set; }
        public virtual DbSet<Finacimento> Finacimentos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=.\\SqlExpress; Initial Catalog=Finky; Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Credito>(entity =>
            {
                entity.HasKey(e => e.IdCredito)
                    .HasName("PK__credito__1B07C6BBFADC4468");

                entity.ToTable("credito");

                entity.Property(e => e.IdCredito).HasColumnName("idCredito");

                entity.Property(e => e.NomeCredito)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("nomeCredito");

                entity.Property(e => e.TarifaAvalicao).HasColumnName("tarifaAvalicao");

                entity.Property(e => e.Taxas)
                    .HasColumnType("smallmoney")
                    .HasColumnName("taxas");
            });

            modelBuilder.Entity<Finacimento>(entity =>
            {
                entity.HasKey(e => e.IdFinaciamento)
                    .HasName("PK__finacime__AEB28A8FA8BCD6AA");

                entity.ToTable("finacimento");

                entity.Property(e => e.IdFinaciamento).HasColumnName("idFinaciamento");

                entity.Property(e => e.IdCredito).HasColumnName("idCredito");

                entity.Property(e => e.Parcela).HasColumnName("parcela");

                entity.Property(e => e.Prazo).HasColumnName("prazo");

                entity.Property(e => e.Taxas).HasColumnName("taxas");

                entity.Property(e => e.ValorEntrada).HasColumnName("valorEntrada");

                entity.Property(e => e.ValorFinaciamento).HasColumnName("valorFinaciamento");

                entity.HasOne(d => d.IdCreditoNavigation)
                    .WithMany(p => p.Finacimentos)
                    .HasForeignKey(d => d.IdCredito)
                    .HasConstraintName("FK__finacimen__idCre__38996AB5");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
