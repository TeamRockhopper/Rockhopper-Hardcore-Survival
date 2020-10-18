import mods.immersiveengineering.Crusher;

// Remove copper grit and make copper grit obtainable from the ore and clusters.
Crusher.removeRecipe(<immersiveengineering:metal:9>);
Crusher.addRecipe(<immersiveengineering:metal:9> * 2, <ore:oreCopper>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:9> * 2, <ore:clusterCopper>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:9>, <ore:orePoorCopper>, 8000, null, 0);

// Remove iron grit and make iron grit obtainable from the ore and clusters.
Crusher.removeRecipe(<immersiveengineering:metal:18>);
Crusher.addRecipe(<immersiveengineering:metal:18> * 2, <ore:oreIron>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:18> * 2, <ore:clusterIron>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:18>, <ore:orePoorIron>, 8000, null, 0);

// Remove gold grit and make gold grit obtainable from the ore and clusters.
Crusher.removeRecipe(<immersiveengineering:metal:19>);
Crusher.addRecipe(<immersiveengineering:metal:19> * 2, <ore:oreGold>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:19> * 2, <ore:clusterGold>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:19>, <ore:orePoorGold>, 8000, null, 0);

// Remove tin grit and make tin grit obtainable from the ore and clusters.
Crusher.removeRecipe(<mekanism:dust:4>);
Crusher.addRecipe(<mekanism:dust:4> * 2, <ore:oreTin>, 8000, null, 0);
Crusher.addRecipe(<mekanism:dust:4> * 2, <ore:clusterTin>, 8000, null, 0);
Crusher.addRecipe(<mekanism:dust:4>, <ore:orePoorTin>, 8000, null, 0);

// Remove lead grit and make lead grit obtainable from the ore and clusters.
Crusher.removeRecipe(<immersiveengineering:metal:11>);
Crusher.addRecipe(<immersiveengineering:metal:11> * 2, <ore:oreLead>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:11> * 2, <ore:clusterLead>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:11>, <ore:orePoorLead>, 8000, null, 0);

// Remove aluminum grit and make aluminum grit obtainable from the ore and clusters.
Crusher.removeRecipe(<immersiveengineering:metal:10>);
Crusher.addRecipe(<immersiveengineering:metal:10> * 2, <ore:clusterAluminium>, 8000);
Crusher.addRecipe(<immersiveengineering:metal:10> * 2, <ore:oreAluminum>, 8000);

// Remove silver grit and make silver grit obtainable from the ore and clusters.
Crusher.removeRecipe(<immersiveengineering:metal:12>);
Crusher.addRecipe(<immersiveengineering:metal:12> * 2, <ore:oreSilver>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:12> * 2, <ore:clusterSilver>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:12>, <ore:orePoorSilver>, 8000, null, 0);

// Remove nickel grit and make nickel grit obtainable from the ore and clusters.
Crusher.removeRecipe(<immersiveengineering:metal:13>);
Crusher.addRecipe(<immersiveengineering:metal:13> * 2, <ore:oreNickel>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:13> * 2, <ore:clusterNickel>, 8000, null, 0);
Crusher.addRecipe(<immersiveengineering:metal:13>, <ore:orePoorNickel>, 8000, null, 0);

// There is no zinc grit to remove or clusters. Make the ingots obtainable from the ore.
Crusher.addRecipe(<railcraft:ingot:8> * 2, <ore:oreZinc>, 8000, null, 0);
Crusher.addRecipe(<railcraft:ingot:8>, <ore:orePoorZinc>, 8000, null, 0);
