using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IInteractionService
{
    public Interaction Create(InteractionRequest newInteractionRequest, int userId);
}

public class InteractionService : IInteractionService
{
    private readonly IInteractionRepo _interactions;

    public InteractionService(IInteractionRepo interactions)
    {
        _interactions = interactions;
    }

    public Interaction Create(InteractionRequest newInteractionRequest, int userId)
    {
        return _interactions.Create(newInteractionRequest, userId);
    }
}
