﻿using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IPostService
{
    Task<Post> Create(CreatePostRequest createPostRequest, int userId);
    Post GetById(int id);
    List<Post> GetPending();
    void ApproveOrReject(int id, ApprovalStatus approvalStatus);
    List<Post> Search(SearchPostsRequest searchPostsRequest);
    void Modify(int id, ModifyPostRequest modifyPostRequest, int userId, Role userRole);
    List<Post> GetAll();
    List<Post> GetLatest();
}

public class PostService : IPostService
{
    private readonly IPostRepo _posts;

    public PostService(IPostRepo posts)
    {
        _posts = posts;
    }

    public async Task<Post> Create(CreatePostRequest createPostRequest, int userId)
    {
        return await _posts.Create(createPostRequest, userId);
    }

    public Post GetById(int id)
    {
        return _posts.GetById(id);
    }

    public List<Post> GetPending()
    {
        return _posts.GetPending();
    }

    public void ApproveOrReject(int id, ApprovalStatus approvalStatus)
    {
        _posts.ApproveOrReject(id, approvalStatus);
    }

    public void Modify(int id, ModifyPostRequest modifyPostRequest, int userId, Role userRole)
    {
        _posts.Modify(id, modifyPostRequest, userId, userRole);
    }

    public List<Post> Search(SearchPostsRequest searchPostsRequest)
    {
        return _posts.Search(searchPostsRequest);
    }

    public List<Post> GetAll()
    {
        return _posts.GetAll();
    }

    public List<Post> GetLatest()
    {
        return _posts.GetLatest();
    }
}
