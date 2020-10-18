// Add a recipe for filling glass bottles from a bucket.
recipes.addShapeless("Fill Awkward Potion Bottles", <minecraft:potion>.withTag({Potion: "minecraft:awkward"}) * 4, [<forge:bucketfilled>.withTag({FluidName: "potion", Amount: 1000, Tag: {Potion: "minecraft:awkward"}}), <minecraft:glass_bottle>, <minecraft:glass_bottle>, <minecraft:glass_bottle>, <minecraft:glass_bottle>]);
