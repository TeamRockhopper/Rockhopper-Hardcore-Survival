import mods.immersiveengineering.MetalPress;
import mods.tconstruct.Casting;

// Vanilla golden pickaxe obtained via casting.
mods.tconstruct.Casting.addTableRecipe(<minecraft:golden_pickaxe>, <tconstruct:cast>.withTag({PartType: "tconstruct:pick_head"}), <liquid:gold>, 288, false, 200);

// Vanilla golden axe obtained via casting.
mods.tconstruct.Casting.addTableRecipe(<minecraft:golden_axe>, <tconstruct:cast>.withTag({PartType: "tconstruct:axe_head"}), <liquid:gold>, 288, false, 200);

// Vanilla golden shovel obtained via casting.
mods.tconstruct.Casting.addTableRecipe(<minecraft:golden_shovel>, <tconstruct:cast>.withTag({PartType: "tconstruct:shovel_head"}), <liquid:gold>, 288, false, 200);

// Vanilla golden sword obtained via casting.
mods.tconstruct.Casting.addTableRecipe(<minecraft:golden_sword>, <tconstruct:cast>.withTag({PartType: "tconstruct:sword_blade"}), <liquid:gold>, 288, false, 200);

// Thaumium sword is pressable using the IE metal press.
mods.immersiveengineering.MetalPress.addRecipe(<thaumcraft:thaumium_sword>, <thaumcraft:ingot>, <immersiveengineering:mold:2>, 500);

// Thaumium axe is pressable using the IE metal press.
mods.immersiveengineering.MetalPress.addRecipe(<thaumcraft:thaumium_axe>, <thaumcraft:ingot>, <immersiveengineering:mold:5>, 500);

// Thaumium shovel is pressable using the IE metal press.
mods.immersiveengineering.MetalPress.addRecipe(<thaumcraft:thaumium_shovel>, <thaumcraft:ingot>, <immersiveengineering:mold:1>, 500);

// Thaumium pickaxe is pressable using the IE metal press.
mods.immersiveengineering.MetalPress.addRecipe(<thaumcraft:thaumium_pick>, <thaumcraft:ingot>, <immersiveengineering:mold:4>, 500);

// Thaumium hoe is pressable using the IE metal press.
mods.immersiveengineering.MetalPress.addRecipe(<thaumcraft:thaumium_hoe>, <thaumcraft:ingot>, <immersiveengineering:mold:3>, 500);

// Faraday suit helmet can be cast from the smeltery.
mods.tconstruct.Casting.addTableRecipe(<immersiveengineering:faraday_suit_head>, <tconstruct:cast>.withTag({PartType: "conarm:helmet_core"}), <liquid:aluminum>, 864, false, 200);

// Faraday suit chestplate can be cast from the smeltery.
mods.tconstruct.Casting.addTableRecipe(<immersiveengineering:faraday_suit_chest>, <tconstruct:cast>.withTag({PartType: "conarm:chest_core"}), <liquid:aluminum>, 1152, false, 200);

// Faraday suit leggings can be cast from the smeltery.
mods.tconstruct.Casting.addTableRecipe(<immersiveengineering:faraday_suit_legs>, <tconstruct:cast>.withTag({PartType: "conarm:leggings_core"}), <liquid:aluminum>, 1008, false, 200);

// Faraday suit boots can be cast from the smeltery.
mods.tconstruct.Casting.addTableRecipe(<immersiveengineering:faraday_suit_feet>, <tconstruct:cast>.withTag({PartType: "conarm:boots_core"}), <liquid:aluminum>, 576, false, 200);
