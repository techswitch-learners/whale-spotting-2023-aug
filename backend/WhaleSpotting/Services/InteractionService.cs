using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IInteractionService
{
    Interaction Create(CreateInteractionRequest createInteractionRequest, int userId);
}

public class InteractionService : IInteractionService
{
    private readonly IInteractionRepo _interactions;

    public InteractionService(IInteractionRepo interactions)
    {
        _interactions = interactions;
    }

    public Interaction Create(CreateInteractionRequest createInteractionRequest, int userId)
    {
        return _interactions.Create(createInteractionRequest, userId);
    }
}
