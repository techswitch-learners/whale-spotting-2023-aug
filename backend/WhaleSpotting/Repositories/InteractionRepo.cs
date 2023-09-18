using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Repositories;

public interface IInteractionRepo
{
    Interaction Create(CreateInteractionRequest createInteractionRequest, int userId);
}

public class InteractionRepo : IInteractionRepo
{
    private readonly WhaleSpottingContext _context;

    public InteractionRepo(WhaleSpottingContext context)
    {
        _context = context;
    }

    public Interaction Create(CreateInteractionRequest createInteractionRequest, int userId)
    {
        var existingInteractions = _context.Interactions.Where(
            interaction =>
                interaction.PostId == createInteractionRequest.PostId
                && interaction.UserId == userId
        );

        if (existingInteractions.Any())
        {
            throw new ArgumentException("Post already interacted with");
        }

        var newInteraction = new Interaction
        {
            PostId = createInteractionRequest.PostId,
            UserId = userId,
        };

        var insertedEntity = _context.Interactions.Add(newInteraction);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }
}
