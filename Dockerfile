FROM mcr.microsoft.com/dotnet/sdk:6.0 as build

WORKDIR /src

COPY ./backend/backend.sln ./
RUN mkdir WhaleSpotting
COPY ./backend/WhaleSpotting/WhaleSpotting.csproj ./WhaleSpotting
RUN dotnet restore

COPY ./backend/WhaleSpotting ./WhaleSpotting
RUN dotnet build -o /app
RUN dotnet publish -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0 as base

COPY --from=build /publish /app

WORKDIR /app
EXPOSE 80
ENTRYPOINT ["./WhaleSpotting"]
