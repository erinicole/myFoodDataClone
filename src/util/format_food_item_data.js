import _ from "lodash";

function formatFoodItemData(foodItemData) {
  const nutritionFactTable = calculateNutritionalFactTable(foodItemData);

  return {
    ...foodItemData,
    id: foodItemData.ndbstring,
    name: foodItemData.names[0],
    nutritionFactTable,
  };
}

function calculateNutritionalFactTable(foodItemData) {
  const nutritionFactsByKey = nutritionFactsFromFoodData(foodItemData);

  return {
    calories: nutritionFactsByKey("ENERC_KCAL", 2000),
    totalFat: nutritionFactsByKey("FAT", 65),
    saturatedFat: nutritionFactsByKey("FASAT", 20),
    transFat: nutritionFactsByKey("FATRN"),
    cholesterol: nutritionFactsByKey("CHOLE", 300),
    sodium: nutritionFactsByKey("NA", 2400),
    totalCarbohydrates: nutritionFactsByKey("CHOCDF", 300),
    fiber: nutritionFactsByKey("FIBTG", 25),
    sugar: nutritionFactsByKey("SUGAR", 50),
    addedSugar: nutritionFactsByKey("ADD_SG", 50),
    protein: nutritionFactsByKey("PROCNT", 50),
    vitaminC: nutritionFactsByKey("VITC", 90),
    vitaminD: nutritionFactsByKey("VITD", 20),
    iron: nutritionFactsByKey("FE", 18),
    calcium: nutritionFactsByKey("CA", 1300),
    potassium: nutritionFactsByKey("K", 4700),
    phosphorus: nutritionFactsByKey("P", 1250),
  };
}

const missingData = { value: "~", percentage: "~" };

function nutritionFactsFromFoodData(foodItemData) {
  const { selectedQuantity, selectedWeightIndex } = foodItemData;
  const ratio = _.toNumber(foodItemData.wt_arr[selectedWeightIndex]) / 100;

  return (key, dailyValue = 1) => {
    if (!foodItemData[key][0]) return missingData;

    const base = _.toNumber(foodItemData[key]) * ratio * selectedQuantity;

    return {
      value: Math.round((base * 10) / 10),
      percentage: Math.round((base / (1.0 * dailyValue)) * 100),
    };
  };
}

export default formatFoodItemData;
