
describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });
});

describe('app works correctly with routes', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('should navigate home page by default', function () {
    cy.contains('Соберите бургер');
    cy.contains('Краторная булка N-200i');
  });
  it('should navigate feed page after pressing button on a header menu', function () {
    cy.visit('http://localhost:3000');
    cy.get('p').contains("Лента заказов").click();
    cy.contains('Лента заказов');
  });
  it('should navigate profile page after pressing button on a header menu', function () {
    cy.visit('http://localhost:3000');
    cy.get('p').contains("Личный кабинет").click();
    cy.contains('Вход');
  });
});

describe('home page ingredients-panel is working right', function () {
  it('should open ingredient modal Краторная булка N-200i', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
    cy.contains("Детали ингредиента").should("not.exist");//модалка не открыта
    cy.contains("420").should("not.exist");//число калорий Краторной булки на 31.03.2023
    cy.contains("53").should("not.exist");//число углеводов Краторной булки на 31.03.2023
    cy.get("p").contains("Краторная булка N-200i").click();
    cy.contains("Детали ингредиента");//МОДАЛКА ОТКРЫТА
    cy.contains("420");//МОДАЛКА ОТКРЫТА, число калорий Краторной булки на 31.03.2023
    cy.contains("53");//МОДАЛКА ОТКРЫТА, число углеводов Краторной булки на 31.03.2023
    cy.get("div[class^=Modal_exit]").find("svg").click();//проверим что модалка выключается
    cy.contains("Детали ингредиента").should("not.exist"); //модалка не открыта
    cy.contains("420").should("not.exist");//число калорий Краторной булки на 31.03.2023
    cy.contains("53").should("not.exist");//число углеводов Краторной булки на 31.03.2023
  });
  it('should open ingredient modal Флюоресцентная булка R2-D3', function () {//убеждаемся что модалка меняется от ингредиента
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
    cy.contains("Детали ингредиента").should("not.exist");//модалка не открыта
    cy.contains("643").should("not.exist");//число кал Мяса Флюоресцентной булки на 31.03.2023
    cy.contains("26").should("not.exist");//число жиров Флюоресцентной булки на 31.03.2023
    cy.get("p").contains("Флюоресцентная булка R2-D3").click();
    cy.contains("Детали ингредиента");//МОДАЛКА ОТКРЫТА
    cy.contains("643");//МОДАЛКА ОТКРЫТА, число калорий Флюоресцентной булки на 31.03.2023
    cy.contains("26");//МОДАЛКА ОТКРЫТА, число жиров Флюоресцентной булки на 31.03.2023
    cy.get("div[class^=Modal_exit]").find("svg").click();//проверим что модалка выключается
    cy.contains("Детали ингредиента").should("not.exist"); //модалка не открыта
    cy.contains("643").should("not.exist");//число калорий Флюоресцентной булки на 31.03.2023
    cy.contains("26").should("not.exist");//число жиров Флюоресцентной булки на 31.03.2023
  });
});

