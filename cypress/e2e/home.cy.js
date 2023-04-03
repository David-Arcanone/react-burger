const testBun1 ={
  name: "Краторная булка N-200i",
  calories: "420",
  carbohydrates: "53"
};
const testBun2 ={
  name: "Флюоресцентная булка R2-D3",
  calories: "643",
  fat: "26"
};
const pageSign={
  homePageSign:'Соберите бургер',
  loginPageSign: "Вход",
  profilePageSign: 'Профиль',
  feedPageSign: 'Выполнено за все время:',
  ingredientsModalTextSign: "Детали ингредиента",
}
const testPrice ={
  twoBuns: "2510",
  twoBunsAndSauce: "2525",
  twoBunsSauceAndCheese: "6667",
}
const testOrderIngredients ={
  sauce1: "Соус традиционный галактический",
  cheese1: "Сыр с астероидной плесенью",
  noBunsMessage: "Для оформления заказа нужны булки",
  sauce2: "Соус Spicy-X",
  rings1: "Хрустящие минеральные кольца"
}
const interactiveObjects ={
  orderIngredientCard: "li[class^=IngredientCard]",
  modalExit: "div[class^=Modal_exit]",
  buttonMakeOrderText: "Оформить заказ",
  headerProfileLink: "Личный кабинет",
  headerFeedLink: "Лента заказов",
  headerHomeLink: "Конструктор"
};

describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('/');
  });
});

describe('app works correctly with routes from home page', function () {
  before(function () {
    cy.visit('/');
  });
  it('should navigate home page by default', function () {
    cy.contains(pageSign.homePageSign);//есть только в домашней странице
  });
  it('should navigate feed page after pressing button on a header menu', function () {
    cy.visit('/');
    cy.get('p').contains(interactiveObjects.headerFeedLink).click();
    cy.contains(pageSign.feedPageSign);
  });
  it('should navigate profile page after pressing button on a header menu', function () {
    cy.visit('/');
    cy.get('p').contains(interactiveObjects.headerProfileLink).click();
    cy.contains(pageSign.loginPageSign);
  });
});

describe('home page ingredients-panel is working right', function () {
  it('should open ingredient modal Краторная булка N-200i', function () {
    cy.visit('/');
    cy.contains(pageSign.homePageSign);
    cy.contains(pageSign.ingredientsModalTextSign).should("not.exist");//модалка не открыта
    cy.contains(testBun1.calories).should("not.exist");//число калорий Краторной булки на 31.03.2023
    cy.contains(testBun1.carbohydrates).should("not.exist");//число углеводов Краторной булки на 31.03.2023
    cy.get("p").contains(testBun1.name).click();
    cy.contains(pageSign.ingredientsModalTextSign);//МОДАЛКА ОТКРЫТА
    cy.contains(testBun1.calories);//МОДАЛКА ОТКРЫТА, число калорий Краторной булки на 31.03.2023
    cy.contains(testBun1.carbohydrates);//МОДАЛКА ОТКРЫТА, число углеводов Краторной булки на 31.03.2023
    cy.get(interactiveObjects.modalExit).find("svg").click();//проверим что модалка выключается
    cy.contains(pageSign.ingredientsModalTextSign).should("not.exist"); //модалка не открыта
    cy.contains(testBun1.calories).should("not.exist");//число калорий Краторной булки на 31.03.2023
    cy.contains(testBun1.carbohydrates).should("not.exist");//число углеводов Краторной булки на 31.03.2023
  });
  it('should open ingredient modal Флюоресцентная булка R2-D3', function () {//убеждаемся что модалка меняется от ингредиента
    cy.visit('/');
    cy.contains(pageSign.homePageSign);
    cy.contains(pageSign.ingredientsModalTextSign).should("not.exist");//модалка не открыта
    cy.contains(testBun2.calories).should("not.exist");//число кал Мяса Флюоресцентной булки на 31.03.2023
    cy.contains(testBun2.fat).should("not.exist");//число жиров Флюоресцентной булки на 31.03.2023
    cy.get("p").contains(testBun2.name).click();
    cy.contains(pageSign.ingredientsModalTextSign);//МОДАЛКА ОТКРЫТА
    cy.contains(testBun2.calories);//МОДАЛКА ОТКРЫТА, число калорий Флюоресцентной булки на 31.03.2023
    cy.contains(testBun2.fat);//МОДАЛКА ОТКРЫТА, число жиров Флюоресцентной булки на 31.03.2023
    cy.get(interactiveObjects.modalExit).find("svg").click();//проверим что модалка выключается
    cy.contains(pageSign.ingredientsModalTextSign).should("not.exist"); //модалка не открыта
    cy.contains(testBun2.calories).should("not.exist");//число калорий Флюоресцентной булки на 31.03.2023
    cy.contains(testBun2.fat).should("not.exist");//число жиров Флюоресцентной булки на 31.03.2023
  });
});

