﻿using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request;

public class CreateUserRequest
{
    [MinLength(1)]
    [MaxLength(15)]
    public string Username { get; set; } = null!;

    [MinLength(8)]
    public string Password { get; set; } = null!;

    [EmailAddress]
    public string Email { get; set; } = null!;

    [MinLength(2)]
    public string Name { get; set; } = null!;

    [Url]
    public string ProfileImageUrl { get; set; } = null!;
}
