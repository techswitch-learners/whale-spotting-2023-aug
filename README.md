# Whale Spotting

## Local setup

Inside the root folder, run `npm install`.

## Backend

Install the following tools:

```bash
dotnet tool install dotnet-ef --global
dotnet tool install csharpier --global
```

## Database

Using pgAdmin, create a database called `WhaleSpotting`, owned by user `WhaleSpotting` (which should have password `WhaleSpotting` and should be able to log in).

Inside the backend `WhaleSpotting` folder, run `dotnet ef database update`.

## Frontend

Run `npm install`.