describe('D&D is working right', function () {
  const dataTransfer = new DataTransfer();
  it('dnd from ingredients to constructor is working right', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
    cy.get("section[class^=BurgerConstructor_BurgerConstructor]").as('constructor');
    cy.contains("2510").should("not.exist");//ценника булок нет
    cy.contains("2525").should("not.exist");//ценник заказа не существует
    cy.contains("6667").should("not.exist");//ценник заказа не существует
    cy.get("p[class^=counter__num]").should("not.exist");//нет никаких взятых ингредиентов
    cy.get("p").contains("Краторная булка N-200i").trigger('dragstart', { dataTransfer });
    cy.get("@constructor").trigger('drop', { dataTransfer });
    cy.get("li[class^=IngredientCard]").contains("Краторная булка N-200i").get("p[class^=counter__num]").contains("2").should("exist");//взяли булки
    cy.contains("2510").should("exist");//ценник булок появился
    cy.get("p").contains("Соус традиционный галактический").trigger('dragstart', { dataTransfer });
    cy.get("@constructor").trigger('drop', { dataTransfer });
    cy.contains("2525").should("exist");//ценник заказа булки + соус
    cy.get("li[class^=IngredientCard]").contains("Соус традиционный галактический").get("p[class^=counter__num]").contains("1").should("exist");//взяли соус
    cy.get("p").contains("Сыр с астероидной плесенью").trigger('dragstart', { dataTransfer });
    cy.get("@constructor").trigger('drop', { dataTransfer });
    cy.contains("6667").should("exist");//ценник заказа булки + соус + сыр
    cy.contains("2525").should("not.exist");//это старая цена
    cy.get("li[class^=IngredientCard]").contains("Сыр с астероидной плесенью").get("p[class^=counter__num]").contains("1").should("exist");//взяли сыр
    //проверка очередности начинки
    cy.get("@constructor").get("div[class^=BurgerFilling_ConstructorIngredientElement]").as('orderList');
    cy.get("@orderList").eq(0).contains("Сыр с астероидной плесенью").should("not.exist"); //первая начинка
    cy.get("@orderList").eq(0).contains("Соус традиционный галактический").should("exist"); //первая начинка
    cy.get("@orderList").eq(1).contains("Соус традиционный галактический").should("not.exist"); //вторая начинка
    cy.get("@orderList").eq(1).contains("Сыр с астероидной плесенью").should("exist"); //вторая начинка
    //d&d начинок
    cy.get("@orderList").eq(1).trigger('dragstart', { dataTransfer });
    cy.get("@orderList").eq(0).trigger('drop', { dataTransfer }); 
    //проверка очередности начинки
    cy.get("@orderList").eq(0).contains("Сыр с астероидной плесенью").should("exist"); //первая начинка
    cy.get("@orderList").eq(0).contains("Соус традиционный галактический").should("not.exist"); //первая начинка
    cy.get("@orderList").eq(1).contains("Соус традиционный галактический").should("exist"); //вторая начинка
    cy.get("@orderList").eq(1).contains("Сыр с астероидной плесенью").should("not.exist"); //вторая начинка
    //удаление начинок
    cy.get("@orderList").eq(0).find("span[class^=constructor-element__action]").click();
    cy.get("@orderList").eq(0).contains("Соус традиционный галактический").should("exist"); //первая начинка
    cy.contains("2525").should("exist");//ценник вернулся
  });  
});

describe('Ordering logic is working', function () {
const dataTransfer = new DataTransfer();
  it('checking forced login for ordering', function () {
    cy.visit('http://localhost:3000');
    cy.get("p").contains("Хрустящие минеральные кольца").trigger('dragstart', { dataTransfer });
    cy.get("p").contains("Для оформления заказа нужны булки").trigger('drop', { dataTransfer });
    cy.get("p").contains("Краторная булка N-200i").trigger('dragstart', { dataTransfer });
    cy.get("p").contains("Для оформления заказа нужны булки").trigger('drop', { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.contains('Вход');//мы перешли в окно логина
  });

  it('make order', function () {
    cy.visit('http://localhost:3000');
    cy.get('p').contains("Личный кабинет").click();
    cy.contains('Вход');
    cy.get("input").first().as("nameInput");
    cy.get("input").last().as("passwordInput");
    cy.get("@nameInput").click().should("contain", '');
    cy.get("@nameInput").click().type("iu8david@gmail.com");
    cy.get("@passwordInput").click().should("contain", '');
    cy.get("@passwordInput").click().type("321");
    cy.get("button").contains("Войти").click();
    cy.contains('Профиль');
    cy.get('p').contains("Конструктор").click();
    cy.contains('Соберите бургер');
    cy.get("p").contains("Краторная булка N-200i").trigger('dragstart', { dataTransfer });
    cy.get("p").contains("Для оформления заказа нужны булки").trigger('drop', { dataTransfer });
    cy.get("p").contains("Соус Spicy-X").trigger('dragstart', { dataTransfer });
    cy.get("button").contains("Оформить заказ").trigger('drop', { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.contains("идентификатор заказа");
    cy.wait(20000);
    cy.contains("Ваш заказ начали готовить");
    cy.get("div[class^=Modal_exit]").find("svg").click();  //проверим что модалка выключается
    cy.contains("Ваш заказ начали готовить").should("not.exist"); 
  });
});