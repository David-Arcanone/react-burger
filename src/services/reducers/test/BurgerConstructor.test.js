import { burgerConstructorReducer as reducer } from '../BurgerConstructor.ts';
import * as types from '../../constants/BurgerConstructor/BurgerConstructor';
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
]

describe('BurgerConstructor reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            bunsMenu: [],
            ingredientsMenu: [],
            orderBun: 0,
            orderIngredients: [],
            totalPrice: 0,
            ready: false,
        })
    })

    it('INIT_CONSTRUCTOR_LIBRARY', () => {
        expect(
            reducer(undefined, {
                type: types.INIT_CONSTRUCTOR_LIBRARY,
                payloadIngredients: testArrayIngredients,
                payloadBuns: testArrayBuns,
            })
        ).toEqual(
            {
                bunsMenu: testArrayBuns,
                ingredientsMenu: testArrayIngredients,
                orderBun: 0,
                orderIngredients: [],
                totalPrice: 0,
                ready: true,
            }
        )

        expect(
            reducer(
                {
                    bunsMenu: testArrayBuns,
                    ingredientsMenu: testArrayIngredients,
                    orderBun: 1,
                    orderIngredients: [],
                    totalPrice: 10,
                    ready: false,
                }
                ,
                {
                    type: types.INIT_CONSTRUCTOR_LIBRARY,
                    payloadBuns: testArrayBuns2,
                    payloadIngredients: testArrayIngredients2,
                }
            )
        ).toEqual({
            bunsMenu: testArrayBuns2,
            ingredientsMenu: testArrayIngredients2,
            orderBun: 1,
            orderIngredients: [],
            totalPrice: 10,
            ready: true,
        })
    })

    it('DELETE_INGREDIENT_FROM_CONSTRUCTOR', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.DELETE_INGREDIENT_FROM_CONSTRUCTOR,
                deletedIngredientType: 1,
                uuid: "1",
            })
        ).toEqual(
            {
                bunsMenu: [],
                ingredientsMenu: [],
                orderBun: 0,
                orderIngredients: [],
                totalPrice: 0,
                ready: false,
            }
        )
        //проверка удаления
        expect(
            reducer(
                {
                    bunsMenu: testArrayBuns,
                    ingredientsMenu: testArrayIngredients,
                    orderBun: 1,
                    orderIngredients: [{ uuid: "1", ingredientType: 1 }, { uuid: "0", ingredientType: 0 }],
                    totalPrice: 10000,
                    ready: true,
                },
                {
                    type: types.DELETE_INGREDIENT_FROM_CONSTRUCTOR,
                    deletedIngredientType: 1,
                    uuid: "1",
                }
            )
        ).toEqual({
            bunsMenu: testArrayBuns,
            ingredientsMenu: testArrayIngredients,
            orderBun: 1,
            orderIngredients: [{ uuid: "0", ingredientType: 0 }],
            totalPrice: 9600,
            ready: true,
        })
    })

    it('ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
        //добавление ингредиента в неинециализированный список не изменит ценник
        expect(
            reducer(undefined, {
                type: types.ADD_INGREDIENT_TO_CONSTRUCTOR,
                menuIndex: 1,
                uuid: "1",
            })
        ).toEqual(
            {
                bunsMenu: [],
                ingredientsMenu: [],
                orderBun: 0,
                orderIngredients: [{ ingredientType: 1, uuid: "1" }],
                totalPrice: 0,
                ready: false,
            }
        )
        //проверка добавления в существующий список заказа
        expect(
            reducer(
                {
                    bunsMenu: testArrayBuns,
                    ingredientsMenu: testArrayIngredients,
                    orderBun: 1,
                    orderIngredients: [{ uuid: "1", ingredientType: 1 }, { uuid: "2", ingredientType: 2 }],
                    totalPrice: 10000,
                    ready: true,
                },
                {
                    type: types.ADD_INGREDIENT_TO_CONSTRUCTOR,
                    menuIndex: 0,
                    uuid: "11",
                }
            )
        ).toEqual({
            bunsMenu: testArrayBuns,
            ingredientsMenu: testArrayIngredients,
            orderBun: 1,
            orderIngredients: [{ uuid: "1", ingredientType: 1 }, { uuid: "2", ingredientType: 2 }, { uuid: "11", ingredientType: 0 }],
            totalPrice: 10300,
            ready: true,
        })
    })

    it('CHANGE_ORDER_BUN', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_ORDER_BUN,
                menuIndex: 0,
            })
        ).toEqual(
            {
                bunsMenu: [],
                ingredientsMenu: [],
                orderBun: 1,
                orderIngredients: [],
                totalPrice: 0,
                ready: false,
            }
        )

        expect(
            reducer(
                {
                    bunsMenu: testArrayBuns,
                    ingredientsMenu: testArrayIngredients,
                    orderBun: 2,
                    orderIngredients: [],
                    totalPrice: 10000,
                    ready: true,
                },
                {
                    type: types.CHANGE_ORDER_BUN,
                    menuIndex: 0,
                }
            )
        ).toEqual({
            bunsMenu: testArrayBuns,
            ingredientsMenu: testArrayIngredients,
            orderBun: 1,
            orderIngredients: [],
            totalPrice: 9800,
            ready: true,
        })
    })

    it(' MOVE_INGREDIENT', () => {
        //проверять на пустом смысла нет, надо что-то двигать, а не пустоту
        expect(
            reducer(undefined, {
                type: types.MOVE_INGREDIENT,
                newIndex: 0,
                oldIndex: 2,
            })
        ).toEqual(
            {
                bunsMenu: [],
                ingredientsMenu: [],
                orderBun: 0,
                orderIngredients: [],
                totalPrice: 0,
                ready: false,
            }
        )
        expect(
            reducer(
                {
                    bunsMenu: [],
                    ingredientsMenu: [],
                    orderBun: 0,
                    orderIngredients: [{ uuid: "1", ingredientType: 1 }, { uuid: "2", ingredientType: 2 }, { uuid: "3", ingredientType: 3 }, { uuid: "4", ingredientType: 4 }],
                    totalPrice: 0,
                    ready: true,
                },
                {
                    type: types.MOVE_INGREDIENT,
                    newIndex: 0,
                    oldIndex: 2,
                }
            )
        ).toEqual({
            bunsMenu: [],
            ingredientsMenu: [],
            orderBun: 0,
            orderIngredients: [{ uuid: "3", ingredientType: 3 }, { uuid: "1", ingredientType: 1 }, { uuid: "2", ingredientType: 2 }, { uuid: "4", ingredientType: 4 }],
            totalPrice: 0,
            ready: true,
        })
    })

    it('REFRESH_PRICE', () => {
        expect(
            reducer(undefined, {
                type: types.REFRESH_PRICE,
            })
        ).toEqual(
            {
                bunsMenu: [],
                ingredientsMenu: [],
                orderBun: 0,
                orderIngredients: [],
                totalPrice: 0,
                ready: false,
            }
        )

        expect(
            reducer(
                {
                    bunsMenu: testArrayBuns,
                    ingredientsMenu: testArrayIngredients,
                    orderBun: 1,
                    orderIngredients: [{ uuid: "1", ingredientType: 0 }, { uuid: "2", ingredientType: 1 }],
                    totalPrice: 99999,
                    ready: true,
                },
                {
                    type: types.REFRESH_PRICE,
                }
            )
        ).toEqual({
            bunsMenu: testArrayBuns,
            ingredientsMenu: testArrayIngredients,
            orderBun: 1,
            orderIngredients: [{ uuid: "1", ingredientType: 0 }, { uuid: "2", ingredientType: 1 }],
            totalPrice: 900,
            ready: true,
        })
    })

    it('REFRESH_PRICE', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAN_CONSTRUCTOR,
            })
        ).toEqual(
            {
                bunsMenu: [],
                ingredientsMenu: [],
                orderBun: 0,
                orderIngredients: [],
                totalPrice: 0,
                ready: false,
            }
        )
        expect(
            reducer(
                {
                    bunsMenu: testArrayBuns,
                    ingredientsMenu: testArrayIngredients,
                    orderBun: 1,
                    orderIngredients: [{ uuid: "1", ingredientType: 1 }, { uuid: "2", ingredientType: 2 }],
                    totalPrice: 99999,
                    ready: true,
                },
                {
                    type: types.CLEAN_CONSTRUCTOR,
                }
            )
        ).toEqual({
            bunsMenu: testArrayBuns,
            ingredientsMenu: testArrayIngredients,
            orderBun: 0,
            orderIngredients: [],
            totalPrice: 0,
            ready: true,
        })
    })
})