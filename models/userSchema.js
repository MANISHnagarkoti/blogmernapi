const moongos = require("mongoose")


const userSchema = new moongos.Schema({


    name: {
        type: String,
        require: [true, "user name is required"]
    },

    email: {
        type: String,
        require: [true, "user email is required"]
    },
    profileImg: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAACUCAMAAADxqtj8AAAAM1BMVEXk5ueutLfn6erq7O2rsbWor7K1ur3h4+TIzM7P0tTS1dfX2tvb3t+xt7q+w8W6v8Kjqa31llKqAAAElklEQVR4nO2c25ajIBBFpQABRfD/v3Ywk3QunY4CpYes5X6Y6cctKYoSKLvu5OTk5OTk5OTk5ORkBaL0j1m4/v01JFvjx8HZkLB2GL35miegzrsQJqW1upD+n6J1/hv8pXFhEko8o5Tog+sk2u4zkuxv9dsTCGFl0/5W/6F+fQBtu0bjh7ph0p/cF/Q0NOlPPnwc958ZEHx7+nLot8gv/v3YWvST/WuyvtEXrrHR3xQ1d3/bkr4Jq9P1Gd2Sfq58S/qUL9+OvrRZMf9DE1OXhiL3xIjXJ781z7+ieo+Wz82Vj+iAdidXLJ/0B3DsmHL3Bay9LEmWd1TAVjxz3dgL5MSVsVJeBFzskK+Ysv+ZcEmfyrPlDVy1SaavlU9LlkHZu2r5pA8LnfrAWZImxj1VOPXyad6C7AeGoU/lwojRL6zrX+0txr56qfrPBKkWDMvQCzFDko6vrXGuaEitM1SVlw/2kCqfZ9IuxQIg8GXgkRciIuxZ1qqFHmHPJQ9JmZIp7JM9YNZKppQjIO/mX27PFjnfbQ+J++/OmJFr8BGrFcOGwhXIhprjqtIcwv67K2TDNPYzQr7rJh57hdlHZpq2oI1YnmmrB4g8eQ55oUAbmYZjvULtBHbE8WarHcp+ZMg6E+6uUX3owAKn5pD/DvDIlqqr5AhzXwa/NuVDT8vlVBf5PfSwnMaqwZ/Bt0Sqcj76oD8tuOUTV4GOrB6oyZqgE6snigtl0IHVC2Wxo5Cp/gEqsscH/ZWCC1JKoKXvjLmLlgKWlr+gMe9ao+obkk9k3cpUsS35rMvI+HuYv5Ebb+soAdn5W0P6oFbDR4noW5S/NP30nzuWhI6Y3ZtNkHEfmpaU7gfT2HR9wQz9/PYBdHJHy61DsrNL5XOfA5e/Jmtk2+N+Q0oz2Bj7G9EOpu0Owxco2Ro/JrxJT/Mdo36Dkv0D9A29td0SNGmcL33NNoS4cGlvdsNolgdC632AaAn3a1Pzc65cWpwvDcK+vQ5P6ozxLvR6Xlms0jPMKtjRNNNnntRHm8xXxJ8yv0hZyBv4AxClMY9iu/ntR9CqT78BstE8rUsu9mK9NPvjCdTUW49KpqmmFNubat8/QHrLcnT4D5AGzE0zzz1kbY/dzaRutOsN8JtRKhxXe6aZGioj5o2/O2YhkCZUbtq/9RfR7Z9BKaf9Pdd/73dGGhRfvP9Cxz2Hn3zc0V1c9hv2mr5k9gqaR/+wTweT9GzX6D7qT3t0v8lh/4G/+kfu5El8NwA36DO3TtIxUfOjrzgvjuRucNfD+JWg40L+jgpM+gh5Nv2qbw6g9VHyLIcUHBeIyvUrB588IuZ/9OuWXTI7lPIZqKpDIjp0kXpHxap7ZHnwnopTaVy6edAvTjzm6PrgrX7hB5rwcfOfslvWft+3wK2oopYgxl62OnRB3in9jtgOFPTCGaauEg6yJ660aOU7KmZOXGLpa2Aj87ZyCwvVHRXyBt80kutv5N079Q3NWZH9pRSuDkgu+iz7puasyO2kbEw+7y2rridgDzK6t1nawHiZt9vLtjLOQkaPh2TqWmZEZdxpay7s//jIzj/i5D3e+4iy3QAAAABJRU5ErkJggg=="
    },
    publicId: {
        type: String,
    },
    password: {
        type: String,
        require: [true, "password required"]

    }, blogs: [
        {
            type: moongos.Types.ObjectId,
            ref: "Blog",
        }
    ]

}, { timestamps: true })


const UserSchema = moongos.model("User", userSchema)


module.exports = UserSchema
