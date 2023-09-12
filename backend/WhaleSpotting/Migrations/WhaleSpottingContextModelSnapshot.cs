﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WhaleSpotting;

#nullable disable

namespace WhaleSpotting.Migrations
{
    [DbContext(typeof(WhaleSpottingContext))]
    partial class WhaleSpottingContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.21")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("WhaleSpotting.Models.Database.BodyOfWater", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("BodiesOfWater");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("Duration")
                        .HasColumnType("integer");

                    b.Property<string>("EventImageUrl")
                        .HasColumnType("text");

                    b.Property<string>("EventLink")
                        .HasColumnType("text");

                    b.Property<string>("Location")
                        .HasColumnType("text");

                    b.Property<DateOnly?>("StartDate")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Interaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("PostId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Interaction");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("ApprovalStatus")
                        .HasColumnType("integer");

                    b.Property<int?>("BodyOfWaterId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("text");

                    b.Property<double?>("Latitude")
                        .HasColumnType("double precision");

                    b.Property<double?>("Longitude")
                        .HasColumnType("double precision");

                    b.Property<int?>("Rating")
                        .HasColumnType("integer");

                    b.Property<int?>("SpeciesId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("Timestamp")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.Property<int?>("WhaleTagNumber")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("BodyOfWaterId");

                    b.HasIndex("SpeciesId");

                    b.HasIndex("UserId");

                    b.HasIndex("WhaleTagNumber");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Species", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("LatinName")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Species");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreationTimestamp")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("ProfileImageUrl")
                        .HasColumnType("text");

                    b.Property<int?>("Rating")
                        .HasColumnType("integer");

                    b.Property<int?>("Role")
                        .HasColumnType("integer");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Whale", b =>
                {
                    b.Property<int>("TagNumber")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TagNumber"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("SpeciesId")
                        .HasColumnType("integer");

                    b.HasKey("TagNumber");

                    b.HasIndex("SpeciesId");

                    b.ToTable("Whales");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Interaction", b =>
                {
                    b.HasOne("WhaleSpotting.Models.Database.Post", "Post")
                        .WithMany("Likes")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WhaleSpotting.Models.Database.User", "User")
                        .WithMany("PostUserLiked")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Post", b =>
                {
                    b.HasOne("WhaleSpotting.Models.Database.BodyOfWater", "BodyOfWater")
                        .WithMany("Posts")
                        .HasForeignKey("BodyOfWaterId");

                    b.HasOne("WhaleSpotting.Models.Database.Species", "Species")
                        .WithMany()
                        .HasForeignKey("SpeciesId");

                    b.HasOne("WhaleSpotting.Models.Database.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId");

                    b.HasOne("WhaleSpotting.Models.Database.Whale", "Whale")
                        .WithMany("Posts")
                        .HasForeignKey("WhaleTagNumber");

                    b.Navigation("BodyOfWater");

                    b.Navigation("Species");

                    b.Navigation("User");

                    b.Navigation("Whale");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Whale", b =>
                {
                    b.HasOne("WhaleSpotting.Models.Database.Species", "Species")
                        .WithMany("Whales")
                        .HasForeignKey("SpeciesId");

                    b.Navigation("Species");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.BodyOfWater", b =>
                {
                    b.Navigation("Posts");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Post", b =>
                {
                    b.Navigation("Likes");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Species", b =>
                {
                    b.Navigation("Whales");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.User", b =>
                {
                    b.Navigation("PostUserLiked");

                    b.Navigation("Posts");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Whale", b =>
                {
                    b.Navigation("Posts");
                });
#pragma warning restore 612, 618
        }
    }
}
