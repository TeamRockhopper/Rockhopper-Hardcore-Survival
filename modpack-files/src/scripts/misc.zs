// Make planks craftable from sticks.
recipes.addShaped(<minecraft:planks>,
 [[<minecraft:stick>, <minecraft:stick>],
  [<minecraft:stick>, <minecraft:stick>]]);

// Add a disk drive platter crafting recipe.
recipes.addShaped(<opencomputers:material:12>,
 [[null, <minecraft:iron_nugget>, null],
  [<minecraft:iron_nugget>, <minecraft:gold_nugget>, <minecraft:iron_nugget>],
  [null, <minecraft:iron_nugget>, null]]);

// Re-adds a recipe for the vanilla Minecraft shield to the game.
recipes.addShaped(<minecraft:shield>,
  [[<minecraft:planks>, <minecraft:iron_ingot>, <minecraft:planks>],
  [<minecraft:planks>, <minecraft:planks>, <minecraft:planks>],
   [<minecraft:planks>, <minecraft:planks>, <minecraft:planks>]]);

// Nerfs the recipe for hang glider wings.
recipes.removeShaped(<openglider:hang_glider_part>);
recipes.removeShaped(<openglider:hang_glider_part:1>);
recipes.addShaped(<openglider:hang_glider_part>,
	[[null, <ore:stickWood>, <ore:fabricHemp>],
	[<ore:stickWood>, <ore:fabricHemp>, <ore:fabricHemp>],
	[<ore:fabricHemp>, <ore:fabricHemp>, <ore:fabricHemp>]]);
recipes.addShaped(<openglider:hang_glider_part:1>,
	[[<ore:fabricHemp>, <ore:stickWood>, null],
	[<ore:fabricHemp>, <ore:fabricHemp>, <ore:stickWood>],
	[<ore:fabricHemp>, <ore:fabricHemp>, <ore:fabricHemp>]]);

// Nerfs the recipe for the ender staff.
recipes.removeShaped(<grapplemod:launcheritem>);
recipes.addShaped(<grapplemod:launcheritem>,
	[[<minecraft:ender_pearl>, <minecraft:ender_pearl>, <minecraft:ender_pearl>],
	[<minecraft:ender_pearl>, <thaumcraft:ingot>, <minecraft:ender_pearl>],
	[<minecraft:ender_pearl>, <minecraft:ender_pearl>, <minecraft:ender_pearl>]]);

// Tweak the crafting recipes for Minecraft leather armor.
recipes.removeShaped(<minecraft:leather_helmet>);
recipes.addShaped(<minecraft:leather_helmet>,
	[[<harvestcraft:hardenedleatheritem>, <harvestcraft:hardenedleatheritem>, <harvestcraft:hardenedleatheritem>],
	[<harvestcraft:hardenedleatheritem>, null, <harvestcraft:hardenedleatheritem>]]);
recipes.removeShaped(<minecraft:leather_chestplate>);
recipes.addShaped(<minecraft:leather_chestplate>,
	[[<harvestcraft:hardenedleatheritem>, null, <harvestcraft:hardenedleatheritem>],
	[<harvestcraft:hardenedleatheritem>, <harvestcraft:hardenedleatheritem>, <harvestcraft:hardenedleatheritem>],
	[<harvestcraft:hardenedleatheritem>, <harvestcraft:hardenedleatheritem>, <harvestcraft:hardenedleatheritem>]]);
recipes.removeShaped(<minecraft:leather_leggings>);
recipes.addShaped(<minecraft:leather_leggings>,
	[[<harvestcraft:hardenedleatheritem>, <harvestcraft:hardenedleatheritem>, <harvestcraft:hardenedleatheritem>],
	[<harvestcraft:hardenedleatheritem>, null, <harvestcraft:hardenedleatheritem>],
	[<harvestcraft:hardenedleatheritem>, null, <harvestcraft:hardenedleatheritem>]]);
recipes.removeShaped(<minecraft:leather_boots>);
recipes.addShaped(<minecraft:leather_boots>,
	[[<harvestcraft:hardenedleatheritem>, null, <harvestcraft:hardenedleatheritem>],
	[<harvestcraft:hardenedleatheritem>, null, <harvestcraft:hardenedleatheritem>]]);
