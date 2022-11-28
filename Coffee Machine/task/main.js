const input = require('sync-input')

const drinks = ["espresso", "latte", "cappuccino"]
const costs = {
    espresso: {
        water: 250,
        milk: 0,
        coffee_beans: 16,
        money: 4
    },
    latte: {
        water: 350,
        milk: 75,
        coffee_beans: 20,
        money: 7
    },
    cappuccino: {
        water: 200,
        milk: 100,
        coffee_beans: 12,
        money: 6
    }
}

const resources = ["water", "milk", "coffee_beans"]

let have = {
    water: 400,
    milk: 540,
    coffee_beans: 120,
    money: 550,
    cups: 9
}

const actions = {
    "buy": () => {
        const drinkNumber = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ")
        if (drinkNumber === "back") return;
        const requirements = costs[drinks[Number(drinkNumber) - 1]]

        for (let resource of resources) {
            if (have[resource] < requirements[resource]) {
                console.log(`Sorry, not enough ${resource.replace("_", " ")}!`);
                return;
            }
        }

        console.log("I have enough resources, making you a coffee!")
        for (let resource of resources) have[resource] -= requirements[resource];
        have.cups--;
        have.money += requirements.money;
    },
    "fill": () => {
        have.water += Number(input("Write how many ml of water you want to add: "))
        have.milk += Number(input("Write how many ml of milk you want to add: "))
        have.coffee_beans += Number(input("Write how many grams of coffee beans you want to add: "))
        have.cups += Number(input("Write how many disposable cups you want to add: "))
    },
    "take": () => {
        console.log(`I gave you $${have.money}`)
        have.money = 0
    },
    "remaining": () => {
        console.log(`The coffee machine has:`)
        console.log(`${have.water} ml of water`)
        console.log(`${have.milk} ml of milk`)
        console.log(`${have.coffee_beans} g of coffee beans`)
        console.log(`${have.cups} disposable cups`)
        console.log(`$${have.money} of money`)
    }
}

while (true) {
    const action = input("Write action (buy, fill, take, remaining, exit): ")
    if (action === "exit") break;
    console.log();
    actions[action]();
    console.log();
}