describe('D&D is working right', function () {
  const dataTransfer = new DataTransfer();
  const counterOfIngredients = "p[class^=counter__num]";
  it('dnd from ingredients to constructor is working right', function () {
    cy.visit('/');
    cy.contains(pageSign.homePageSign);
    cy.get("section[class^=BurgerConstructor_BurgerConstructor]").as('constructor');
    cy.contains(testPrice.twoBuns).should("not.exist");//ценника булок нет
    cy.contains(testPrice.twoBunsAndSauce).should("not.exist");//ценник заказа не существует
    cy.contains(testPrice.twoBunsSauceAndCheese).should("not.exist");//ценник заказа не существует
    cy.get(counterOfIngredients).should("not.exist");//нет никаких взятых ингредиентов
    cy.get("p").contains(testBun1.name).trigger('dragstart', { dataTransfer });
    cy.get("@constructor").trigger('drop', { dataTransfer });
    cy.get("li[class^=IngredientCard]").contains(testBun1.name).get(counterOfIngredients).contains("2").should("exist");//взяли булки
    cy.contains(testPrice.twoBuns).should("exist");//ценник булок появился
    cy.get("p").contains(testOrderIngredients.sauce1).trigger('dragstart', { dataTransfer });
    cy.get("@constructor").trigger('drop', { dataTransfer });
    cy.contains(testPrice.twoBunsAndSauce).should("exist");//ценник заказа булки + соус
    cy.get("li[class^=IngredientCard]").contains(testOrderIngredients.sauce1).get(counterOfIngredients).contains("1").should("exist");//взяли соус
    cy.get("p").contains(testOrderIngredients.cheese1).trigger('dragstart', { dataTransfer });
    cy.get("@constructor").trigger('drop', { dataTransfer });
    cy.contains(testPrice.twoBunsSauceAndCheese).should("exist");//ценник заказа булки + соус + сыр
    cy.contains(testPrice.twoBunsAndSauce).should("not.exist");//это старая цена
    cy.get("li[class^=IngredientCard]").contains(testOrderIngredients.cheese1).get(counterOfIngredients).contains("1").should("exist");//взяли сыр
    //проверка очередности начинки
    cy.get("@constructor").get("div[class^=BurgerFilling_ConstructorIngredientElement]").as('orderList');
    cy.get("@orderList").eq(0).contains(testOrderIngredients.cheese1).should("not.exist"); //первая начинка
    cy.get("@orderList").eq(0).contains(testOrderIngredients.sauce1).should("exist"); //первая начинка
    cy.get("@orderList").eq(1).contains(testOrderIngredients.sauce1).should("not.exist"); //вторая начинка
    cy.get("@orderList").eq(1).contains(testOrderIngredients.cheese1).should("exist"); //вторая начинка
    //d&d начинок
    cy.get("@orderList").eq(1).trigger('dragstart', { dataTransfer });
    cy.get("@orderList").eq(0).trigger('drop', { dataTransfer }); 
    //проверка очередности начинки
    cy.get("@orderList").eq(0).contains(testOrderIngredients.cheese1).should("exist"); //первая начинка
    cy.get("@orderList").eq(0).contains(testOrderIngredients.sauce1).should("not.exist"); //первая начинка
    cy.get("@orderList").eq(1).contains(testOrderIngredients.sauce1).should("exist"); //вторая начинка
    cy.get("@orderList").eq(1).contains(testOrderIngredients.cheese1).should("not.exist"); //вторая начинка
    //удаление начинок
    cy.get("@orderList").eq(0).find("span[class^=constructor-element__action]").click();
    cy.get("@orderList").eq(0).contains(testOrderIngredients.sauce1).should("exist"); //первая начинка
    cy.contains(testPrice.twoBunsAndSauce).should("exist");//ценник вернулся
  });  
});

describe('Ordering logic is working', function () {
const dataTransfer = new DataTransfer();
  it('checking forced login for ordering', function () {
    cy.visit('/');
    cy.get("p").contains(testOrderIngredients.rings1).trigger('dragstart', { dataTransfer });
    cy.get("p").contains(testOrderIngredients.noBunsMessage).trigger('drop', { dataTransfer });
    cy.get("p").contains(testBun1.name).trigger('dragstart', { dataTransfer });
    cy.get("p").contains(testOrderIngredients.noBunsMessage).trigger('drop', { dataTransfer });
    cy.get("button").contains(interactiveObjects.buttonMakeOrderText).click();
    cy.contains(pageSign.loginPageSign);//мы перешли в окно логина
  });

  it('make order', function () {
    cy.visit('/');
    cy.get('p').contains(interactiveObjects.headerProfileLink).click();
    cy.contains(pageSign.loginPageSign);
    cy.get("input").first().as("nameInput");
    cy.get("input").last().as("passwordInput");
    cy.get("@nameInput").click().should("contain", '');
    cy.get("@nameInput").click().type("iu8david@gmail.com");
    cy.get("@passwordInput").click().should("contain", '');
    cy.get("@passwordInput").click().type("321");
    cy.get("button").contains("Войти").click();
    cy.contains(pageSign.profilePageSign);
    cy.get('p').contains(interactiveObjects.headerHomeLink).click();
    cy.contains(pageSign.homePageSign);
    cy.get("p").contains(testBun1.name).trigger('dragstart', { dataTransfer });
    cy.get("p").contains(testOrderIngredients.noBunsMessage).trigger('drop', { dataTransfer });
    cy.get("p").contains(testOrderIngredients.sauce2).trigger('dragstart', { dataTransfer });
    cy.get("button").contains(interactiveObjects.buttonMakeOrderText).trigger('drop', { dataTransfer }).click();
    cy.contains("идентификатор заказа");
    cy.wait(20000);
    cy.contains("Ваш заказ начали готовить");
    cy.get(interactiveObjects.modalExit).find("svg").click();  //проверим что модалка выключается
    cy.contains("Ваш заказ начали готовить").should("not.exist"); 
  });
});