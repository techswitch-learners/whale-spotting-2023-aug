﻿using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class PostsResponse
{
    public List<PostResponse> Posts { get; set; }

    public PostsResponse(List<Post> posts)
    {
        Posts = posts.Select(post => new PostResponse(post)).ToList();
    }
}