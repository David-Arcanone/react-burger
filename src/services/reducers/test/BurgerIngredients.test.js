import { burgerIngredientsReducer as reducer, initialState } from '../BurgerIngredients.ts';
import * as types from '../../constants/BurgerIngredients/BurgerIngredients';
const testArrayBuns = [{
    _id: "01",
    name: "food1",
    type: "bun",
    proteins: 1,
    fat: 11,
    carbohydrates: 111,
    calories: 111,
    price: 100,
    image: "pic01",
    image_mobile: "pic02m",
    image_large: "pic03l",
    __v: 1,
}, {
    _id: "02",
    name: "food2",
    type: "bun",
    proteins: 2,
    fat: 22,
    carbohydrates: 222,
    calories: 2222,
    price: 200,
    image: "pic11",
    image_mobile: "pic12m",
    image_large: "pic13l",
    __v: 2,
}];
const testArrayIngredients = [{
    _id: "11",
    name: "food11",
    type: "sauce",
    proteins: 3,
    fat: 33,
    carbohydrates: 333,
    calories: 3333,
    price: 300,
    image: "pic21",
    image_mobile: "pic22m",
    image_large: "pic23l",
    __v: 11,
}, {
    _id: "12",
    name: "food12",
    type: "main",
    proteins: 4,
    fat: 44,
    carbohydrates: 444,
    calories: 4444,
    price: 400,
    image: "pic31",
    image_mobile: "pic32m",
    image_large: "pic33l",
    __v: 12,
}];
const testArrayBuns2 = [{
    _id: "00",
    name: "food01",
    type: "bun",
    proteins: 7,
    fat: 77,
    carbohydrates: 777,
    calories: 7777,
    price: 700,
    image: "pic7",
    image_mobile: "pic7m",
    image_large: "pic73l",
    __v: 7,
}];
const testArrayIngredients2 = [
    {
        _id: "88",
        name: "food88",
        type: "sauce",
        proteins: 8,
        fat: 88,
        carbohydrates: 888,
        calories: 8888,
        price: 800,
        image: "pic28",
        image_mobile: "pic28m",
        image_large: "pic28l",
        __v: 88,
    },
    {
        _id: "99",
        name: "food99",
        type: "sauce",
        proteins: 9,
        fat: 99,
        carbohydrates: 999,
        calories: 9999,
        price: 900,
        image: "pic29",
        image_mobile: "pic29m",
        image_large: "pic29l",
        __v: 99,
    }
];
const testInitialState = {
    ingredients: [{ qty: 0, ingredientData: testArrayIngredients[0] }, { qty: 0, ingredientData: testArrayIngredients[1] }],
    buns: [{ qty: 2, ingredientData: testArrayBuns[0] }, { qty: 0, ingredientData: testArrayBuns[1] }],

    ingredientRequest: false,
    ingredientRequestFailed: false,
    bunsTabStatus: true,
    souceTabStatus: false,
    mainTabStatus: false,
    readyIngredients: true
}

