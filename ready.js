module.exports = client => {
    console.log(
        `${client.user.tag} bot online ${client.guilds.cache.size} servers, ${client.users.cache.size} membres!`
    );

    let activities = ["Beton armat"],
        i = 0;

    setInterval(
        () =>
        client.user.setPresence({
            activity: {
                name: `${activities[i++ % activities.length]}`,
                type: "WATCHING",
            },
        }),
        7000
    );
};