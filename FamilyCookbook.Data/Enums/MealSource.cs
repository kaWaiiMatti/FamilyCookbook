namespace FamilyCookbook.Data.Enums;

/// <summary>
/// Who and where made the food and where was it stored
/// </summary>
public enum MealSource
{
    /// <summary>
    /// Self-made
    /// </summary>
    SelfMade = 20,

    /// <summary>
    /// Someone else made it
    /// </summary>
    MadeByOthers = 40,

    /// <summary>
    /// Bought from grocery store and requires nothing else than heating
    /// </summary>
    ReadyMade = 60,

    /// <summary>
    /// Food from restaurant that's either delivered or picked up
    /// </summary>
    RestaurantPickUp = 80,

    /// <summary>
    /// Eat in a restaurant
    /// </summary>
    RestaurantDineIn = 100,
}