describe('burgerIngredients reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('DOWNLOAD_INGREDIENTS_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.DOWNLOAD_INGREDIENTS_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                ingredientRequest: true,
            }
        )
    })

    it('DOWNLOAD_INGREDIENTS_SUCCES', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.DOWNLOAD_INGREDIENTS_SUCCES,
                payloadIngredients: testArrayIngredients,
                payloadBuns: testArrayBuns
            })
        ).toEqual(
            {
                ...initialState,
                ingredients: [{ qty: 0, ingredientData: testArrayIngredients[0] }, { qty: 0, ingredientData: testArrayIngredients[1] }],
                buns: [{ qty: 0, ingredientData: testArrayBuns[0] }, { qty: 0, ingredientData: testArrayBuns[1] }],

                readyIngredients: true
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    ingredientRequest: true,
                    readyIngredients: false
                },
                {
                    type: types.DOWNLOAD_INGREDIENTS_SUCCES,
                    payloadIngredients: testArrayIngredients2,
                    payloadBuns: testArrayBuns2
                }
            )
        ).toEqual({
            ...testInitialState,
            ingredients: [{ qty: 0, ingredientData: testArrayIngredients2[0] }, { qty: 0, ingredientData: testArrayIngredients2[1] }],
            buns: [{ qty: 0, ingredientData: testArrayBuns2[0] }],
        })
    })

    it('DOWNLOAD_INGREDIENTS_FAILED', () => {
        //добавление ингредиента в неинециализированный список не изменит ценник
        expect(
            reducer(undefined, {
                type: types.DOWNLOAD_INGREDIENTS_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                ingredientRequestFailed: true,
            }
        )
        expect(
            reducer(
                {
                    ...testInitialState,
                    ingredientRequest: true,
                },
                {
                    type: types.DOWNLOAD_INGREDIENTS_FAILED,
                }
            )
        ).toEqual({
            ...testInitialState,
            ingredientRequestFailed: true,
        })
    })

    it('INCREASE_INGREDIENT_AMOUNT', () => {
        expect(
            reducer(undefined, {
                type: types.INCREASE_INGREDIENT_AMOUNT,
                num: 0,
            })
        ).toEqual(
            initialState
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.INCREASE_INGREDIENT_AMOUNT,
                    num: 0,
                }
            )
        ).toEqual({
            ...testInitialState,
            ingredients: [{ qty: 1, ingredientData: testArrayIngredients[0] }, testInitialState.ingredients[1]]

        })
    })

    it('DECREASE_INGREDIENT_AMOUNT', () => {
        expect(
            reducer(undefined, {
                type: types.DECREASE_INGREDIENT_AMOUNT,
                _id: "11",
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    ingredients: [{ qty: 6, ingredientData: testArrayIngredients[0] }, testInitialState.ingredients[1]]
                },
                {
                    type: types.DECREASE_INGREDIENT_AMOUNT,
                    _id: "11",
                }
            )
        ).toEqual({
            ...testInitialState,
            ingredients: [{ qty: 5, ingredientData: testArrayIngredients[0] }, testInitialState.ingredients[1]]
        })
    })

    it('CHANGE_BUNS', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_BUNS,
                num: 0,
            })
        ).toEqual(initialState)

        expect(
            reducer(testInitialState,
                {
                    type: types.CHANGE_BUNS,
                    num: 1,
                }
            )
        ).toEqual({
            ...testInitialState,
            buns: [{ qty: 0, ingredientData: testArrayBuns[0] }, { qty: 2, ingredientData: testArrayBuns[1] }],
        })
    })

    it('REFRESH_TABS', () => {
        expect(
            reducer(undefined, {
                type: types.REFRESH_TABS,
                bunsTab: true,
                souceTab: false,
                mainTab: false
            })
        ).toEqual(
            {
                ...initialState,
                bunsTabStatus: true,
            }
        )
        expect(
            reducer(undefined, {
                type: types.REFRESH_TABS,
                bunsTab: false,
                souceTab: true,
                mainTab: false
            })
        ).toEqual(
            {
                ...initialState,
                souceTabStatus: true,
            }
        )
        expect(
            reducer(undefined, {
                type: types.REFRESH_TABS,
                bunsTab: false,
                souceTab: false,
                mainTab: true,
            })
        ).toEqual(
            {
                ...initialState,
                mainTabStatus: true,
            }
        )
        expect(
            reducer(
                {
                    ...testInitialState,
                    bunsTabStatus: false,
                    souceTabStatus: true,
                    mainTabStatus: true,
                },
                {
                    type: types.REFRESH_TABS,
                    bunsTab: true,
                    souceTab: false,
                    mainTab: false
                }
            )
        ).toEqual(testInitialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    mainTabStatus: true,
                },
                {
                    type: types.REFRESH_TABS,
                    bunsTab: false,
                    souceTab: true,
                    mainTab: false
                }
            )
        ).toEqual({
            ...testInitialState,
            bunsTabStatus: false,
            souceTabStatus: true,
            mainTabStatus: false,
        })

        expect(
            reducer(
                {
                    ...testInitialState,
                    souceTabStatus: true,
                    mainTabStatus: false,
                },
                {
                    type: types.REFRESH_TABS,
                    bunsTab: false,
                    souceTab: false,
                    mainTab: true
                }
            )
        ).toEqual({
            ...testInitialState,
            bunsTabStatus: false,
            mainTabStatus: true,
        })
    })

    it('CLEAN_SELECTED_INGREDIENTS', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAN_SELECTED_INGREDIENTS,
            })
        ).toEqual(initialState)

        expect(
            reducer({
                ...testInitialState,
                ingredients: [{ qty: 6, ingredientData: testArrayIngredients[0] }, { qty: 7, ingredientData: testArrayIngredients[1] }],
            },
                { type: types.CLEAN_SELECTED_INGREDIENTS }
            )
        ).toEqual({
            ...testInitialState,
            ingredients: [{ qty: 0, ingredientData: testArrayIngredients[0] }, { qty: 0, ingredientData: testArrayIngredients[1] }],
            buns: [{ qty: 0, ingredientData: testArrayBuns[0] }, testInitialState.buns[1]],
        })
    })
})