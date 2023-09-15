using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

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
        var existingInteractions = _context.Interactions.Where(
            interaction =>
                interaction.PostId == newInteractionRequest.PostId && interaction.UserId == userId
        );
        if (!existingInteractions.Any())
        {
            var newInteraction = new Interaction
            {
                PostId = newInteractionRequest.PostId,
                UserId = userId,
            };

            var insertedEntity = _context.Interactions.Add(newInteraction);
            _context.SaveChanges();

            return insertedEntity.Entity;
        }
        throw new ArgumentException("Post already liked");
    }
}
