using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Repositories;

public interface IInteractionRepo
{
    Interaction Create(InteractionRequest newInteractionRequest, int userId);
}

public class InteractionRepo : IInteractionRepo
{
    private readonly WhaleSpottingContext _context;

    public InteractionRepo(WhaleSpottingContext context)
    {
        _context = context;
    }

    public Interaction Create(InteractionRequest newInteractionRequest, int userId)
    {
        var newInteraction = new Interaction
        {
            PostId = newInteractionRequest.Postid,
            UserId = userId,
        };

        var insertedEntity = _context.Interactions.Add(newInteraction);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }
}
