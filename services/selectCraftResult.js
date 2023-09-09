import { CraftResult } from "../data/CraftResult.js";

const rand = (m, M) => Math.round(Math.random() * (M - m) + m)


export default function selectCraftResult(SelectedList) {
    const ingredientKey = SelectedList.length.toString();
    let craftPossibility = CraftResult
    let SelectedCombination = calculateAllCombinations(SelectedList)
    // console.log(SelectedCombination)

    for (let i = 0; i < craftPossibility.length; i++) {

        // console.log("currently testing" + craftPossibility[i]["name"])
        // console.log(craftPossibility[i]["ingredients"][ingredientKey])
        if (craftPossibility[i]["ingredients"][ingredientKey]) {

            let ingredientMatrix = craftPossibility[i]["ingredients"][ingredientKey]

            if (isSelected_Matching_IngredientMatrix(ingredientMatrix, SelectedCombination)) {
                // The craft is matching
                return(
                    {
                        "img": craftPossibility[i]["img"],
                        "price": craftPossibility[i]["base_price"] * SelectedList.length,
                        "name": craftPossibility[i]["name"],
                        "position": i
                    }
                )
            }
        }
    }
}


function isSelected_Matching_IngredientMatrix(ingredientMatrix, SelectedCombination) {
    for (let i = 0; i < SelectedCombination.length; i++) {
        if (isListInIngredientList(ingredientMatrix, SelectedCombination[i])) {
            return true
        }
    }
    return false
}

function isListInIngredientList(ingredientMatrix, SelectedList) {
    for (let i = 0; i < SelectedList.length; i++) {
        if (!isItemInList(ingredientMatrix[i], SelectedList[i])) {
            return false
        }
    }
    return true
}

function isItemInList(IngredientList, item) {
    if (IngredientList.length == 1 && IngredientList[0] == "any") {
        return true
    } else {
         return IngredientList.includes(item.name)
    }
}


function combinations(array) {
    return new Array(1 << array.length).fill().map(
        (e1, i) => array.filter((e2, j) => i & 1 << j));
    }

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;
    
    while (i < length) {
        if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
        } else {
        c[i] = 0;
        ++i;
        }
    }
    return result;
    }

function calculateAllCombinations(myArray) {
    let ArrayLength = myArray.length
    var allValues = combinations(myArray)

    var response = allValues

    for(let v of allValues) {
        response = response.concat(permute(v))
    }

    //Return removed duplicates
    return Array.from(new Set(response.map(JSON.stringify)), JSON.parse).filter((val) => val.length == ArrayLength);

}