using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting;
using WhaleSpotting.Repositories;
using WhaleSpotting.Services;

var builder = WebApplication.CreateBuilder(args);

const string allowAllCorsPolicy = "_allowAll";
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: allowAllCorsPolicy,
        corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );
});

// Controllers
builder.Services
    .AddControllers()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Services
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IPostService, PostService>();
builder.Services.AddTransient<IBodyOfWaterService, BodyOfWaterService>();
builder.Services.AddTransient<ISpeciesService, SpeciesService>();

// Repositories
builder.Services.AddTransient<IUserRepo, UserRepo>();
builder.Services.AddTransient<IPostRepo, PostRepo>();
builder.Services.AddTransient<IBodyOfWaterRepo, BodyOfWaterRepo>();
builder.Services.AddTransient<ISpeciesRepo, SpeciesRepo>();

// Context
builder.Services.AddDbContext<WhaleSpottingContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("WhaleSpottingDatabase"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allowAllCorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
